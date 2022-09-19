import crypto from 'crypto'
import { passwordSecret } from '@/constants/secret.constants'

function md5(content: string) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

export function getCrypto(password: string) {
  const str = `!!)(**&%password=${password}&key=${passwordSecret}%^&&!@@#s`
  return md5(str)
}
