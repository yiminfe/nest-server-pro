import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { BusinessException } from '../exceptions/business.exception'
import responseUtil from '@/utils/response.util'

@Catch(BusinessException)
export class BusinessFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    responseUtil(host, null, exception)
  }
}
