export class ListBlogDto {
  pageIndex: number
  pageSize?: number
  blog?: {
    content?: string
    title?: string
    startTime?: string
    endTime?: string
    user?: {
      id?: number
      name?: string
      realName?: string
    }
    userRelation?: {
      userId?: number
    }
  }
}
