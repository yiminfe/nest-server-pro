import { Controller, Param, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TranslateService } from '@/services/translate.service'
import { Public } from '@/common/decorators/public.decorator'
import { StringValidationPipe } from '@/common/pipes/string-validation.pipe'

@ApiTags('translate')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Get(':text')
  @Public()
  translate(@Param('text', StringValidationPipe) text: string) {
    return this.translateService.translate(text)
  }
}
