import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }

    const result = (await super.canActivate(context)) as boolean
    if (result) {
      // 同步session
      const ctx = context.switchToHttp()
      const request = ctx.getRequest()
      await super.logIn(request)
    }
    return result
  }

  handleRequest(err, user, info) {
    if (err || !user || info) {
      throw new UnauthorizedException('请先登录~')
    }
    return user
  }
}
