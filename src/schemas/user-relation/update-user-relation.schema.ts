import { UpdateUserRelationDto } from '@/dtos/user-relation/update-user-relation.dto'
import { JSONSchemaType } from 'ajv'

const updateRelationSchema: JSONSchemaType<UpdateUserRelationDto> = {
  type: 'object',
  properties: {
    userId: { type: 'number', minimum: 1, nullable: true },
    followId: { type: 'number', minimum: 1, nullable: true }
  },
  additionalProperties: false
}

export default updateRelationSchema
