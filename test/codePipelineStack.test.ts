import { App } from 'aws-cdk-lib';
import { CodePipelineStack } from '../lib/stacks';
import { PIPELINE_CONFIG } from '../lib/config/config';

test('CodePipelineStack creates successfully', () => {
  const app = new App();
  const stack = new CodePipelineStack(app, 'TestStack', {
    pipelineConfig: PIPELINE_CONFIG.main
  });
  expect(stack.devPipeline).toBeDefined();
});
