import { CreateBlogDto } from '@/dtos/blog/create-blog.dto'
import { ListBlogDto } from '@/dtos/blog/list-blog.dto'
import { getApp } from '@/main'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { getTodayTime } from '../../src/utils/date.util'

describe('Blog - /blog (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getApp()
    await app.init()
  })

  const blog: CreateBlogDto = {
    content: '博客内容',
    title: '博客标题',
    userId: 110
  }
  let blogId

  it('Create one blog [POST /blog]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/blog')
      .set('Authorization', global.token)
      .send(blog)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    blogId = data.id
    expect(blogId).toBeDefined()
    expect(data.content).toBe(blog.content)
    expect(data.title).toBe(blog.title)
    expect(data.userId).toBe(blog.userId)
  })

  it('Get one blog [GET /blog/:id]', async () => {
    if (!blogId) return
    const { body } = await request(app.getHttpServer())
      .get(`/blog/${blogId}`)
      .set('Authorization', global.token)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    expect(data.id).toBe(blogId)
    expect(data.content).toBe(blog.content)
    expect(data.title).toBe(blog.title)
    expect(data.userId).toBe(blog.userId)
  })

  it('Get all blog [GET /blog]', async () => {
    if (!blogId) return
    const { body } = await request(app.getHttpServer())
      .get('/blog')
      .set('Authorization', global.token)
      .send(blog)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    const blogData = data[0]
    expect(blogData).toBeDefined()
    expect(blogData.id).toBe(blogId)
    expect(blogData.content).toBe(blog.content)
    expect(blogData.title).toBe(blog.title)
    expect(blogData.userId).toBe(blog.userId)
  })

  it('Get page list blog [POST /blog]', async () => {
    if (!blogId) return
    const listBlog: ListBlogDto = {
      pageIndex: 1,
      pageSize: 10,
      blog: {
        content: blog.content,
        title: blog.title,
        startTime: getTodayTime(),
        endTime: getTodayTime()
      }
    }
    const { body } = await request(app.getHttpServer())
      .post('/blog/list')
      .set('Authorization', global.token)
      .send(listBlog)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    expect(data.count).toBe(1)
    expect(data.pageIndex).toBe(listBlog.pageIndex)
    expect(data.pageSize).toBe(listBlog.pageSize)
    expect(data.list).toBeDefined()
    const blogData = data.list[0]
    expect(blogData).toBeDefined()
    expect(blogData.id).toBe(blogId)
    expect(blogData.content).toBe(blog.content)
    expect(blogData.title).toBe(blog.title)
    expect(blogData.userId).toBe(blog.userId)
  })

  it('Update one blog [Patch /blog/:id]', async () => {
    if (!blogId) return
    for (const key in blog) {
      if (typeof blog[key] === 'number') continue
      blog[key] = blog[key] + 1
    }
    const { body } = await request(app.getHttpServer())
      .patch(`/blog/${blogId}`)
      .set('Authorization', global.token)
      .send(blog)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    expect(data.id).toBe(blogId)
    expect(data.content).toBe(blog.content)
    expect(data.title).toBe(blog.title)
    expect(data.userId).toBe(blog.userId)
  })

  it('Delete one blog [DELETE /blog/:id]', async () => {
    if (!blogId) return
    const { body } = await request(app.getHttpServer())
      .delete(`/blog/${blogId}`)
      .set('Authorization', global.token)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    expect(data).toBe(true)
  })

  afterAll(async () => {
    await app.close()
  })
})
