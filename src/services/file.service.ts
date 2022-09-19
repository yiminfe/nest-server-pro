import { getFilePath } from '@/constants/file.constants'
import { Injectable } from '@nestjs/common'
import fs from 'fs-extra'
import crypto from 'crypto'

@Injectable()
export class FileService {
  async uploadFile(files: Array<Express.Multer.File>) {
    const filePaths: string[] = []
    try {
      for (const item of files) {
        const { originalname, buffer } = item
        const suffix = originalname.split('.').pop()
        const filePath = `${crypto.randomUUID()}.${suffix || ''}`
        await fs.outputFile(getFilePath(filePath), buffer)
        filePaths.push(filePath)
      }
    } catch (err) {
      throw err
    }

    return filePaths
  }
}
