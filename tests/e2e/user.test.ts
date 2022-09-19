import { CreateUserDto } from '@/dtos/user/create-user.dto'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { getApp } from '@/main'

describe('User - /user (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await getApp()
    await app.init()
  })

  const user: CreateUserDto = {
    name: 'zh7g123',
    password: 'password',
    realName: 'zhangsan123'
  }
  let userId

  it('Create one user [POST /user]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/user')
      .set('Authorization', global.token)
      .send(user)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    userId = data.id
    expect(userId).toBeDefined()
    expect(data.name).toBe(user.name)
    // expect(data.password).toBe(user.password)
    expect(data.realName).toBe(user.realName)
  })

  it('Get one user [GET /user/:id]', async () => {
    if (!userId) return
    const { body } = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .set('Authorization', global.token)
      .expect(200)
    const { data } = body
    expect(data).toBeDefined()
    expect(data.id).toBe(userId)
    expect(data.name).toBe(user.name)
    // expect(data.password).toBe(user.password)
    expect(data.realName).toBe(user.realName)
  })

  it('Get all user [GET /user]', async () => {
    if (!userId) return
    const { body } = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', global.token)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    const userData = data[0]
    expect(userData).toBeDefined()
    expect(userData.id).toBe(userId)
    expect(userData.name).toBe(user.name)
    // expect(userData.password).toBe(user.password)
    expect(userData.realName).toBe(user.realName)
  })

  it('Update one user [Patch /user/:id]', async () => {
    if (!userId) return
    for (const key in user) {
      user[key] = user[key] + 1
    }
    const { body } = await request(app.getHttpServer())
      .patch(`/user/${userId}`)
      .set('Authorization', global.token)
      .send(user)
      .expect(200)
    expect(body).toBeDefined()
    const { data } = body
    expect(data).toBeDefined()
    expect(data.id).toBe(userId)
    expect(data.name).toBe(user.name)
    // expect(data.password).toBe(user.password)
    expect(data.realName).toBe(user.realName)
  })

  it('Delete one user [DELETE /user/:id]', async () => {
    if (!userId) return
    const { body } = await request(app.getHttpServer())
      .delete(`/user/${userId}`)
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
