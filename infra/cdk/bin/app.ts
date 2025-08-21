#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'
import { AppStack } from '../lib/app-stack'


const app = new App()
new AppStack(app, 'MyAppStack', {
env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION || 'eu-central-1' }
})