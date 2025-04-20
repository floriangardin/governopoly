interface LeaderboardEntry {
  id?: string;
  playerName: string;
  companyProfit: number;
  cdoBudget: number;
  dataQuality: number;
  reputation: number;
  company: string;
  defeat?: string;
  timestamp: string;
}

interface LeaderboardResponse {
  items: LeaderboardEntry[];
}

class LeaderboardService {
  private endpoint: string | undefined;
  private apiKey: string | undefined;
  
  constructor() {
    this.endpoint = process.env.REACT_APP_APPSYNC_ENDPOINT;
    this.apiKey = process.env.REACT_APP_APPSYNC_API_KEY;
  }
  
  private isConfigured(): boolean {
    if (!this.endpoint || !this.apiKey) {
      console.error("AppSync configuration missing. Set REACT_APP_APPSYNC_ENDPOINT and REACT_APP_APPSYNC_API_KEY in your environment variables.");
      return false;
    }
    return true;
  }
  
  /**
   * Submit a score to the leaderboard
   */
  async submitScore(entry: Omit<LeaderboardEntry, 'id'>): Promise<boolean> {
    if (!this.isConfigured()) return false;
    
    try {
      // GraphQL mutation to add score
      const mutation = `
        mutation CreateLeaderboardEntry($input: CreateLeaderboardEntryInput!) {
          createLeaderboardEntry(input: $input) {
            id
            playerName
            companyProfit
          }
        }
      `;
      
      // Make the API call
      const response = await fetch(this.endpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey!
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            input: entry
          }
        })
      });
      
      const result = await response.json();
      
      if (result.errors) {
        console.error('Error submitting score:', result.errors);
        return false;
      }
      
      console.log('Score submitted successfully:', result.data);
      return true;
    } catch (error) {
      console.error('Error submitting score:', error);
      return false;
    }
  }
  
  /**
   * Fetch leaderboard data - completely rewritten with minimal query
   */
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    if (!this.isConfigured()) return [];
    
    try {
      // Absolute minimum query with no optional parameters
      const query = `
        query {
          listLeaderboardEntries {
            items {
              id
              playerName
              companyProfit
              cdoBudget
              dataQuality
              reputation
              company
              defeat
              timestamp
            }
          }
        }
      `;
      
      const response = await fetch(this.endpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey!
        },
        body: JSON.stringify({ query })
      });
      
      const result = await response.json();
      
      if (result.errors) {
        console.error('Error fetching leaderboard:', result.errors);
        return [];
      }
      
      // Sort and limit client-side
      const entries = result.data.listLeaderboardEntries.items || [];
      return entries
        .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.companyProfit - a.companyProfit)
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }
}

// Export a singleton instance
export const leaderboardService = new LeaderboardService(); 