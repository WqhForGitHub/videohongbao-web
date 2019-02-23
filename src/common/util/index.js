export function isNullObj (o) {
  return JSON.stringify(o) === '{}'
}

export function deepCopy (o) {
  return JSON.parse(JSON.stringify(o))
}

export function getEnumDataByVal (enumData, val) {
  let res = {}
  enumData.forEach((item) => {
    if (item.val === val) res = item
  })
  return res
}

export function isDef (val) {
  return val !== null && typeof val !== 'undefined'
}

export function mergeObjectVal (target = {}, source = {}) {
  Object.keys(target).forEach((key) => {
    if (isDef(source[key])) {
      target[key] = source[key]
    }
  })
}
