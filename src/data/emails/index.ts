import { Email } from '../../types/Email';
import DataBreachEmails from './DataBreachEmails';
import DataQualityEmails from './DataQualityEmails';
import GDPREmails from './GDPREmails';
import HREmails from './HREmails';
import StrategyEmails from './StrategyEmails';
import MiscEmails from './MiscEmails';
import CharlotteEmails from './CharlotteEmails';

// Export all email categories
export {
  DataBreachEmails,
  DataQualityEmails,
  GDPREmails,
  HREmails,
  StrategyEmails,
  MiscEmails,
  CharlotteEmails,
};

// Function to get all emails in a single array
export const getAllEmails = (): Email[] => {
  return [
    ...CharlotteEmails
  ];
};

// Function to get urgent emails only
export const getUrgentEmails = (): Email[] => {
  return getAllEmails().filter(email => email.isUrgent);
};

// Function to get emails by category
export const getEmailsByCategory = (category: Email['category']): Email[] => {
  return getAllEmails().filter(email => email.category === category);
}; 