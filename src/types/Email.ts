export interface Email {
  id: string;
  sender: string;
  title: string;
  content: string;
  category: 'dataBreach' | 'dataQuality' | 'hr' | 'strategy' | 'gdpr' | 'misc' | 'budget';
  isUrgent: boolean;
  choices: Choice[];
  maximumDataQuality: number;
  minimumReputation: number;
  
}

export interface Choice {
  id: number;
  text: string;
  outcome: {
    description: string;
    budgetImpact: number;
    profitImpact: number;
    dataQualityImpact: number;
    reputationImpact: number;
  };
} 