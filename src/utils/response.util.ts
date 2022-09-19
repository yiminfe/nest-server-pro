import { getFormatTime } from './date.util'
import { logUtilHttpEnd } from '@/utils/log.util'
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { ApiStatusType } from './log.util'
import { BusinessException } from '@/common/exceptions/business.exception'
import { TimeoutError } from 'rxjs'

export default function responseUtil(
  host: ArgumentsHost,
  data?: any,
  exception?: Error
) {
  const ctx = host.switchToHttp()
  const response = ctx.getResponse()
  const request = ctx.getRequest()

  let statusCode = HttpStatus.OK
  let status = 0
  let message = '请求成功'
  let apiStatus = ApiStatusType.SUCCESSFUL

  if (exception) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    apiStatus = ApiStatusType.SERVER_EXCEPTION

    // http异常
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus()
    }

    // CSRF ForbiddenError
    if ((exception as any).code === 'EBADCSRFTOKEN') {
      statusCode = HttpStatus.FORBIDDEN
    }

    // 404
    if (exception['statusCode'] === 404) {
      statusCode = HttpStatus.NOT_FOUND
    }

    if (statusCode < HttpStatus.INTERNAL_SERVER_ERROR) {
      // 区分是 客户端错误，还是服务端异常
      apiStatus = ApiStatusType.CLIENT_EXCEPTION
      message = exception.message
    } else {
      message = 'server 端异常'
    }

    // 客户端业务错误
    if (exception instanceof BusinessException) {
      apiStatus = ApiStatusType.BUSINESS_EXCEPTION
    }

    if (exception instanceof TimeoutError) {
      message = 'server 端处理超时'
    }

    status = statusCode === HttpStatus.OK ? 1 : -1
  }

  const responseData = {
    timestamp: getFormatTime(),
    path: request.url,
    statusCode,
    status,
    data,
    message
  }

  logUtilHttpEnd(request, responseData, statusCode, apiStatus, exception)
  if (exception) {
    response.status(statusCode).json(responseData)
  } else {
    return responseData
  }
}
