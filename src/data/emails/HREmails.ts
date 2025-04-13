import { Email } from '../../types/Email';

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
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Implement centralized data organization model',
        outcome: {
          description: 'The centralized structure improved standardization and collaboration among data professionals. However, some business units feel the central team is less responsive to their specific needs.',
          budgetImpact: -100000,
          profitImpact: 300000,
          dataQualityImpact: 15,
          reputationImpact: 0
        }
      },
      {
        id: 2,
        text: 'Implement federated data organization model',
        outcome: {
          description: 'The hybrid approach balanced central governance with local responsiveness. Embedded analysts strengthened relationships with business units while maintaining consistent standards.',
          budgetImpact: -150000,
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
          dataQualityImpact: -5,
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
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Increase salary offers by 20%',
        outcome: {
          description: 'The salary increases successfully attracted several highly qualified candidates, filling critical roles quickly. However, it created internal equity issues with existing employees requesting similar adjustments.',
          budgetImpact: -200000,
          profitImpact: 500000,
          dataQualityImpact: 15,
          reputationImpact: 5
        }
      },
      {
        id: 2,
        text: 'Develop internal talent pipeline',
        outcome: {
          description: 'The internal development program took time to show results but created strong loyalty and retention. Several promising employees have grown into their new roles and bring valuable institutional knowledge.',
          budgetImpact: -120000,
          profitImpact: 300000,
          dataQualityImpact: 10,
          reputationImpact: 15
        }
      },
      {
        id: 3,
        text: 'Partner with universities',
        outcome: {
          description: 'The university partnership created a steady pipeline of entry-level talent but didn\'t address immediate senior-level needs. The program has enhanced your company\'s reputation in the academic community.',
          budgetImpact: -80000,
          profitImpact: 100000,
          dataQualityImpact: 5,
          reputationImpact: 10
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
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Implement "no-meeting Friday" policy',
        outcome: {
          description: 'The policy created focused work time and improved work-life balance. Team satisfaction scores increased, though some stakeholders were frustrated by reduced availability on Fridays.',
          budgetImpact: 0,
          profitImpact: 50000,
          dataQualityImpact: 5,
          reputationImpact: 10
        }
      },
      {
        id: 2,
        text: 'Hire additional staff',
        outcome: {
          description: 'The expanded team reduced individual workloads and improved morale. While expensive, the investment in additional headcount yielded benefits in reduced turnover and increased productivity.',
          budgetImpact: -250000,
          profitImpact: 300000,
          dataQualityImpact: 10,
          reputationImpact: 15
        }
      },
      {
        id: 3,
        text: 'Conduct work prioritization exercise',
        outcome: {
          description: 'The exercise eliminated several unnecessary reports and processes, freeing up capacity. Teams appreciated the focus on high-value work, though some stakeholders were unhappy about discontinued deliverables.',
          budgetImpact: -30000,
          profitImpact: 150000,
          dataQualityImpact: 5,
          reputationImpact: 5
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
    isUrgent: false,
    choices: [
      {
        id: 1,
        text: 'Implement mandatory data literacy training',
        outcome: {
          description: 'The universal training created a common data vocabulary across the organization. Though initially resisted by some departments, it has improved cross-functional collaboration on data-driven initiatives.',
          budgetImpact: -150000,
          profitImpact: 400000,
          dataQualityImpact: 15,
          reputationImpact: 10
        }
      },
      {
        id: 2,
        text: 'Implement role-based data training',
        outcome: {
          description: 'The tailored approach delivered relevant skills to each role, increasing adoption and practical application. Employees appreciated the customized content that directly applied to their daily work.',
          budgetImpact: -200000,
          profitImpact: 600000,
          dataQualityImpact: 20,
          reputationImpact: 15
        }
      },
      {
        id: 3,
        text: 'Offer self-paced online learning',
        outcome: {
          description: 'The flexible approach was cost-effective but had mixed adoption. Motivated employees gained valuable skills, while others didn\'t prioritize the optional training, creating uneven data literacy across teams.',
          budgetImpact: -50000,
          profitImpact: 150000,
          dataQualityImpact: 5,
          reputationImpact: 0
        }
      }
    ]
  }
];

export default HREmails; 