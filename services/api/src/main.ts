import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter } from '@nestjs/platform-fastify'


async function bootstrap() {
const app = await NestFactory.create(AppModule, new FastifyAdapter())
app.enableCors({ origin: true }) // в проде зафиксируй список доменов
const port = Number(process.env.PORT || 3000)
await app.listen(port, '0.0.0.0')
}
bootstrap()