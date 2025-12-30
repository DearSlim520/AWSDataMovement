import { Stack, StackProps, RemovalPolicy, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { AWSDataMovementEnvironment } from '../config/config';

export interface dataIngestionProps extends StackProps {
    readonly env: AWSDataMovementEnvironment;
}

export class dataIngestionStack extends Stack {
    public readonly processingQueue: sqs.Queue;
    public readonly deadLetterQueue: sqs.Queue;
    public readonly processingLambda: lambda.Function;
    public readonly dataTable: dynamodb.Table;
    public readonly eventRule: events.Rule;

    constructor(scope: Construct, id: string, props: dataIngestionProps) {
        super(scope, id, props);

        // Dead Letter Queue for failed messages
        this.deadLetterQueue = new sqs.Queue(this, 'DeadLetterQueue', {
            retentionPeriod: Duration.days(14),
        });

        // SQS Queue with DLQ
        this.processingQueue = new sqs.Queue(this, 'ProcessingQueue', {
            deadLetterQueue: {
                queue: this.deadLetterQueue,
                maxReceiveCount: 3,
            },
            visibilityTimeout: Duration.seconds(300),
        });

        // DynamoDB Table for processed data
        this.dataTable = new dynamodb.Table(this, 'DataTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        // Lambda function to process messages from SQS and store in DynamoDB
        this.processingLambda = new nodejs.NodejsFunction(this, 'ProcessingLambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            entry: 'lib/lambda/processor.ts', // We'll create this file
            handler: 'handler',
            environment: {
                TABLE_NAME: this.dataTable.tableName,
            },
            timeout: Duration.seconds(30),
            memorySize: 256,
        });

        // Grant Lambda permissions to write to DynamoDB
        this.dataTable.grantWriteData(this.processingLambda);

        // Add SQS event source to Lambda
        this.processingLambda.addEventSource(new lambdaEventSources.SqsEventSource(this.processingQueue, {
            batchSize: 10,
            maxBatchingWindow: Duration.seconds(60),
        }));

        // EventBridge rule (example: scheduled every 5 minutes, can be customized)
        this.eventRule = new events.Rule(this, 'DataIngestionRule', {
            schedule: events.Schedule.rate(Duration.minutes(5)), // Example schedule
        });

        // Add SQS queue as target for EventBridge rule
        this.eventRule.addTarget(new targets.SqsQueue(this.processingQueue, {
            message: events.RuleTargetInput.fromText('{"message": "Data ingestion triggered"}'),
        }));
    }
}
