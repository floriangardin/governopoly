import React, { useState } from 'react';
import styled from 'styled-components';
import { leaderboardService } from '../services/LeaderboardService';

interface GameOverProps {
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

const getFeedback = (cdoBudget: number, companyProfit: number, company: GameOverProps['companyContext']): { title: string; message: string } => {
  if (companyProfit >= 2000000) {
    return {
      title: "Outstanding CDO Performance!",
      message: `You have masterfully balanced data governance with business needs at ${company.name}. The board is impressed with your strategic vision and leadership. You've set the gold standard for data governance in the ${company.industry} industry!`
    };
  } else if (companyProfit >= 1000000) {
    return {
      title: "Excellent Job!",
      message: `You have significantly improved ${company.name}'s data practices while maintaining profitability. Your strategic decisions have paid off, making you one of the most respected CDOs in the ${company.industry} sector!`
    };
  } else if (companyProfit >= 800000) {
    return {
      title: "Solid Performance",
      message: `You've managed to navigate the challenges of data governance while keeping ${company.name} profitable. There's room for improvement, but you've laid a good foundation for future growth.`
    };
  } else if (companyProfit >= 400000) {
    return {
      title: "Average Results",
      message: `You've faced the challenges of data governance with mixed results. ${company.name} is stable, but stakeholders expected more progress in data initiatives given our position in the ${company.industry} market.`
    };
  } else if (companyProfit >= 200000) {
    return {
      title: "Challenging Year",
      message: `${company.name} struggled under your data leadership. While you avoided complete disaster, there were significant missteps in your data strategy that hindered our competitive position.`
    };
  } else {
    return {
      title: "Difficult Times",
      message: `Your tenure as CDO has been rocky at best. ${company.name} has lost significant value due to poor data governance decisions. The board is considering restructuring the data department to better support our ${company.employees} employees.`
    };
  }
};

const createShareText = (stats: GameOverProps['stats'], companyContext: GameOverProps['companyContext']): string => {
  const profitInMillions = (stats.companyProfit / 1000000).toFixed(1);
  
  if (stats.companyProfit >= 2000000) {
    return `I just completed a year as CDO with an impressive company profit of $${profitInMillions}M! My data leadership skills are top-notch! Try to beat my score at www.whoisthebestcdo.com #DataGovernance #BusinessGame`;
  } else if (stats.companyProfit >= 1000000) {
    return `I led ${companyContext.name} to a solid $${profitInMillions}M profit as CDO! Data governance is challenging but rewarding. See if you can do better at www.whoisthebestcdo.com #DataGovernance #BusinessGame`;
  } else {
    return `I survived a year as CDO with $${profitInMillions}M in company profit. Data leadership is tough! Try your chance at www.whoisthebestcdo.com #DataGovernance #BusinessGame`;
  }
};

const GameOver: React.FC<GameOverProps> = ({ stats, onRestart, companyContext }) => {
  const feedback = getFeedback(stats.cdoBudget, stats.companyProfit, companyContext);
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  
  // Handle sharing on LinkedIn
  const handleShare = () => {
    const shareText = createShareText(stats, companyContext);
    
    // Create LinkedIn sharing URL with the most current format
    const websiteUrl = 'https://www.whoisthebestcdo.com';
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(websiteUrl);
    
    // LinkedIn pre-populated sharing URL (current format as of 2023-2024)
    const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive&mini=true&text=${encodedText}&url=${encodedUrl}`;
    
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
      <Title>Year End Results</Title>
      
      <ScoreCard>
        <CompanyLogoImage src="/og-no-text.png" alt={`${companyContext.name} logo`} />
        <CompanyName>Time for review :</CompanyName>
        
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <ScoreItem style={{ width: '100%' }}>
            <ScoreLabel>Company Profit</ScoreLabel>
            <ProfitValue style={{ fontSize: '36px' }}>{formatCurrency(stats.companyProfit)}</ProfitValue>
          </ScoreItem>
        </div>
        
        <MetricsGrid>
          <MetricItem>
            <MetricLabel>CDO Budget Remaining</MetricLabel>
            <MetricValue quality={100}>{formatCurrency(stats.cdoBudget)}</MetricValue>
          </MetricItem>
          <MetricItem>
            <MetricLabel>Data Quality</MetricLabel>
            <MetricValue quality={stats.dataQuality}>{stats.dataQuality}%</MetricValue>
          </MetricItem>
          <MetricItem>
            <MetricLabel>Reputation</MetricLabel>
            <MetricValue quality={stats.reputation}>{stats.reputation}%</MetricValue>
          </MetricItem>
        </MetricsGrid>
        
        <PerformanceTitle>{feedback.title}</PerformanceTitle>
        <PerformanceMessage>{feedback.message}</PerformanceMessage>
      </ScoreCard>
      
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

      {isSubmitted && !showLeaderboard && (
        <LeaderboardSubmission>
          
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
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.playerName}</td>
                    <td>{formatCurrency(entry.companyProfit)}</td>
                  </tr>
                ))}
                {leaderboardData.length === 0 && (
                  <tr>
                    <td colSpan={4}>No scores submitted yet. Be the first!</td>
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
          Play Again
        </RestartButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const VictoryImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VictoryImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #35adb6;
  margin-bottom: 30px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

const ScoreCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #e8f7f8, #d2eef0);
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  background-color: #35adb6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
`;

const CompanyName = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #3c4043;
  margin-bottom: 25px;
`;

const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const ScoreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const CompanyLogoImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ScoreLabel = styled.div`
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 8px;
`;

const ProfitValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #35adb6;
  
  @media (max-width: 768px) {
    font-size: 24px;
    
    &[style*="36px"] {
      font-size: 28px !important;
    }
  }
`;

const BudgetValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #35adb6;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetricItem = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 5px;
`;

interface MetricValueProps {
  quality: number;
}

const MetricValue = styled.div<MetricValueProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${props => {
    if (props.quality >= 75) return '#35adb6';
    if (props.quality >= 40) return '#f3ad41';
    return '#cf5628';
  }};
`;

const PerformanceTitle = styled.h3`
  font-size: 22px;
  color: #35adb6;
  margin-bottom: 10px;
  text-align: center;
`;

const PerformanceMessage = styled.p`
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  color: #3c4043;
`;

const LessonsSection = styled.div`
  width: 100%;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  
  h3 {
    color: #35adb6;
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 10px;
      color: #3c4043;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const RestartButton = styled.button`
  background: #35adb6;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #2d9198;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 15px;
  }
`;

const ShareButton = styled.button`
  background: #f3ad41;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #e09c24;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 15px;
  }
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
  
  @media (max-width: 768px) {
    width: calc(50% - 5px);
    margin-right: 5px;
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
  
  @media (max-width: 768px) {
    width: calc(50% - 5px);
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
  
  @media (max-width: 768px) {
    font-size: 14px;
    
    th, td {
      padding: 8px 5px;
    }
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

export default GameOver; 