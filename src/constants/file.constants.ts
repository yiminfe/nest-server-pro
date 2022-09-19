import path from 'path'

export const maxSize = 1024 * 1024 * 100 // 100M

export const filePath = path.join(__dirname, '../../uploadFiles')
export function getFilePath(fileName: string) {
  return path.join(filePath, fileName)
}
