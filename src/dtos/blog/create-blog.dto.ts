export class CreateBlogDto {
  content: string
  title: string
  userId: number
  atUserIds?: number[]
}
