import { Injectable } from '@nestjs/common'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb'

@Injectable()
export class DbService {
  private readonly table = process.env.TABLE_NAME || 'LocalTable'
  private readonly ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}))

  async put(item: any) {
    await this.ddb.send(new PutCommand({ TableName: this.table, Item: item }))
    return item
  }

  async get(pk: string) {
    const res = await this.ddb.send(new GetCommand({ TableName: this.table, Key: { pk } }))
    return res.Item
  }
}
