import { getTranslateBody } from '@/constants/translate.constants'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TranslateService {
  constructor(private readonly httpService: HttpService) {}

  async translate(text: string) {
    let result: any
    try {
      const { data } = await this.httpService.axiosRef.post(
        'api',
        getTranslateBody(text)
      )
      result = data
    } catch (error) {
      throw error
    }
    return result
  }
}
