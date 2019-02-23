// const store = window.localStorage

const StorePro = function (key, data) {
  const handleType = typeof data !== 'undefined' ? 'set' : 'get'
  if (handleType === 'set') {
    if (typeof data === 'object') data = JSON.stringify(data)
    wx.setStorage({
      key: key,
      data: data
    })
  } else if (handleType === 'get') {
    let localData
    wx.getStorage({
      key: key,
      success: (res) => {
        localData = res.data
      }
    })
    try {
      const jsonData = JSON.parse(localData)
      localData = jsonData
    } catch (e) {
    }
    return localData
  }
}

StorePro.prototype.remove = function (key) {
  wx.removeStorage({
    key: key
  })
}

export default StorePro
