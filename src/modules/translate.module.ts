import { Module } from '@nestjs/common'
import { TranslateService } from '@/services/translate.service'
import { TranslateController } from '@/controllers/translate.controller'
import { HttpModule } from '@nestjs/axios'
import { axiosRequestConfig } from '@/constants/translate.constants'

@Module({
  imports: [HttpModule.register(axiosRequestConfig)],
  controllers: [TranslateController],
  providers: [TranslateService]
})
export class TranslateModule {}
