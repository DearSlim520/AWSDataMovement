import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AWSDataMovementEnvironment } from '../config/config';

export interface dataBackfillStackProps extends StackProps {
    readonly env: AWSDataMovementEnvironment;
}

export class dataBackfillStack extends Stack {
    constructor(scope: Construct, id: string, props: dataBackfillStackProps) {
        super(scope, id, props);
        // TODO: Implement data backfill components
    }
}
