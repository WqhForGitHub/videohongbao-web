<template>
  <div class="video-play-warp" >
    <div class="main1">
      <div class="header">
        <span>{{city}}</span>&nbsp;&nbsp;|<span>{{num}}次播放</span>
      </div>
      <div style="background:#2c273d;overflow:hidden;" :class="open?'show':'hide'">
        <div class="video-warp" style="" @click="noshow">
          <!-- :src="data.url" -->
          <video
            v-if="currentIndex === 0"
            :src="url"
            id="video-id"
            class="video-view"
            objectFit="cover"
            :show-play-btn="false"
            :show-center-play-btn="false"
            :enable-progress-gesture="false"
            circular
            loop
            :controls="false"
            autoplay
            show-fullscreen-btn
            :custom-cache='false'
             >
          </video>
        </div>
      </div>
       <div :class="open?'hide':'pictab'">
      <!--图片-->
      <scroll-view scroll-x="true" style="" class="clickimg">
        <swiper indicator-dots indicator-color="#fff" indicator-active-color='#ff6700' autoplay="true" interval='3000' circular="true">
          <swiper-item v-for='(item,i) in imgArray' :key="i" @click="onPreviewImage(imgArray,item)">
              <img :src="item" mode="aspectFill" />
          </swiper-item> 
        </swiper>
      </scroll-view>
    </div>
      <div style="background:#2c273d;overflow:hidden;">
        <div class="box">
          <div class="box-son">
            <p @click="attentionClick(user)">{{guangzhu}}</p>
            <div class="btn-top">
              <h3 @click="bindPlay" :class="open?'colort':'colorn'">视频</h3>
              <h3 @click="bindPause" :class="open?'colorn':'colort'">图片</h3>
            </div>
            <!-- <p @click="fenxiang">分享给好友</p> -->
            <!-- <button open-type="share" @click="clik">购买商品</button> -->
            <button  @click="clik">购买商品</button> 
            <p class="index" @click="onNextClick">换个视频</p>
          </div>
        </div>
      </div>
      <div class="neirong" style="width:100%; height:300px;" @click="openint">
        <div class="addice" style="border:1px solid #b8b5c1;">
          <img src="../../../static/laba.png" alt="">&nbsp;&nbsp;  
          <span><span style="color:#2c273d; linehighe:1;"  @click="avatarClick()">{{name}}:&nbsp;&nbsp;</span>{{count}}</span>
        </div>
        <scroll-view class="count" scroll-y='true' v-if="ShowHiden">
          <p v-for='(item,i) in conlist' :key="i"><span>{{item.author.nickName}}</span>&nbsp;&nbsp;{{item.content}}</p>
        </scroll-view>
        <scroll-view class="count" v-if="!ShowHiden" scroll-y='true'>
          <div class="products" >
              <div class="product" v-for="(item,index) in productarr" :key="index" @click="toshow(item.pictUrl,item.couponClickUrl,item.title,item.clickUrl)">
                <div class="pic">
                  <img :src="item.pictUrl" alt="">
                </div>
                 <p class="text">{{item.title}}</p>
                 <div class="discount">
                   <div class="left">劵后<span style="color:red">￥{{item.zkFinalPrice}}元</span></div>
                   <div class="right"> <div class="button" >领取</div></div>
                 </div>
              </div>
          </div> 
        </scroll-view>
         <img src="http://sphbvideo.25010086.com/FlYBUJClMrkHepJXqA40Pj9Mo5ss" alt="" mode='aspectFill' :class="hongbao.show?'show':'hide'" @click="hongopen" >
         <img src="http://sphbvideo.25010086.com/FhTsBj860FsxgjzPILwrLEa-_VWK  alt="" mode='aspectFill' :class="hongbao.close?'hide':'show'" @click="videoredpackGrab()">
              <!-- 举报 -->
        <div class="report" @click="reportclick">
          <img src="/static/report.1.png" alt="">
        </div>
      </div>
      <div :class="hongbao.hong?'hide':'hongbao'">
        <p>{{money}}</p>
        <h3 @click="videoredpackGrab()">查看详情</h3>
        <img src="http://sphbvideo.25010086.com/FjbMZDKKhMUR2ivPb5iMWuV7-zYI" alt="" @click="close" >
      </div>
    </div>
    <div class="input-warp">
      <div :class="show?'input-inner':'hide'">
        <div class="input" @click="tanqi">发个言呗</div>
        <div class="iconlogo">
          <img src="../../../static/yuan.png" alt="" mode='aspectFill'>
          <img src="../../../static/li.png" alt="" mode='aspectFill'>
          <img src="../../../static/geng.png" alt="" mode='aspectFill' @click="piclist">
        </div>
      </div>
      <div :class="show?'hide':'input-inner'">
        <div class="connt">
          <input class="inp" placeholder="发个言呗" confirm-type type="text" adjust-position @blur='shou' :focus='fouse' maxlength='100' v-model="messages"/>
            <button @click='addlist'>发送</button>
        </div>
      </div>
    </div>

      <!-- 复制模态框 -->
      <div v-show="moshow">
     <div class="postive" >
      <h3 class="close" @click="closehei">+</h3>
      <p class="title">标题</p>
      <img src="http://img2.3lian.com/img2007/10/24/011.jpg" alt="">
      <p>{{link}}</p>
      <button @click="copyboard">点击复制</button>
    </div>
    </div>

    <!-- 模态框 -->
    <div id="modellist" v-if="isShow">
        <div class="top">审核中</div>  
      <div class="btn">
      <div class="off" @click="off">取消</div>
      <div class="affirm" @click="affirmclick">确认</div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  getPubVideoList,
  follow,
  setStats,
  commentList,
  videoredpackGrab,
  videolist,
  getvideostate,
  comment,
  comments,
  getguanzhustate,
} from "../../api/index";
import { statusCode } from "../../config/api.cfg";
import { mapGetters } from "vuex";
import store from "../../store";
import { log } from 'util';
export default {
  name: "videoPlay",
  store,
  computed: {
    ...mapGetters(["userInfo"])
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      imgArray:null,
      url: null,
      name: null,
      city: null,
      num: 0,
      videopages:0,
      videoobj:null,
      videoindex:null,
      nextvideo:null,
      indexi:0,
      size: 8,
      page: 0,
      open: true,
      show: true,
      fouse: false,
      user: null,
      videoid: null,
      autid:null,
      picurl: null,
      indexList: [],
      index: -1,
      money: '已领取',
      count: "您没有广告语",
      guangzhu: "",
      currentVideo: 0,
      videoList: [],
      picarr:[],
      conlist: [],
      listvideo: {},
      hongbao: {
        show: true,
        close: true,
        hong: true
      },
      params: {
        sort: "createTime,desc",
        page: 0,
        size: 3
      },
      videoContext: null,
      isPlay: true,
      totalPages: 0,
      currentIndex: 0,
      author: {},
      messages:'',
      isShow:false,
      ShowHiden:false,
      link: '',
      moshow:false,
      productarr:[]
    };
  },
  methods: {
    toshow(pic,link,title,taoke){
      console.log(link)
      console.log(taoke)
      wx.setStorage({key:"shoplink",data:link})
      wx.setStorage({key:"taoke",data:taoke})
      let shopobj={pic,title}
      let ink=JSON.stringify(shopobj)
       wx.navigateTo({
          url: `/pages/count/main?link=${ink}`
        });
    },
    closehei(){
     this.moshow=false;
    },
    copyboard() {
      wx.setClipboardData({
        data:this.link,
        success:(res)=> {
         // console.log(113212)
        }
      })
    },
   async reportclick(){
      const obj = {
       id: this.videoid,
       type: 'reviewVideo',
       status:0
       }
       wx.navigateTo({ url: '/pages/report-reason/main?obj=' + JSON.stringify(obj) }) 
       
    },
    off(){
      this.isShow=false
    },
    affirmclick(){ 
      wx.navigateTo({
        url:`/pages/details/main?status=0`
      })
      this.isShow=false
    },
  piclist(){
    wx.navigateTo({
        url:`/pages/details/main?status=0`
    })

    },
    noshow(){
    this.fouse=false;
    },
    clik(){
     wx.showToast({
         title:'该功能暂未开放'
     })
    },
    // 评论
    openint(){
      this.show=true;
    },
    async addlist(){ 
      var  userint={
        author:{
          nickName:''
        },
        content:''
      }
      if(this.messages==''){
        wx.showToast({
          title:'不能发送空消息'
        })
       return
      }
      const res = await comment({
          videoid: this.videoid,
          content: this.messages,
      })
       if (res.data.code === statusCode.OK) {
         wx.showToast({
           title:'评论成功' 
         })
       userint.author.nickName=this.userInfo.nickName
        userint.content=this.messages
         this.conlist.push(userint)
         this.messages="";
       }  
    },
     onPreviewImage (picList, item) {
        wx.previewImage({
        urls: picList,
        current: item
        })
      },
    bindPause: function() {
      
      this.videoContext = wx.createVideoContext('video-id')
      this.videoContext.pause()
      this.open=false
      },
    ///换视频
    //请求视频数据
    async getvideolist(size,page,ont){
          const res=await videolist({
              size,page
        })
        if(res.data.data.content.length==0){
          console.log(1113)
          wx.showToast({
            title:'没有更多数据了'
          })
        }
        this.videoobj.push(...res.data.data.content)
        console.log(this.videoobj)
    },
    onNextClick() {
        this.videoobj=this.nextvideo
      // if(this.indexi<this.nextvideo.length){
      //   this.videoobj=this.nextvideo
      //   console.log(this.videoobj)
      // }
      // console.log(this.indexi)
      this.indexi++
      if(this.indexi===this.nextvideo.length-1){
        this.videopages++
        console.log(this.videopages)
        this.getvideolist(8,this.videopages)
      }
      // console.log(this.videoobj)
        console.log(123)
      console.log(this.videoobj)
      let video=this.videoobj[this.indexi]
      console.log(video)
      if(video==undefined){
        wx.showToast({
            title:'没有更多数据了'
        })
        return
      }else{
      
        if(video.storagedetails.length!=0){
          this.ShowHiden=false;
          this.productarr=video.storagedetails
          console.log(123)
        }else{
          this.ShowHiden=true;
        }
        this.videoid=video.id
        this.url = video.url;
        this.city = video.author.city==''?'未知':video.author.city;
        this.name = video.author.nickName;
        this.count = video.remark;
        this.user=video.author.id
        this.num = video.playNum;
        if (video.playNum == "undefined" || video.playNum== null) {
          this.num = 0;
          } else {
             this.num = video.playNum ;
          }
        this.imgArray=video.covers;
        this.getoncommit(this.videoid)
        this.onguanzhu();
        this.shar();
        this.oop()
      wx.setNavigationBarTitle({
        title: this.name
      });



      }
     
    },
    // 获取评论
    async getoncommit(id){
      const res = await comments({
        videoid:id
      })
      this.conlist = res.data.data.content;
    },
    // 获取关注状态
    async onguanzhu(){
      // if(this.userInfo.id==undefined){
      //   console.log(123)
      //   let id=this.autid
      //   console.log(id)
      // }else{
      //   let id=this.userInfo.id
        
      // }
      this.userInfo.id==undefined?this.autid:this.userInfo.id
      const res = await getguanzhustate({
        VideoUserId:this.user,
        UserId:this.userInfo.id
      })
      console.log(res)
      if (res.data.data) {
        this.guangzhu = "已关注";
      } else {
        this.guangzhu = "+关注";
      }
    },
    
    async oop(){
      const res= await getvideostate({
        videoid:this.videoid
      })
      
      if(res.data.data===false){
       
        console.log('红包可以领取')
         this.hongbao.show=true;
         this.hongbao.close=true;
      }else if(res.data.data===true){
        console.log('红包已被领取')
        this.hongbao.show=false;
        this.hongbao.close=false;
      }
    },
     async onVideoredpackGrab(id) {
       
      const res = await videoredpackGrab({
        videoid: this.videoid
      });
      this.money=(res.data.data/100).toFixed(2)+'元'
      this.hongbao.show = false;
      this.hongbao.hong = false;
      if(res.data.data==null){
        this.money='已抢完'
        console.log('已抢完');
        return;
      }
    },
    /////关注
    async attentionClick(id) {
      const res = await follow({
        followuserid: id,
        unfollow: false
      });
      if (res.data.code === statusCode.OK) {
        this.guangzhu = "已关注";
        wx.showToast({
          title: "关注成功~"
        });
      }
    },
    videoredpackGrab() {
      this.hongbao.hong=true;
       wx.navigateTo({ url: `/pages/videoredpack-grab/main?id=${this.videoid}&remark=${this.count}&name=${this.name}`})
    },

    close() {
      this.hongbao.hong = true;
      this.hongbao.show=false;
      this.hongbao.close = false;
    },
    tanqi() {
      this.show = false;
      this.fouse = true;
    },
    // 打开红包
    hongopen() {
      this.onVideoredpackGrab()
    },
    avatarClick(id) {
      wx.navigateTo({ url: "/pages/personal-video/main?id=" + this.user});
    },
    bindPlay: function() {
      this.videoContext = wx.createVideoContext("video-id");
      this.videoContext.play();
      this.open = true;
    },
    async onSetStats(id) {
      const res = await setStats({
        key: `videoPlay${id}`
      });
      if (res.data.code === statusCode.OK) {
      }
    },
    shar(){  
      const obj={
          city:this.city=='未知'?"":this.city,
          PlayNum:this.num,
          id:this.url,
          pic:this.imgArray,
          name:this.name,
          remark:this.count,
          videoid:this.videoid,
          userid:this.user,
          index:this.indexi
      }
    this.$emit('shar',obj)
    },
  },
      // 首次检测红包状态
     onLoad(e) {
       console.log(e)
    let usero=JSON.parse(e.user)
    console.log(usero)

    this.autid=parseInt(e.auter)
    this.indexi=usero.index
    this.videoindex=usero.index
    this.open = true;
    this.city = usero.city == ""?'未知':usero.city;
    this.url = usero.id;
    this.name = usero.name;
    this.videoid = usero.videoid;
    this.user = parseInt(usero.userid);
    this.count=usero.remark;
    this.imgArray=usero.pic;
    if (usero.playNum == "undefined" || usero.playNum== null) {
      this.num =0;
    } else {
      this.num = usero.playNum;
    }
    wx.setNavigationBarTitle({
      title: this.name
    });
    this.getoncommit(this.videoid)
    this.onguanzhu();
    this.shar();
    const val= wx.getStorageSync('shop')
    this.nextvideo=wx.getStorageSync('videolist')
    this.videopages=wx.getStorageSync('pages')
    if(val.length!=0){
      this.ShowHiden=false
      this.productarr=val
      console.log(this.productarr)
    }else{
      this.ShowHiden=true
    }
  },
  mounted() {
    this.oop()
  },
   onShow(){
    this.oop();
    this.hongbao.hong=true;
     this.show=true;
     this.fouse = false;
    },
  onReady() {
    this.videoContext = wx.createVideoContext("video-id");
    this.author = this.data.author;
  },
  
};
</script>

<style lang="less" scoped>
@import "../../common/style/variable";
page{
 height: 120vh;
 background-color: #fff;
}
.http{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
}
#modellist{
  width: 150px;
  height: 200px;
  background:#ffffff;
  position:absolute;
  left: 50%;
  margin-left: -75px;
  top: 50%;
  // margin-top: -px;
  border-radius: 10px;
  overflow: hidden;
  z-index: 100;
  // display: none;
  .top{
    width: 100%;
    height: 160px;
    text-align: center;
    line-height: 160px;
    
  }
  .btn{
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    display: flex;
    div{
       flex: 1;
       width: 50%;
       height: 100%;
       text-align: center;
       line-height: 40px;
       color: #ffffff;
    }
    .off{
      background: #5c1dfb;
    }
    .affirm{
      background: #fae290;
    }
  }
}
  .hide{
    display: none;
  }
 .postive{
    position: absolute;
    z-index: 9999999;
    width: 300px;
    height: 300px;
    border:1px dotted gray;
    top:50%;
    left:50%;
    margin-left: -150px;
    margin-top: -50px;
    display: flex;
    flex-direction: column;
    background-color: rgba(255,255,255,0.7);
    padding-bottom: 30px;
    box-sizing: border-box;
    img{
      display: inline-block;
      margin: 0 auto;
      width: 70%;
      height: 150px;
    }
    p{
      border:1px dotted red;
      width: 90%;
      margin:30px auto;
      height: 30px;
      color:red;
      text-align: center;
    }
    .title{
     border:none;
      width: 90%;
      margin:0;
      height: 30px;
      color:red;
      text-align: center;
    }

    button{
      position: absolute;
      bottom: 5px;
      width: 100%;
      height: 30px;
      border-radius: 25px;
      line-height: 30px;
      font-size: 12px;
      background: red;
      color:#fff;
    }
    .close{
    width: 20px;
    height: 20px;
    text-align: center;
    color:gray;
    position: absolute;
    top:0;
    right:0;
    line-height: 20px;
    transform: rotate(45deg);
    font-size: 34px;
  }
  }
.main1{
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #2c273d;
}
.neirong{
  position: relative;
  background: #2c273d;
   .show {
    width: 60px;
    height: 60px;
    position: absolute;
    right: 0;
    top:50%;
    margin-top:-30px;
  }
  .report{
  width:40px;
  height: 40px;
  position: absolute;
  top:63%;
  right: 3%;
  img{
    width: 100%;
    height: 100%;
  }
}
}
.model {
  width: 80%;
  height: 250px;
  margin: 0 auto;
  
  position: absolute;
  bottom: 50px;
  left: 50%;
  color: #fff;
  margin-left: -40%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid red;
  .img-item {
    display: flex;
    font-size: 12px;
    img {
      width: 15px;
      height: 15px;
    }
  }
  .pic {
    border: 1px solid #fff;
    margin: 10px 0;
    display: flex;
    padding: 0 10px;
    font-size: 12px;
    justify-content: space-between;
    div {
      border: 1px solid red;
      position: relative;
      width: 40px;
      img {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -7.5px;
      }
    }
    span {
      line-height: 25px;
      margin-right: 5px;
    }
    button {
      border: 0 none;
      font-size: 12px;
      width: 80px;
      height: 20px;
      background: red;
      line-height: 20px;
      margin: auto 0;
      // text-align: center;
    }
  }
  .uselist {
    border: 1px solid #fff;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    text-align: center;
    img {
      width: 35px;
      height: 35px;
    }
    .zf img {
      width: 20px;
      height: 20px;
    }
    div {
      height: 35px;
    }
  }
}

.video-play-warp {
  background: #2c273d;
  height: 112vh;
}
 @media screen and (max-width:320px) {
  .video-play-warp {
  background: #2c273d;
  height: 120vh;
  }
  }

.colort {
  background: #ff6700;
  color: #fff;
}
.colorn {
  background: #534b6b;
  color: #fff;
}
.pictab {
  width: 100%;
  height: 215px;
  margin: 10px auto;
  .swiper-view {
    border: 1px solid red;
    width: 95%;
    height: 100%;
    margin: 10px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.show {
  display: block;
}
.hide {
  display: none;
}
.header {
  width: 100%;
  height: 20px;
  text-align: center;
  font-size: 12px;
  background: #2c273d;
  color: white;
}
.hongbao {
  position: absolute;
  width: 197px;
  height: 197px;
  left: 50%;
  bottom: 20%;
  margin-left: -120px;
  p {
    position: absolute;
    right: 45px;
    top: 58px;
    font-size: 20px;
    color: #fae290;
    transform: rotate(90deg);
  }
  h3 {
    position: absolute;
    left: 50%;
    font-size: 14px;
    color: #fff;
    bottom: 30px;
    margin-left: -20px;
  }
  img {
    z-index: 99;
    width: 100%;
    height: 100%;
  }
}
.connt {
  width: 98%;
  display: flex;
  padding:5px 0;
  justify-content: space-between;
}
.show {
  display: block;
}
.hide {
  display: none;
}
.box-son {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  button {
    height: 25px;
    background: #534b6b;
    color: #ffffff;
    font-size: 12px;
    padding: 0 10px;
    margin: auto 0;
    text-align: center;
    line-height: 25px;
    border-radius: 25px;
  }
  .btn-top {
    display: flex;
    text-align: center;
    h3 {
      font-size: 12px;
      display: inline-block;
      width: 35px;
      height: 25px;
      line-height: 25px;
      margin: auto 0;
    }

    h3:first-child {
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }
    h3:last-child {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }
  p {
    height: 25px;
    background: #534b6b;
    color: #ffffff;
    font-size: 12px;
    padding: 0 10px;
    margin: auto 0;
    text-align: center;
    line-height: 25px;
    border-radius: 25px;
  }
}
.addice {
  border-radius: 5px;
  font-size: 12px;
  width: 95%;
  height: auto;
  margin: 10px auto;
  color: #ec6516;
  background: #5830e0;
  word-wrap:break-word;
  word-break:break-all;
  overflow: hidden;
  img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
}
.count {

  .products{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .product{
      width: 30%;
      height: 150px;
      border-radius: 5px;
      margin: 5px;
      box-sizing: border-box;
      overflow: hidden;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      position: relative;
      .pic{
        width: 100%;
        height: 60%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        height: 25px;
        font-size: 10px;
        display: -webkit-box; 
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical; 
        overflow: hidden;

      }
      .discount{
        width:100%;
        margin-top:5px;
        height: 18px;
         display: flex;
         .left{
           flex: 2;
           font-size: 10px;
           display: flex;
           align-items: center;
         }
         .right{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          .button{
            width: 90%;
            height: 70%;
            background-color: gold;
            font-size: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
         }
      }
  }
  }
  width: 95%;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
  position: relative;
  padding-bottom: 50px;
  span {
    color: blue;
  }
  p {
    font-size: 12px;
    color: #fb8d7e;
    padding: 5px 0;
  }
}
//////////////////////////////////////////////////////////////////////////
.video-warp {
  width: 100%;
  height: 215px;
  margin:10px auto;
  .video-view {
    width: 100%;
    height: 100%;
  }
  .tab-warp {
    position: absolute;
    bottom: 15px;
    left: 50%;
    display: flex;
    justify-content: space-between;
    transform: translate(-50%, 0);
    color: #fff;
    font-size: 12px;
    .tab-item {
      border-radius: 10px;
      padding: 5px 8px;
      background: rgba(255, 255, 255, 0.5);
    }
    .tab-item:first-child {
      margin-right: 5px;
    }
    .active {
      background: #ff6029;
    }
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  text-align: center;
}
.inp {
  width: 70%;
  height: 30px;
  background: #fff;
  border-radius: 5px;
}
.input-warp {
  position:fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border: 1px solid #4b3786;
  border-bottom: 0 none;
  background: #2c273d;
  font-size: 14px;
  .input-inner {
    display: flex;
    align-items: center;
    width: 98%;
    margin: auto;
    button {
      width: 20%;
      padding: 0 5px;
      height: 30px;
      line-height: 30px;
      background: #5c1dfb;
      color: #fff;
    }
    .input {
      width: 60%;
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
      background: #fff;
    }
    .iconlogo {
      display: flex;
      width: 40%;
      padding: 0 10px;
      justify-content: space-between;
    }
    img {
      width: 38px;
      height: 38px;
      text-align: center;
    }
  }
}
.clickimg{
  width:100%;
  height:100%;
  swiper
  {
  width:95%;
  height:100%;
  margin: 0 auto;
  img
  {
    width:100%;
    height: 100%;
  }
  }
}
</style>
