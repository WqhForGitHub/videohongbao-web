export const SERVER = 'https://sphb.25010086.com/apiproxy'
// export const SERVER = 'http://127.0.0.1:14007'
// export const SERVER = 'http://192.168.1.175:14007'
// export const SERVER = 'http://192.168.1.212:17'
 //export const SERVER = 'http://192.168.1.186:14007'
//export const SERVER = 'http://192.168.1.117:14007'
export const WX_SERVER = 'https://api.mch.weixin.qq.com'

export const statusCode = {
  OK: 200,
  UNAUTHORIZED: 403,
  ERROR: 500
}
export const apiURL = {
  GETMYVIDEOALL:`${SERVER}/sv/my/video`,
  GETVIDEOSTAFISKJG:`${SERVER}/sv/video/visit/add`,
  GETVIDEOMUBAN: `${SERVER}/sv/find/exhibition/three`,
  GETTEL: `${SERVER}/sv/user/logon`,
  GETUSERTIXIANG: `${SERVER}/sv/my/withdrawal/record`,
  GETJIFENXIANGQING:`${SERVER}/sv/lntegralrecord`,
  GETRENZHENG:`${SERVER}/sv/user/authentication/add`,
  GETKEFUURL: `${SERVER}/sv/user/customerService/url`,
  GETJOINPORXY: `${SERVER}/sv/user/agent/query`,
  POSTGETJIGEN: `${SERVER}/pay/integral`,
  GETVIDEONUM: `${SERVER}/sv/videos`,
  GETTOTALSHARMESSAGE: `${SERVER}/sv/user/modify/share`,
  GETTAOKOULING: `${SERVER}/sv/taobaoke`,
  GETSHOPPING: `${SERVER}/tb/query/information`,
  GETTAOKESELECTSHOP: `${SERVER}/tb/taobaostockselection`,
  GETGUANZHUSTATE: `${SERVER}/sv/user/getfocus`,
  GTESHARMESSAGE: `${SERVER}/sv/share/record/add`,
  GETSELECTEDITEM: `${SERVER}/tb/storagedetails`,
  GETALIPAYUSER: `${SERVER}/wxpay`,
  GETTUIGUANGJILU: `${SERVER}/sv/promoterecord`,
  GETMYVIDEOLIST: `${SERVER}/sv/myrecord`,
  GETVIDEOID: `${SERVER}/sv/video/list/reviews`,
  GETVIDEOSHENHE: `${SERVER}/sv/video/review/accept`,
  GETFOLLOWUER: `${SERVER}/sv/user/getfocuson`,
  GETVIDEOHONGBAOSTATE: `${SERVER}/sv/videoredpack/sandstatus`,
  GETVIDEOLIST: `${SERVER}/sv/getvideopictures`,
  GETPICLIST: `${SERVER}/sv/getvideopicture`,
  WECHAT_GET_OPENID: `${SERVER}/wechat/miniprogram/openids`,
  WECHAT_LOGIN: `${SERVER}/wechat/miniprogram/login`,
  WECHAT_BIND_USERINFO: `${SERVER}/woodhouse/user/bindinfo`,
  WECHAT_MINIPROGRAM_USERINFO: `${SERVER}/wechat/miniprogram/userinfo`,
  WECHAT_BIND_CURRENT: `${SERVER}/sv/user/current`,
  HONGBAO_SV_VIDEO: `${SERVER}/sv/video`,
  HONGBAO_SV_VIDEO_LIST_PUBLISH: `${SERVER}/sv/video/list/publish`,
  HONGBAO_SV_VIDEOREDPACKORDER: `${SERVER}/sv/videoredpackorder`,
  // HONGBAO_SV_VIDEOREDPACKORDER_PAY: `${SERVER}/sv/videoredpackorder/pay/wx`,
  HONGBAO_SV_VIDEOREDPACK_MYLIST_SEND: `${SERVER}/sv/videoredpack/mylist/send`,
  HONGBAO_SV_VIDEOREDPACK_MYLIST_RECEIVE: `${SERVER}/sv/videoredpack/mylist/receive`,
  HONGBAO_SV_VIDEO_MYLIST_ALL: `${SERVER}/sv/video/mylist/all`,
  HONGBAO_SV_VIDEO_MYLIST_RECEIVEDREDPACK: `${SERVER}/sv/video/mylist/receivedredpack`,
  HONGBAO_SV_USER_FOLLOW: `${SERVER}/sv/user/follow`,
  HONGBAO_SV_USER_FOLLOWBYME: `${SERVER}/sv/user/followbyme`,
  HONGBAO_SV_VIDEOREDPACK_MYSTATS: `${SERVER}/sv/videoredpack/mystats`,
  HONGBAO_SV_PROXYAPPLYORDER: `${SERVER}/sv/proxyapplyorder`,
  HONGBAO_SV_PROXYAPPLYORDER_PAY_WX: `${SERVER}/sv/proxyapplyorder/pay/wx`,
  HONGBAO_SV_BALANCE_WITHDRAW: `${SERVER}/sv/balance/withdrawal`,
  HONGBAO_SV_BALANCE_WITHDRAW_SUBMIT: `${SERVER}/sv/balance/withdrawal/create`,
  HONGBAO_SV_BALANCE_GET: `${SERVER}/sv/balance/get`,
  HONGBAO_SV_VIDEOREDPACK_GRAB: `${SERVER}/sv/videoredpack/grabs`,
  HONGBAO_SV_VIDEOREDPACK_HISTORY: `${SERVER}/sv/videoredpack/history`,
  HONGBAO_SV_COMMENT: `${SERVER}/sv/comment`,
  HONGBAO_SV_REWARD: `${SERVER}/sv/reward`,
  HONGBAO_SV_REWARD_PAY_WX: `${SERVER}/sv/reward/pay/wx`,
  HONGBAO_SV_VIDEO_ACCUSE: `${SERVER}/sv/video/accuses`,
  HONGBAO_SV_COMMENT_ACCUSE: `${SERVER}/sv/comment/accuse`,
  HONGBAO_SV_PROXYREWARD_MYLIST: `${SERVER}/sv/proxyreward/mylist`,
  HONGBAO_SV_USER_SETSUPERIOR: `${SERVER}/sv/user/setsuperior`,
  HONGBAO_SV_PROXYREWARD_STATS: `${SERVER}/sv/proxyreward/stats`,
  HONGBAO_SV_REVIEW_ACCEPT: `${SERVER}/sv/video/review/accept`,
  HONGBAO_SV_REVIEW_BAN: `${SERVER}/sv/video/review/ban`,
  HONGBAO_SV_STATS_INCR: `${SERVER}/sv/stats/incr`,
  HONGBAO_SV_STATS_GET: `${SERVER}/sv/stats/get`,
  HONGBAO_SV_SYSCONFIG: `${SERVER}/sv/sysconfig`,
  HONGBAO_SV_SYSCONFIGS: `${SERVER}/sv/sysconfigs`,
  HONGBAO_SV_STATS_MYREVIEW: `${SERVER}/sv/stats/myreview`,
  HONGBAO_SV_VIDEO_LIST_REVIEW: `${SERVER}/sv/video/list/review`,
  HONGBAO_SV_BALANCE_INTEGRAL: `${SERVER}/sv/balance/integral`,
  HONGBAO_SV_ACERTIFICATION: `${SERVER}/im/acertification`,
  GETVIDEOS: `${SERVER}/sv/user/promotionalvideos`, // 推广视屏url
  GETUSERINFOID: `${SERVER}/sv/user/setsuperior`, // 获取推广用户的id
  NOAUDIT: `${SERVER}/sv/video/review/notaudit`, // 审核不通过接口
  MYRECORDVIDEO: `${SERVER}/sv/videoinfo`,
  MYENVELOPES: `${SERVER}/sv/myreceived`,
  GETVIDEOINFORMATION: `${SERVER}/sv/videosandinfo`, // 根据时间查询当天所发的红包
  GETVIDEOSTATUS: `${SERVER}/sv/videoinfo`, // 查询视频状态
  GETVIDEOTUGUANG: `${SERVER}/sv/user/sharevideo`, // 增加转发量
  QUERUEIMG: `${SERVER}/sv/query/url`, // 增加转发量
  REGISUSER:`${SERVER}/sv/user/regisuser`, // 根据手机号码和密码注册-APP
  // 微信支付相关
  // 统一下单地址
  // WX_PAY_UNIFIEDORDER: `${WX_SERVER}//pay/unifiedorder`,
  // 七牛上传相关
  // 七牛上传地址
  // QN_ACTION: window.location.protocol === 'https:' ? 'https://up-z2.qbox.me' : 'http://up-z2.qiniu.com',
  QN_ACTION: 'https://up-z2.qbox.me',
  // QN_ACTION: 'http://up-z2.qiniu.com',
  // 获取七牛图片域名配置
  QN_DOMAIN: `${SERVER}/upload/domain`,
  // 获取七牛token
  QN_TOKEN: `${SERVER}/upload/qiniutoken`
}


