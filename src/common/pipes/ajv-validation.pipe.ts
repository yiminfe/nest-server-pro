import { isEmpty } from '@/utils/data.util'
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import Ajv, { Schema } from 'ajv'
import localizeZh from 'ajv-i18n/localize/zh'
import ajvKeywords from 'ajv-keywords'
import addFormats from 'ajv-formats'
import { xssToString } from '@/utils/string.util'

const ajv = new Ajv({ allErrors: false, coerceTypes: true })
ajvKeywords(ajv, ['transform'])
addFormats(ajv)

@Injectable()
export class AjvValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (isEmpty(value)) {
      throw new BadRequestException(`${metadata.type} 参数不能为空`)
    }

    const validate = ajv.compile(this.schema)
    if (!validate(value)) {
      const localizeFn = localizeZh as any
      localizeFn(validate.errors)
      const error = ajv.errorsText(validate.errors, {
        dataVar: metadata.type
      })
      throw new BadRequestException(error)
    }

    return xssToString(value)
  }
}
