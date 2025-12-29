import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
// import { } from '../stages/applicationStage';
import { pipelineConfig, AWSDataMovementEnvironment } from '../config/config';

export interface PipelineStackProps extends StackProps {
  pipelineConfig: pipelineConfig;
};

export class CodePipelineStack extends Stack {
    public readonly devPipeline: pipelines.CodePipeline;

    constructor(scope: Construct, id: string, props: PipelineStackProps) {
        super(scope, id, props);

        this.devPipeline = new pipelines.CodePipeline(this, `AWSDataMovementPipeline${props.pipelineConfig.stageName}`, {
            pipelineName: props.pipelineConfig.name,
            synth: new pipelines.ShellStep('Synth', {
                input: pipelines.CodePipelineSource.connection(
                    props.pipelineConfig.repository,
                    props.pipelineConfig.branch,
                    {
                        connectionArn: props.pipelineConfig.connectionArn,
                    }
                ),
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth --output cdk.out --app "npx ts-node bin/aws_data_movement_cdk.ts"',
                    'npx cdk synth'
                ],
                primaryOutputDirectory: 'cdk.out',
            }),
        });
    }
}