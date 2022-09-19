import { HomeBlogDto } from '@/dtos/blog/home-blog.dto'
import { JSONSchemaType } from 'ajv'

const homeBlogSchema: JSONSchemaType<HomeBlogDto> = {
  type: 'object',
  properties: {
    pageIndex: {
      type: 'integer',
      minimum: 1
    },
    pageSize: {
      type: 'integer',
      minimum: 10,
      maximum: 50,
      multipleOf: 10,
      nullable: true
    },
    userId: {
      type: 'integer',
      minimum: 1
    }
  },
  required: ['pageIndex', 'userId'],
  additionalProperties: false
}

export default homeBlogSchema
