import { ThrottlerGuard } from '@nestjs/throttler'
import { Injectable } from '@nestjs/common'
import { logUtilInfo } from '@/utils/log.util'

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected errorMessage = '请求太多，请稍后再试。'

  protected getTracker(req: Record<string, any>): string {
    const ip = req.ips.length ? req.ips[0] : req.ip
    logUtilInfo(`access ip: ${ip}`)
    return ip
  }
}
