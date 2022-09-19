import { noPrd } from '@/utils/env.util'
import { INestApplication } from '@nestjs/common'
import { globalMiddleware } from '../middlewares/global.middleware'
import corsSetup from './cors.setup'
import openApiSetup from './open-api.setup'
import uncaughtExceptionSetup from './uncaught-exception.setup'

export default function setupApp(app: INestApplication) {
  // 加载中间件
  globalMiddleware(app)

  // 其他设置
  uncaughtExceptionSetup()
  noPrd && openApiSetup(app)
  // cors
  corsSetup(app)
}
