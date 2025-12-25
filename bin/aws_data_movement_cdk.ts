#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CodePipelineStack } from '../lib/stacks';
import { PIPELINE_CONFIG, ENVIRONMENTS } from '../lib/config/config';

const app = new cdk.App();

const AWSDataMovementPipeline = new CodePipelineStack(app, 'AWSDataMovementPipelineStackMain', {
    env: ENVIRONMENTS.main,
    pipelineConfig: PIPELINE_CONFIG.main
});
