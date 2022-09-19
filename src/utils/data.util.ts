export function isEmpty(val: any) {
  if (val == null) {
    return true
  }
  if (typeof val === 'string' && val.trim() === '') {
    return true
  }
  if (val instanceof Object && Object.keys(val).length === 0) {
    return true
  }
  return false
}
