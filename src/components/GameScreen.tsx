import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Email, Choice } from '../types/Email';
import { getAllEmails, getUrgentEmails } from '../data/emails';
import { DefeatReason } from '../App';

// Types
interface GameScreenProps {
  initialScore: number;
  initialMonth: number;
  onGameVictory: (stats: { cdoBudget: number; companyProfit: number; dataQuality: number; reputation: number }) => void;
  onGameDefeat: (reason: DefeatReason, stats: { cdoBudget: number; companyProfit: number; dataQuality: number; reputation: number }) => void;
  companyContext: {
    name: string;
    industry: string;
    employees: number;
    revenue: string;
    founded: number;
    headquarters: string;
    dataTeamSize: number;
    description: string;
  };
}

// Main component
const GameScreen: React.FC<GameScreenProps> = ({ initialScore, initialMonth, onGameVictory, onGameDefeat, companyContext }) => {
  // Game state
  const [cdoBudget, setCdoBudget] = useState(initialScore);
  const [companyProfit, setCompanyProfit] = useState(0);
  const [month, setMonth] = useState(initialMonth);
  const [dataQuality, setDataQuality] = useState(50); // 0-100 scale
  const [reputation, setReputation] = useState(50); // 0-100 scale
  
  // Audio ref for background music
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  // Audio ref for new email notification sound
  const emailNotificationRef = useRef<HTMLAudioElement | null>(null);
  // Game clock and email generation
  const [gameStarted, setGameStarted] = useState(false);
  // Email state
  const [inbox, setInbox] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [answeredEmails, setAnsweredEmails] = useState<string[]>([]);
  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);
  const [outcomeEffects, setOutcomeEffects] = useState<{
    budgetImpact: number;
    profitImpact: number;
    dataQualityImpact: number;
    reputationImpact: number;
  } | null>(null);
  
  // Timer references and state
  const emailTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimeRef = useRef<number>(0);
  const lastEmailTimeRef = useRef<number>(0);

  // Track urgent email timers
  const [urgentTimers, setUrgentTimers] = useState<{[emailId: string]: NodeJS.Timeout}>({});
  // Track urgent email start times
  const [urgentTimerStartTimes, setUrgentTimerStartTimes] = useState<{[emailId: string]: number}>({});
  // Force UI updates for timers
  const [timerTick, setTimerTick] = useState<number>(0);
  
  // Track remaining game time
  const [remainingTime, setRemainingTime] = useState<number>(180); // 3 minutes in seconds
  
  // Available emails pool
  const [availableEmails, setAvailableEmails] = useState<Email[]>([]);
  
  // Play email notification sound
  const playEmailNotification = useCallback(() => {
    if (emailNotificationRef.current) {
      // Reset the audio to the beginning to allow for rapid consecutive plays
      emailNotificationRef.current.currentTime = 0;
      emailNotificationRef.current.play().catch(error => {
        console.error('Email notification sound failed:', error);
      });
    }
  }, []);
  
  // Initialize background music when the component mounts
  useEffect(() => {
    // Create audio element
    backgroundMusicRef.current = new Audio('/main_music.mp3');
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.5;
    
    // Create email notification sound
    emailNotificationRef.current = new Audio('/click.ogg');
    emailNotificationRef.current.volume = 0.7;
    
    // Start playing background music
    backgroundMusicRef.current.play().catch(error => {
      console.error('Background music playback failed:', error);
    });
    
    // Clean up when component unmounts
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.src = '';
      }
      if (emailNotificationRef.current) {
        emailNotificationRef.current.src = '';
      }
    };
  }, []);
  
  // Toggle music playback
  const toggleMusic = useCallback(() => {
    setIsMusicPlaying(prev => !prev);
  }, []);
  
  // Effect to handle music play/pause based on state
  useEffect(() => {
    if (backgroundMusicRef.current) {
      if (isMusicPlaying) {
        backgroundMusicRef.current.play().catch(error => {
          console.error('Background music playback failed:', error);
        });
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  }, [isMusicPlaying]);
  
  // Function to clear all urgent email timers
  const clearUrgentEmails = useCallback(() => {
    // Clear all timeout references
    Object.values(urgentTimers).forEach(timerId => {
      if (timerId) {
        clearTimeout(timerId);
      }
    });
    
    // Reset the timers state
    setUrgentTimers({});
    setUrgentTimerStartTimes({});
  }, [urgentTimers]);
  // Initialize email pool
  useEffect(() => {
    // Create a deep copy to avoid mutating the original data
    const allEmails = getAllEmails().map(email => ({
      ...email,
      content: email.content.replace(/GlobalTech Innovations/g, companyContext.name)
    }));
    
    setAvailableEmails(allEmails);
  }, [companyContext]);

  // Add effect to update timers UI every 100ms
  useEffect(() => {
    // Update game timer every second
    const timerInterval = setInterval(() => {
      setTimerTick(prev => prev + 1);
      
      // Only update time if game has started
      if (gameStarted) {
        // Calculate remaining time in seconds (180 seconds total)
        const timeElapsed = Math.floor(gameTimeRef.current / 1000);
        const timeRemaining = Math.max(0, 180 - timeElapsed);
        setRemainingTime(timeRemaining);
      }
    }, 100);
    
    return () => clearInterval(timerInterval);
  }, [gameStarted, urgentTimers]);

  // Get the remaining time for an urgent email timer
  const getTimeRemaining = (emailId: string): number => {
    // Using timerTick in the function body ensures this function re-runs on each tick
    // eslint-disable-next-line no-unused-vars
    const _ = timerTick;
    
    if (!urgentTimers[emailId] || !urgentTimerStartTimes[emailId]) {
      return 0;
    }
    
    const now = Date.now();
    const timerStartTime = urgentTimerStartTimes[emailId];
    const totalTime = 10000; // 10 seconds in milliseconds
    const elapsed = now - timerStartTime;
    const remaining = Math.max(0, totalTime - elapsed);
    
    return Math.floor(remaining / 1000); // Convert to seconds
  };

  // Start a timer for urgent emails
  const startUrgentTimer = (emailId: string) => {
    // Clear any existing timer for this email
    if (urgentTimers[emailId]) {
      clearTimeout(urgentTimers[emailId]);
    }
    
    // Record the start time for this timer
    const startTime = Date.now();
    setUrgentTimerStartTimes(prev => ({
      ...prev,
      [emailId]: startTime
    }));
    
    // Set a new 10-second timer
    const timer = setTimeout(() => {
      // If the urgent email wasn't answered in time
      console.log('Urgent email timeout:', emailId);
      
      // Remove the email from inbox
      setInbox(prev => prev.filter(email => email.id !== emailId));
      
      // Clear all timers
      console.log('Data breach detected. Game over.');
      Object.values(urgentTimers).forEach(timer => clearTimeout(timer));
      // End the game with a data breach defeat
      clearUrgentEmails();
      onGameDefeat('dataBreach', {
        cdoBudget,
        companyProfit,
        dataQuality,
        reputation
      });
    }, 10000); // 10 seconds
    
    // Save the timer reference
    setUrgentTimers(prev => ({
      ...prev,
      [emailId]: timer
    }));
  };

  
  useEffect(() => {
    console.log('Game started');
    if (!gameStarted) return; // Don't start the game clock until the game is started
    
    // Create a separate interval for emails to avoid interference with the timer
    const gameInterval = setInterval(() => {
      gameTimeRef.current += 100; // 100ms tick
      
      // Check for burnout (too many emails)
      if (inbox.length >= 5) {
        clearInterval(gameInterval);
        clearUrgentEmails();
        onGameDefeat('burnout', {
          cdoBudget,
          companyProfit,
          dataQuality,
          reputation
        });
        return;
      }
      if (cdoBudget <= 0) {
        clearInterval(gameInterval);
        clearUrgentEmails();
        onGameDefeat('burnout', {
          cdoBudget,
          companyProfit,
          dataQuality,
          reputation
        });
      }
      
      // Add regular emails regardless of urgent status
      const timeSinceLastEmail = gameTimeRef.current - lastEmailTimeRef.current;
      if (timeSinceLastEmail > 7000 + Math.random() * 3000) { // 7-10 seconds interval
        // Randomly select an email to add (prioritize non-urgent for regular additions)
        const nonUrgentEmails = availableEmails.filter(email => !email.isUrgent);
        
        if (nonUrgentEmails.length > 0) {
          const randomIndex = Math.floor(Math.random() * nonUrgentEmails.length);
          const emailToAdd = nonUrgentEmails[randomIndex];
          
          // Add to inbox
          setInbox(prev => [...prev, emailToAdd]);
          
          // Play notification sound
          playEmailNotification();
          
          // Remove from available pool
          setAvailableEmails(prev => prev.filter(e => e.id !== emailToAdd.id));
          // If no available emails reset to all mails
          if (availableEmails.length === 0) {
            const allEmails = getAllEmails().map(email => ({
              ...email,
              content: email.content.replace(/GlobalTech Innovations/g, companyContext.name)
            }));
            setAvailableEmails(allEmails);
          }
          
          // Update last email time
          lastEmailTimeRef.current = gameTimeRef.current;
        }
      }
      
      // Occasionally add an urgent email (about every 30-45 seconds)
      // Only add a new urgent if there isn't already one in progress
      if (Math.random() < 0.01) { // 0.3% chance per 100ms = approx every 33 seconds
        const urgentEmails = availableEmails.filter(email => email.isUrgent);
        
        if (urgentEmails.length > 0) {
          const randomIndex = Math.floor(Math.random() * urgentEmails.length);
          const urgentEmail = urgentEmails[randomIndex];
          
          // Add to inbox
          setInbox(prev => [...prev, urgentEmail]);
          
          // Play notification sound
          playEmailNotification();
          
          // Remove from available pool
          setAvailableEmails(prev => prev.filter(e => e.id !== urgentEmail.id));
          
          // Start the timer for this urgent email
          startUrgentTimer(urgentEmail.id);
        }
      }
      
      // Check for victory after 3 minutes of successful play
      if (gameTimeRef.current >= 180000) {
        clearInterval(gameInterval);
        clearUrgentEmails();
        onGameVictory({
          cdoBudget,
          companyProfit,
          dataQuality,
          reputation
        });
      }
    }, 100);
    
    return () => {
      clearInterval(gameInterval);
      if (emailTimerRef.current) clearTimeout(emailTimerRef.current);
    };
  }, [
    inbox,
    availableEmails,
    cdoBudget,
    companyProfit,
    dataQuality,
    reputation,
    onGameDefeat,
    onGameVictory,
    gameStarted,
    playEmailNotification,
  ]);
  
  // Handle selecting an email
  const handleEmailSelect = (email: Email) => {
    // Clear any previous outcome message when selecting a new email
    setOutcomeMessage(null);
    setOutcomeEffects(null);
    
    // Set the selected email
    setSelectedEmail(email);
    
  };
  
  // Handle choice selection
  const handleChoiceSelect = (choice: Choice) => {
    if (!selectedEmail) return;
    
    // Apply outcome effects
    const newCdoBudget = cdoBudget + choice.outcome.budgetImpact;
    const newCompanyProfit = companyProfit + choice.outcome.profitImpact;
    const newDataQuality = Math.max(0, Math.min(100, dataQuality + choice.outcome.dataQualityImpact));
    const newReputation = Math.max(0, Math.min(100, reputation + choice.outcome.reputationImpact));
    
    // Set outcome message and effects for display
    setOutcomeMessage(choice.outcome.description);
    setOutcomeEffects({
      budgetImpact: choice.outcome.budgetImpact,
      profitImpact: choice.outcome.profitImpact,
      dataQualityImpact: choice.outcome.dataQualityImpact,
      reputationImpact: choice.outcome.reputationImpact
    });
    
    // Update game state
    setCdoBudget(newCdoBudget);
    setCompanyProfit(newCompanyProfit);
    setDataQuality(newDataQuality);
    setReputation(newReputation);
    
    // Mark email as answered
    setAnsweredEmails(prev => [...prev, selectedEmail.id]);

    if(selectedEmail.isUrgent) {
      // Clear timer
      clearTimeout(urgentTimers[selectedEmail.id]);
    }
    
    // Remove the email from inbox
    setInbox(prev => prev.filter(email => email.id !== selectedEmail.id));
    
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get impact color
  const getImpactColor = (value: number): string => {
    if (value > 0) return '#35adb6';
    if (value < 0) return '#cf5628';
    return '#5f6368';
  };
  
  // Format impact
  const formatImpact = (value: number, isPercentage: boolean = false): string => {
    if (value === 0) return 'No change';
    const prefix = value > 0 ? '+' : '';
    return isPercentage ? `${prefix}${value}%` : `${prefix}${formatCurrency(value)}`;
  };
  
  // Extract first line of email content for preview
  const getEmailPreview = (content: string): string => {
    const firstLine = content.split('\n')[0];
    return firstLine.length > 60 ? firstLine.substring(0, 60) + '...' : firstLine;
  };
  
  // Clean up timers on component unmount or defeat/victory
  useEffect(() => {
    return () => {
      if (emailTimerRef.current) clearTimeout(emailTimerRef.current);
    };
  }, []);
  
  const handleStartGame = () => {
    setGameStarted(true);
    // Reset game time when starting
    gameTimeRef.current = 0;
    lastEmailTimeRef.current = 0;
  };
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <Container>
      <Header>
        <StatusItem>
          <StatusLabel>CDO Budget:</StatusLabel>
          <StatusValue>{formatCurrency(cdoBudget)}</StatusValue>
        </StatusItem>
        <StatusItem>
          <StatusLabel>Company Profit:</StatusLabel>
          <StatusValue profit={companyProfit >= 0}>{formatCurrency(companyProfit)}</StatusValue>
        </StatusItem>
        <MetricItem>
          <StatusLabel>Time Remaining:</StatusLabel>
          <TimeDisplay gameStarted={gameStarted}>{gameStarted ? formatTime(remainingTime) : "--:--"}</TimeDisplay>
        </MetricItem>
        <MetricItem>
          <MetricLabel>Data Quality:</MetricLabel>
          <ProgressContainer>
            <ProgressBar value={dataQuality} max={100} color="#35adb6" />
            <ProgressValue>{dataQuality}%</ProgressValue>
          </ProgressContainer>
        </MetricItem>
        <MetricItem>
          <MetricLabel>Reputation:</MetricLabel>
          <ProgressContainer>
            <ProgressBar value={reputation} max={100} color="#f3ad41" />
            <ProgressValue>{reputation}%</ProgressValue>
          </ProgressContainer>
        </MetricItem>
        <MusicButton onClick={toggleMusic}>
          {isMusicPlaying ? '🔊' : '🔇'}
        </MusicButton>
      </Header>
      
      <ContentContainer>
        <InboxPanel>
          <InboxHeader>
            {inbox.length < 3 && <InboxTitle>Inbox ({inbox.length}/5)</InboxTitle>}
            {inbox.length >= 3 && <InboxTitle style={{ color: '#cf5628' }}>Inbox ({inbox.length}/5)</InboxTitle>}
            <InboxSubtitle>Most recent first</InboxSubtitle>
          </InboxHeader>
          
          <EmailList>
            {inbox.length === 0 ? (
              <NoEmails>Your inbox is empty. Great job!</NoEmails>
            ) : (
              inbox.slice().reverse().map(email => (
                <EmailItem 
                  key={email.id} 
                  isSelected={selectedEmail?.id === email.id}
                  isUrgent={email.isUrgent}
                  onClick={() => handleEmailSelect(email)}
                >
                  {email.isUrgent && (
                    <UrgentIndicator>
                      <UrgentTimer>{getTimeRemaining(email.id)}s</UrgentTimer>
                    </UrgentIndicator>
                  )}
                  <EmailTitle>{email.title}</EmailTitle>
                  <EmailSender>{email.sender}</EmailSender>
                  <EmailPreview>{getEmailPreview(email.content)}</EmailPreview>
                </EmailItem>
              ))
            )}
          </EmailList>
        </InboxPanel>
        
        <MainPanel>
          {selectedEmail ? (
            <>
              <EmailHeader>
                <EmailSubject>
                  {selectedEmail.title}
                  {selectedEmail.isUrgent && (
                    <UrgentBadge>
                      URGENT: {getTimeRemaining(selectedEmail.id)}s to respond
                    </UrgentBadge>
                  )}
                </EmailSubject>
                <EmailFrom>From: {selectedEmail.sender}</EmailFrom>
              </EmailHeader>
              
              <EmailContent>
                {selectedEmail.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </EmailContent>
              
              {!outcomeMessage ? (
                <ResponseOptions>
                  <ResponseTitle>Your Response:</ResponseTitle>
                  {selectedEmail.choices.map(choice => (
                    <ResponseButton 
                      key={choice.id}
                      onClick={() => handleChoiceSelect(choice)}
                    >
                      {choice.text}
                    </ResponseButton>
                  ))}
                </ResponseOptions>
              ) : (
                <OutcomeContainer>
                  <OutcomeMessage>{outcomeMessage}</OutcomeMessage>
                  
                  {outcomeEffects && (
                    <ImpactContainer>
                      <Impact>
                        <ImpactLabel>Budget:</ImpactLabel>
                        <ImpactValue color={getImpactColor(outcomeEffects.budgetImpact)}>
                          {formatImpact(outcomeEffects.budgetImpact)}
                        </ImpactValue>
                      </Impact>
                      
                      <Impact>
                        <ImpactLabel>Profit:</ImpactLabel>
                        <ImpactValue color={getImpactColor(outcomeEffects.profitImpact)}>
                          {formatImpact(outcomeEffects.profitImpact)}
                        </ImpactValue>
                      </Impact>
                      
                      <Impact>
                        <ImpactLabel>Data Quality:</ImpactLabel>
                        <ImpactValue color={getImpactColor(outcomeEffects.dataQualityImpact)}>
                          {formatImpact(outcomeEffects.dataQualityImpact, true)}
                        </ImpactValue>
                      </Impact>
                      
                      <Impact>
                        <ImpactLabel>Reputation:</ImpactLabel>
                        <ImpactValue color={getImpactColor(outcomeEffects.reputationImpact)}>
                          {formatImpact(outcomeEffects.reputationImpact, true)}
                        </ImpactValue>
                      </Impact>
                    </ImpactContainer>
                  )}
                </OutcomeContainer>
              )}
            </>
          ) : (
            <EmptySelection >
              <EmptyIcon>📧</EmptyIcon>
              <EmptyMessage >Select an email from your inbox to respond</EmptyMessage>
              <EmptyWarning style={{ border: '2px solid #cf5628', borderRadius: '8px', padding: '20px' }}>
                <strong>⚠️ IMPORTANT ⚠️</strong><br />
                • Urgent emails must be answered within 10 seconds<br />
                • If you accumulate 5 or more unanswered emails, you'll burn out
              </EmptyWarning>
              {!gameStarted && (
                <StartButton onClick={handleStartGame}>
                  OK Start
                </StartButton>
              )}
            </EmptySelection>
          )}
        </MainPanel>
      </ContentContainer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 700px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #dadce0;
`;

const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
`;

const StatusLabel = styled.div`
  font-size: 12px;
  color: #5f6368;
  margin-bottom: 4px;
`;

interface StatusValueProps {
  profit?: boolean;
}

const StatusValue = styled.div<StatusValueProps>`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.profit === false ? '#cf5628' : '#3c4043'};
`;

const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const MetricLabel = styled.div`
  font-size: 12px;
  color: #5f6368;
  margin-bottom: 4px;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProgressValue = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  min-width: 40px;
`;

interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
}

const ProgressBar = styled.div<ProgressBarProps>`
  flex: 1;
  height: 8px;
  background: #e6e6e6;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => (props.value / props.max) * 100}%;
    background-color: ${props => props.color};
    transition: width 0.3s ease;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const InboxPanel = styled.div`
  width: 350px;
  border-right: 1px solid #dadce0;
  display: flex;
  flex-direction: column;
  background: #f1f3f4;
`;

const InboxHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #dadce0;
`;

const InboxTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #202124;
`;

const InboxSubtitle = styled.div`
  font-size: 12px;
  color: #5f6368;
  margin-top: 4px;
`;

const EmailList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const NoEmails = styled.div`
  padding: 20px;
  text-align: center;
  color: #5f6368;
  font-style: italic;
`;

interface EmailItemProps {
  isSelected: boolean;
  isUrgent: boolean;
  isCurrentUrgent?: boolean;
}

const EmailItem = styled.div<EmailItemProps>`
  padding: 12px 15px;
  background: ${props => props.isSelected ? '#e8f7f8' : 'white'};
  border-left: ${props => props.isUrgent ? '4px solid #cf5628' : '4px solid transparent'};
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  ${props => props.isCurrentUrgent && `
    animation: urgentPulse 1s infinite alternate;
  `}
  
  &:hover {
    background: ${props => props.isSelected ? '#e8f7f8' : '#f5f5f5'};
  }
  
  @keyframes urgentPulse {
    from {
      box-shadow: 0 0 0 0 rgba(207, 86, 40, 0.4);
    }
    to {
      box-shadow: 0 0 0 8px rgba(207, 86, 40, 0);
    }
  }
`;

const UrgentIndicator = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #cf5628;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const UrgentTimer = styled.div``;

const EmailTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #202124;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmailSender = styled.div`
  font-size: 12px;
  color: #5f6368;
  margin-bottom: 6px;
`;

const EmailPreview = styled.div`
  font-size: 13px;
  color: #5f6368;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MainPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  overflow-y: auto;
`;

const EmailHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #dadce0;
`;

const EmailSubject = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #202124;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UrgentBadge = styled.span`
  background-color: #cf5628;
  color: white;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  animation: blink 1s infinite alternate;
  
  @keyframes blink {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.7;
    }
  }
`;

const EmailFrom = styled.div`
  font-size: 14px;
  color: #5f6368;
`;

const EmailContent = styled.div`
  padding: 20px;
  font-size: 15px;
  line-height: 1.6;
  color: #202124;
  
  p {
    margin-bottom: 15px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ResponseOptions = styled.div`
  padding: 20px;
  border-top: 1px solid #dadce0;
`;

const ResponseTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #202124;
  margin-bottom: 15px;
`;

const ResponseButton = styled.button`
  width: 100%;
  padding: 12px 15px;
  background: #f8f9fa;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  text-align: left;
  color: #202124;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e8f7f8;
    border-color: #35adb6;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const OutcomeContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #dadce0;
  background: #f8f9fa;
`;

const OutcomeMessage = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #202124;
  margin-bottom: 15px;
`;

const ImpactContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Impact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #f1f3f4;
  }
`;

const ImpactLabel = styled.div`
  font-size: 14px;
  color: #5f6368;
`;

interface ImpactValueProps {
  color: string;
}

const ImpactValue = styled.div<ImpactValueProps>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.color};
`;


const EmptySelection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #5f6368;
  margin-bottom: 20px;
`;

const EmptyWarning = styled.div`
  font-size: 14px;
  color: #cf5628;
  line-height: 1.5;
  max-width: 400px;
`;

const StartButton = styled.button`
  background: #35adb6;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 20px;
  
  &:hover {
    background: #2d9198;
  }
`;

const MusicButton = styled.button`
  background: #f1f3f4;
  border: 1px solid #dadce0;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  
  &:hover {
    background: #e8f7f8;
    border-color: #35adb6;
  }
  
  &:active {
    background: #ceeaed;
  }
`;

const TimeDisplay = styled.div<{gameStarted: boolean}>`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.gameStarted && props.children === '0:00' ? '#cf5628' : '#3c4043'};
`;

export default GameScreen; 