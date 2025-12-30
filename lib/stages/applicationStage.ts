import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { pipelineConfig, ENVIRONMENTS } from '../config/config';
import * as awsDMStacks from '../stacks';

export interface ApplicationStageProps extends StageProps {
  readonly pipelineConfig: pipelineConfig;
}

export class ApplicationStage extends Stage {
    public readonly dataIngestion?: awsDMStacks.dataIngestionStack;
    public readonly dataReplication?: awsDMStacks.dataReplicationStack;
    public readonly dataBackfill?: awsDMStacks.dataBackfillStack;

    constructor(scope: Construct, id: string, props: ApplicationStageProps) {
        super(scope, id, {
            ...props,
            env: ENVIRONMENTS[props.pipelineConfig.stageName],
        });

        // Instantiate stacks based on configuration
        if (props.pipelineConfig.stacks.dataIngestionStack) {
            this.dataIngestion = new awsDMStacks.dataIngestionStack(this, 'dataIngestion', {
                ...props.pipelineConfig.stacks.dataIngestionStack,
                env: ENVIRONMENTS[props.pipelineConfig.stageName],
            });
        }

        if (props.pipelineConfig.stacks.dataReplicationStack) {
            this.dataReplication = new awsDMStacks.dataReplicationStack(this, 'dataReplication', {
                ...props.pipelineConfig.stacks.dataReplicationStack,
                env: ENVIRONMENTS[props.pipelineConfig.stageName],
            });
        }

        if (props.pipelineConfig.stacks.dataBackfillStack) {
            this.dataBackfill = new awsDMStacks.dataBackfillStack(this, 'dataBackfill', {
                ...props.pipelineConfig.stacks.dataBackfillStack,
                env: ENVIRONMENTS[props.pipelineConfig.stageName],
            });
        }
    }
}
