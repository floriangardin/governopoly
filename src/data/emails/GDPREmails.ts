import { Email } from '../../types/Email';

const GDPREmails: Email[] = [
  {
    id: 'gdpr_1',
    sender: 'Legal Department',
    title: 'GDPR Compliance Audit Findings',
    content: `Our recent GDPR compliance audit has identified several areas requiring immediate attention. We need your decision on how to address these findings before our upcoming regulatory review.

Options:
1. Comprehensive remediation of all findings regardless of severity
2. Risk-based approach focusing only on high and medium severity issues
3. Minimal compliance approach addressing only the critical findings`,
    category: 'gdpr',
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Implement comprehensive remediation',
        outcome: {
          description: 'The thorough approach satisfied regulators and established a gold standard for compliance. While expensive, it positioned the company as an industry leader in data protection.',
          budgetImpact: -200000,
          profitImpact: -50000,
          dataQualityImpact: 20,
          reputationImpact: 15
        }
      },
      {
        id: 2,
        text: 'Take risk-based approach for high/medium issues',
        outcome: {
          description: 'The balanced approach addressed the most significant risks while managing costs. Regulators accepted the prioritization plan, though requested a timeline for addressing remaining items.',
          budgetImpact: -100000,
          profitImpact: 0,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      },
      {
        id: 3,
        text: 'Address only critical findings',
        outcome: {
          description: 'The minimal approach met basic requirements but drew regulatory scrutiny. The company avoided immediate penalties but remains under increased oversight, and some customers have expressed privacy concerns.',
          budgetImpact: -50000,
          profitImpact: -100000,
          dataQualityImpact: 5,
          reputationImpact: -10
        }
      }
    ]
  },
  {
    id: 'gdpr_2',
    sender: 'Data Protection Officer',
    title: 'Subject Access Request Process',
    content: `We're seeing a significant increase in data subject access requests, putting strain on our manual handling process. The current backlog risks missing the 30-day regulatory deadline for responses.

Options:
1. Implement an automated SAR handling system
2. Temporarily reassign staff from other projects to clear the backlog
3. Outsource SAR processing to a specialized legal service provider`,
    category: 'gdpr',
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Implement automated SAR handling',
        outcome: {
          description: 'The new system dramatically improved efficiency and compliance. After initial implementation costs, ongoing operating expenses decreased, and response quality improved significantly.',
          budgetImpact: -150000,
          profitImpact: 50000,
          dataQualityImpact: 15,
          reputationImpact: 10
        }
      },
      {
        id: 2,
        text: 'Reassign staff to clear the backlog',
        outcome: {
          description: 'The temporary reassignment cleared the immediate backlog but disrupted other projects. While cost-effective in the short term, it highlighted the need for a sustainable long-term solution.',
          budgetImpact: -30000,
          profitImpact: -100000,
          dataQualityImpact: 0,
          reputationImpact: 0
        }
      },
      {
        id: 3,
        text: 'Outsource to specialized legal provider',
        outcome: {
          description: 'The outsourced solution provided expert handling and regulatory compliance. However, the third-party access to sensitive data created new security considerations and ongoing dependency.',
          budgetImpact: -100000,
          profitImpact: 0,
          dataQualityImpact: 5,
          reputationImpact: 5
        }
      }
    ]
  },
  {
    id: 'gdpr_3',
    sender: 'Chief Privacy Officer',
    title: 'Cross-Border Data Transfer Compliance',
    content: `Recent European court decisions have invalidated our cross-border data transfer mechanisms. We need to establish new legal basis for transferring European customer data to our US data centers.

Options:
1. Implement standard contractual clauses with additional safeguards
2. Relocate European data processing to EU-based data centers
3. Restructure data systems to keep EU data entirely within the EU`,
    category: 'gdpr',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Implement standard contractual clauses',
        outcome: {
          description: 'The updated contracts provided a temporary solution, but legal uncertainties remain. Some privacy-focused customers have expressed concerns about the adequacy of these measures.',
          budgetImpact: -50000,
          profitImpact: -50000,
          dataQualityImpact: 0,
          reputationImpact: -5
        }
      },
      {
        id: 2,
        text: 'Relocate to EU-based data centers',
        outcome: {
          description: 'The new EU data centers satisfied regulatory requirements and customer concerns. Despite high initial costs, the infrastructure investment improved performance for European users and opened new market opportunities.',
          budgetImpact: -300000,
          profitImpact: 200000,
          dataQualityImpact: 5,
          reputationImpact: 15
        }
      },
      {
        id: 3,
        text: 'Restructure systems for EU data localization',
        outcome: {
          description: 'The comprehensive data localization strategy created a future-proof compliance framework. The approach has been praised by regulators and privacy advocates, though it created some operational complexity.',
          budgetImpact: -200000,
          profitImpact: 100000,
          dataQualityImpact: 10,
          reputationImpact: 20
        }
      }
    ]
  },
  {
    id: 'gdpr_4',
    sender: 'Marketing Director',
    title: 'Consent Management for Marketing Campaigns',
    content: `Our marketing team has identified outdated consent records for a significant portion of our customer database. This affects our ability to send targeted promotional emails and personalized offers.

Options:
1. Launch a re-consent campaign to update permissions
2. Adopt a legitimate interest basis for certain communications
3. Restrict marketing to only customers with clear, recent consent`,
    category: 'gdpr',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Launch re-consent campaign',
        outcome: {
          description: 'The campaign successfully updated permissions for about 60% of contacts. While the database shrank, the remaining customers are highly engaged and responsive to marketing, improving overall campaign effectiveness.',
          budgetImpact: -80000,
          profitImpact: 150000,
          dataQualityImpact: 15,
          reputationImpact: 10
        }
      },
      {
        id: 2,
        text: 'Adopt legitimate interest basis',
        outcome: {
          description: 'The legitimate interest approach maintained a larger marketing database but drew scrutiny from privacy advocates. Several complaints were filed, and some customers expressed frustration about unexpected communications.',
          budgetImpact: -20000,
          profitImpact: 300000,
          dataQualityImpact: -5,
          reputationImpact: -15
        }
      },
      {
        id: 3,
        text: 'Restrict to customers with clear consent',
        outcome: {
          description: 'The conservative approach significantly reduced the marketing database but eliminated compliance risks. The highly targeted campaigns to consented customers show excellent engagement metrics and conversion rates.',
          budgetImpact: -10000,
          profitImpact: 100000,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      }
    ]
  }
];

export default GDPREmails; 