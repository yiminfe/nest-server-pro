import { snakeCase, startCase, camelCase } from 'lodash'
import xss from 'xss'

export function toSnakeCase(str: string) {
  str = snakeCase(str)
  return str.replace('_', '-')
}

export function toPascalCase(str: string) {
  str = startCase(str)
  return str.replace(' ', '')
}

export function toCamelCase(str: string) {
  return camelCase(str)
}

export function sqlTypeToType(sqlType: string) {
  const type = {
    varchar: 'string',
    text: 'string',
    int: 'number',
    datetime: 'Date'
  }
  return type[sqlType]
}

export function xssToString(val: any) {
  const valType = typeof val
  if (val == null || valType !== 'object') {
    if (valType === 'string') {
      return xss(val)
    }
    return val
  }

  if (Array.isArray(val)) {
    for (let index = 0; index < val.length; index++) {
      const item = val[index]
      val[index] = xssToString(item)
    }
  }

  if (valType === 'object') {
    for (const key in val) {
      val[key] = xssToString(val[key])
    }
  }
  return val
}
