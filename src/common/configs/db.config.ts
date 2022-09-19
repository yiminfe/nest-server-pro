/* eslint-disable @typescript-eslint/no-empty-function */
import { isPrd, isTest } from '@/utils/env.util'

let config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'YiMin110.',
  database: 'test_typeorm',
  logging: true,
  autoLoadEntities: true,
  cache: {
    type: 'redis',
    options: {
      host: 'localhost',
      port: 6379
    },
    duration: 1000 * 60 * 10 // 10 分钟
  }
}

if (isPrd) {
  config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'YiMin110.',
    database: 'test_typeorm_prd',
    logging: false,
    autoLoadEntities: true,
    cache: {
      type: 'redis',
      options: {
        host: 'localhost',
        port: 6379
      },
      duration: 1000 * 60 * 10
    }
  }
}

if (isTest) {
  config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'YiMin110.',
    database: 'test_typeorm',
    logging: false,
    autoLoadEntities: true,
    cache: {
      type: 'redis',
      options: {
        host: 'localhost',
        port: 6379
      },
      duration: 1000 * 60 * 10
    }
  }
}

const dbConfig = config

export default dbConfig
