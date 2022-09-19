import fs from 'node:fs'

type replaceCodeType = (code: string) => string

export function updateSourceCode(path: string, replaceCode: replaceCodeType) {
  if (!fs.existsSync(path)) {
    throw new Error(`${path} does not exist`)
  }
  try {
    let code = fs.readFileSync(path, 'utf8')
    code = replaceCode(code)
    fs.writeFileSync(path, code)
    console.info(`The ${path} source code update succeeded`)
  } catch (err) {
    throw new Error(`Failed to modify the source code:${err}`)
  }
}

export function checkSourceCodePath(path: string) {
  if (!fs.existsSync(path)) {
    return false
  }
  return true
}
