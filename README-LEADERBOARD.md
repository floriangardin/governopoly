# Governopoly Leaderboard

This documentation explains how to set up and use the leaderboard functionality for the Governopoly game.

## Overview

The leaderboard implementation uses:
- **AWS AppSync**: Provides a GraphQL API your frontend calls directly
- **AWS DynamoDB**: Serverless NoSQL database with pay-per-use pricing
- **AWS IAM**: For security and access control

This approach eliminates the need for a backend server while keeping costs minimal.

## Setup Instructions

### 1. Deploy AWS Resources

Deploy the CloudFormation template to create all necessary AWS resources:

```bash
aws cloudformation create-stack \
  --stack-name GovernopolyLeaderboard \
  --template-body file://leaderboard-infrastructure.yaml \
  --capabilities CAPABILITY_IAM
```

Status : 

```bash
aws cloudformation describe-stacks --stack-name GovernopolyLeaderboard --query "Stacks[0].StackStatus"
```

### 2. Get API Information

After deployment completes, retrieve the AppSync API endpoint and API key:

```bash
aws cloudformation describe-stacks \
  --stack-name GovernopolyLeaderboard \
  --query "Stacks[0].Outputs"
```

This will return the GraphQL endpoint URL and API key.

### 3. Configure Environment Variables

Create a `.env` file in your project root based on the `.env.sample`:

```
REACT_APP_APPSYNC_ENDPOINT=<your-appsync-endpoint>
REACT_APP_APPSYNC_API_KEY=<your-api-key>
```

## Testing the Leaderboard

To test if the leaderboard is working:

1. Start your application
2. Complete a game (win or lose)
3. Submit your score with a player name
4. View the leaderboard

You can also directly query the AppSync API using the AWS Console:

1. Go to AWS AppSync in your AWS Console
2. Select the `GovernopolyLeaderboardAPI`
3. Go to the "Queries" tab
4. Run a query like:

```graphql
query ListLeaderboardEntries {
  listLeaderboardEntries(limit: 10, sortDirection: DESC, sortField: "companyProfit") {
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
```

## Cost Optimization

The solution is designed for minimal cost:

- DynamoDB is configured with pay-per-request pricing
- AppSync has no minimum fees, you pay per request
- With low traffic, costs should remain in the AWS Free Tier

Approximate monthly costs (beyond free tier):
- AppSync: $4.00 per million queries
- DynamoDB: $1.25 per million write requests and $0.25 per million read requests

Typical game usage should cost only a few cents per month.

## Security Considerations

- The API key is exposed to the frontend, which is a common pattern for public leaderboards
- The API is limited to only the operations needed
- Consider adding rate limiting if the service gets abused

For more sensitive data, you might want to consider using Amazon Cognito for user authentication.

## Troubleshooting

Common issues:

1. **CORS errors**: Ensure your AppSync API allows requests from your domain
2. **Missing environment variables**: Verify your `.env` file is correctly set up
3. **API key expired**: AppSync API keys expire after 1 year by default

If you need to update the schema or resolvers, you can update the CloudFormation stack:

```bash
aws cloudformation update-stack \
  --stack-name GovernopolyLeaderboard \
  --template-body file://leaderboard-infrastructure.yaml \
  --capabilities CAPABILITY_IAM
``` 