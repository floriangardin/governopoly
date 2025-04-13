import { Email } from '../../types/Email';

const StrategyEmails: Email[] = [
  {
    id: 'strategy_1',
    sender: 'CEO Office',
    title: 'Data Strategy Alignment',
    content: `I need your input on aligning our data strategy with the company's three-year plan. The executive team is debating several approaches, and your recommendation will shape our technology investments.

Options:
1. Focus on building advanced analytics capabilities for competitive advantage
2. Prioritize data integration to create a unified customer view
3. Invest in real-time data processing for operational excellence`,
    category: 'strategy',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Focus on advanced analytics capabilities',
        outcome: {
          description: "Your analytics focus has generated valuable business insights that competitors can't match. However, data integration challenges are limiting the scope of what can be analyzed.",
          budgetImpact: -300000,
          profitImpact: 800000,
          dataQualityImpact: 5,
          reputationImpact: 15
        }
      },
      {
        id: 2,
        text: 'Prioritize data integration for unified customer view',
        outcome: {
          description: "The unified customer view has transformed customer experience and cross-selling capabilities. Marketing and sales teams are particularly pleased with their new ability to coordinate campaigns.",
          budgetImpact: -250000,
          profitImpact: 600000,
          dataQualityImpact: 20,
          reputationImpact: 10
        }
      },
      {
        id: 3,
        text: 'Invest in real-time data processing',
        outcome: {
          description: 'Real-time capabilities have improved operational efficiency but required extensive system upgrades. The technology is impressive, though some departments struggle to adapt their processes to leverage it fully.',
          budgetImpact: -400000,
          profitImpact: 700000,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      }
    ]
  },
  {
    id: 'strategy_2',
    sender: 'Board of Directors',
    title: 'Data Monetization Strategy',
    content: `The board is interested in exploring opportunities to monetize our data assets. This would create new revenue streams but raises questions about customer privacy and data usage. Please provide your recommendation on our approach.

Options:
1. Create anonymized data products for industry benchmarking
2. Develop APIs for partners to access select data with customer consent
3. Focus internally on using data to improve existing products instead of monetization`,
    category: 'strategy',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Create anonymized data products',
        outcome: {
          description: 'The benchmarking products have generated significant new revenue with minimal privacy concerns. Customers have responded positively to the industry insights they receive in return for data sharing.',
          budgetImpact: 200000,
          profitImpact: 1000000,
          dataQualityImpact: 5,
          reputationImpact: 10
        }
      },
      {
        id: 2,
        text: 'Develop data APIs for partners',
        outcome: {
          description: 'The API program has created a vibrant ecosystem of partners and developers. While implementation was complex, it has positioned the company as a platform leader in the industry.',
          budgetImpact: -150000,
          profitImpact: 1200000,
          dataQualityImpact: 15,
          reputationImpact: 15
        }
      },
      {
        id: 3,
        text: 'Focus on internal data use only',
        outcome: {
          description: 'Your cautious approach has avoided potential privacy pitfalls. While no new revenue streams were created, improved products have increased customer satisfaction and retention.',
          budgetImpact: -50000,
          profitImpact: 400000,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      }
    ]
  },
  {
    id: 'strategy_3',
    sender: 'CTO Office',
    title: 'Cloud Data Strategy Decision',
    content: `We need to decide on our cloud strategy for data platforms. Our current on-premises infrastructure is approaching end-of-life, and we're evaluating options for the future architecture.

Options:
1. Full migration to a single cloud provider
2. Multi-cloud approach leveraging best-of-breed services
3. Hybrid cloud-on-premise solution for sensitive data`,
    category: 'strategy',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Migrate to a single cloud provider',
        outcome: {
          description: 'The unified cloud approach simplified operations and reduced costs through volume discounts. However, some vendor lock-in concerns have emerged as pricing models evolved.',
          budgetImpact: -200000,
          profitImpact: 500000,
          dataQualityImpact: 15,
          reputationImpact: 5
        }
      },
      {
        id: 2,
        text: 'Implement multi-cloud approach',
        outcome: {
          description: 'The multi-cloud strategy provided flexibility and negotiating leverage but increased operational complexity. The best-of-breed services offer superior capabilities though integration challenges exist.',
          budgetImpact: -350000,
          profitImpact: 600000,
          dataQualityImpact: 10,
          reputationImpact: 10
        }
      },
      {
        id: 3,
        text: 'Deploy hybrid cloud-on-premise solution',
        outcome: {
          description: 'The hybrid approach provided a balanced solution that satisfied security and compliance requirements. The cost savings were moderate, but the risk reduction was significant.',
          budgetImpact: -250000,
          profitImpact: 400000,
          dataQualityImpact: 5,
          reputationImpact: 0
        }
      }
    ]
  },
  {
    id: 'strategy_4',
    sender: 'CFO Office',
    title: 'Data Investment Prioritization',
    content: `With limited budget for the upcoming fiscal year, we need to prioritize our data investments. The executive committee is requesting your recommendation on where to focus our resources for maximum impact.

Options:
1. Customer data initiatives to drive sales and retention
2. Operational data initiatives to improve efficiency
3. Risk and compliance data initiatives to reduce exposure`,
    category: 'strategy',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Prioritize customer data initiatives',
        outcome: {
          description: 'The customer-focused investments generated substantial revenue through improved personalization and reduced churn. Marketing effectiveness increased significantly, exceeding ROI projections.',
          budgetImpact: -200000,
          profitImpact: 900000,
          dataQualityImpact: 15,
          reputationImpact: 10
        }
      },
      {
        id: 2,
        text: 'Prioritize operational data initiatives',
        outcome: {
          description: 'The operational improvements reduced costs across the organization through process automation and optimization. Supply chain and production efficiencies were particularly notable.',
          budgetImpact: -150000,
          profitImpact: 700000,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      },
      {
        id: 3,
        text: 'Prioritize risk and compliance initiatives',
        outcome: {
          description: 'The risk-focused approach prevented several potential compliance issues and improved audit outcomes. While less visible than other options, it avoided substantial regulatory penalties.',
          budgetImpact: -100000,
          profitImpact: 300000,
          dataQualityImpact: 20,
          reputationImpact: 15
        }
      }
    ]
  }
];

export default StrategyEmails; 