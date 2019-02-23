import { apiURL } from '../config/api.cfg'
import Fly from 'flyio/dist/npm/wx'
import store from '../store'
const fly = new Fly()

export const qnAction = 'https://upload-z2.qiniup.com'
// export const qnAction = window.location.protocol === 'https:' ? 'https://up-z2.qbox.me' : 'http://up-z2.qiniu.com'

export const getUploadDomain = () => fly.get(apiURL.QN_DOMAIN)

export const getQnToken = () => fly.get(apiURL.QN_TOKEN)

export const upload = (file) => {
  const { qnToken } = store.getters
  const formData = new window.FormData()
  formData.append('token', qnToken)
  formData.append('file', file)
  return fly.post(apiURL.QN_ACTION, formData)
}
