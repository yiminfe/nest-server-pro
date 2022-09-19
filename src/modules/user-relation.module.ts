import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRelation } from '@/entities/user-relation.entity'
import { UserRelationService } from '@/services/user-relation.service'
import { UserRelationController } from '@/controllers/user-relation.controller'
import { UserModule } from './user.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserRelation]), UserModule],
  controllers: [UserRelationController],
  providers: [UserRelationService]
})
export class UserRelationModule {}
