import { SQSHandler } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

export const handler: SQSHandler = async (event) => {
    for (const record of event.Records) {
        try {
            const body = JSON.parse(record.body);
            console.log('Processing message:', body);

            // Process the data (example: store in DynamoDB)
            const putParams = {
                TableName: process.env.TABLE_NAME!,
                Item: {
                    id: { S: record.messageId },
                    data: { S: JSON.stringify(body) },
                    processedAt: { S: new Date().toISOString() },
                },
            };

            await dynamoClient.send(new PutItemCommand(putParams));
            console.log('Data stored successfully');
        } catch (error) {
            console.error('Error processing message:', error);
            throw error; // This will send to DLQ after retries
        }
    }
};
