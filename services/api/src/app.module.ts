// services/api/src/app.module.ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module' // ← путь и импорт

@Module({
  imports: [AuthModule], // ← ОБЯЗАТЕЛЬНО
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
