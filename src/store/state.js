import StorePro from '../utils/store-pro'
const state = {
  userInfo: {},
  qnToken: StorePro('qnToken') || '',
  uploadDomain: StorePro('uploadDomain') || '',
	AvatarUrl:'',
	name:'',
	password:'',
	ID:''
}

export default state
