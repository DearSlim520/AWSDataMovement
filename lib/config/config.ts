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
        account: '962798360015',
        accountName: 'awsDM-main',
        accountEmail: 'dearslim99@gmail.com',
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
        connectionArn: 'arn:aws:codeconnections:us-east-1:962798360015:connection/8b97bd78-45e3-4eff-9f56-c6959516b1e6',
        stageName: 'main',
        stacks: {
        }
    }
};

