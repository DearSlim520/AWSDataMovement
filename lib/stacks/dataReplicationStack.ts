import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AWSDataMovementEnvironment } from '../config/config';

export interface dataReplicationStackProps extends StackProps {
    readonly env: AWSDataMovementEnvironment;
}

export class dataReplicationStack extends Stack {
    constructor(scope: Construct, id: string, props: dataReplicationStackProps) {
        super(scope, id, props);
        // TODO: Implement data replication components
    }
}
