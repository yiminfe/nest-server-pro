import { UpdateBlogDto } from '@/dtos/blog/update-blog.dto'
import { JSONSchemaType } from 'ajv'

const updateBlogSchema: JSONSchemaType<UpdateBlogDto> = {
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
      ],
      nullable: true
    },
    title: {
      type: 'string',
      maxLength: 100,
      minLength: 1,
      allOf: [
        {
          transform: ['trim']
        }
      ],
      nullable: true
    },
    userId: { type: 'number', minimum: 1, nullable: true },
    atUserIds: {
      type: 'array',
      items: { type: 'integer', minimum: 1 },
      minItems: 1,
      uniqueItems: true,
      nullable: true
    }
  },
  additionalProperties: false
}

export default updateBlogSchema
