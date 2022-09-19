import { getCrypto } from '@/utils/crypto.util'

describe('crypto工具类:单元测试', () => {
  it('getCrypto测试', async () => {
    const password1 = await getCrypto('123456')
    const password2 = await getCrypto('123456')
    expect(password1).toBe(password2)
  })
})
