import { Environment } from 'aws-cdk-lib';
import { Stage } from 'aws-cdk-lib/aws-apigateway';

// define the pipeline config, for now we only have one
export type StageName = 'dev'

// define the environment
export interface AWSDataMovementEnvironment extends Environment {
    readonly accountName: string;
    readonly accountEmail: string;
    readonly region: string;
    readonly stageName: StageName;
}
export const ENVIRONMENTS: Record<StageName, AWSDataMovementEnvironment> = {
    dev: {
        account: '962798360015',
        accountName: 'awsDM-dev',
        accountEmail: 'dearslim99@gmail.com',
        region: 'us-east-1',
        stageName: 'dev'
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
    dev: {
        serviceName: 'AWSDataMovement',
        name: 'AWSDataMovement',
        repository: 'DearSlim520/AWSDataMovement',
        branch: 'dev',
        connectionArn: 'arn:aws:codeconnections:us-east-1:962798360015:connection/4b23b025-37cd-44d9-9931-7728109b6aeb',
        stageName: 'dev',
        stacks: {
        }
    }
};

