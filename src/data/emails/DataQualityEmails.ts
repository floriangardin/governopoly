import { Email } from '../../types/Email';

const DataQualityEmails: Email[] = [
  {
    id: 'quality_1',
    sender: 'Data Analytics Team',
    title: 'Data Quality Issues in Sales Reports',
    content: `Our quarterly sales analysis has uncovered significant inconsistencies in regional sales data. Some transactions appear to be duplicated, while others are missing entirely. The finance team is pressing for accurate numbers for their quarterly reports due next week.

Options:
1. Implement an emergency data cleaning protocol focused only on this quarter's data
2. Delay the quarterly report to conduct a thorough data quality audit
3. Use statistical methods to estimate correct figures where data is questionable`,
    category: 'dataQuality',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Implement emergency data cleaning for this quarter only',
        outcome: {
          description: 'The quick fix improved current reports but didn\'t address systematic issues. Finance got their reports on time, but similar problems will likely recur next quarter.',
          budgetImpact: -30000,
          profitImpact: 50000,
          dataQualityImpact: 5,
          reputationImpact: 0
        }
      },
      {
        id: 2,
        text: 'Delay reports for thorough data quality audit',
        outcome: {
          description: 'The comprehensive approach uncovered and fixed several critical data pipeline issues. The finance team was initially frustrated by the delay but ultimately received more accurate data than in previous quarters.',
          budgetImpact: -80000,
          profitImpact: 200000,
          dataQualityImpact: 15,
          reputationImpact: 5
        }
      },
      {
        id: 3,
        text: 'Use statistical methods for questionable data',
        outcome: {
          description: 'Your statistical approach produced a reasonable approximation that satisfied immediate needs, but an audit later revealed some significant misrepresentations. The underlying data quality issues remain unresolved.',
          budgetImpact: -20000,
          profitImpact: -50000,
          dataQualityImpact: -5,
          reputationImpact: -5
        }
      }
    ]
  },
  {
    id: 'quality_2',
    sender: 'Marketing Department',
    title: 'Customer Segmentation Data Inconsistencies',
    content: `Our marketing team is struggling with their new customer segmentation model due to inconsistent demographic data across our systems. They report that up to 30% of customer profiles have missing or conflicting information, hampering targeted campaigns.

Options:
1. Launch a customer data enrichment project using third-party data sources
2. Create a data stewardship program with assigned owners for customer data
3. Implement automated data quality rules for all incoming customer data`,
    category: 'dataQuality',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Launch customer data enrichment with third-party data',
        outcome: {
          description: 'The enrichment significantly improved profile completeness, allowing more effective targeting. However, some privacy advocates have raised concerns about how the third-party data was collected and integrated.',
          budgetImpact: -120000,
          profitImpact: 300000,
          dataQualityImpact: 10,
          reputationImpact: -5
        }
      },
      {
        id: 2,
        text: 'Create a data stewardship program',
        outcome: {
          description: 'The program created clear accountability and gradually improved data quality. Marketing and sales teams collaborated more effectively, though progress was slower than hoped.',
          budgetImpact: -60000,
          profitImpact: 150000,
          dataQualityImpact: 20,
          reputationImpact: 10
        }
      },
      {
        id: 3,
        text: 'Implement automated data quality rules',
        outcome: {
          description: 'The automated system caught many issues at the point of entry, preventing further data deterioration. However, historical data issues remain, and some valid but unusual customer scenarios were incorrectly flagged as errors.',
          budgetImpact: -90000,
          profitImpact: 180000,
          dataQualityImpact: 15,
          reputationImpact: 5
        }
      }
    ]
  },
  {
    id: 'quality_3',
    sender: 'Product Development',
    title: 'Product Usage Data Quality Concerns',
    content: `The product team is reporting significant gaps in user behavior data that's critical for our next release. Device logs appear incomplete, user journeys have missing steps, and session data shows unexplained anomalies. This impacts feature prioritization decisions.

Options:
1. Deploy additional tracking to fill the data gaps
2. Conduct user research to complement the incomplete data
3. Rebuild the entire analytics pipeline with more robust logging`,
    category: 'dataQuality',
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Deploy additional tracking',
        outcome: {
          description: 'The enhanced tracking provided more complete data but triggered user complaints about excessive monitoring. Some users disabled tracking features altogether, creating new blind spots.',
          budgetImpact: -40000,
          profitImpact: 100000,
          dataQualityImpact: 5,
          reputationImpact: -10
        }
      },
      {
        id: 2,
        text: 'Conduct user research to complement data',
        outcome: {
          description: 'The qualitative research provided valuable context for the quantitative data gaps. The product team gained insights they wouldn\'t have discovered through analytics alone, leading to some innovative feature ideas.',
          budgetImpact: -70000,
          profitImpact: 250000,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      },
      {
        id: 3,
        text: 'Rebuild the entire analytics pipeline',
        outcome: {
          description: 'The comprehensive rebuild created a more reliable data foundation for all product decisions. Despite the high initial cost, the improved data quality is driving better feature prioritization and user experience improvements.',
          budgetImpact: -200000,
          profitImpact: 400000,
          dataQualityImpact: 25,
          reputationImpact: 10
        }
      }
    ]
  },
  {
    id: 'quality_4',
    sender: 'Data Warehouse Team',
    title: 'Critical Data Quality Alert in Enterprise Systems',
    content: `Our data quality monitoring has detected a significant increase in data errors across our enterprise systems. Error rates have jumped from 2% to 17% in the last month, with particular issues in order processing and inventory management tables.

Options:
1. Roll back to last month's stable data model and reprocess transactions
2. Fix issues in place with an emergency data quality task force
3. Implement circuit-breaker logic to quarantine suspicious data automatically`,
    category: 'dataQuality',
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Roll back to last month\'s stable data model',
        outcome: {
          description: 'The rollback successfully restored data integrity but required significant manual work to reprocess a month of transactions. Some recent business changes had to be reimplemented, creating temporary process disruption.',
          budgetImpact: -120000,
          profitImpact: -50000,
          dataQualityImpact: 15,
          reputationImpact: 0
        }
      },
      {
        id: 2,
        text: 'Fix issues with an emergency task force',
        outcome: {
          description: 'The dedicated team identified a faulty ETL process as the root cause. Their targeted approach fixed critical issues quickly while minimizing business disruption, though some minor data inconsistencies remain.',
          budgetImpact: -80000,
          profitImpact: 0,
          dataQualityImpact: 10,
          reputationImpact: 5
        }
      },
      {
        id: 3,
        text: 'Implement circuit-breaker quarantine logic',
        outcome: {
          description: 'The automated system successfully identified and isolated bad data, but legitimate transactions were occasionally quarantined as well. Business teams are frustrated with the additional verification steps now required.',
          budgetImpact: -50000,
          profitImpact: -100000,
          dataQualityImpact: 20,
          reputationImpact: -5
        }
      }
    ]
  }
];

export default DataQualityEmails; 