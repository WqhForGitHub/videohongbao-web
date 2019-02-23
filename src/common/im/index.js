import { getImSignature } from '../../api/im.js'
const JMessage = require('../../libs/jmessage-wxapplet-sdk-1.4.0.min.js')
let JIM = {}
class IM {
  constructor () {
    JIM = new JMessage({ debug: true })
  }
  async init () {
    const res = await getImSignature()
    // const res = await getIm()
    const data = res.data.data
    JIM.init({
      appkey: data.appkey,
      random_str: data.random_str,
      signature: data.signature,
      timestamp: data.timestamp,
      flag: 1
    }).onSuccess(function (data) {
      console.log('初始化IM成功', data)
    }).onFail(function (data) {
      console.log('初始化IM失败', data)
    })
  }
  register (params) {
    JIM.register(params)
      .onSuccess(function (data) {
        this.login(params)
        console.log('注册成功', data)
      }).onFail(function (data) {
        console.log('注册失败', data)
      })
  }
  login (params) {
    JIM.login(params)
      .onSuccess(function (data) {
        console.log('登录成功', data)
      }).onFail(function (data) {
        console.log('登录失败', data)
      })
  }
  Connect () {
    JIM.isConnect()
  }
}
export default new IM()
