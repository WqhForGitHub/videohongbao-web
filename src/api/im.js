import Fly from 'flyio/dist/npm/wx'
// import qs from 'qs'
import { apiURL } from '../config/api.cfg'
const fly = new Fly()
export const getImSignature = () => fly.post(apiURL.HONGBAO_SV_ACERTIFICATION)
export const getIm = () => fly.get('http://192.168.1.79:8080/didi/im/auth')
