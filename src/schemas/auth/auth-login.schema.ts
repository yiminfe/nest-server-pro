import { AuthLoginDto } from '@/dtos/auth/auth-login.dto'
import { JSONSchemaType } from 'ajv'

const authLoginSchema: JSONSchemaType<AuthLoginDto> = {
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
    password: { type: 'string' }
  },
  required: ['name', 'password'],
  additionalProperties: false
}

export default authLoginSchema
