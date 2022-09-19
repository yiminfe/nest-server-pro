import { PartialType } from '@nestjs/mapped-types'
import { CreateUserRelationDto } from './create-user-relation.dto'

export class UpdateUserRelationDto extends PartialType(CreateUserRelationDto) {
  followId?: number
  userId?: number
}
