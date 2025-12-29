import { Environment } from 'aws-cdk-lib';
import { Stage } from 'aws-cdk-lib/aws-apigateway';

// define the pipeline config, for now we only have one
export type StageName = 'main'

// define the environment
export interface AWSDataMovementEnvironment extends Environment {
    readonly accountName: string;
    readonly accountEmail: string;
    readonly region: string;
    readonly stageName: StageName;
}
export const ENVIRONMENTS: Record<StageName, AWSDataMovementEnvironment> = {
    main: {
        account: '703082531057',
        accountName: 'awsDM-main',
        accountEmail: 'dearslim99+awsdm@gmail.com',
        region: 'us-east-1',
        stageName: 'main'
    }
}

// define the stack
export interface AWSDataMovementStack {}
// define the pipeline config
export interface pipelineConfig {
    readonly serviceName: string;
    readonly name: string;
    readonly repository: string;
    readonly branch: string;
    readonly connectionArn: string;
    readonly stacks: AWSDataMovementStack;
    readonly stageName: StageName;
}
export const PIPELINE_CONFIG: Record<StageName, pipelineConfig> = {
    main: {
        serviceName: 'AWSDataMovement',
        name: 'AWSDataMovement',
        repository: 'DearSlim520/AWSDataMovement',
        branch: 'main',
        connectionArn: 'arn:aws:codeconnections:us-east-2:703082531057:connection/7f0064e2-e2d1-4da4-8866-84edc2c722c4',
        stageName: 'main',
        stacks: {
        }
    }
};

