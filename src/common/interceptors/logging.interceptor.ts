import { logUtilHttpStart } from '@/utils/log.util'
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    logUtilHttpStart(context.switchToHttp().getRequest())
    return next.handle()
  }
}
