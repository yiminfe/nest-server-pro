import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/entities/user.entity'
import { UserService } from '@/services/user.service'
import { UserController } from '@/controllers/user.controller'
import { Role } from '@/entities/role.entity'
import redisStore from 'cache-manager-redis-store'
import redisConfig from '@/common/configs/redis.config'

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, //秒
      max: 10, //缓存中最大和最小数量
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port
    }),
    TypeOrmModule.forFeature([User, Role])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
