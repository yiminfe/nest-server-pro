import { sessionSecret } from '@/constants/secret.constants'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import helmet from 'helmet'
import csurf from 'csurf'
import { isPrd } from '@/utils/env.util'
import { INestApplication } from '@nestjs/common'
import passport from 'passport'

export function globalMiddleware(app: INestApplication) {
  // 解析 session
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false
    })
  )

  // 解析 cookie
  app.use(cookieParser())

  // passport
  app.use(passport.initialize(), passport.session())

  if (isPrd) {
    // 安全 csrf
    app.use(csurf())
  }

  // 安全 helmet
  app.use(helmet())
}
