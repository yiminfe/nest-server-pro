import { AxiosRequestConfig } from 'axios'
import { createHash, randomUUID } from 'crypto'
import { translateSecret } from './secret.constants'

export const axiosRequestConfig: AxiosRequestConfig = {
  timeout: 5000,
  maxRedirects: 5,
  baseURL: 'https://openapi.youdao.com',
  headers: {
    'content-type': 'multipart/form-data'
  }
}

const appKey = '4aaf3dbc52c4138c'
const salt = randomUUID()

function truncate(q) {
  const len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}

export function getTranslateBody(text: string) {
  const curtime = Math.round(new Date().getTime() / 1000)
  let sign = appKey + truncate(text) + salt + curtime + translateSecret
  sign = createHash('sha256').update(sign).digest('hex')
  return {
    q: text,
    from: 'en',
    to: 'zh-CHS',
    appKey,
    salt,
    sign,
    ext: 'mp3',
    signType: 'v3',
    curtime
  }
}
