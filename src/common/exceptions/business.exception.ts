import { HttpException, HttpStatus } from '@nestjs/common'

export class BusinessException extends HttpException {
  constructor(error: string) {
    super(error, HttpStatus.OK)
  }
}
