import { Public } from '@/common/decorators/public.decorator'
import { AjvValidationPipe } from '@/common/pipes/ajv-validation.pipe'
import { AuthLoginDto } from '@/dtos/auth/auth-login.dto'
import authLoginSchema from '@/schemas/auth/auth-login.schema'
import { AuthService } from '@/services/auth.service'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body(new AjvValidationPipe(authLoginSchema)) authLoginDto: AuthLoginDto
  ) {
    return this.authService.login(authLoginDto)
  }

  @Get('profile')
  getProfile(@Request() request) {
    return request.user
  }
}
