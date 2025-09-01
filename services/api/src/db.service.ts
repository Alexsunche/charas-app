// services/api/src/db.service.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class DbService implements OnModuleInit {
  private readonly table = process.env.TABLE_NAME || 'LocalTable'
  private ddb!: DynamoDBDocumentClient

  onModuleInit() {
    const endpoint = process.env.DDB_ENDPOINT // например 'http://127.0.0.1:8000' или 'http://localhost:8000'
    const region = process.env.AWS_REGION || 'us-east-1'
    const isLocal = Boolean(endpoint)

    const client = new DynamoDBClient({
      region,
      endpoint: endpoint || undefined,
      // для локалки — всегда фиктивные креды (чтобы SDK не полез в профили/SSO)
      credentials: isLocal
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
          }
        : undefined,
    })

    this.ddb = DynamoDBDocumentClient.from(client, {
      marshallOptions: { removeUndefinedValues: true },
    })

    console.log('[DDB init]', {
      table: this.table,
      endpoint: endpoint || '(aws cloud)',
      region,
      isLocal,
    })
  }

  async put(item: any) {
    await this.ddb.send(new PutCommand({ TableName: this.table, Item: item }))
    return item
  }
  async get(pk: string) {
    const res = await this.ddb.send(new GetCommand({ TableName: this.table, Key: { pk } }))
    return res.Item
  }
  async scanBeginsWith(prefix: string) {
    const res = await this.ddb.send(
      new ScanCommand({
        TableName: this.table,
        FilterExpression: 'begins_with(#pk, :p)',
        ExpressionAttributeNames: { '#pk': 'pk' },
        ExpressionAttributeValues: { ':p': prefix },
      }),
    )
    return res.Items ?? []
  }
}
