import { Email } from '../../types/Email';

const DataBreachEmails: Email[] = [
  {
    id: 'breach_1',
    sender: 'CISO Office',
    title: '[URGENT] Potential Data Breach Detected',
    content: `Our security monitoring system has detected unusual access patterns to our customer database. Initial investigation suggests unauthorized access to approximately 50,000 customer records. We need your immediate guidance on how to proceed with this potential breach.

Options:
1. Immediately shut down all affected systems to prevent further access
2. Continue monitoring while our team investigates the extent of the breach
3. Notify affected customers immediately while investigation continues`,
    category: 'dataBreach',
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Immediately shut down all affected systems',
        outcome: {
          description: "You've contained the breach quickly, but business operations were disrupted for 4 hours. The rapid response prevented further data exposure.",
          budgetImpact: -50000,
          profitImpact: -200000,
          dataQualityImpact: 0,
          reputationImpact: 5
        }
      },
      {
        id: 2,
        text: 'Continue monitoring while investigating',
        outcome: {
          description: 'The continued monitoring revealed it was a false alarm triggered by a new analytics tool. Your measured approach avoided unnecessary disruption.',
          budgetImpact: -10000,
          profitImpact: 0,
          dataQualityImpact: 5,
          reputationImpact: 5
        }
      },
      {
        id: 3,
        text: 'Notify affected customers immediately',
        outcome: {
          description: 'Your transparency was appreciated by customers, but it caused significant concern. Further investigation revealed the breach was much smaller than initially thought, making your response seem somewhat excessive.',
          budgetImpact: -30000,
          profitImpact: -100000,
          dataQualityImpact: 0,
          reputationImpact: -5
        }
      }
    ]
  },
  {
    id: 'breach_2',
    sender: 'Security Operations',
    title: '[URGENT] Data Breach Confirmed - Executive Decision Required',
    content: `We have confirmed unauthorized access to our employee database. The breach appears to have exposed personal information including names, addresses, and social security numbers of approximately 3,000 employees. Law enforcement has been notified, but we need your decision on public disclosure.

Options:
1. Issue immediate public statement and notify all affected employees
2. Quietly notify only affected employees while completing the investigation
3. Delay all notifications for 48 hours until we have complete information`,
    category: 'dataBreach',
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Issue immediate public statement',
        outcome: {
          description: 'Your rapid and transparent response earned praise from privacy advocates and regulators. While there was short-term negative press, the long-term damage to company reputation was minimized.',
          budgetImpact: -100000,
          profitImpact: -150000,
          dataQualityImpact: 0,
          reputationImpact: 10
        }
      },
      {
        id: 2,
        text: 'Quietly notify only affected employees',
        outcome: {
          description: 'Your targeted approach contained initial panic, but a whistleblower leaked the breach to the press, causing accusations of a cover-up. The controlled initial response was overshadowed by the perception of secrecy.',
          budgetImpact: -70000,
          profitImpact: -300000,
          dataQualityImpact: 0,
          reputationImpact: -15
        }
      },
      {
        id: 3,
        text: 'Delay all notifications for 48 hours',
        outcome: {
          description: 'The delay allowed your team to develop a comprehensive response, but it violated regulatory requirements for timely notification. The company faces potential fines for the delayed reporting.',
          budgetImpact: -200000,
          profitImpact: -250000,
          dataQualityImpact: 0,
          reputationImpact: -10
        }
      }
    ]
  },
  {
    id: 'breach_3',
    sender: 'Legal Department',
    title: '[URGENT] Third-party Vendor Data Breach',
    content: `We've just been informed that one of our cloud service providers has experienced a significant data breach. They believe our customer data may have been compromised. As the data controller, we have legal obligations regardless of the breach occurring at our processor.

Options:
1. Demand the vendor handle all notifications and remediation
2. Take control of the response and notification process ourselves
3. Collaborate with the vendor on a joint response strategy`,
    category: 'dataBreach',
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Demand the vendor handle all notifications',
        outcome: {
          description: "The vendor's poor communication and slow response reflected badly on your company. Customers are angry that you attempted to shift responsibility, and regulators question your vendor management practices.",
          budgetImpact: 0,
          profitImpact: -400000,
          dataQualityImpact: -5,
          reputationImpact: -20
        }
      },
      {
        id: 2,
        text: 'Take control of the response ourselves',
        outcome: {
          description: 'Your proactive approach demonstrated strong customer focus but increased costs substantially. The vendor has agreed to partial cost reimbursement, but the incident has strained the relationship.',
          budgetImpact: -150000,
          profitImpact: -200000,
          dataQualityImpact: 5,
          reputationImpact: 15
        }
      },
      {
        id: 3,
        text: 'Collaborate with the vendor on a joint response',
        outcome: {
          description: 'The collaborative approach balanced responsibilities effectively. Customers appreciated the unified and comprehensive response, while costs were shared appropriately between both companies.',
          budgetImpact: -75000,
          profitImpact: -100000,
          dataQualityImpact: 5,
          reputationImpact: 5
        }
      }
    ]
  },
  {
    id: 'breach_4',
    sender: 'IT Security',
    title: '[URGENT] Ransomware Detected in Data Systems',
    content: `We've detected ransomware in our data warehouse systems. The malware has encrypted some of our analytical datasets and is demanding a $500,000 payment in cryptocurrency. Our backup systems appear intact but will require 24-48 hours for full restoration.

Options:
1. Pay the ransom to get immediate access to our data
2. Refuse payment and restore from backups
3. Engage a cybersecurity firm for negotiation and forensic assistance`,
    category: 'dataBreach',
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Pay the ransom',
        outcome: {
          description: 'Payment was made, but only 70% of the data was successfully decrypted. The incident has attracted regulatory attention about your security practices, and there are concerns that paying may encourage future attacks.',
          budgetImpact: -500000,
          profitImpact: -100000,
          dataQualityImpact: -10,
          reputationImpact: -15
        }
      },
      {
        id: 2,
        text: 'Refuse payment and restore from backups',
        outcome: {
          description: 'The restoration process was successful but took longer than expected. Business operations were impacted, but your firm stance against ransom payments was viewed positively by the board and industry peers.',
          budgetImpact: -150000,
          profitImpact: -350000,
          dataQualityImpact: -5,
          reputationImpact: 10
        }
      },
      {
        id: 3,
        text: 'Engage a cybersecurity firm',
        outcome: {
          description: 'The specialized firm successfully contained the ransomware and recovered most data without payment. Their forensic analysis helped identify and close the security vulnerabilities that allowed the initial breach.',
          budgetImpact: -250000,
          profitImpact: -150000,
          dataQualityImpact: 0,
          reputationImpact: 5
        }
      }
    ]
  }
];

export default DataBreachEmails; 