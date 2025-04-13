import React from 'react';
import styled from 'styled-components';

interface GameStartProps {
  onStart: () => void;
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

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const GameStart: React.FC<GameStartProps> = ({ onStart, companyContext }) => {
  return (
    <Container>
      <Title>Governopoly</Title>
      <Subtitle>The Data Governance Challenge</Subtitle>
      
      <Description>
        Welcome to Governopoly, where you'll take on the role of the Chief Data Officer (CDO) 
        of {companyContext.name}, a leading company in the {companyContext.industry} industry. 
        Your decisions over the next year will impact the company's data governance, security, 
        compliance, and ultimately its bottom line.
      </Description>
      
      <CompanyCard>
        <CompanyHeader>
          <CompanyLogo>{companyContext.name.charAt(0)}</CompanyLogo>
          <CompanyName>{companyContext.name}</CompanyName>
        </CompanyHeader>
        
        <CompanyDescription>
          {companyContext.description}
        </CompanyDescription>
        
        <CompanyStats>
          <StatItem>
            <StatLabel>Industry</StatLabel>
            <StatValue>{companyContext.industry}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Founded</StatLabel>
            <StatValue>{companyContext.founded}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Headquarters</StatLabel>
            <StatValue>{companyContext.headquarters}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Employees</StatLabel>
            <StatValue>{formatNumber(companyContext.employees)}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Annual Revenue</StatLabel>
            <StatValue>{companyContext.revenue}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Data Team Size</StatLabel>
            <StatValue>{companyContext.dataTeamSize} people</StatValue>
          </StatItem>
        </CompanyStats>
      </CompanyCard>
      
      <Description>
        As CDO, you'll face real-world challenges around data privacy, management, 
        security breaches, compliance regulations, and stakeholder management across
        {companyContext.employees} employees. Every decision counts!
      </Description>
      
      <YourRole>
        <RoleTitle>Your Role as Chief Data Officer</RoleTitle>
        <RoleDescription>
          You've just been appointed as the CDO of {companyContext.name}. The board has high 
          expectations for how you'll transform the organization's data practices. You'll 
          need to balance technical considerations with business needs, manage a team of 
          {companyContext.dataTeamSize} data professionals, and navigate complex stakeholder 
          relationships.
        </RoleDescription>
      </YourRole>
      
      <StartButton onClick={onStart}>
        Start Your CDO Journey
      </StartButton>
      
      <Rules>
        <h3>Game Rules:</h3>
        <ul>
          <li>You start with $1,000,000 in CDO budget allocation</li>
          <li>Each decision affects your CDO budget, company profit, data quality, and reputation</li>
          <li>The game lasts for 12 months (turns)</li>
          <li>Your goal is to maximize company profit by the end of the year</li>
          <li>If your data quality, reputation, or budget reaches zero, you'll be fired</li>
          <li>Poor decisions can result in regulatory fines, PR disasters, or inefficiencies</li>
        </ul>
      </Rules>
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

const Title = styled.h1`
  font-size: 48px;
  color: #35adb6;
  margin-bottom: 8px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: #5f6368;
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 20px;
  color: #3c4043;
`;

const CompanyCard = styled.div`
  width: 100%;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
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

const CompanyName = styled.h3`
  font-size: 24px;
  color: #3c4043;
  margin: 0;
`;

const CompanyDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #5f6368;
  margin-bottom: 20px;
`;

const CompanyStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const StatItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #5f6368;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #3c4043;
`;

const YourRole = styled.div`
  width: 100%;
  background: #e8f7f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid #35adb6;
`;

const RoleTitle = styled.h3`
  font-size: 20px;
  color: #35adb6;
  margin-top: 0;
  margin-bottom: 10px;
`;

const RoleDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #3c4043;
  margin: 0;
`;

const StartButton = styled.button`
  background: #35adb6;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 30px 0;
  transition: background 0.2s;
  
  &:hover {
    background: #2d9198;
  }
`;

const Rules = styled.div`
  width: 100%;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  
  h3 {
    color: #35adb6;
    margin-top: 0;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 10px;
      color: #3c4043;
    }
  }
`;

export default GameStart; 