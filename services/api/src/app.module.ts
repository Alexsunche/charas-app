import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ItemsController } from './items.controller'
import { DbService } from './db.service'


@Module({
controllers: [AppController, ItemsController],
providers: [DbService]
})
export class AppModule {}