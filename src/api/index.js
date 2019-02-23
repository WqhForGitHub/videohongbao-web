import Fly from 'flyio/dist/npm/wx'
import qs from 'qs'
import { getQnToken, getUploadDomain } from './upload.js'
import { apiURL, statusCode } from '../config/api.cfg'
const fly = new Fly()

// 添加响应拦截器,响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    if (response.data.code === statusCode.UNAUTHORIZED) {
      uni.redirectTo({ url: '/pages/login/main' })
    }
    uni.hideLoading()
    return response

  },
  (error) => {
		// 发生网络错误
    Promise.reject(error)
  }
)

// 添加请求拦截器
fly.interceptors.request.use((request) => {
	  if (request.url !== 'https://sphb.25010086.com/apiproxy/sv/video/list/publish') {
		uni.showLoading({ title: '加载中' })
	  }
	  // 取出token
	  var token = ''
	  uni.getStorage({
		key: 'token',
		success: (res) => {
			token = res.data
			console.log(token);
		}
	});
	
	request.headers['x-auth-token'] = token
})


getQnToken()
  .then((res) => {
    uni.setStorageSync('qnToken', res.data.data)
  })
getUploadDomain()
  .then((res) => {
    uni.setStorageSync('uploadDomain', res.data.data)
  })
	
	
	
	
// 获取openID
export const getOpenID = code => fly.get(apiURL.WECHAT_GET_OPENID, { code })
// 登陆
export const wechatLogin = openid => fly.post(apiURL.WECHAT_LOGIN, qs.stringify({ openid }))
// 上传UserInfo
export const getWechatMiniprogramUserinfo = (params) => fly.post(apiURL.WECHAT_MINIPROGRAM_USERINFO, params)
// 获取UserInfo
export const wechatBindCurrent = (params) => fly.get(apiURL.WECHAT_BIND_CURRENT,params)
// 获取首页视频列表
export const videolist = (params) => fly.get(apiURL.GETVIDEOLIST, params)
// export const getAllVideoList = (params) => fly.get(apiURL.HONGBAO_SV_VIDEO, params)
// 获取某作者所有视频
export const getMyVideoList = (params) => fly.get(apiURL.HONGBAO_SV_VIDEO, params)
// 上传视频
export const uploadMyVideo = (params) => fly.post(apiURL.HONGBAO_SV_VIDEO,params)
// 获取可见已发布的视频列表
export const getPubVideoList = (params) => fly.get(apiURL.HONGBAO_SV_VIDEO_LIST_PUBLISH, params)
// 添加视频红包
export const addVideoredpackorder = (params) => fly.post(apiURL.HONGBAO_SV_VIDEOREDPACKORDER, params)
// 视频红包支付
export const videoredpackorderPay = (params) => fly.post(apiURL.GETALIPAYUSER, qs.stringify(params))
// 我发出的视频红包
export const getVideoRedPackMyListSend = (params) => fly.get(apiURL.HONGBAO_SV_VIDEOREDPACK_MYLIST_SEND, params)
// 我收到的视频红包
export const getVideoRedPackMyListReceive = (params) => fly.get(apiURL.HONGBAO_SV_VIDEOREDPACK_MYLIST_RECEIVE, params)
// 我的视频列表
export const getVideoMyListAll = (params) => fly.get(apiURL.HONGBAO_SV_VIDEO_MYLIST_ALL, params)
// 我领取的红包视频列表
export const getMyReceivedRedPack = (params) => fly.get(apiURL.HONGBAO_SV_VIDEO_MYLIST_RECEIVEDREDPACK, params)
// 关注某个用户
export const follow = (params) => fly.post(apiURL.HONGBAO_SV_USER_FOLLOW, qs.stringify(params))
// 我关注的列表
export const followByme = (params) => fly.get(apiURL.HONGBAO_SV_USER_FOLLOWBYME, params)
// 我发出和收到的红包个数金额统计
export const videoredpackMyStats = (params) => fly.get(apiURL.HONGBAO_SV_VIDEOREDPACK_MYSTATS, params)
// 生成申请代理身份订单
export const createBecomeProxyOrder = (params) => fly.post(apiURL.HONGBAO_SV_PROXYAPPLYORDER, qs.stringify(params))
// 加入代理订单支付
export const payProxyOrderByWxPub = (params) => fly.post(apiURL.HONGBAO_SV_PROXYAPPLYORDER_PAY_WX, qs.stringify(params))
// 提现列表
export const getWithdrawList = (params) => fly.get(apiURL.HONGBAO_SV_BALANCE_WITHDRAW, params)
// 提现
export const withdrawAction = (params) => fly.post(apiURL.HONGBAO_SV_BALANCE_WITHDRAW_SUBMIT, qs.stringify(params))
// 余额
export const Balance = (params) => fly.post(apiURL.HONGBAO_SV_BALANCE_GET, qs.stringify(params))
// 用户抢红包
export const videoredpackGrab = (params) => fly.post(apiURL.HONGBAO_SV_VIDEOREDPACK_GRAB, qs.stringify(params))
// 用户抢红包记录
export const videoredpackHistory = (params) => fly.get(apiURL.HONGBAO_SV_VIDEOREDPACK_HISTORY, qs.stringify(params))
// 视频评论
export const comment = (params) => fly.post(apiURL.HONGBAO_SV_COMMENT, qs.stringify(params))
// 获取评论
export const comments = (params) => fly.get(apiURL.HONGBAO_SV_COMMENT, qs.stringify(params))
// 评论列表
export const commentList = (params) => fly.get(apiURL.HONGBAO_SV_COMMENT, qs.stringify(params))
// 新增打赏
export const reward = (params) => fly.post(apiURL.HONGBAO_SV_REWARD, params)
// 打赏支付
export const payRewardByWxPub = (params) => fly.post(apiURL.HONGBAO_SV_REWARD_PAY_WX, qs.stringify(params))
// 视频举报
export const videoAccuse = (params) => fly.get(apiURL.HONGBAO_SV_VIDEO_ACCUSE, params)
// 评论举报
export const commentAccuse = (commentid, params) => fly.post(`${apiURL.HONGBAO_SV_COMMENT_ACCUSE}/${commentid}`, qs.stringify(params))
// 视频详情
export const videoDetail = (videoid) => fly.get(`${apiURL.HONGBAO_SV_VIDEO}/${videoid}`)
// 查看我的代理返佣列表
export const proxyewardMyList = (params) => fly.get(`${apiURL.HONGBAO_SV_PROXYREWARD_MYLIST}`, params)
// 设置当前登陆用户的上级代理
export const setSuperior = (params) => fly.get(`${apiURL.HONGBAO_SV_USER_SETSUPERIOR}`, qs.stringify(params))
// 代理数据统计
export const proxyRewardStats = (params) => fly.get(`${apiURL.HONGBAO_SV_PROXYREWARD_STATS}`, qs.stringify(params))
// 视频审核列表
export const reviewVideoList = (params) => fly.get(`${apiURL.HONGBAO_SV_VIDEO}`, params)
// 视频审核通过
export const reviewVideoAccept = videoid => fly.post(`${apiURL.HONGBAO_SV_REVIEW_ACCEPT}/${videoid}`)
// 视频审核不通过
export const reviewVideoBan = (videoid, params) => fly.post(`${apiURL.HONGBAO_SV_REVIEW_BAN}/${videoid}`, qs.stringify(params))
// 设置统计数
export const setStats = params => fly.post(`${apiURL.HONGBAO_SV_STATS_INCR}`, qs.stringify(params))
// 获取统计数
export const getStats = params => fly.post(`${apiURL.HONGBAO_SV_STATS_GET}`, qs.stringify(params))
// 获取系统配置
export const cfgGet = id => fly.get(`${apiURL.HONGBAO_SV_SYSCONFIG}/${id}`)
// 艾美验证
export const cfgGets = id => fly.get(`${apiURL.HONGBAO_SV_SYSCONFIGS}/${id}`)
// 获取自己的审核数据统计
export const getMyReviewStats = () => fly.get(`${apiURL.HONGBAO_SV_STATS_MYREVIEW}`)
// 获取视频审核列表
export const getVideoReviewList = (params) => fly.get(`${apiURL.HONGBAO_SV_VIDEO_LIST_REVIEW}`, params)
// 获取积分
export const getIntegral = (params) => fly.post(`${apiURL.HONGBAO_SV_BALANCE_INTEGRAL}`, qs.stringify(params))
// 获取视频对应图片
export const videopiclist = (params) => fly.get(apiURL.GETPICLIST, params)
// 获取个人信息
export const getfocuson = (params) => fly.get(apiURL.GETFOLLOWUER, params)
// 获取红包状态
export const getvideostate = (params) => fly.get(apiURL.GETVIDEOHONGBAOSTATE, params)
// 获取审核视频通过
export const videostate = (params) => fly.get(apiURL.GETVIDEOSHENHE, params)
// 获取审核视频列表
export const getvideoid = (params) => fly.get(apiURL.GETVIDEOID, params)
// 发送推广连接
export const videosend = (params) => fly.get(apiURL.GETVIDEOS, params)
// 获取我的个人信息记录
export const getmyvideolist = (params) => fly.get(apiURL.GETMYVIDEOLIST, params)
// 我的记录视频发红包
export const myrecordvideo = (params) => fly.get(apiURL.MYRECORDVIDEO, params)
// 我的记录视频收到红包
export const myenvelopes = (params) => fly.get(apiURL.MYENVELOPES, params)
// 根据天数查询推广记录
// export const getPersonalPages = (params) => fly.get(apiURL.GETPERSONALPAGE,params)
export const gettuiguang = (params) => fly.get(apiURL.GETTUIGUANGJILU, params)
// 审核不通过
export const getnoaudit = (params) => fly.get(apiURL.NOAUDIT, params)
// 用户支付
export const getAlipay = (params) => fly.get(apiURL.GETALIPAYUSER, params)
// 获取推广id
export const getuserinfoid = (params) => fly.get(apiURL.GETUSERINFOID, params)
// 获取时间查询当天所发的红包
export const getVideoinformation = (params) => fly.get(apiURL.GETVIDEOINFORMATION,params)
// 查询视频状态
export const getvideostatus = (params) => fly.get(apiURL.GETVIDEOSTATUS, params)
// 上传淘宝客商品
export const getselecteditemgoods = (params) => fly.post(apiURL.GETSELECTEDITEM, qs.stringify(params))
// 上传转发次数
export const getsharmessage = (params) => fly.get(apiURL.GTESHARMESSAGE, params)
// 获取关注状态
export const getguanzhustate = (params) => fly.get(apiURL.GETGUANZHUSTATE, params)
// 获取淘宝联盟选品库id
export const gettaokeshoplist = (params) => fly.get(apiURL.GETTAOKESELECTSHOP, params)
// 获取选品库商品
export const getshopping = (params) => fly.get(apiURL.GETSHOPPING, params)
// 转换淘口令
export const taokouling = (params) => fly.get(apiURL.GETTAOKOULING, params)
// 页面所有转发获取
export const gettotalmsg = () => fly.get(apiURL.GETTOTALSHARMESSAGE)
// 获取播放量高的视频
export const getvideonum = (params) => fly.get(apiURL.GETVIDEONUM,params)
// 积分支付
export const getjifenpay = (params) => fly.post(apiURL.POSTGETJIGEN,qs.stringify(params))
// 获取代理用户列表

export const getporxy = () => fly.get(apiURL.GETJOINPORXY)
// 获取客户url
export const getkefu = () => fly.get(apiURL.GETKEFUURL)
// 上传认证信息
export const renzheng = (params) => fly.get(apiURL.GETRENZHENG,params)
// 获取积分记录
export const getjifenx = (params) => fly.get(apiURL.GETJIFENXIANGQING,params)
// 个人提现记录
export const userin = (params) => fly.get(apiURL.GETUSERTIXIANG,params)
// 增加转发量
export const getvideotranspond = (params) => fly.get(apiURL.GETVIDEOTUGUANG,params)
// 首页转发图片
export const getqueryimg = () => fly.get(apiURL.QUERUEIMG)
// 获取Tel
export const getTel = (params) => fly.get(apiURL.GETTEL,params)
// 根据手机号码和密码注册-APP
export const regisuser = (params) => fly.get(apiURL.REGISUSER,params)
// 获取视频模板
export const videomuvban = (params) => fly.get(apiURL.GETVIDEOMUBAN,params)
// 上传未抢到红包用户
export const getvideorecode = (params) => fly.get(apiURL.GETVIDEOSTAFISKJG,params)
//获取我的视频
export const getmyvideo = (params) => fly.get(apiURL.GETMYVIDEOALL,params)