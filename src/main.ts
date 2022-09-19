import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import setupApp from './common/setups/index.setup'
import { AppModule } from './modules/index.module'
import { noTest } from './utils/env.util'
import { logUtilInfo } from './utils/log.util'

export async function getApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  setupApp(app)
  return app
}

async function bootstrap() {
  const app = await getApp()
  await app.listen(3000, '0.0.0.0')
  logUtilInfo(`Application is running on: ${await app.getUrl()}`)
}
noTest && bootstrap()
