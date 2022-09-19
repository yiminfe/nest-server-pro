import { AuthLoginDto } from '@/dtos/auth/auth-login.dto'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  validateUser(authLoginDto: AuthLoginDto) {
    return this.userService.login(authLoginDto)
  }

  async login(authLoginDto: AuthLoginDto) {
    const payload = await this.userService.login(authLoginDto)
    return {
      access_token: this.jwtService.sign({ ...payload })
    }
  }
}
