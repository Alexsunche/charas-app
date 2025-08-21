import { Stack, StackProps, CfnOutput, Duration, RemovalPolicy } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns'
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as cognito from 'aws-cdk-lib/aws-cognito'


export class AppStack extends Stack {
constructor(scope: Construct, id: string, props?: StackProps) {
super(scope, id, props)


// 1) DynamoDB (pay-per-request)
const table = new dynamodb.Table(this, 'DataTable', {
partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
removalPolicy: RemovalPolicy.DESTROY // dev only
})


// 2) Cognito (упрощённо)
const userPool = new cognito.UserPool(this, 'UserPool', {
selfSignUpEnabled: true,
signInAliases: { email: true },
autoVerify: { email: true },
passwordPolicy: { minLength: 8 }
})
const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
userPool,
generateSecret: false,
authFlows: { userPassword: true, userSrp: true }
})


// 3) S3 + CloudFront для фронта
const webBucket = new s3.Bucket(this, 'WebBucket', {
blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
removalPolicy: RemovalPolicy.DESTROY, // dev only
autoDeleteObjects: true // dev only
})
const oac = new cloudfront.OriginAccessControl(this, 'OAC', {
originAccessControlName: 'web-oac',
signingBehavior: cloudfront.OriginAccessControlSigningBehaviors.SIGV4,
originAccessControlOriginType: cloudfront.OriginAccessControlOriginTypes.S3
})
const dist = new cloudfront.Distribution(this, 'WebCdn', {
defaultBehavior: {
origin: new origins.S3Origin(webBucket),
viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
}
})
// Разрешаем CloudFront читать из бакета
webBucket.addToResourcePolicy(new iam.PolicyStatement({
actions: ['s3:GetObject'],
resources: [webBucket.arnForObjects('*')],
principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
conditions: {
StringEquals: { 'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${dist.distributionId}` }
}
}