import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { DbService } from './db.service'


@Controller('items')
export class ItemsController {
constructor(private readonly db: DbService) {}


@Post()
async create(@Body() body: any) {
const pk = body?.pk || `item#${Date.now()}`
return this.db.put({ pk, ...body })
}


@Get(':pk')
async read(@Param('pk') pk: string) {
const item = await this.db.get(pk)
return item || { notFound: true }
}
}