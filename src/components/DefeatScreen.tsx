import React, { useState, FC, ReactElement } from 'react';
import styled from 'styled-components';
import { DefeatReason } from '../App';
import { leaderboardService } from '../services/LeaderboardService';

interface DefeatScreenProps {
  reason: DefeatReason;
  stats: {
    cdoBudget: number;
    companyProfit: number;
    dataQuality: number;
    reputation: number;
  };
  onRestart: () => void;
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

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

const getReason = (reason: DefeatScreenProps['reason']): { title: string; description: string } => {
  switch (reason) {
    case 'budget':
      return {
        title: "Budget Crisis!",
        description: "Your CDO budget has been depleted. Without resources to implement data governance initiatives, the board has decided to restructure the data organization and has terminated your position.",
        
      };
    case 'dataQuality':
      return {
        title: "Data Quality Disaster!",
        description: "Data quality has deteriorated to critical levels. Faulty data has led to major business decisions that cost the company millions. The CEO has asked for your resignation.",
        
      };
    case 'reputation':
      return {
        title: "Reputation Ruined!",
        description: "Your data practices have damaged the company's reputation beyond repair. Public trust has eroded, and the board has decided a new leadership approach is needed for data governance.",
        
      };
    case 'burnout':
      return {
        title: "Email Overload!",
        description: "Your inbox has become unmanageable with too many pending requests. The stress and inability to keep up has led to burnout. Your doctor has ordered you to take an extended leave of absence.",
       
      };
    case 'dataBreach':
      return {
        title: "Data Breach Crisis!",
        description: "You failed to respond to an urgent data breach in time. The incident has escalated, resulting in massive data exposure and regulatory penalties. The board has asked for your immediate resignation.",
        
      };
    default:
      return {
        title: "Game Over",
        description: "Your tenure as CDO has come to an end.",
        
      };
  }
};

const createShareText = (stats: DefeatScreenProps['stats'], reason: string, companyContext: DefeatScreenProps['companyContext']): string => {
  const monthsSurvived = Math.floor(Math.random() * 11) + 1; // Simulate random months survived
  
  return `I just got fired as CDO of ${companyContext.name} after ${monthsSurvived} months! My leadership led to a ${reason} crisis. Think you can do better? Play at www.whoisthebestcdo.com #DataGovernance #BusinessGame`;
};

const DefeatScreen: FC<DefeatScreenProps> = ({ reason, stats, onRestart, companyContext }): ReactElement => {
  const reasonData = getReason(reason);
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  
  const handleShare = () => {
    const shareText = createShareText(stats, reason, companyContext);
    
    // LinkedIn pre-populated sharing URL (current format as of 2023-2024)
    const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive&mini=true&text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://www.whoisthebestcdo.com')}`;
    
    // Open LinkedIn in a new tab
    window.open(linkedInShareUrl, '_blank');
  };
  
  // Handle submitting score to leaderboard
  const handleSubmitScore = async () => {
    if (!playerName.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare the score data
      const scoreData = {
        playerName: playerName.trim(),
        companyProfit: stats.companyProfit,
        cdoBudget: stats.cdoBudget,
        dataQuality: stats.dataQuality,
        reputation: stats.reputation,
        company: companyContext.name,
        defeat: reason,
        timestamp: new Date().toISOString()
      };
      
      // Use the leaderboardService to submit the score
      const success = await leaderboardService.submitScore(scoreData);
      
      if (success) {
        console.log('Score submitted successfully');
        setIsSubmitted(true);
        await fetchLeaderboard();
      } else {
        console.error('Failed to submit score');
      }
    } catch (error) {
      console.error('Error submitting score:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    setLeaderboardLoading(true);
    
    try {
      // Use the leaderboardService to fetch the leaderboard
      const data = await leaderboardService.getLeaderboard(10);
      setLeaderboardData(data);
      setShowLeaderboard(true);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  };
  
  return (
    <Container>
      
      <ReasonTitle>{reasonData.title}</ReasonTitle>
      <ReasonDescription>{reasonData.description}</ReasonDescription>
      
      <StatsContainer>
        <StatsTitle>Final Statistics</StatsTitle>
        
        <StatItem>
          <StatLabel>CDO Budget:</StatLabel>
          <StatValue>{formatCurrency(stats.cdoBudget)}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Company Profit:</StatLabel>
          <StatValue profit={stats.companyProfit >= 0}>{formatCurrency(stats.companyProfit)}</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Data Quality:</StatLabel>
          <StatValue>{stats.dataQuality}%</StatValue>
        </StatItem>
        
        <StatItem>
          <StatLabel>Reputation:</StatLabel>
          <StatValue>{stats.reputation}%</StatValue>
        </StatItem>
      </StatsContainer>
      
      {!isSubmitted && !showLeaderboard && (
        <LeaderboardSubmission>
          <LeaderboardTitle>Submit Your Score</LeaderboardTitle>
          <NameInput 
            type="text" 
            placeholder="Enter your name" 
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
          />
          <SubmitButton 
            onClick={handleSubmitScore} 
            disabled={isSubmitting || !playerName.trim()}
          >
            {isSubmitting ? 'Submitting...' : 'Submit to Leaderboard'}
          </SubmitButton>
          <ViewButton onClick={fetchLeaderboard}>
            View Leaderboard
          </ViewButton>
        </LeaderboardSubmission>
      )}
      
      {showLeaderboard && (
        <LeaderboardContainer>
          <LeaderboardTitle>CDO Leaderboard</LeaderboardTitle>
          {leaderboardLoading ? (
            <LoadingMessage>Loading leaderboard...</LoadingMessage>
          ) : (
            <LeaderboardTable>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Profit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.playerName}</td>
                    <td>{entry.company}</td>
                    <td>{formatCurrency(entry.companyProfit)}</td>
                    <td>{entry.defeat ? `Defeated (${entry.defeat})` : 'Survived'}</td>
                  </tr>
                ))}
                {leaderboardData.length === 0 && (
                  <tr>
                    <td colSpan={5}>No scores submitted yet. Be the first!</td>
                  </tr>
                )}
              </tbody>
            </LeaderboardTable>
          )}
          <CloseButton onClick={() => setShowLeaderboard(false)}>
            Close Leaderboard
          </CloseButton>
        </LeaderboardContainer>
      )}
      
      <ButtonContainer>
        <ShareButton onClick={handleShare}>
          Share on LinkedIn
        </ShareButton>
        
        <RestartButton onClick={onRestart}>
          Try Again
        </RestartButton>
      </ButtonContainer>
      
      <FooterText>
        Remember, being a CDO is challenging! Data governance requires balancing technical excellence, business value, and risk management.
      </FooterText>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
`;

const ReasonImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReasonImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ReasonTitle = styled.h1`
  font-size: 28px;
  color: #cf5628;
  margin: 0 0 20px 0;
`;

const ReasonDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #3c4043;
  margin-bottom: 30px;
`;

const StatsContainer = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
`;

const StatsTitle = styled.h2`
  font-size: 20px;
  color: #35adb6;
  margin: 0 0 15px 0;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dadce0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: #5f6368;
`;

interface StatValueProps {
  profit?: boolean;
}

const StatValue = styled.div<StatValueProps>`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.profit === false ? '#cf5628' : '#3c4043'};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
`;

const ShareButton = styled.button`
  background: #f3ad41;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 160px;
  
  &:hover {
    background: #e09c24;
  }
`;

const RestartButton = styled.button`
  background: #35adb6;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 160px;
  
  &:hover {
    background: #2d9198;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #5f6368;
`;

const LeaderboardSubmission = styled.div`
  width: 100%;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
`;

const LeaderboardTitle = styled.h3`
  font-size: 20px;
  color: #35adb6;
  margin-bottom: 15px;
`;

const NameInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 15px;
  
  &:focus {
    border-color: #35adb6;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: #35adb6;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 10px;
  
  &:hover {
    background: #2d9198;
  }
  
  &:disabled {
    background: #9aa0a6;
    cursor: not-allowed;
  }
`;

const ViewButton = styled.button`
  background: #f3ad41;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #e09c24;
  }
`;

const LeaderboardContainer = styled.div`
  width: 100%;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #dadce0;
  }
  
  th {
    font-weight: 600;
    color: #5f6368;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:nth-child(even) {
    background-color: rgba(53, 173, 182, 0.05);
  }
`;

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #5f6368;
`;

const CloseButton = styled.button`
  background: none;
  border: 1px solid #dadce0;
  border-radius: 4px;
  color: #5f6368;
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e8f7f8;
    border-color: #35adb6;
    color: #35adb6;
  }
`;

export default DefeatScreen; 