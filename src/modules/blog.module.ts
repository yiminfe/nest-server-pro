import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Blog } from '@/entities/blog.entity'
import { BlogService } from '@/services/blog.service'
import { BlogController } from '@/controllers/blog.controller'
import { UserModule } from './user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UserModule],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
