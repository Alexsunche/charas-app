// services/api/src/main.ts
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import 'reflect-metadata'
import { AppModule } from './app.module'

// --- FASTIFY ---
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: ['log', 'error', 'warn', 'debug'] }, // логи + маппинг роутов
  )

  // если где-то раньше ставил префикс — УБЕРИ его
  // app.setGlobalPrefix('api') // <- НЕ делаем для этого примера

  app.enableCors({ origin: true, credentials: true })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  // whitelist — убирает лишние поля, которые не описаны в DTO
  console.log('API started', process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0')

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0')
}
bootstrap()
