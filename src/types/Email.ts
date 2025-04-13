export interface Email {
  id: string;
  sender: string;
  title: string;
  content: string;
  category: 'dataBreach' | 'dataQuality' | 'hr' | 'strategy' | 'gdpr' | 'misc';
  isUrgent: boolean;
  choices: Choice[];
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