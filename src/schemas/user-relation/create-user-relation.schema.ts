import { CreateUserRelationDto } from '@/dtos/user-relation/create-user-relation.dto'
import { JSONSchemaType } from 'ajv'

const createRelationSchema: JSONSchemaType<CreateUserRelationDto> = {
  type: 'object',
  properties: {
    userId: { type: 'number', minimum: 1 },
    followId: { type: 'number', minimum: 1 }
  },
  required: ['userId', 'followId'],
  additionalProperties: false
}

export default createRelationSchema
