import { allowlist } from '@/constants/cors.constants'
import { noPrd } from '@/utils/env.util'
import { ForbiddenException, INestApplication } from '@nestjs/common'

function corsOptionsDelegate(request, callback) {
  const corsOptions = { origin: noPrd }
  if (allowlist.indexOf(request.header('Origin')) !== -1) {
    corsOptions.origin = true
    callback(null, corsOptions)
  } else {
    callback(
      noPrd ? null : new ForbiddenException('不允许跨域请求该资源~'),
      corsOptions
    )
  }
}

export default function corsSetup(app: INestApplication) {
  app.enableCors(corsOptionsDelegate)
}
