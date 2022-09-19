import { logUtilSystemError } from '@/utils/log.util'

export default function uncaughtExceptionSetup() {
  process.on('uncaughtException', exception => {
    logUtilSystemError(exception)
  })
}
