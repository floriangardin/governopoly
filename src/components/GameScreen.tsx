import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Email, Choice } from '../types/Email';
import { getAllEmails, getUrgentEmails } from '../data/emails';
import { DefeatReason } from '../App';
import { useSoundService } from '../services/SoundService';

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
  const [dataQuality, setDataQuality] = useState(0); // 0-100 scale
  const [reputation, setReputation] = useState(0); // 0-100 scale
  const companyName = companyContext.name;
  const maxEmails = 7;
  
  // Sound service
  const { playSound, stopSound, toggleMusic, isMusicMuted, audioReady } = useSoundService();
  
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
  
  // Mobile responsiveness state
  const [isMobile, setIsMobile] = useState(false);
  const [showEmailList, setShowEmailList] = useState(false);
  
  // Timer references and state
  const emailTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimeRef = useRef<number>(0);
  const lastEmailTimeRef = useRef<number>(0);
  const totalGameTime = 240000; // 4 minutes in milliseconds
  const emailEvery = 20000;
  const urgentTotalTime = 20000;
  // Track urgent email timers
  const [urgentTimers, setUrgentTimers] = useState<{[emailId: string]: NodeJS.Timeout}>({});
  // Use a ref to track timers for cleanup
  const urgentTimersRef = useRef<{[emailId: string]: NodeJS.Timeout}>({});
  // Track urgent email start times
  const [urgentTimerStartTimes, setUrgentTimerStartTimes] = useState<{[emailId: string]: number}>({});
  // Force UI updates for timers
  const [timerTick, setTimerTick] = useState<number>(0);
  const firstUrgentEmailTime = 30000;
  // Track remaining game time
  const [remainingTime, setRemainingTime] = useState<number>(totalGameTime / 1000); // 3 minutes in seconds
  
  // Available emails pool
  const [availableEmails, setAvailableEmails] = useState<Email[]>([]);
  
  // Check if device is mobile based on window size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // When an email is selected on mobile, hide the email list
  useEffect(() => {
    if (isMobile && selectedEmail) {
      setShowEmailList(false);
    }
  }, [selectedEmail, isMobile]);
  
  
  // Play email notification sound
  const playEmailNotification = useCallback(() => {
    playSound('click', false, 0.7);
    
    // Add vibration if supported by the device
    if (navigator.vibrate) {
      navigator.vibrate(200); // Vibrate for 200ms
    }
  }, [playSound]);
  
  const playUrgentEmailNotification = useCallback(() => {
    playSound('alarm', false, 0.7);
    
    // Add vibration if supported by the device - stronger pattern for urgent emails
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]); // Vibrate pattern: 200ms on, 100ms off, 200ms on
    }
  }, [playSound]);
  
  // Initialize background music when the component mounts
  useEffect(() => {
    // Always attempt to play background music when component mounts
    // The SoundService will handle muting internally
    playSound('mainMusic', true, 0.5);
    
    // Cleanup function to stop the music when unmounting
    return () => {
      stopSound('mainMusic');
    };
  }, [playSound, stopSound]);
  
  const emailInStack = (emailId: string): boolean => {
    return inbox.findIndex(email => email.id === emailId) !== -1;
  }

  // Function to clear all urgent email timers
  const clearUrgentEmails = useCallback(() => {
    // Clear all timeout references using the ref (always has latest values)
    Object.values(urgentTimersRef.current).forEach(timerId => {
      if (timerId) {
        clearTimeout(timerId);
      }
    });
    
    // Reset the timers state
    setUrgentTimers({});
    urgentTimersRef.current = {};
    setUrgentTimerStartTimes({});
  }, []); // No dependencies needed since we're using a ref
  
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
        // Calculate remaining time in seconds
        const timeElapsed = Math.floor(gameTimeRef.current / 1000);
        const timeRemaining = Math.max(0, totalGameTime / 1000 - timeElapsed);
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
    const totalTime = urgentTotalTime; // 10 seconds in milliseconds
    const elapsed = now - timerStartTime;
    const remaining = Math.max(0, totalTime - elapsed);
    
    // Vibrate when timer is less than 5 seconds
    const remainingSeconds = Math.floor(remaining / 1000);
    if (remainingSeconds <= 5 && remainingSeconds > 0 && navigator.vibrate && remainingSeconds % 1 === 0) {
      // Short vibration pulse for each second under 5
      navigator.vibrate(100);
    }
    
    return remainingSeconds; // Convert to seconds
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
      console.log("urgentTimers", urgentTimersRef.current);
      clearUrgentEmails();
      // End the game with a data breach defeat
      onGameDefeat('dataBreach', {
        cdoBudget,
        companyProfit,
        dataQuality,
        reputation
      });
    }, urgentTotalTime); // 10 seconds
    
    // Save the timer reference in both state and ref
    setUrgentTimers(prev => {
      const newTimers = {
        ...prev,
        [emailId]: timer
      };
      // Also update the ref
      urgentTimersRef.current = newTimers;
      return newTimers;
    });
  };


  // MAIN LOOP
  useEffect(() => {
    if (!gameStarted) return; // Don't start the game clock until the game is started
    
    // Create a separate interval for emails to avoid interference with the timer
    const gameInterval = setInterval(() => {
      gameTimeRef.current += 100; // 100ms tick


      // Check if we should display the 'new_1' email
      // This is a special email that should be shown at a specific time
      const new1Email = availableEmails.find(email => email.id === 'new_1');
      if (new1Email && gameTimeRef.current > 1000) { // Show after 2 seconds of gameplay
        // Add to inbox
        setInbox(prev => [...prev, new1Email]);
        // Play notification sound
        playEmailNotification();
        // Remove from available pool
        setAvailableEmails(prev => prev.filter(e => e.id !== 'new_1'));
        // Update last email time
        lastEmailTimeRef.current = gameTimeRef.current;
        return;
      }
      if(gameTimeRef.current < 5000) {
        return;
      }

      // Filter emails that are not available
      const filterEmails = (emails: Email[]) => {
        return emails.filter(x => (x.minimumReputation <= reputation) && (x.maximumDataQuality >= dataQuality))
      }

      const filteredAvailableEmails = filterEmails(availableEmails)
      
      // Check for burnout (too many emails)
      if (inbox.length >= maxEmails) {
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
      
      // Add regular emails regardless of urgent status
      const timeSinceLastEmail = gameTimeRef.current - lastEmailTimeRef.current;
      if (timeSinceLastEmail > emailEvery + Math.random() * 3000) { // 7-10 seconds interval
        // Randomly select an email to add (prioritize non-urgent for regular additions)
        const nonUrgentEmails = filteredAvailableEmails.filter(email => !email.isUrgent);
        
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
          if (filteredAvailableEmails.length === 0) {
            const allEmails = getAllEmails().map(email => ({
              ...email,
              content: email.content.replace(/GlobalTech Innovations/g, companyContext.name)
            }));
            // Remove new_1 id from available emails
            setAvailableEmails(allEmails.filter(email => email.id !== 'new_1'));
          }
          
          // Update last email time
          lastEmailTimeRef.current = gameTimeRef.current;
        }
      }
      
      // Occasionally add an urgent email (about every 30-45 seconds)
      // Only add a new urgent if there isn't already one in progress
      const nbCurrentUrgentEmails = Object.keys(urgentTimersRef.current).length;
      if (Math.random() < 0.005 && gameTimeRef.current > firstUrgentEmailTime && nbCurrentUrgentEmails < 1) { // 0.3% chance per 100ms = approx every 33 seconds
        const urgentEmails = filteredAvailableEmails.filter(email => email.isUrgent);
        
        if (urgentEmails.length > 0) {
          const randomIndex = Math.floor(Math.random() * urgentEmails.length);
          const urgentEmail = urgentEmails[randomIndex];
          
          // Add to inbox
          setInbox(prev => [...prev, urgentEmail]);
          
          // Play notification sound
          playUrgentEmailNotification();
          
          // Remove from available pool
          setAvailableEmails(prev => prev.filter(e => e.id !== urgentEmail.id));
          
          // Start the timer for this urgent email
          startUrgentTimer(urgentEmail.id);
        }
      }
      
      // Check for victory after 3 minutes of successful play
      if (gameTimeRef.current >= totalGameTime) {
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
    
    // On mobile, hide the email list when an email is selected
    if (isMobile) {
      setShowEmailList(false);
    }
  };
  
  // Handle back button click on mobile
  const handleBackToInbox = () => {
    setShowEmailList(true);
  };
  
  // Check if a choice can be selected based on available resources
  const canSelectChoice = (choice: Choice): { canSelect: boolean; reason?: string } => {
    // Check if we have enough budget
    if (choice.outcome.budgetImpact < 0 && Math.abs(choice.outcome.budgetImpact) > cdoBudget) {
      return { canSelect: false, reason: 'Insufficient budget' };
    }
    
    // Check if data quality would drop below 0
    if (choice.outcome.dataQualityImpact < 0 && Math.abs(choice.outcome.dataQualityImpact) > dataQuality) {
      return { canSelect: false, reason: 'Insufficient data quality' };
    }
    
    // Check if reputation would drop below 0
    if (choice.outcome.reputationImpact < 0 && Math.abs(choice.outcome.reputationImpact) > reputation) {
      return { canSelect: false, reason: 'Insufficient reputation' };
    }
    
    return { canSelect: true };
  };

  // Format impact with color
  const formatImpactWithColor = (value: number, isPercentage: boolean = false): { text: string; color: string } => {
    if (value === 0) return { text: 'No change', color: '#5f6368' };
    
    const prefix = value > 0 ? '+' : '';
    const text = isPercentage ? `${prefix}${value}%` : `${prefix}${formatCurrency(value)}`;
    
    // Green for positive, secondary color for negative
    const color = value > 0 ? '#35adb6' : '#cf5628';
    
    return { text, color };
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
      const timerId = urgentTimers[selectedEmail.id];
      if(timerId) {
        clearTimeout(timerId);
        // Also update the ref
        const newTimers = {...urgentTimersRef.current};
        delete newTimers[selectedEmail.id];
        urgentTimersRef.current = newTimers;
      }
    }
    // Remove the email from inbox
    setInbox(prev => prev.filter(email => email.id !== selectedEmail.id));
    setShowEmailList(true);
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
    setShowEmailList(true);
    
    // Make sure music is playing when the game starts (or tracked as active if muted)
    playSound('mainMusic', true, 0.5);
  };
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <Container>
      {!audioReady && (
        <AudioMessage>
          Click anywhere to enable game sounds
        </AudioMessage>
      )}
      
      {reputation <= 20 && (
        <BudgetWarning>
          💡 Increase your reputation (⭐) to receive more budget!
        </BudgetWarning>
      )}
      <Header $isMobile={isMobile}>
        <StatusItem>
          <StatusLabel>💰 CDO Budget:</StatusLabel>
          <StatusValue $profit={companyProfit >= 0}>{formatCurrency(cdoBudget)}</StatusValue>
        </StatusItem>
        <StatusItem>
          <StatusLabel>📈 Company Profit:</StatusLabel>
          <StatusValue $profit={companyProfit >= 0}>{formatCurrency(companyProfit)}</StatusValue>
        </StatusItem>
        <MetricItem>
          <StatusLabel>⏱️ Time Remaining:</StatusLabel>
          <TimeDisplay $gameStarted={gameStarted}>{gameStarted ? formatTime(remainingTime) : "--:--"}</TimeDisplay>
        </MetricItem>
        <MetricItem>
          <MetricLabel>📊 Data Quality:</MetricLabel>
          <ProgressContainer>
            <ProgressBar value={dataQuality} max={100} color="#35adb6" />
            <ProgressValue>{dataQuality}%</ProgressValue>
          </ProgressContainer>
        </MetricItem>
        <MetricItem>
          <MetricLabel>⭐ Reputation:</MetricLabel>
          <ProgressContainer>
            <ProgressBar value={reputation} max={100} color="#f3ad41" />
            <ProgressValue>{reputation}%</ProgressValue>
          </ProgressContainer>
        </MetricItem>
        <MusicButton onClick={toggleMusic} aria-label={isMusicMuted ? "Unmute music" : "Mute music"}>
          {isMusicMuted ? '🔇' : '🔊'}
        </MusicButton>
      </Header>
      
      <ContentContainer>
        <InboxPanel $isMobile={isMobile} $showEmailList={showEmailList}>
          <InboxHeader>
            {inbox.length < maxEmails - 3 && <InboxTitle>Inbox ({inbox.length}/{maxEmails})</InboxTitle>}
            {inbox.length >= maxEmails - 3 && <InboxTitle style={{ color: '#cf5628' }}>Inbox ({inbox.length}/{maxEmails})</InboxTitle>}
            <InboxSubtitle>Most recent first</InboxSubtitle>
          </InboxHeader>
          
          <EmailList>
            {inbox.length === 0 ? (
              <NoEmails>Your inbox is empty. Great job!</NoEmails>
            ) : (
              inbox.slice().reverse().map(email => (
                <EmailItem 
                  key={email.id} 
                  $isSelected={selectedEmail?.id === email.id}
                  $isUrgent={email.isUrgent}
                  $isCurrentUrgent={email.isUrgent && getTimeRemaining(email.id) <= 5}
                  onClick={() => handleEmailSelect(email)}
                >
                  {email.isUrgent && (
                    <UrgentIndicator>
                      <UrgentTimer>{getTimeRemaining(email.id)}s</UrgentTimer>
                    </UrgentIndicator>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <EmailTitle>{email.title}</EmailTitle>
                    <EmailCategory $category={email.category}>
                      {email.category}
                    </EmailCategory>
                  </div>
                  <EmailSender>{email.sender}</EmailSender>
                  <EmailPreview>{getEmailPreview(email.content)}</EmailPreview>
                </EmailItem>
              ))
            )}
          </EmailList>
        </InboxPanel>
        
        <MainPanel $isMobile={isMobile} $showEmailList={showEmailList}>
          {selectedEmail ? (
            <>
              <EmailHeader>
                {isMobile && (
                  <BackButton onClick={handleBackToInbox}>
                    ← Back to Inbox
                  </BackButton>
                )}
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
              
              {!outcomeMessage && <EmailContent>
                {selectedEmail.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </EmailContent>}
              
              {!outcomeMessage ? (
                <ResponseOptions>
                  <ResponseTitle>Your Response:</ResponseTitle>
                  {selectedEmail.choices.map(choice => {
                    const { canSelect, reason } = canSelectChoice(choice);
                    return (
                      <ResponseButton 
                        key={choice.id}
                        onClick={() => canSelect && handleChoiceSelect(choice)}
                        disabled={!canSelect}
                        $isDisabled={!canSelect}
                      >
                        <ResponseButtonContent>
                          <div>{choice.text}</div>
                          <ResponseImpacts>
                            {choice.outcome.budgetImpact !== 0 && (
                              <ResponseImpact 
                                color={formatImpactWithColor(choice.outcome.budgetImpact).color}
                                $isUnavailable={!canSelect && choice.outcome.budgetImpact < 0 && Math.abs(choice.outcome.budgetImpact) > cdoBudget}
                              >
                                💰 {formatImpactWithColor(choice.outcome.budgetImpact).text}
                              </ResponseImpact>
                            )}
                            
                            {choice.outcome.profitImpact !== 0 && (
                              <ResponseImpact color={formatImpactWithColor(choice.outcome.profitImpact).color}>
                                📈 {formatImpactWithColor(choice.outcome.profitImpact).text}
                              </ResponseImpact>
                            )}
                            
                            {choice.outcome.dataQualityImpact !== 0 && (
                              <ResponseImpact 
                                color={formatImpactWithColor(choice.outcome.dataQualityImpact, true).color}
                                $isUnavailable={!canSelect && choice.outcome.dataQualityImpact < 0 && Math.abs(choice.outcome.dataQualityImpact) > dataQuality}
                              >
                                📊 {formatImpactWithColor(choice.outcome.dataQualityImpact, true).text}
                              </ResponseImpact>
                            )}
                            
                            {choice.outcome.reputationImpact !== 0 && (
                              <ResponseImpact 
                                color={formatImpactWithColor(choice.outcome.reputationImpact, true).color}
                                $isUnavailable={!canSelect && choice.outcome.reputationImpact < 0 && Math.abs(choice.outcome.reputationImpact) > reputation}
                              >
                                ⭐ {formatImpactWithColor(choice.outcome.reputationImpact, true).text}
                              </ResponseImpact>
                            )}
                          </ResponseImpacts>
                        </ResponseButtonContent>
                        {!canSelect && <UnavailableReason>{reason}</UnavailableReason>}
                      </ResponseButton>
                    );
                  })}
                </ResponseOptions>
              ) : (
                <OutcomeContainer>
                  <OutcomeMessage>{outcomeMessage}</OutcomeMessage>
                  
                  {outcomeEffects && (
                    <ImpactContainer>
                      <Impact>
                        <ImpactLabel>💰 Budget:</ImpactLabel>
                        <ImpactValue color={getImpactColor(outcomeEffects.budgetImpact)}>
                          {formatImpact(outcomeEffects.budgetImpact)}
                        </ImpactValue>
                      </Impact>
                      
                      <Impact>
                        <ImpactLabel>📈 Profit:</ImpactLabel>
                        <ImpactValue color={getImpactColor(outcomeEffects.profitImpact)}>
                          {formatImpact(outcomeEffects.profitImpact)}
                        </ImpactValue>
                      </Impact>
                      
                      <Impact>
                        <ImpactLabel>📊 Data Quality:</ImpactLabel>
                        <ImpactValue color={getImpactColor(outcomeEffects.dataQualityImpact)}>
                          {formatImpact(outcomeEffects.dataQualityImpact, true)}
                        </ImpactValue>
                      </Impact>
                      
                      <Impact>
                        <ImpactLabel>⭐ Reputation:</ImpactLabel>
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
            <EmptySelection>
              <EmptyIcon>📧</EmptyIcon>
              <EmptyMessage>Select an email from your inbox to respond</EmptyMessage>
              <EmptyWarning style={{ border: '2px solid #cf5628', borderRadius: '8px', padding: '30px' }}>
                <strong>⚠️ IMPORTANT ⚠️</strong><br />
                • Your goal is to maximize the profit (📈) of the company<br />
                • You need a good reputation (⭐) to get more budget<br />
                • You need good data quality (📊) to avoid urgent emails<br />
                • You can wait to answer to non-urgent emails so that you can make the best decision<br />
                • If your inbox has more than 7 unanswered emails, you'll be burnout !
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
  
  @media (max-width: 768px) {
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }
`;

interface HeaderProps {
  $isMobile: boolean;
}

const Header = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #dadce0;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
  }
  
  ${props => props.$isMobile && `
    & > div {
      flex: 1 0 45%;
      min-width: auto;
      margin-bottom: 8px;
    }
  `}
`;

const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  
  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const StatusLabel = styled.div`
  font-size: 12px;
  color: #5f6368;
  margin-bottom: 4px;
`;

interface StatusValueProps {
  $profit?: boolean;
}

const StatusValue = styled.div<StatusValueProps>`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.$profit !== undefined ? (props.$profit ? 'green' : 'red') : '#202124'};
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
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
  
  @media (max-width: 768px) {
    position: relative;
  }
`;

interface InboxPanelProps {
  $isMobile: boolean;
  $showEmailList: boolean;
}

const InboxPanel = styled.div<InboxPanelProps>`
  width: 350px;
  border-right: 1px solid #dadce0;
  display: flex;
  flex-direction: column;
  background: #f1f3f4;
  
  @media (max-width: 768px) {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1;
    display: ${props => props.$isMobile && !props.$showEmailList ? 'none' : 'flex'};
  }
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
  $isSelected: boolean;
  $isUrgent: boolean;
  $isCurrentUrgent?: boolean;
}

const EmailItem = styled.div<EmailItemProps>`
  padding: 12px 15px;
  background: ${props => props.$isSelected ? '#e8f7f8' : 'white'};
  border-left: ${props => props.$isUrgent ? '4px solid #cf5628' : '4px solid transparent'};
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  ${props => props.$isUrgent && `
    animation: urgentPulse 1s infinite alternate;
  `}
  
  ${props => props.$isCurrentUrgent && `
    animation: vibrate 0.3s infinite;
  `}
  
  &:hover {
    background: ${props => props.$isSelected ? '#e8f7f8' : '#f5f5f5'};
  }
  
  @keyframes urgentPulse {
    from {
      box-shadow: 0 0 0 0 rgba(207, 86, 40, 0.4);
    }
    to {
      box-shadow: 0 0 0 8px rgba(207, 86, 40, 0);
    }
  }
  
  @keyframes vibrate {
    0% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    50% { transform: translateX(0); }
    75% { transform: translateX(2px); }
    100% { transform: translateX(0); }
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

interface MainPanelProps {
  $isMobile: boolean;
  $showEmailList: boolean;
}

const MainPanel = styled.div<MainPanelProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${props => props.$isMobile && !props.$showEmailList ? '2' : '0'};
    display: ${props => props.$isMobile && props.$showEmailList ? 'none' : 'flex'};
  }
`;

const EmailHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #dadce0;
  position: relative;
  
  @media (max-width: 768px) {
    padding-top: 50px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #35adb6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  &:hover {
    background: #2d9198;
  }
`;

const EmailSubject = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #202124;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    font-size: 18px;
    flex-direction: column;
    align-items: flex-start;
  }
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
  
  @media (max-width: 768px) {
    font-size: 12px;
    align-self: flex-start;
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
  
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const ResponseOptions = styled.div`
  padding: 20px;
  border-top: 1px solid #dadce0;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ResponseTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #202124;
  margin-bottom: 15px;
`;

interface ResponseButtonProps {
  $isDisabled?: boolean;
}

const ResponseButton = styled.button<ResponseButtonProps>`
  width: 100%;
  padding: 12px 15px;
  background: ${props => props.$isDisabled ? '#f1f1f1' : '#f8f9fa'};
  border: 1px solid ${props => props.$isDisabled ? '#dadce0' : '#dadce0'};
  border-radius: 8px;
  font-size: 14px;
  text-align: left;
  color: ${props => props.$isDisabled ? '#9aa0a6' : '#202124'};
  margin-bottom: 10px;
  cursor: ${props => props.$isDisabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isDisabled ? 0.8 : 1};
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$isDisabled ? '#f1f1f1' : '#e8f7f8'};
    border-color: ${props => props.$isDisabled ? '#dadce0' : '#35adb6'};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ResponseButtonContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResponseImpacts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

interface ResponseImpactProps {
  color: string;
  $isUnavailable?: boolean;
}

const ResponseImpact = styled.span<ResponseImpactProps>`
  color: ${props => props.$isUnavailable ? '#cf0000' : props.color};
  font-weight: ${props => props.$isUnavailable ? 'bold' : 'normal'};
  font-size: 13px;
  background: ${props => props.$isUnavailable ? 'rgba(207, 0, 0, 0.1)' : 'transparent'};
  padding: ${props => props.$isUnavailable ? '2px 4px' : '0'};
  border-radius: 4px;
`;

const UnavailableReason = styled.div`
  color: #cf0000;
  font-size: 12px;
  margin-top: 5px;
  font-weight: bold;
`;

const OutcomeContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #dadce0;
  background: #f8f9fa;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const OutcomeMessage = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #202124;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
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
  
  @media (max-width: 768px) {
    padding: 15px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const EmptyWarning = styled.div`
  font-size: 14px;
  color: #cf5628;
  line-height: 1.5;
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 15px !important;
  }
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
  
  @media (max-width: 768px) {
    order: -1;
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
`;

const TimeDisplay = styled.div<{$gameStarted: boolean}>`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.$gameStarted && props.children === '0:00' ? '#cf5628' : '#3c4043'};
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const EmailCategory = styled.span<{ $category: string }>`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
  background: ${props => {
    switch (props.$category.toLowerCase()) {
      case 'budget': return '#f3ad41';    // Orange
      case 'databreach': return '#cf5628'; // Red
      case 'dataquality': return '#35adb6'; // Same blue as the indicator
      case 'gdpr': return '#7c4dff';      // Purple
      case 'hr': return '#43a047';        // Green
      case 'misc': return '#607d8b';      // Blue Grey
      default: return '#5f6368';
    }
  }};
  color: white;
  text-transform: uppercase;
  font-weight: 500;
`;

const BudgetWarning = styled.div`
  background-color: #cf5628;
  color: white;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const AudioMessage = styled.div`
  background: rgba(53, 173, 182, 0.1);
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  color: #35adb6;
  font-size: 14px;
  width: 100%;
  border: 1px solid #35adb6;
  z-index: 10;
`;

export default GameScreen; 