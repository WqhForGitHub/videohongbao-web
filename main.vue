<template>
  <div class="view" :style="{backgroundImage:'url(' + bgcpic + ')'}">
    <button class="theme-button" @click="login" lang="zh_CN">授权登录</button>
  </div>
</template>
<script>
import {
  getOpenID,
  wechatLogin,
  getWechatMiniprogramUserinfo,
  wechatBindCurrent,
  setSuperior,
  cfgGet,
  getuserinfoid
} from "../../api/index";
import { statusCode } from "../../config/api.cfg";
import store from "../../store/index";
import IM from '../../common/im'
import * as types from "../../store/mutation-types";
export default {
  name: "login",
  store,
  data() {
    return {
      record: false,
      city:'',
      id:'',
      name:'',
      num:'',
      remark:'',
      user:'',
      userInfo:null,
      videoid:'',
      userids:null,
      bgcpic:'http://sphbvideo.25010086.com/20181226111053.png'
    };
  },
  methods: {
    async getuserid(id){
      const res= await getuserinfoid({
        superiorid:id
      })
    },
    login() {
					let APPID = 'wxc87a17976a29d93c';
					uni.request({
					url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect', //仅为示例，并非真实接口地址。
					data: {
							text: 'uni.request'
					},
					header: {
							'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
							console.log(res.data);
					}
			});
    },
    onGetUserInfo(e) {
      this.login(e.mp.detail.userInfo);	
    },
    async bgp(){
    const  res= await cfgGet("pictype");
      // console.log(res);
      // if(res.data.data.contentStr=="100"){
      //  this.bgcpic='http://sphbvideo.25010086.com/20181205153438.png'
      // }else{
      //    this.bgcpic='http://sphbvideo.25010086.com/20181203142144.png'
      // }
      // if(res.data.data.contentStr=="99"){
    
      //  this.bgcpic='http://sphbvideo.25010086.com/20181224094108.png'
      // }else{
      //    this.bgcpic='http://sphbvideo.25010086.com/20181203142144.png'
      // }
    }
  },
  onShow(){
    // const res=uni.getStorageSync('token')
    // if(res==''){
    //   this.login()
    // }else{
    //   uni.switchTab({ url: "/pages/index/main" })
      
    // }
  },
  mounted() {
  this.bgp()
  // IM.init();
  // console.log(IM)
  },
 async onLoad(res) {
    if (res.id !== undefined) {
      this.userids=parseInt(res.id)
      this.userinfo=JSON.parse(res.user)
      this.record=2
      console.log(this.userids)
      console.log(this.userinfo)
    }
    // if(res.status=='1'){
    // this.userinfo=res.obj
    // console.log(this.userinfo)
    // this.record=1;
    // }
    
  }
};
</script>
<style lang="less" scoped>

.view{
  display: block;
  min-height: 100vh;
  background:100vw;
  background-size:100% 100%;
}
.logo {
  display: block;
  width: 175px;
  height: 51px;
  margin: 100px auto;
}

.theme-button {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>

