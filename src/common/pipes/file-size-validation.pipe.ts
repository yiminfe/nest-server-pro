import { maxSize } from '@/constants/file.constants'
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      throw new BadRequestException('文件不能为空')
    }
    const files = value as any[]
    const isMax = files.some(file => file.size > maxSize)
    if (isMax) {
      throw new BadRequestException('每个文件不能超过5M')
    }
    return files
  }
}
