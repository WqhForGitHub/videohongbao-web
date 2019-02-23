<template>
  <div class="view" :style="{backgroundImage:'url(' + bgcpic + ')'}">
    <button class="theme-button" open-type="getUserInfo" @getuserinfo="onGetUserInfo" lang="zh_CN">授权登录</button>
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
      bgcpic:'http://sphbvideo.25010086.com/20181226150607.png'
    };
  },
  methods: {
    async getuserid(id){
      const res= await getuserinfoid({
        superiorid:id
      })
    },
    login(userInfo) {
      uni.login({
        success: async res => {
          if (res.code) {
            const resOpenID = await getOpenID(res.code);
            if (resOpenID.data.code !== statusCode.OK) return;
            const openid = resOpenID.data.data;
            const resLogin = await wechatLogin(openid);
            if (resLogin.data.code !== statusCode.OK) return;
            console.log(resLogin)
            uni.setStorageSync("token", resLogin.headers["x-auth-token"]);
            const resUserInfo = await getWechatMiniprogramUserinfo({
              openid: openid,
              ...userInfo
            });
            if (resUserInfo.data.code === statusCode.OK) {
              const resBind = await wechatBindCurrent();
              if(this.record==2){this.getuserid(this.userids)}
              if (resBind.data.code === statusCode.OK) {
                if (resBind.data.data.approved) {
                  const affiliateid = uni.getStorageSync("affiliateid");
                  if (affiliateid !== null && affiliateid !== "") {
                      
                    await setSuperior({
                      superiorid: affiliateid
                    });
                  }
                  const cfgRes = await cfgGet("pictype");
                  if (cfgRes.data.code === statusCode.OK) {
                    if (cfgRes.data.data.contentStr === "100") {
                      uni.switchTab({ url: "../index/main" })
                      // url: `/pages/home/main?videoid=${this.userinfo.videoid}&userid=${this.userinfo.userid}`
                      // if (this.record==2){uni.navigateTo({url: `/pages/home/main?videoid=${this.userinfo.videoid}&userid=${this.userinfo.userid}`,}); 
                      // }else{uni.switchTab({ url: "/pages/index/main" });}
                    } else {
                      uni.redirectTo({ url: "../false-home/main" });
                    }
                  }
                  this.$store.commit(types.SET_USER_INFO, resBind.data.data);
                } else {
                  uni.showToast({
                    title: "当前用户未授权",
                    icon: "none",
                    duration: 2000
                  });
                }
              }
            }
          }
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

