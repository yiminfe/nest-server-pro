import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import dbConfig from '@/common/configs/db.config'
import { UserModule } from '@/modules/user.module'
import { DataSourceOptions } from 'typeorm'
import { BlogModule } from '@/modules/blog.module'
import { UserRelationModule } from '@/modules/user-relation.module'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { AllExceptionFilter } from '@/common/filters/all-exception.filter'
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { BusinessFilter } from '@/common/filters/business.filter'
import { AtRelationModule } from './at-relation.module'
import { AuthModule } from './auth.module'
import { RolesGuard } from '@/common/guards/roles.guard'
import { FileModule } from './file.module'
import { TranslateModule } from './translate.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerBehindProxyGuard } from '@/common/guards/throttler-behind-proxy.guard'
import { filePath } from '@/constants/file.constants'
import { ServeStaticModule } from '@nestjs/serve-static'
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'

// 业务模块
const businessModules = [
  AuthModule,
  BlogModule,
  UserModule,
  UserRelationModule,
  AtRelationModule,
  TranslateModule,
  FileModule
]

// 全局守卫
const appGuardProviders = [
  {
    provide: APP_GUARD,
    useClass: ThrottlerBehindProxyGuard
  },
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard
  }
]

// 全局拦截器
const appInterceptorProviders = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  }
]

// 全局过滤器
const appFilterProviders = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionFilter
  },
  {
    provide: APP_FILTER,
    useClass: BusinessFilter
  }
]

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // 时间秒
      limit: 100 // 每个ip最大请求数
    }),
    TypeOrmModule.forRoot(dbConfig as DataSourceOptions),
    ServeStaticModule.forRoot({
      rootPath: filePath,
      exclude: ['/api*']
    }),
    ...businessModules
  ],
  providers: [
    ...appGuardProviders,
    ...appFilterProviders,
    ...appInterceptorProviders
  ]
})
export class AppModule {}
