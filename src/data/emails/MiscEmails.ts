import { Email } from '../../types/Email';

const MiscEmails: Email[] = [
  {
    id: 'misc_1',
    sender: 'Research & Development',
    title: 'AI Ethics Framework Request',
    content: `Our R&D team is developing several AI-powered products that will use customer data for recommendations and decision-making. We need guidance on establishing ethical boundaries for these AI systems.

Options:
1. Develop a comprehensive AI ethics framework with external expert input
2. Apply existing industry standards and guidelines without customization
3. Focus narrowly on bias prevention and explainability requirements`,
    category: 'misc',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Develop comprehensive AI ethics framework',
        outcome: {
          description: 'The thorough framework established your company as a thought leader in responsible AI. The upfront investment has prevented several potential issues and attracted ethically-conscious customers and partners.',
          budgetImpact: -150000,
          profitImpact: 300000,
          dataQualityImpact: 15,
          reputationImpact: 20
        }
      },
      {
        id: 2,
        text: 'Apply existing industry standards',
        outcome: {
          description: 'The standardized approach provided adequate guidance but missed some industry-specific considerations. Some issues emerged during implementation that required reactive adjustments.',
          budgetImpact: -30000,
          profitImpact: 100000,
          dataQualityImpact: 5,
          reputationImpact: 0
        }
      },
      {
        id: 3,
        text: 'Focus narrowly on bias prevention',
        outcome: {
          description: 'The limited framework addressed some critical issues but left gaps in other ethical areas. While development proceeded quickly, several features required rework when additional ethical concerns were identified later.',
          budgetImpact: -20000,
          profitImpact: -50000,
          dataQualityImpact: 0,
          reputationImpact: -5
        }
      }
    ]
  },
  {
    id: 'misc_2',
    sender: 'Customer Support',
    title: 'Data Access Issues for Customer Service',
    content: `Our customer support team reports they often lack access to critical customer data across systems, requiring customers to repeat information and extending resolution times. They've requested a more integrated view.

Options:
1. Implement a unified customer data platform for support agents
2. Provide training on existing systems and create detailed access guides
3. Establish a dedicated data support team to assist with complex queries`,
    category: 'misc',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Implement unified customer data platform',
        outcome: {
          description: 'The integrated platform dramatically improved resolution times and customer satisfaction. Support agents report higher job satisfaction, and several have commented on how much easier it is to provide personalized service.',
          budgetImpact: -200000,
          profitImpact: 500000,
          dataQualityImpact: 15,
          reputationImpact: 15
        }
      },
      {
        id: 2,
        text: 'Provide training on existing systems',
        outcome: {
          description: "The training improved agent capabilities but didn't address the fundamental integration issues. Some improvement in efficiency was achieved, though agents still struggle with complex multi-system queries.",
          budgetImpact: -40000,
          profitImpact: 100000,
          dataQualityImpact: 5,
          reputationImpact: 0
        }
      },
      {
        id: 3,
        text: 'Establish dedicated data support team',
        outcome: {
          description: 'The specialized team effectively handles complex cases but created a new dependency. The two-tier support model works but has introduced new handoff points that occasionally create delays.',
          budgetImpact: -120000,
          profitImpact: 250000,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      }
    ]
  },
  {
    id: 'misc_3',
    sender: 'Innovation Lab',
    title: 'Data Hackathon Proposal',
    content: `Our innovation team wants to organize a company-wide data hackathon to generate new ideas for data-driven products and identify potential use cases for our data assets. They're requesting executive sponsorship and resources.

Options:
1. Fully fund a large-scale hackathon with external participants
2. Organize a moderate internal hackathon with focused business challenges
3. Decline the hackathon in favor of a structured innovation process`,
    category: 'misc',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Fund large-scale hackathon with external participants',
        outcome: {
          description: 'The high-profile event generated several promising product ideas and attracted talent. The external perspective brought fresh thinking, though some concerns about intellectual property protection were raised.',
          budgetImpact: -100000,
          profitImpact: 400000,
          dataQualityImpact: 5,
          reputationImpact: 15
        }
      },
      {
        id: 2,
        text: 'Organize moderate internal hackathon',
        outcome: {
          description: 'The focused approach generated practical solutions to known business challenges. Several ideas have already been implemented, delivering immediate value and boosting employee engagement.',
          budgetImpact: -50000,
          profitImpact: 200000,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      },
      {
        id: 3,
        text: 'Decline in favor of structured innovation',
        outcome: {
          description: 'The structured approach yielded methodical improvements but dampened enthusiasm. Several innovative employees expressed disappointment about the lack of creative opportunities and spontaneous collaboration.',
          budgetImpact: -20000,
          profitImpact: 100000,
          dataQualityImpact: 5,
          reputationImpact: -10
        }
      }
    ]
  },
  {
    id: 'misc_4',
    sender: 'Press Inquiry',
    title: '[URGENT] Data Practices Media Inquiry',
    content: `A major technology publication is preparing an article on data practices in our industry. They've requested an interview about our data governance, privacy practices, and how we're addressing emerging regulatory challenges.

Options:
1. Provide a comprehensive on-the-record interview
2. Submit a written statement highlighting our best practices
3. Decline to comment for this story`,
    category: 'misc',
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Provide comprehensive on-the-record interview',
        outcome: {
          description: 'The transparent approach resulted in a balanced article that positioned your company as a thoughtful leader. Your candid acknowledgment of challenges and commitment to improvement resonated with readers.',
          budgetImpact: 0,
          profitImpact: 100000,
          dataQualityImpact: 0,
          reputationImpact: 15
        }
      },
      {
        id: 2,
        text: 'Submit a written statement',
        outcome: {
          description: 'The controlled message highlighted your strengths but was presented alongside more candid interviews from competitors. The article noted your reluctance to discuss challenges, which appeared defensive.',
          budgetImpact: 0,
          profitImpact: 0,
          dataQualityImpact: 0,
          reputationImpact: -5
        }
      },
      {
        id: 3,
        text: 'Decline to comment',
        outcome: {
          description: 'Your absence from the story allowed competitors to shape the narrative. The article mentioned your unwillingness to participate and speculated about potential reasons, creating a negative impression.',
          budgetImpact: 0,
          profitImpact: -50000,
          dataQualityImpact: 0,
          reputationImpact: -15
        }
      }
    ]
  }
];

export default MiscEmails; 