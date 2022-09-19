import { CreateBlogDto } from '@/dtos/blog/create-blog.dto'
import { JSONSchemaType } from 'ajv'

const createBlogSchema: JSONSchemaType<CreateBlogDto> = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      maxLength: 100,
      minLength: 1,
      allOf: [
        {
          transform: ['trim']
        }
      ]
    },
    title: {
      type: 'string',
      maxLength: 100,
      minLength: 1,
      allOf: [
        {
          transform: ['trim']
        }
      ]
    },
    userId: { type: 'number', minimum: 1 },
    atUserIds: {
      type: 'array',
      items: { type: 'integer', minimum: 1 },
      minItems: 1,
      uniqueItems: true,
      nullable: true
    }
  },
  required: ['content', 'title', 'userId'],
  additionalProperties: false
}

export default createBlogSchema
