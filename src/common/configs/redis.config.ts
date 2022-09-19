/* eslint-disable @typescript-eslint/no-empty-function */
import { isPrd } from '@/utils/env.util'

let config = {
  host: 'localhost',
  port: 6379
}

if (isPrd) {
  config = {
    host: 'localhost',
    port: 6379
  }
}

const redisConfig = config

export default redisConfig
