import { createClient } from 'redis'

const { REDIS_CONF } = require('../conf/db.js')

// HACK: 创建Redis连接
const redisClient = createClient({
  url: `redis://:${REDIS_CONF.password}@${REDIS_CONF.host}:${REDIS_CONF.port}`,
  legacyMode: true
})
redisClient.connect()

redisClient.on('error', error => {
  console.error('Redis connection fails:', error)
})

redisClient.on('connect', () => {
  console.info('Redis connection is successful')
})

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  return redisClient.set(key, val)
}

function get(key) {
  return new Promise(resolve => {
    redisClient.get(key).then(
      val => {
        if (val == null) {
          resolve(null)
          return
        }
        try {
          resolve(JSON.parse(val))
        } catch (error) {
          resolve(val)
        }
      },
      err => reject(err)
    )
  })
}

module.exports = {
  set,
  get,
  redisClient
}

// !(async () => {
//   set('myName', '小民同学')
//   let val = await get('myName')
//   console.log('val:', val)
// })()
