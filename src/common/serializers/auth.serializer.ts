import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

@Injectable()
export class AuthSerializer extends PassportSerializer {
  serializeUser(payload: any, done: CallableFunction) {
    payload && done(null, payload)
  }

  deserializeUser(payload: any, done: CallableFunction) {
    payload && done(null, payload)
  }
}
