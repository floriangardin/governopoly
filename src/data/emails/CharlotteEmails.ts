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
    minimumReputation: 50,
    maximumDataQuality: 50,
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Immediately shut down all affected systems',
        outcome: {
          description: "You've contained the breach quickly, but business operations were disrupted for 4 hours. The rapid response prevented further data exposure.",
          budgetImpact: -100000,
          profitImpact: -500000,
          dataQualityImpact: 0,
          reputationImpact: -40
        }
      },
      {
        id: 2,
        text: 'Continue monitoring while investigating',
        outcome: {
          description: 'The continued monitoring revealed it was a false alarm triggered by a new analytics tool. Your measured approach avoided unnecessary disruption.',
          budgetImpact: -200000,
          profitImpact: 0,
          dataQualityImpact: -15,
          reputationImpact: -20
        }
      },
      {
        id: 3,
        text: 'Notify affected customers immediately',
        outcome: {
          description: 'Your transparency was appreciated by customers, but it caused significant concern. Further investigation revealed the breach was much smaller than initially thought, making your response seem somewhat excessive.',
          budgetImpact: -20000,
          profitImpact: -300000,
          dataQualityImpact: -5,
          reputationImpact: -25
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
    minimumReputation: 35,
    maximumDataQuality: 30,
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Issue immediate public statement',
        outcome: {
          description: 'Your rapid and transparent response earned praise from privacy advocates and regulators. While there was short-term negative press, the long-term damage to company reputation was minimized.',
          budgetImpact: -150000,
          profitImpact: -150000,
          dataQualityImpact: 0,
          reputationImpact: -20
        }
      },
      {
        id: 2,
        text: 'Quietly notify only affected employees',
        outcome: {
          description: 'Your targeted approach contained initial panic, but a whistleblower leaked the breach to the press, causing accusations of a cover-up. The controlled initial response was overshadowed by the perception of secrecy.',
          budgetImpact: -40000,
          profitImpact: -300000,
          dataQualityImpact: 0,
          reputationImpact: -30
        }
      },
      {
        id: 3,
        text: 'Delay all notifications for 48 hours',
        outcome: {
          description: 'The delay allowed your team to develop a comprehensive response, but it violated regulatory requirements for timely notification. The company faces potential fines for the delayed reporting.',
          budgetImpact: -100000,
          profitImpact: -500000,
          dataQualityImpact: 0,
          reputationImpact: -15
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
    minimumReputation: 0,
    maximumDataQuality: 20,
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Demand the vendor handle all notifications',
        outcome: {
          description: "The vendor's poor communication and slow response reflected badly on your company. Customers are angry that you attempted to shift responsibility, and regulators question your vendor management practices.",
          budgetImpact: 0,
          profitImpact: -100000,
          dataQualityImpact: 0,
          reputationImpact: -30
        }
      },
      {
        id: 2,
        text: 'Take control of the response ourselves',
        outcome: {
          description: 'Your proactive approach demonstrated strong customer focus but increased costs substantially. The vendor has agreed to partial cost reimbursement, but the incident has strained the relationship.',
          budgetImpact: -150000,
          profitImpact: -200000,
          dataQualityImpact: 0,
          reputationImpact: -10
        }
      },
      {
        id: 3,
        text: 'Collaborate with the vendor on a joint response',
        outcome: {
          description: 'The collaborative approach balanced responsibilities effectively. Customers appreciated the unified and comprehensive response, while costs were shared appropriately between both companies.',
          budgetImpact: -300000,
          profitImpact: -100000,
          dataQualityImpact: 0,
          reputationImpact: -5
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
    minimumReputation: 40,
    maximumDataQuality: 20,
    isUrgent: true,
    choices: [
      {
        id: 1,
        text: 'Pay the ransom',
        outcome: {
          description: 'Payment was made, but only 70% of the data was successfully decrypted. The incident has attracted regulatory attention about your security practices, and there are concerns that paying may encourage future attacks.',
          budgetImpact: -500000,
          profitImpact: 0,
          dataQualityImpact: 0,
          reputationImpact: -30
        }
      },
      {
        id: 2,
        text: 'Refuse payment and restore from backups',
        outcome: {
          description: 'The restoration process was successful but took longer than expected. Business operations were impacted, but your firm stance against ransom payments was viewed positively by the board and industry peers.',
          budgetImpact: -100000,
          profitImpact: -200000,
          dataQualityImpact: 0,
          reputationImpact: -10
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
  ,
{
  id: 'new_1',
  sender: 'CEO',
  title: 'Welcome to Nine Lives',
  content: "Dear CDO, Welcome to our company. As you know, our current data challenges are a big concern for the board. We've been working on a new strategy to improve our data situation, and we'd love your input. What's your first move?",

  category: "strategy",
  minimumReputation: 0,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Send a company-wide intro and survey data needs",
      outcome: {
        description: "You gain insights into current gaps and build goodwill.",
        budgetImpact: -30000,
        profitImpact: 0,
        dataQualityImpact: 0,
        reputationImpact: 10
      }
    },
    {
      id: 2,
      text: "Meet directly with execs to understand priorities",
      outcome: {
        description: "You align with leadership but miss grassroots issues.",
        budgetImpact: -50000,
        profitImpact: 0,
        dataQualityImpact: 0,
        reputationImpact: 15
      }
    },
    {
      id: 3,
      text: "Review dashboards and past reports quietly first",
      outcome: {
        description: "You identify a few red flags but miss team engagement.",
        budgetImpact: 0,
        profitImpact: 50000,
        dataQualityImpact: 5,
        reputationImpact: 0
      }
    }
  ]
}
,
{
  id: "new_2",
  sender: "hr@ninelives.io",
  title: "Need Your Input: First Hire",
  content: "We’ve budgeted for your first data hire. Do you want a data engineer, analyst, or governance expert?",
  category: "hr",
  minimumReputation: 0,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Hire a data engineer",
      outcome: {
        description: "Data infrastructure starts to shape up quickly, but the technical profile is not good at business talk",
        budgetImpact: -150000,
        profitImpact: 200000,
        dataQualityImpact: 10,
        reputationImpact: -5
      }
    },
    {
      id: 2,
      text: "Hire a data analyst",
      outcome: {
        description: "You get quick wins with visual insights.",
        budgetImpact: -120000,
        profitImpact: 300000,
        dataQualityImpact: 5,
        reputationImpact: 0
      }
    },
    {
      id: 3,
      text: "Hire a data governance specialist",
      outcome: {
        description: "Processes improve, but results are slow to show.",
        budgetImpact: -200000,
        profitImpact: 100000,
        dataQualityImpact: 10,
        reputationImpact: 5
      }
    }
  ]
}];

const HREmails: Email[] = [
{
  id: 'hr_1',
  sender: 'HR Director',
  title: 'Data Team Restructuring Proposal',
  content: `With our expanding data initiatives, the HR team has developed three options for restructuring our data organization. We need your recommendation on the best approach to support our strategic goals.

Options:
1. Centralized model: All data professionals report to the CDO office
2. Federated model: Core data team plus embedded analysts in each department
3. Guild model: Data professionals stay in their departments but form a cross-functional community`,
  category: 'hr',
  minimumReputation: 40,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: 'Implement centralized data organization model',
      outcome: {
        description: 'The centralized structure improved standardization and collaboration among data professionals. However, some business units feel the central team is less responsive to their specific needs.',
        budgetImpact: -100000,
        profitImpact: 300000,
        dataQualityImpact: 5,
        reputationImpact: -10
      }
    },
    {
      id: 2,
      text: 'Implement federated data organization model',
      outcome: {
        description: 'The hybrid approach balanced central governance with local responsiveness. Embedded analysts strengthened relationships with business units while maintaining consistent standards.',
        budgetImpact: -300000,
        profitImpact: 400000,
        dataQualityImpact: 10,
        reputationImpact: 10
      }
    },
    {
      id: 3,
      text: 'Implement guild data organization model',
      outcome: {
        description: 'The guild model improved integration with business units but made governance more challenging. Knowledge sharing increased, but inconsistent practices emerged across departments.',
        budgetImpact: -50000,
        profitImpact: 200000,
        dataQualityImpact: -15,
        reputationImpact: 5
      }
    }
  ]
},
{
  id: 'hr_2',
  sender: 'Talent Acquisition',
  title: 'Senior Data Role Recruitment Strategy',
  content: `We're struggling to fill several key data leadership positions. The market for experienced data professionals is extremely competitive, and we've had offers declined due to compensation packages. How would you like to proceed?

Options:
1. Increase salary offers by 20% to attract top talent immediately
2. Develop an internal talent pipeline with training and promotion paths
3. Partner with universities to create a specialized recruiting program`,
  category: 'hr',
  minimumReputation: 60,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: 'Increase salary offers by 20%',
      outcome: {
        description: 'The salary increases successfully attracted several highly qualified candidates, filling critical roles quickly. However, it created internal equity issues with existing employees requesting similar adjustments.',
        budgetImpact: -500000,
        profitImpact: 700000,
        dataQualityImpact: 10,
        reputationImpact: -10
      }
    },
    {
      id: 2,
      text: 'Develop internal talent pipeline',
      outcome: {
        description: 'The internal development program took time to show results but created strong loyalty and retention. Several promising employees have grown into their new roles and bring valuable institutional knowledge.',
        budgetImpact: -250000,
        profitImpact: 500000,
        dataQualityImpact: -10,
        reputationImpact: 15
      }
    },
    {
      id: 3,
      text: 'Partner with universities',
      outcome: {
        description: 'The university partnership created a steady pipeline of entry-level talent but didn\'t address immediate senior-level needs. The program has enhanced your company\'s reputation in the academic community.',
        budgetImpact: -40000,
        profitImpact: 100000,
        dataQualityImpact: -10,
        reputationImpact: 5
      }
    }
  ]
},
{
  id: 'hr_3',
  sender: 'Employee Relations',
  title: 'Data Team Burnout Concerns',
  content: `We've received multiple reports of burnout among data team members. Exit interviews indicate heavy workloads, tight deadlines, and constant firefighting as key factors. Team morale is suffering, and we're concerned about retention.

Options:
1. Implement a "no-meeting Friday" policy and encourage time off
2. Hire additional staff to reduce workload pressure
3. Conduct a work prioritization exercise to eliminate low-value tasks`,
  category: 'hr',
  minimumReputation: 40,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: 'Implement "no-meeting Friday" policy',
      outcome: {
        description: 'The policy created focused work time and improved work-life balance. Team satisfaction scores increased, though some stakeholders were frustrated by reduced availability on Fridays.',
        budgetImpact: 0,
        profitImpact: 50000,
        dataQualityImpact: 0,
        reputationImpact: 5
      }
    },
    {
      id: 2,
      text: 'Hire additional staff',
      outcome: {
        description: 'The expanded team reduced individual workloads and improved morale. While expensive, the investment in additional headcount yielded benefits in reduced turnover and increased productivity.',
        budgetImpact: -250000,
        profitImpact: 200000,
        dataQualityImpact: 10,
        reputationImpact: 15
      }
    },
    {
      id: 3,
      text: 'Conduct work prioritization exercise',
      outcome: {
        description: 'The exercise eliminated several unnecessary reports and processes, freeing up capacity. Teams appreciated the focus on high-value work, though some stakeholders were unhappy about discontinued deliverables.',
        budgetImpact: -50000,
        profitImpact: 150000,
        dataQualityImpact: -5,
        reputationImpact: -5
      }
    }
  ]
},
{
  id: 'hr_4',
  sender: 'Learning & Development',
  title: 'Data Literacy Training Program Proposal',
  content: `To maximize the value of our data investments, HR proposes implementing a company-wide data literacy program. We've developed several options based on benchmarking with other organizations.

Options:
1. Mandatory data literacy training for all employees
2. Role-based training tailored to different job functions
3. Self-paced online learning with optional certification`,
  category: 'hr',
  minimumReputation: 80,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: 'Implement mandatory data literacy training',
      outcome: {
        description: 'The universal training created a common data vocabulary across the organization. Though initially resisted by some departments, it has improved cross-functional collaboration on data-driven initiatives.',
        budgetImpact: -250000,
        profitImpact: 700000,
        dataQualityImpact: 5,
        reputationImpact: 10
      }
    },
    {
      id: 2,
      text: 'Implement role-based data training',
      outcome: {
        description: 'The tailored approach delivered relevant skills to each role, increasing adoption and practical application. Employees appreciated the customized content that directly applied to their daily work.',
        budgetImpact: -600000,
        profitImpact: 900000,
        dataQualityImpact: 15,
        reputationImpact: 15
      }
    },
    {
      id: 3,
      text: 'Offer self-paced online learning',
      outcome: {
        description: 'The flexible approach was cost-effective but had mixed adoption. Motivated employees gained valuable skills, while others didn\'t prioritize the optional training, creating uneven data literacy across teams.',
        budgetImpact: -100000,
        profitImpact: 500000,
        dataQualityImpact: 0,
        reputationImpact: -5
      }
    }
  ]
}
];

const BudgetEmails: Email[] = [
{
  id: "email-009",
  sender: "CEO Office",
  title: "Funds for Modern Data Stack",
  content: "To scale our data efforts, you recommended investing in a modern data stack (warehouse, ELT, governance tools). Here are some proprosal for additional budget :",
  category: "budget",
  minimumReputation: 20,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Get full funding for top-tier tools",
      outcome: {
        description: "You get full budget for high-performance systems, but profit are not there yet.",
        budgetImpact: 600000,
        profitImpact: 0,
        dataQualityImpact: 0,
        reputationImpact: 0
      }
    },
    {
      id: 2,
      text: "Get a first budget for MVP",
      outcome: {
        description: "You gain support for a smart rollout plan.",
        budgetImpact: 300000,
        profitImpact: 200000,
        dataQualityImpact: 0,
        reputationImpact: 0
      }
    },
    {
      id: 3,
      text: "Use budget tail for now instead",
      outcome: {
        description: "You save data quality now, but innovation stalls.",
        budgetImpact: 300000,
        profitImpact: 0,
        dataQualityImpact: 10,
        reputationImpact: 20
      }
    }
  ]
}
,
{
  id: "email-010",
  sender: "CEO Office",
  title: "Approved: Emergency Budget to Restart",
  content: "I’m releasing emergency funds—you decide how to spend them. Let’s not lose momentum.",
  category: "budget",
  minimumReputation: 10,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Hire a specialized firm to audit everything",
      outcome: {
        description: "You finally discover existing state and plan good decisions.",
        budgetImpact: 400000,
        profitImpact: 0,
        dataQualityImpact: 5,
        reputationImpact: -5
      }
    },
    {
      id: 2,
      text: "Handle audit in-house with your team",
      outcome: {
        description: "Partial knowledge gathered, team is discovering data quality.",
        budgetImpact: 200000,
        profitImpact: 0,
        dataQualityImpact: 10,
        reputationImpact: 0
      }
    },
    {
      id: 3,
      text: "Skip audit, launch data quick wins",
      outcome: {
        description: "Quick and cheap, but start cleaning right now.",
        budgetImpact: 100000,
        profitImpact: 0,
        dataQualityImpact: 20,
        reputationImpact: -5
      }
    }
  ]
}
,
{
  id: "email-012",
  sender: "CEO Office",
  title: "Budget Unlocked: Time to Build Our AI Future",
  content: "We’ve hit a growth milestone, and it’s time to use data to get predictive. I’ve carved out funds for you to lead our AI push—forecasting, personalization, the works. Run with it.",
  category: "budget",
  minimumReputation: 60,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Launch a full-scale AI program across the organization",
      outcome: {
        description: "We leap forward and gain a competitive edge.",
        budgetImpact: 500000,
        profitImpact: 400000,
        dataQualityImpact: 5,
        reputationImpact: 0
      }
    },
    {
      id: 2,
      text: "Start with a focused AI pilot in one department",
      outcome: {
        description: "You make a solid case for scaling with real results.",
        budgetImpact: 400000,
        profitImpact: 300000,
        dataQualityImpact: 5,
        reputationImpact: 0
      }
    },
    {
      id: 3,
      text: "Hold the small funding for now and monitor trends",
      outcome: {
        description: "Safe route, but we risk falling behind.",
        budgetImpact: 100000,
        profitImpact: 500000,
        dataQualityImpact: 0,
        reputationImpact: 0
      }
    }
  ]
}
,
{
  id: "email-009",
  sender: "CEO Office",
  title: "Budget Approved: Keep Modernizing Our Data Infrastructure",
  content: "Thanks to your team’s foundational work, we’re in a strong position to upgrade our data systems. I’ve approved additional budget to help you modernize our claims, underwriting, and risk data pipelines. Choose your path.",
  category: "budget",
  minimumReputation: 50,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Deploy a full modern data stack across all business units",
      outcome: {
        description: "Claims, underwriting, and compliance teams run faster and smarter, but will require further help for quality.",
        budgetImpact: 500000,
        profitImpact: 100000,
        dataQualityImpact: -10,
        reputationImpact: 0
      }
    },
    {
      id: 2,
      text: "Pilot new architecture with claims data first",
      outcome: {
        description: "You validate improvements with real results in one key area.",
        budgetImpact: 300000,
        profitImpact: 200000,
        dataQualityImpact: 10,
        reputationImpact: 0
      }
    },
    {
      id: 3,
      text: "Improve legacy systems incrementally",
      outcome: {
        description: "Small gains, but big on quality improvements. Older systems remain a bottleneck.",
        budgetImpact: 150000,
        profitImpact: 50000,
        dataQualityImpact: 25,
        reputationImpact: 0
      }
    }
  ]
}
,
{
  id: "email-010",
  sender: "CEO Office",
  title: "Budget Released for Our Claims and Risk Data",
  content: "With increasing data usage across underwriting and claims, we need to secure our systems. I’ve released additional funds to strengthen data recovery and backup : your move on how to use them.",
  category: "budget",
  minimumReputation: 80,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Partner with a dedicated disaster recovery vendor",
      outcome: {
        description: "Claims and risk data are fully protected with industry-best SLAs.",
        budgetImpact: 500000,
        profitImpact: 300000,
        dataQualityImpact: -10,
        reputationImpact: 0
      }
    },
    {
      id: 2,
      text: "Develop internal safeguards for critical data",
      outcome: {
        description: "Stronger systems in-house, though some risk remains.",
        budgetImpact: 300000,
        profitImpact: 150000,
        dataQualityImpact: 10,
        reputationImpact: 0
      }
    },
    {
      id: 3,
      text: "Delay protection and monitor system performance",
      outcome: {
        description: "Savings now for quality, but risk increased exposure during peak periods.",
        budgetImpact: 100000,
        profitImpact: 50000,
        dataQualityImpact: 20,
        reputationImpact: 0
      }
    }
  ]
}
,
{
  id: "email-013",
  sender: "CEO Office",
  title: "Cloud Growth Means Bigger Storage – You're Funded",
  content: "Our data volume is a good sign—it means we're scaling fast. I've approved extra storage budget. Let’s make sure performance keeps up with ambition.",
  category: "budget",
  minimumReputation: 30,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Expand storage immediately to future-proof our needs",
      outcome: {
        description: "No disruptions, smooth growth for teams and systems.",
        budgetImpact: 300000,
        profitImpact: 0,
        dataQualityImpact: -10,
        reputationImpact: 0
      }
    },
    {
      id: 2,
      text: "Optimize by archiving older datasets first",
      outcome: {
        description: "You balance storage and cost, but slow some access.",
        budgetImpact: 200000,
        profitImpact: 0,
        dataQualityImpact: 5,
        reputationImpact: 0
      }
    },
    {
      id: 3,
      text: "Monitor usage, and act later if necessary",
      outcome: {
        description: "Risky if data growth continues unexpectedly.",
        budgetImpact: 100000,
        profitImpact: 0,
        dataQualityImpact: 15,
        reputationImpact: 0
      }
    }
  ]
}
,
{
  id: "email-011",
  sender: "CEO Office",
  title: "Let’s Empower Everyone With Data",
  content: "We're growing fast—and to keep up, everyone needs to speak data. I’m unlocking funds for your data literacy initiative. Let’s build a culture of data fluency together.",
  category: "budget",
  minimumReputation: 80,
  maximumDataQuality: 100,
  isUrgent: false,
  choices: [
    {
      id: 1,
      text: "Bring in external experts for company-wide training",
      outcome: {
        description: "People across departments are excited and empowered.",
        budgetImpact: 600000,
        profitImpact: 250000,
        dataQualityImpact: 5,
        reputationImpact: 0
      }
    },
    {
      id: 2,
      text: "Create tailored internal workshops",
      outcome: {
        description: "Your team builds capacity over time at lower cost.",
        budgetImpact: 250000,
        profitImpact: 400000,
        dataQualityImpact: 2,
        reputationImpact: 0
      }
    },
    {
      id: 3,
      text: "Use budget elsewhere and delay the training",
      outcome: {
        description: "You save now for other issues, but miss the chance to scale data literacy.",
        budgetImpact: 50000,
        profitImpact: 100000,
        dataQualityImpact: 10,
        reputationImpact: 0
      }
    }
  ]
}
  ]

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
      minimumReputation: 0,
      maximumDataQuality: 80,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Implement emergency data cleaning for this quarter only',
          outcome: {
            description: 'The quick fix improved current reports but didn\'t address systematic issues. Finance got their reports on time, but similar problems will likely recur next quarter.',
            budgetImpact: -100000,
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
            budgetImpact: -200000,
            profitImpact: 200000,
            dataQualityImpact: 10,
            reputationImpact: -5
          }
        },
        {
          id: 3,
          text: 'Use statistical methods for questionable data',
          outcome: {
            description: 'Your statistical approach produced a reasonable approximation that satisfied immediate needs, but an audit later revealed some significant misrepresentations. The underlying data quality issues remain unresolved.',
            budgetImpact: -50000,
            profitImpact: 0,
            dataQualityImpact: -5,
            reputationImpact: 5
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
      minimumReputation: 0,
      maximumDataQuality: 60,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Launch customer data enrichment with third-party data',
          outcome: {
            description: 'The enrichment significantly improved profile completeness, allowing more effective targeting. However, some privacy advocates have raised concerns about how the third-party data was collected and integrated.',
            budgetImpact: -150000,
            profitImpact: 300000,
            dataQualityImpact: 10,
            reputationImpact: -10
          }
        },
        {
          id: 2,
          text: 'Create a data stewardship program',
          outcome: {
            description: 'The program created clear accountability and gradually improved data quality. Marketing and sales teams collaborated more effectively, though progress was slower than hoped.',
            budgetImpact: -100000,
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
            budgetImpact: -100000,
            profitImpact: 250000,
            dataQualityImpact: 20,
            reputationImpact: -10
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
      minimumReputation: 0,
      maximumDataQuality: 50,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Deploy additional tracking',
          outcome: {
            description: 'The enhanced tracking provided more complete data but triggered user complaints about excessive monitoring. Some users disabled tracking features altogether, creating new blind spots.',
            budgetImpact: -50000,
            profitImpact: 100000,
            dataQualityImpact: 5,
            reputationImpact: -15
          }
        },
        {
          id: 2,
          text: 'Conduct user research to complement data',
          outcome: {
            description: 'The qualitative research provided valuable context for the quantitative data gaps. The product team gained insights they wouldn\'t have discovered through analytics alone, leading to some innovative feature ideas.',
            budgetImpact: -150000,
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
            budgetImpact: -250000,
            profitImpact: 300000,
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
      content: `Our data quality monitoring has detected a significant increase in data errors across our enterprise systems. Error rates have jumped from 2% to 17% in the last month, with particular issues in claims handling and risks management tables.
  
  Options:
  1. Roll back to last month's stable data model and reprocess transactions
  2. Fix issues in place with an emergency data quality task force
  3. Implement circuit-breaker logic to quarantine suspicious data automatically`,
      category: 'dataQuality',
      minimumReputation: 0,
      maximumDataQuality: 40,
      isUrgent: true,
      choices: [
        {
          id: 1,
          text: 'Roll back to last month\'s stable data model',
          outcome: {
            description: 'The rollback successfully restored data integrity but required significant manual work to reprocess a month of transactions. Some recent business changes had to be reimplemented, creating temporary process disruption.',
            budgetImpact: -150000,
            profitImpact: -100000,
            dataQualityImpact: 15,
            reputationImpact: 0
          }
        },
        {
          id: 2,
          text: 'Fix issues with an emergency task force',
          outcome: {
            description: 'The dedicated team identified a faulty ETL process as the root cause. Their targeted approach fixed critical issues quickly while minimizing business disruption, though some minor data inconsistencies remain.',
            budgetImpact: -100000,
            profitImpact: 100000,
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
      minimumReputation: 0,
      maximumDataQuality: 100,
      isUrgent: true,
      choices: [
        {
          id: 1,
          text: 'Implement comprehensive remediation',
          outcome: {
            description: 'The thorough approach satisfied regulators and established a gold standard for compliance. While expensive, it positioned the company as an industry leader in data protection.',
            budgetImpact: -300000,
            profitImpact: 50000,
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
            profitImpact: 0,
            dataQualityImpact: -5,
            reputationImpact: -15
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
      minimumReputation: 0,
      maximumDataQuality: 80,
      isUrgent: true,
      choices: [
        {
          id: 1,
          text: 'Implement automated SAR handling',
          outcome: {
            description: 'The new system dramatically improved efficiency and compliance. After initial implementation costs, ongoing operating expenses decreased, and response quality improved significantly.',
            budgetImpact: -250000,
            profitImpact: -100000,
            dataQualityImpact: 15,
            reputationImpact: 10
          }
        },
        {
          id: 2,
          text: 'Reassign staff to clear the backlog',
          outcome: {
            description: 'The temporary reassignment cleared the immediate backlog but disrupted other projects. While cost-effective in the short term, it highlighted the need for a sustainable long-term solution.',
            budgetImpact: -50000,
            profitImpact: 50000,
            dataQualityImpact: 0,
            reputationImpact: -2
          }
        },
        {
          id: 3,
          text: 'Outsource to specialized legal provider',
          outcome: {
            description: 'The outsourced solution provided expert handling and regulatory compliance. However, the third-party access to sensitive data created new security considerations and ongoing dependency.',
            budgetImpact: -100000,
            profitImpact: 0,
            dataQualityImpact: 10,
            reputationImpact: -10
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
      minimumReputation: 0,
      maximumDataQuality: 100,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Implement standard contractual clauses',
          outcome: {
            description: 'The updated contracts provided a temporary solution, but legal uncertainties remain. Some privacy-focused customers have expressed concerns about the adequacy of these measures.',
            budgetImpact: -100000,
            profitImpact: 50000,
            dataQualityImpact: -5,
            reputationImpact: -5
          }
        },
        {
          id: 2,
          text: 'Relocate to EU-based data centers',
          outcome: {
            description: 'The new EU data centers satisfied regulatory requirements and customer concerns. Despite high initial costs, the infrastructure investment improved performance for European users and opened new market opportunities.',
            budgetImpact: -350000,
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
            dataQualityImpact: 5,
            reputationImpact: 5
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
      minimumReputation: 0,
      maximumDataQuality: 80,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Launch re-consent campaign',
          outcome: {
            description: 'The campaign successfully updated permissions for about 60% of contacts. While the database shrank, the remaining customers are highly engaged and responsive to marketing, improving overall campaign effectiveness.',
            budgetImpact: -100000,
            profitImpact: 150000,
            dataQualityImpact: -10,
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
      minimumReputation: 0,
      maximumDataQuality: 100,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Develop comprehensive AI ethics framework',
          outcome: {
            description: 'The thorough framework established your company as a thought leader in responsible AI. The upfront investment has prevented several potential issues and attracted ethically-conscious customers and partners.',
            budgetImpact: -350000,
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
            budgetImpact: -150000,
            profitImpact: 100000,
            dataQualityImpact: 0,
            reputationImpact: 3
          }
        },
        {
          id: 3,
          text: 'Focus narrowly on bias prevention',
          outcome: {
            description: 'The limited framework addressed some critical issues but left gaps in other ethical areas. While development proceeded quickly, several features required rework when additional ethical concerns were identified later.',
            budgetImpact: -50000,
            profitImpact: 50000,
            dataQualityImpact: -10,
            reputationImpact: -3
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
      minimumReputation: 0,
      maximumDataQuality: 100,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Implement unified customer data platform',
          outcome: {
            description: 'The integrated platform dramatically improved resolution times and customer satisfaction. Customer support team members report higher job satisfaction, and several have commented on how much easier it is to provide personalized service.',
            budgetImpact: -400000,
            profitImpact: 500000,
            dataQualityImpact: 15,
            reputationImpact: 15
          }
        },
        {
          id: 2,
          text: 'Provide training on existing systems',
          outcome: {
            description: "The training improved team members capabilities but didn't address the fundamental integration issues. Some improvement in efficiency was achieved, though team members still struggle with complex multi-system queries.",
            budgetImpact: -150000,
            profitImpact: 200000,
            dataQualityImpact: 5,
            reputationImpact: 0
          }
        },
        {
          id: 3,
          text: 'Establish dedicated data support team',
          outcome: {
            description: 'The specialized team effectively handles complex cases but created a new dependency. The two-tier support model works but has introduced new handoff points that occasionally create delays.',
            budgetImpact: -100000,
            profitImpact: 250000,
            dataQualityImpact: 10,
            reputationImpact: -5
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
      minimumReputation: 0,
      maximumDataQuality: 100,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Fund large-scale hackathon with external participants',
          outcome: {
            description: 'The high-profile event generated several promising product ideas and attracted talent. The external perspective brought fresh thinking, though some concerns about intellectual property protection were raised.',
            budgetImpact: -300000,
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
            budgetImpact: -100000,
            profitImpact: 150000,
            dataQualityImpact: 10,
            reputationImpact: 5
          }
        },
        {
          id: 3,
          text: 'Decline in favor of structured innovation',
          outcome: {
            description: 'The structured approach yielded methodical improvements but dampened enthusiasm. Several innovative employees expressed disappointment about the lack of creative opportunities and spontaneous collaboration.',
            budgetImpact: -30000,
            profitImpact: 100000,
            dataQualityImpact: -5,
            reputationImpact: -5
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
      minimumReputation: 0,
      maximumDataQuality: 100,
      isUrgent: true,
      choices: [
        {
          id: 1,
          text: 'Provide comprehensive on-the-record interview',
          outcome: {
            description: 'The transparent approach resulted in a balanced article that positioned your company as a thoughtful leader. Your candid acknowledgment of challenges and commitment to improvement resonated with readers.',
            budgetImpact: 50000,
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
            budgetImpact: 150000,
            profitImpact: 50000,
            dataQualityImpact: 0,
            reputationImpact: 5
          }
        },
        {
          id: 3,
          text: 'Decline to comment',
          outcome: {
            description: 'Your absence from the story allowed competitors to shape the narrative. The article mentioned your unwillingness to participate and speculated about potential reasons, creating a negative impression.',
            budgetImpact: 0,
            profitImpact: -100000,
            dataQualityImpact: 0,
            reputationImpact: -5
          }
        }
      ]
    }
  ];

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
      minimumReputation: 0,
      maximumDataQuality: 100,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Focus on advanced analytics capabilities',
          outcome: {
            description: "Your analytics focus has generated valuable business insights that competitors can't match. However, data integration challenges are limiting the scope of what can be analyzed.",
            budgetImpact: -300000,
            profitImpact: 500000,
            dataQualityImpact: -5,
            reputationImpact: 5
          }
        },
        {
          id: 2,
          text: 'Prioritize data integration for unified customer view',
          outcome: {
            description: "The unified customer view has transformed customer experience and cross-selling capabilities. Marketing and sales teams are particularly pleased with their new ability to coordinate campaigns.",
            budgetImpact: -500000,
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
            budgetImpact: -600000,
            profitImpact: 800000,
            dataQualityImpact: -15,
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
      minimumReputation: 50,
      maximumDataQuality: 100,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Create anonymized data products',
          outcome: {
            description: 'The benchmarking products have generated significant new revenue with minimal privacy concerns. Customers have responded positively to the industry insights they receive in return for data sharing.',
            budgetImpact: -350000,
            profitImpact: 800000,
            dataQualityImpact: 0,
            reputationImpact: 20
          }
        },
        {
          id: 2,
          text: 'Develop data APIs for partners',
          outcome: {
            description: 'The API program has created a vibrant ecosystem of partners and developers. While implementation was complex, it has positioned the company as a platform leader in the industry.',
            budgetImpact: -500000,
            profitImpact: 1000000,
            dataQualityImpact: -5,
            reputationImpact: 15
          }
        },
        {
          id: 3,
          text: 'Focus on internal data use only',
          outcome: {
            description: 'Your cautious approach has avoided potential privacy pitfalls. While no new revenue streams were created, improved products have increased customer satisfaction and retention.',
            budgetImpact: -200000,
            profitImpact: 500000,
            dataQualityImpact: 10,
            reputationImpact: 10
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
      minimumReputation: 30,
      maximumDataQuality: 100,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Migrate to a single cloud provider',
          outcome: {
            description: 'The unified cloud approach simplified operations and reduced costs through volume discounts. However, some vendor lock-in concerns have emerged as pricing models evolved.',
            budgetImpact: -300000,
            profitImpact: 800000,
            dataQualityImpact: -10,
            reputationImpact: -5
          }
        },
        {
          id: 2,
          text: 'Implement multi-cloud approach',
          outcome: {
            description: 'The multi-cloud strategy provided flexibility and negotiating leverage but increased operational complexity. The best-of-breed services offer superior capabilities though integration challenges exist.',
            budgetImpact: -350000,
            profitImpact: 1000000,
            dataQualityImpact: -20,
            reputationImpact: -5
          }
        },
        {
          id: 3,
          text: 'Deploy hybrid cloud-on-premise solution',
          outcome: {
            description: 'The hybrid approach provided a balanced solution that satisfied security and compliance requirements. The cost savings were moderate, but the risk reduction was significant.',
            budgetImpact: -250000,
            profitImpact: 600000,
            dataQualityImpact: 5,
            reputationImpact: 10
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
      minimumReputation: 50,
      maximumDataQuality: 100,
      isUrgent: false,
      choices: [
        {
          id: 1,
          text: 'Prioritize customer data initiatives',
          outcome: {
            description: 'The customer-focused investments generated substantial revenue through improved personalization and reduced churn. Marketing effectiveness increased significantly, exceeding ROI projections.',
            budgetImpact: -500000,
            profitImpact: 1000000,
            dataQualityImpact: 5,
            reputationImpact: 10
          }
        },
        {
          id: 2,
          text: 'Prioritize operational data initiatives',
          outcome: {
            description: 'The operational improvements reduced costs across the organization through process automation and optimization. Supply chain and production efficiencies were particularly notable.',
            budgetImpact: -350000,
            profitImpact: 800000,
            dataQualityImpact: 25,
            reputationImpact: 10
          }
        },
        {
          id: 3,
          text: 'Prioritize risk and compliance initiatives',
          outcome: {
            description: 'The risk-focused approach prevented several potential compliance issues and improved audit outcomes. While less visible than other options like quality remediation, it avoided substantial regulatory penalties.',
            budgetImpact: -200000,
            profitImpact: 500000,
            dataQualityImpact: -10,
            reputationImpact: 25
          }
        }
      ]
    }
  ];

const allEmails = [...DataBreachEmails, ...DataQualityEmails, ...GDPREmails, ...HREmails, ...StrategyEmails, ...MiscEmails, ...BudgetEmails];
export default allEmails; 