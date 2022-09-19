import { AuthSerializer } from '@/common/serializers/auth.serializer'
import { JwtStrategy } from '@/common/strategies/jwt.strategy'
import { jwtSecret } from '@/constants/secret.constants'
import { AuthController } from '@/controllers/auth.controller'
import { AuthService } from '@/services/auth.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from './user.module'
@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '7d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthSerializer],
  exports: [AuthService]
})
export class AuthModule {}
