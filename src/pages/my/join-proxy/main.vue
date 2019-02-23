<template>
  <!-- <div class="view">
    <p>支付即可成为一级代理</p>
    <button class="confirm" @click="setProxyOrder">立即支付</button>
  </div>-->
  <div class="view">
    <div class="banner">
      <div class="user-one" v-for="(item,i) in twouserlist" :key="i">
        <img :src="item.avatarUrl" alt>
      </div>
    </div>
    <div class="tx" >
      <div class="tx-list" v-for="(item,i) in userlist" :key="i">
        <img :src="item.avatarUrl" alt  mode='aspectFill'>
      </div>
      <div class="jiantou">
				<div class="path">
					<img src="/static/path2.png" alt="">
				</div>
      </div>
    </div>
    <div class="bottom-two">
      <div>
        <p style="text-align:center;color:red;;margin-top:10px;">￥1000.0元</p>
        <div class="button" @click="setProxyOrder">
          <div>立刻支付</div>
        </div>
        <div class="footer">支付即可成为一级代理</div>
      </div>
      <div class='btns'>
        <div class="erweima" @click="clicks?'':ojbks()">
          <img src="http://sphbvideo.25010086.com/20181224175704.png" alt="" >
          <button open-type='contact' class="btn">联系客服</button>

        </div>

        <!-- <button open-type="contact" /> -->

        <!-- <div class="add-wx">点击添加客服微信</div> -->
      </div>
    </div>
    <div :class="open?'hide':'tanchuang'" @click="clicks?'':ojbks()">
      <img :src="kefu" alt="" @click="previewImg()">
      <p>微信号:{{wechat}}</p>
      <div class='btn' @click="copyboard">
        <button>复制微信加好友</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createBecomeProxyOrder,
  payProxyOrderByWxPub,
  getAlipay,
  getporxy,
  getkefu,
  cfgGets
} from "../../../api";
import { statusCode} from "../../../config/api.cfg";
import { mapGetters } from "vuex";
import store from "../../../store";
export default {
  name: "JoinProxy",
  store,
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      one: "(25%<30w>30%)",
      userlist:null,
      twouserlist:null,
      kefu:null,
      open:true,
      wechat:'',
      clicks:true,
    };
  },
  methods: {
    async bgp(){
    const  res= await cfgGets("wx04669c909368ae5c");
    console.log(res)
      if(res.data.data.contentStr=="99"){
        this.clicks=false
    }
    },
    async ongetporxy(){
      const res= await getporxy()
      console.log(res)
       function arrscie(arrs,num){
         var Aarr=arrs
         var Barr = [].concat(Aarr)
         var out =[];
         var num = num
        while(out.length<num){
        var temp = (Math.random()*Barr.length) >> 0;
        out.push(Barr.splice(temp,1)[0])
        }
        return out
       }
       let num=10,nums=7;
       if((res.data.data).length<10){
          num=(res.data.data).length
       }else{num=10;}
       this.userlist=arrscie(res.data.data,num)
       if((res.data.data).length<7){
          nums=(res.data.data).length
       }else{nums=7}
       this.twouserlist=arrscie(res.data.data,nums)
     console.log(this.twouserlist)
    },
    ojbk(){
      this.open=!this.open;
    },
    ojbks(){
       this.open=!this.open
    },
     copyboard() {
      wx.setClipboardData({
        data:this.wechat,
        success:(res)=> {
        wx.showToast({title:'复制成功'})
        }
      })
    },
    previewImg(url){
      wx.previewImage({
        current:this.kefu,
        urls:[this.kefu]
      })
    },
    async ongetkefu(){
      const res= await getkefu()
      this.kefu=res.data.data.url
      let str = this.kefu
      let strs=str.slice(str.lastIndexOf('/')+1,str.lastIndexOf('.'))
      this.wechat=strs
    }, 
    async setProxyOrder() {
      const res = await getAlipay({
        openId: this.userInfo.openid,
        appId:'wx04669c909368ae5c',

        money: 0,
        status: 1
      });
      if(res.data.code=='500'){
        wx.showToast({
          title:'您已是一级代理',
          icon:'none'
        })
        return
      }
      if (res.status === statusCode.OK) {
        var payModel = res.data;
        wx.requestPayment({
          timeStamp: payModel.timeStamp,
          nonceStr: payModel.nonceStr,
          package: payModel.package,
          signType: "md5",
          paySign: payModel.sign,
          success: res => {
            wx.navigateTo({ url: "/pages/my/main" });
          },
          fail(res){
            wx.showToast({title:'支付失败',icon:'none'})
          }
        });
      }
    }
  },
  onShareAppMessage() {
    return {
      title: `${this.userInfo}邀你成为代理`,
      path: `/pages/my/join-proxy/main?refererid=${this.userInfo.id}`
      // imageUrl: this.data.coverList[0]
    };
  },
  async onShow() {
    this.open=true;
    this.ongetporxy()
    wx.setNavigationBarTitle({
      title: "加入代理"
    });
  },
  onLoad(){
    var a=Math.floor(Math.random() * 10)
    this.a =a;
    var b=Math.floor(Math.random() * 10)
    this.b =b;
    var c=Math.floor(Math.random() * 10)
    this.c =c;
    var d=Math.floor(Math.random() * 10)
    this.d =d;
    var e=Math.floor(Math.random() * 10)
    this.e =e;
    var f=Math.floor(Math.random() * 10)
    this.f =f;
    var g=Math.floor(Math.random() * 10)
    this.g =g;
    this.ongetkefu()
    this.bgp()
  }
};
</script>

<style lang="less" scoped>
@import "../../../common/style/variable";
@import url("../../../../static/css/font.css");

.hide{
  display: none;
  transition: 0.5s;
}
.tanchuang{
  position: absolute;
  top:50%;
  left:50%;
  width: 200px;
  height: 250px;
  background: #fff;
  border-radius: 8px;
  margin:-125px 0 0 -100px;
  z-index: 99;
  img{
    width: 150px;
    height: 150px;
    margin:10px 25px;
  }
  p{
    text-align: center;
    font-size: 14px;
  }
  .btn{
    width: 150px;
    height: 40px;
    margin: 10px auto;
    button{
      background: red;
      color:#fff;
      font-size: 12px;
    }
  }
}
.view {
  background: #fff;
  min-height: 100vh;
	font-size:14px;
}
.banner {
  width: 100%;
  height: 300px;
  background-image: url("http://sphbvideo.25010086.com/20190103131606.png");
  background-size: 100% 100%;
  position: relative;
  img {
    width: 75%;
    height: 75%;
    border-radius: 50%;
  }
  .user-one:nth-child(1) {
    width: 40px;
    height: 40px;
    background: url("http://sphbvideo.25010086.com/617f03957c5a7debfc128206664f076.png");
    transform: translate(40px, 50px);
    background-size: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    img {
      margin-left: 3px;
    }
  }
  .user-one:nth-child(2){
    width: 40px;
    height: 40px;
    background: url("http://sphbvideo.25010086.com/617f03957c5a7debfc128206664f076.png");
    transform: translate(310px, 25px);
    background-size: 100%;
    display: flex;
    align-items: center;
    img {
      margin-left: 3px;
    }
  }
  .user-one:nth-child(3) {
    width: 59px;
    height: 59px;
    background: url("http://sphbvideo.25010086.com/25602c2ac3443d462832347ec7db55f.png");
    transform: translate(40px, 50px);
    background-size: 100%;
    display: flex;
    align-items: center;
    img {
      margin-left: 8px;
    }
  }
  .user-one:nth-child(4) {
    width: 59px;
    height: 59px;
    background: url("http://sphbvideo.25010086.com/25602c2ac3443d462832347ec7db55f.png");
    transform: translate(260px, -10px);
    background-size: 100%;
    display: flex;
    align-items: center;
    img {
      margin-left: 8px;
    }
  }
  .user-one:nth-child(5) {
    width: 40px;
    height: 40px;

    background: url("http://sphbvideo.25010086.com/e38235602f330b31974e0819a5c65d2.png");
    transform: translate(20px, 15px);
    background-size: 100%;
    display: flex;
    align-items: center;
    img {
      margin-left: 5px;
    }
  }
  .user-one:nth-child(6) {
    width: 40px;
    height: 40px;

    background: url("http://sphbvideo.25010086.com/e38235602f330b31974e0819a5c65d2.png");
    transform: translate(280px, -30px);
    background-size: 100%;
    display: flex;
    align-items: center;
    img {
      margin-left: 5px;
    }
  }
  .user-one:nth-child(7) {
    width: 126px;
    height: 126px;
    background: url("http://sphbvideo.25010086.com/c9b86f53a2583222eb0e555bade642d.png");
    transform: translate(120px, -180px);
    background-size: 100%;
    display: flex;
    align-items: center;
    img {
      margin-left: 16px;
    }
  }
}
.font-size-seven {
  font-size: 7px;
}
.font-size-eight {
  font-size: 8px;
}
.font-yellow {
  color: #fe7601;
}
.font-red {
  color: #fe2501;
}
.tx {
  width: 100%;
  padding: 0 15px;
  margin-bottom: 5px;
  display: flex;
  background: #fecb9e;
  // justify-content: space-between;
  position: relative;
  .tx-list {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    overflow: hidden;
    margin: 2px 1px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tx-list:nth-child(1) {
    z-index: 1;
    transform: translate(15px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(2) {
    z-index: 2;
    transform: translate(8px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(3) {
    z-index: 3;
    transform: translate(1px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(4) {
    z-index: 4;
    transform: translate(-6px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(5) {
    z-index: 5;
    transform: translate(-20px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(6) {
    z-index: 6;
    transform: translate(-30px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(7) {
    z-index: 7;
    transform: translate(-37px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(8) {
    z-index: 8;
    transform: translate(-44px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(9) {
    z-index: 9;
    transform: translate(-51px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .tx-list:nth-child(10) {
    z-index: 10;
    transform: translate(-58px, 0px);
    box-shadow: 0px 0px 2px #fe7f74;
  }
  .jiantou {
    width: 39px;
    height: 39px;
    background: #fe7f74;
    border-radius: 50%;
    position: absolute;
    right: 43px;
    top: 1px;
    z-index: 99;
    text-align: center;
    line-height: 39px;
		.path {
			width:52%;
			height:52%;
			margin-top:5px;
			margin-left:26%;
			img{
				width: 100%;
				height: 100%;
			}
		}
		
  }
}

.bottom-two {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px 0 30px;
  margin:100px auto;
  .btn{
    font-size: 12px;
    color: red;
    }
    .btns{
      display: flex;
      width: 150px;
      position: relative;
    }
  .erweima {
    width: 110px;
    height: 110px;
    img{
      width: 100%;
      height: 100px;
    }
  }
  .add-wx {
    font-size: 9px;
    color: #cc8257;
    text-align: justify;
    text-justify: distribute-all-lines;
    text-align-last: justify;
  }
}
.button {
  color: #fff;
  margin: 5px auto;

  div {
    margin: 0 auto;
    width: 105px;
    background: #f1892f;
    text-align: center;
    border-radius: 17px;
    height: 35px;
    font-size: 15px;
    line-height: 35px;
  }
}
.footer {
  color: #999;
  text-align: center;
  font-size: 9px;
  margin-top: 10px;
}
</style>

