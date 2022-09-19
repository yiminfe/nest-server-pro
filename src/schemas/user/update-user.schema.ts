import { UpdateUserDto } from '@/dtos/user/update-user.dto'
import { JSONSchemaType } from 'ajv'

const updateUserSchema: JSONSchemaType<UpdateUserDto> = {
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
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
      nullable: true
    },
    password: { type: 'string', nullable: true },
    realName: { type: 'string', nullable: true }
  },
  additionalProperties: false
}

export default updateUserSchema
