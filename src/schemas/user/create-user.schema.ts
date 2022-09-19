import { CreateUserDto } from '@/dtos/user/create-user.dto'
import { JSONSchemaType } from 'ajv'

const createUserSchema: JSONSchemaType<CreateUserDto> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 10,
      minLength: 2,
      allOf: [
        {
          transform: ['trim']
        }
      ],
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$'
    },
    password: { type: 'string' },
    realName: { type: 'string', nullable: true }
  },
  required: ['name', 'password'],
  additionalProperties: false
}

export default createUserSchema
