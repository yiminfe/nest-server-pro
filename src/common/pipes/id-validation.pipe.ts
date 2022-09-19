import { isEmpty } from '@/utils/data.util'
import {
  BadRequestException,
  PipeTransform,
  Injectable,
  ArgumentMetadata
} from '@nestjs/common'

@Injectable()
export class IdValidationPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const { type, data } = metadata
    if (isEmpty(value)) {
      throw new BadRequestException(`${type} 参数不能为空`)
    }
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException(
        `${metadata.type} 中属性 ${data} = ${value} 应当是 整数类型`
      )
    }
    if (val < 0) {
      throw new BadRequestException(
        `${metadata.type} 中属性 ${data} = ${value} 应当是大于等于0`
      )
    }
    return val
  }
}
