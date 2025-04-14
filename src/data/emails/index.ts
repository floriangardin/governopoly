import { Email } from '../../types/Email';
import CharlotteEmails from './CharlotteEmails';

// Export all email categories
export {
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