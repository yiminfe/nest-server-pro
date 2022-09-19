import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AtRelation } from '@/entities/at-relation.entity'
import { AtRelationService } from '@/services/at-relation.service'
import { AtRelationController } from '@/controllers/at-relation.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AtRelation])],
  controllers: [AtRelationController],
  providers: [AtRelationService]
})
export class AtRelationModule {}
