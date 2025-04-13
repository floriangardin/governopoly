import React from 'react';
import styled from 'styled-components';

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
  if (companyProfit >= 15000000) {
    return {
      title: "Outstanding CDO Performance!",
      message: `You have masterfully balanced data governance with business needs at ${company.name}. The board is impressed with your strategic vision and leadership. You've set the gold standard for data governance in the ${company.industry} industry!`
    };
  } else if (companyProfit >= 10000000) {
    return {
      title: "Excellent Job!",
      message: `You have significantly improved ${company.name}'s data practices while maintaining profitability. Your strategic decisions have paid off, making you one of the most respected CDOs in the ${company.industry} sector!`
    };
  } else if (companyProfit >= 6000000) {
    return {
      title: "Solid Performance",
      message: `You've managed to navigate the challenges of data governance while keeping ${company.name} profitable. There's room for improvement, but you've laid a good foundation for future growth.`
    };
  } else if (companyProfit >= 3000000) {
    return {
      title: "Average Results",
      message: `You've faced the challenges of data governance with mixed results. ${company.name} is stable, but stakeholders expected more progress in data initiatives given our position in the ${company.industry} market.`
    };
  } else if (companyProfit >= 1000000) {
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
  
  if (stats.companyProfit >= 10000000) {
    return `I just completed a year as CDO of ${companyContext.name} in Governopoly with an impressive company profit of $${profitInMillions}M! My data leadership skills are top-notch! Try to beat my score at www.governopoly.io #DataGovernance #Governopoly`;
  } else if (stats.companyProfit >= 5000000) {
    return `I led ${companyContext.name} to a solid $${profitInMillions}M profit as CDO in Governopoly! Data governance is challenging but rewarding. See if you can do better at www.governopoly.io #DataGovernance #Governopoly`;
  } else {
    return `I survived a year as CDO at ${companyContext.name} in Governopoly with $${profitInMillions}M in company profit. Data leadership is tough! Try your hand at www.governopoly.io #DataGovernance #Governopoly`;
  }
};

const GameOver: React.FC<GameOverProps> = ({ stats, onRestart, companyContext }) => {
  const feedback = getFeedback(stats.cdoBudget, stats.companyProfit, companyContext);
  
  const handleShare = () => {
    const shareText = createShareText(stats, companyContext);
    
    // Try to use navigator.clipboard if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('LinkedIn post copied to clipboard! You can now paste it into LinkedIn.');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          alert('Could not copy automatically. Please copy the text manually:\n\n' + shareText);
        });
    } else {
      // Fallback
      alert('Please copy this text to share on LinkedIn:\n\n' + shareText);
    }
  };
  
  return (
    <Container>
      <VictoryImageContainer>
        <VictoryImage src="/win.png" alt="Victory" />
      </VictoryImageContainer>
      <Title>Year End Results</Title>
      
      <ScoreCard>
        <CompanyLogoImage src="/logo.png" alt={`${companyContext.name} logo`} />
        <CompanyName>{companyContext.name}</CompanyName>
        
        <ScoreGrid>
          <ScoreItem>
            <ScoreLabel>Company Profit</ScoreLabel>
            <ProfitValue>{formatCurrency(stats.companyProfit)}</ProfitValue>
          </ScoreItem>
          <ScoreItem>
            <ScoreLabel>CDO Budget Remaining</ScoreLabel>
            <BudgetValue>{formatCurrency(stats.cdoBudget)}</BudgetValue>
          </ScoreItem>
        </ScoreGrid>
        
        <MetricsGrid>
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
      
      <LessonsSection>
        <h3>Key Data Governance Lessons:</h3>
        <ul>
          <li>Data governance requires balancing compliance, innovation, and operational efficiency</li>
          <li>Proactive data management prevents costly incidents and builds trust</li>
          <li>Stakeholder engagement is crucial for successful data initiatives</li>
          <li>Data quality directly impacts business decisions and outcomes</li>
          <li>A strong data culture must be nurtured across the organization</li>
        </ul>
      </LessonsSection>
      
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
`;

const BudgetValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #35adb6;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
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
`;

export default GameOver; 