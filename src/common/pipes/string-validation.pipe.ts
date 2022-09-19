import { isEmpty } from '@/utils/data.util'
import {
  BadRequestException,
  PipeTransform,
  Injectable,
  ArgumentMetadata
} from '@nestjs/common'

@Injectable()
export class StringValidationPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const { type } = metadata
    if (isEmpty(value)) {
      throw new BadRequestException(`${type} 参数不能为空`)
    }
    return value
  }
}
