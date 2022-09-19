import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import responseUtil from '@/utils/response.util'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    responseUtil(host, null, exception)
  }
}
