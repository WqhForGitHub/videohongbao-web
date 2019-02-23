function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  return `${t1} ${t2}`
}

export function isDef (val) {
  return val !== null && typeof val !== 'undefined'
}
export function deepCopy (o) {
  return JSON.parse(JSON.stringify(o))
}
export function mergeObjectVal (target = {}, source = {}) {
  Object.keys(target).forEach((key) => {
    if (isDef(source[key])) {
      target[key] = source[key]
    }
  })
}
export function formatTimes (date) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  return `${t2}`
}
export default {
  formatNumber,
  formatTime,
  formatTimes
}
