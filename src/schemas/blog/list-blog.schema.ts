import { ListBlogDto } from '@/dtos/blog/list-blog.dto'
import { JSONSchemaType } from 'ajv'

const listBlogSchema: JSONSchemaType<ListBlogDto> = {
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
      default: 10,
      nullable: true
    },
    blog: {
      type: 'object',
      nullable: true,
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
        startTime: {
          type: 'string',
          format: 'date',
          nullable: true
        },
        endTime: {
          type: 'string',
          format: 'date',
          nullable: true
        },
        user: {
          type: 'object',
          nullable: true,
          properties: {
            id: {
              type: 'integer',
              minimum: 1,
              nullable: true
            },
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
            realName: { type: 'string', nullable: true }
          },
          additionalProperties: false
        },
        userRelation: {
          type: 'object',
          nullable: true,
          properties: {
            userId: {
              type: 'integer',
              minimum: 1,
              nullable: true
            }
          },
          additionalProperties: false
        }
      }
    }
  },
  required: ['pageIndex'],
  additionalProperties: false
}

export default listBlogSchema
