<template>
  <div class="details" @click="heden">
    <div class="videos">
      <video
        :src="videoDetail.url"
        objectFit="cover"
        :show-play-btn="true"
        :show-center-play-btn="true"
        :enable-progress-gesture="false"
        circular
        :loop="false"
        :controls="true"
        autoplay
        show-fullscreen-btn
        :custom-cache="false"
        v-show="isShow"
        id="myVideo"
      ></video>
      <img :src="videoDetail.url+'?vframe/jpg/offset/1'" mode="aspectFill" v-show="!isShow">
    </div>
    <div class="comments" :style="{backgroundColor:colour,marginBottom:heights,color:colours}">
      <div :style="{color:colours}" @click="Album">
        <i class="iconfont icon-xiangce" style="color:red"></i>
        <span>相册</span>
      </div>
      <!-- <div :style="{color:colours}">
        <i class="iconfont icon-pinglun"></i>
        <span>评论</span>
      </div>-->
      <div :style="{color:colours}" @click.stop="showstr('frame')">
        <i class="iconfont icon-tubiaozhizuo-"></i>
        <span>分享</span>
      </div>
    </div>
    <div class="conten">
      <div class="userinfo" v-if="videoDetail.author">
				<!--用户头像-->
        <img :src="videoDetail.author.avatarUrl" @click="goingfo">
        <div class="user">
          <p class="time">
            <span>作品&nbsp;{{videoDetail.author.videoNum}}</span>
            <span @click="follow">{{text}}</span>
          </p>
          <p class="name">{{videoDetail.author.nickName}}</p>
        </div>
        <div class="More" @click.stop="showstr('fence')">
          <div class="gd">更多</div>
          <div class="sj">{{videoDetail.reviewTime }}</div>
        </div>
      </div>
      <div class="CommentArea">{{videoDetail.remark==null?'':videoDetail.remark}}</div>
      <div class="detailss">
        <div>
          <i class="iconfont icon-bofang"></i>
          <span>{{videoDetail.playNum}}</span>
        </div>
        <div @click.stop="showstr('frame')">
          <i class="iconfont icon-fenxiang"></i>
          <span>{{videoDetail.sharevideo}}</span>
        </div>
      </div>
    </div>
    <div class="Recommend">
      <div class="title">-更多推荐欣赏-</div>
      <div class="products">
        <div
          class="product"
          v-for="(item,index) in indexarr"
          :key="index"
          @click="goto(item)"
        >
          <img class="pic" :src="item.url+'?vframe/jpg/offset/1'" mode="aspectFill">
          <div class="tle">{{item.remark==null?'':item.remark}}</div>
          <img
            src="../../../static/video.png"
            @click="goto(item)"
            class="bgc"
          >
          <div class="time">
            <div>{{item.playNum}}次播放</div>
            <div>{{item.createTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="classhow=='frame'" v-show="!isShow">
      <div class="frame">
        <div class="share">
          <button open-type="share">
            <i class="iconfont icon-fenxiang" id="cd"></i>
            分享给好友或微信群
          </button>
        </div>
        <div class="cancel" @click.stop="noshow">取消</div>
      </div>
    </div>
    <div v-show="!isShow" v-if="classhow=='fence'">
      <div class="fence">
        <div class="Report" @click.stop="Report(userlist.id)">
          <i class="iconfont icon-jubao"></i>
          <span>举报</span>
        </div>
        <div class="cancel" @click.stop="noshow">取消</div>
      </div>
    </div>
		
   <div class="circleProgress_wrapper" v-show="showhongbao === true">
			<!--status表示进度条-->
      <div class="wrapper right" v-if="lingqu">
        <div class="circleProgress rightcircle" :class="{'activea':status}"></div>
      </div>
      <div class="wrapper left" v-if="lingqu">
        <div class="circleProgress leftcircle" :class="{'activeb':status}"></div>
      </div>
			<!--show 的作用红包, 显示已经领取还是显示红包-->
     <img src="http://sphbvideo.25010086.com/20190121102246.png" v-show="!lingqu" @click="collar">
      <div class="Receive" @click.stop="Receive" v-show="lingqu = true">
        <img src="http://sphbvideo.25010086.com/20190109102701.png" alt="" mode='aspectFill'><!--已领取-->
      </div>
    </div>
    <div class="integral" v-show="integral">
      <div class="title">{{subnum}}</div>
      <img :src="imgs">
    </div>
		<div class='hongbao' :animation='animation' @click="collar" v-show='hongbao'>
      <div class='title'>深圳优视</div>
      <img src='http://sphbvideo.25010086.com/20190114112452.png' style="z-index:100;" class='imgs' mode='aspectFill'/> 
    </div>
  </div>
</template>
<script>
import {
  videoDetail,
  videolist,
  getvideostate,
  videoredpackGrab,
  getguanzhustate,
  follow,
  getsharmessage,
  videoredpackHistory,
  getvideotranspond
} from "../../api/index";
import { statusCode } from "../../config/api.cfg";
import { mapGetters } from "vuex";
import store from "../../store";
export default {
  store,
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
			lingqu:false,
			showhongbao:true,
      colour: "rgb(0,0,0)",
      colours: "rgb(255,255,255)",
      heights: "0px",
      userlist: {},
      pageIndex: 0,
      pageSize: 6,
      indexarr: [],
      isShow: true,
      classhow: "",
      show: true,
      id:null,
      integral: false,
      videoid: "",
      status: false,
      user: "",
      text: "+关注",
      numlist: 1,
      subnum: 0,
      rece: "已领取",
      imgs: "",
      also: false,
      private: false,
			hongbao:false,
			animation:{},
			hongbaostate:'',
			videoDetail:{}
    };
  },
  methods: {
		 collar() {
			uni.setStorage({
				 key:'userlist',
				 data:this.userlist,
				 success:() => {
					 console.log('success')
				 }
			})
			this.lingqu = true;
			this.show = true;
			uni.navigateTo({
				url:`../Album/main?id=${this.videoid}&remark=${this.userlist.remark}`
			});
		
		},
		gethongbao(){
      // setTimeout(()=>{
        this.hongbao=true
        this.ongethongbao()
      // },5000)
    },
    ongethongbao(){
      setTimeout(()=>{
        this.hongbao=false
				// 显示小红包
				this.lingqu = false
				this.showhongbao = true
      },5000)
    },
    goingfo() {
     uni.navigateTo({
        url: `../personal-video/main?id=${this.userlist.author.id}`
      });
    },
    Album() {
			uni.setStorage({
				 key:'userlist',
				 data:this.userlist,
				 success:() => {
					 console.log('success')
				 }
			})
      uni.navigateTo({
        url: `../Album/main?hongbao=false`
      });
    },
    Receive() {
			
      uni.navigateTo({
        url: `../videoredpack-grab/main?videoid=${this.videoDetail.id}`
      });
    },
    Report(res) {
      const obj = {
        id: res,
        type: "reviewVideo",
        status: 0
      };
			uni.setStorage({
					key: 'obj',
					data: obj,
					success: () => {
							console.log('obj is success');
					}
			});
      uni.navigateTo({
        url: "../report-reason/main?"
      });
    },
    heden() {
      this.isShow = true;
      this.integral = false;
    },
    showstr(res) {
      if (res == "frame") {
        this.classhow = "frame";
      } else if (res == "fence") {
        this.classhow = "fence";
      }
      this.isShow = false;
    },
    noshow() {
      this.isShow = true;
      const res = uni.createVideoContext("myVideo");
      setTimeout(function() {
        res.play();
      }, 500);
    },
    goto(res) {
      uni.setStorage({ key: "shop", data: res.storagedetails });
			uni.setStorage({
				key:'videoDetail',
				data:res,
				success: () => {
					 uni.navigateTo({
					  url: `./main`
					});
				}
			})
    
    },
    async rander(pageSize, pageIndex) {
      uni.showLoading({
        title: "玩命加载中"
      });
      const res = await videolist({ page: pageIndex, size: pageSize });
      if (res.data.code === statusCode.OK) {
        if (res.data.data.content.length != 0) {
          res.data.data.content.forEach(ele => {
            let now = new Date(ele.createTime);
            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();
            ele.createTime = `${hour}:${minute}:${second}`;
            this.indexarr.push(ele);
          });
        } else {
          uni.showToast({
            title: "已经到底了"
          });
        }
      }
    },
    formatTime(date) {
			let now = new Date().getTime();
			let publishtime = new Date(date).getTime();
			let Distance = now - publishtime;
      this.videoDetail.reviewTime = this.formatDuring(Distance);
    },
		// 时间转换
		formatDuring(mss) {
			let str = ''
			var days = parseInt(mss / (1000 * 60 * 60 * 24));
			var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = (mss % (1000 * 60)) / 1000;
			if (days > 0) {
				str = days.toString() + '天前'
			} else if (hours > 0) {
				str = hours.toString() + '小时前'
			} else if (minutes > 0) {
				str = minutes.toString() + '分钟前'
			} else if (seconds > 0) {
				str = seconds.toString() + '秒前'
			}
			return str;
		},
    async getvideo(res) {
      const str = await videoDetail(res);
			console.log("获得的视频")
			console.log(str)
      if (str.data.code === statusCode.OK) {
        this.userlist = str.data.data;
        this.formatTime(this.userlist.reviewTime);
      }
    },
		// 获取红包状态
    async modify(obj) {
      const res = await getvideostate({ 
				userId:this.userInfo.User.id,
				session:this.userInfo.token.userToken,
				videoid: obj,
			});
			console.log('数据:')
			console.log(res)
      if (res.data.code === statusCode.OK) {
        if(res.data.data.state == true || res.data.data.existence == true){
          console.log('红包已领取')
					// 显示已经领取
					this.showhongbao = true
          this.hongbao=false;
          this.show=true;
					this.lingqu = true;
          return
        }
				// 红包过期
        if(res.data.data.regression){
          console.log('红包已退回')
          this.show=false;
					this.showhongbao = false
          this.gethongbao()
					this.hongbaostate = '过期'
        }
				// 红包可以领取
        if (res.data.data.state == false) {
					this.showhongbao = false
          this.gethongbao()
					this.status=false;
					this.show=false;
					this.hongbaostate = '领取'
        } 
      }
    },
		// 点击显示关注
    async follow() {
      if (this.id == this.userInfo.User.id) {
        uni.showToast({ title: "不能关注自己", icon: "none" });
        return;
      }
      console.log(this.id)
      if (this.text == "+关注") {
        const res = await follow({
					userId:this.userInfo.User.id,
					session:this.userInfo.token.userToken,
          followuserid:this.id,
          unfollow: false
        });
        console.log(res)
        if (res.data.code === statusCode.OK) {
          this.text = "已关注";
          uni.showToast({
            title: "关注成功~"
          });
        }
      }
    },
		// 获取关注状态
    async concerned() {
      const res = await getguanzhustate({
        VideoUserId: this.id,
        UserId: this.userInfo.User.id
      });
			console.log('得到关注的状态为:')
			console.log(res)
      if (res.data.code === statusCode.OK) {
				  
          console.log(res);
        
        if (res.data.data) {
          this.text = "已关注";
        } else {
          this.text = "+关注";
        }
      }
    },
    async getshar() {
      const res = await getvideotranspond({ videoId: this.videoid });
      console.log(res);
    }
  },
  onLoad(res) {
		let that = this
		uni.getStorage({
			key: 'videoDetail',
			success:(res) => {
				console.log(res.data);
				that.videoDetail =  res.data
			}
		});
		console.log("视频具体信息为: ")
		console.log(this.videoDetail)
		// 免费视频
		if (this.videoDetail.freevideo === true) { 
			this.hongbaostate = ''
			this.showhongbao = false
			this.id=parseInt(res.userid)
			this.formatTime(this.videoDetail.reviewTime)

		} else {
			console.log('bbbbbb')
			this.hongbaostate = ''
			this.showhongbao = false
			this.modify(this.videoDetail.id);
			this.id=parseInt(res.userid)
			this.formatTime(this.videoDetail.reviewTime)
		}
// 		this.hongbaostate = ''
// 		this.showhongbao = false
// 		this.modify(res.videoid);
// 		console.log(res)
//     this.id=parseInt(res.userid)
//     console.log(this.id)
//     this.videoid = res.videoid;
// 		console.log("视频id为：" + this.videoid)
    //this.getvideo(res.videoid);
  },
  onPageScroll(e) {
    let num = e.scrollTop;
    if (num >= 320) {
      num = 320;
    } else if (num <= 50) {
      num = 0;
    }
    this.colour = `rgb(${num},${num},${num})`;
    this.colours = `rgb(${255 - num},${255 - num},${255 - num})`;
    this.heights = `-${num - 255}px`;
  },
  onReachBottom() {
    this.rander(this.pageSize, ++this.pageIndex);
  },
  onShow() {
    this.numlist = 0;
    this.heights = "0px";
    this.colour = "rgb(0,0,0)";
    this.colours = "rgb(255,255,255)";
    this.isShow = true;
    this.user = this.userInfo;
    this.integral = false;
		this.hongbao = false
    const timer = setInterval(() => {
      this.numlist++;
      if (this.numlist >= 5) {
        clearInterval(timer);
      }
    }, 1000);
    console.log(this.videoid);
    
    this.concerned();
  },
  onUnload() {
    this.Show = true;
  },
  onShareAppMessage(ops) {
    this.getshar();
    return {
      title: `${this.user.nickName} 邀你一起领红包`,
      path: `./main?videoid=  ${this.videoid}&userid=${this.id}`,
      imageUrl: `${this.userlist.url}?vframe/jpg/offset/1`
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../../../static/css/font.css");
i {
  list-style: none;
}
.details {
  .integral {
    width: 150px;
    height: 200px;
    background: url("http://sphbvideo.25010086.com/20181222153719.png");
    border-radius: 8px;
    position: absolute;
    top: 100vh;
    left: 50%;
    margin-left: -75px;
    overflow: hidden;
    .title {
      width: 100%;
      height: 30px;
      margin-top: 10px;
      position: absolute;
      text-align: center;
      line-height: 30px;
      color: gold;
      font-size: 35px;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .circleProgress_wrapper {
    width: 60px;
    height: 60px;
    margin: 15px auto;
    position: fixed;
    top: 50%;
    right: 5px;
    img {
      width: 50px;
      height: 65px;
      display: block;
      margin: 5.1px auto 0px;
      position: relative;
      z-index: 100;
    }
    .Receive {
      width: 49px;
      height: 49px;
      margin: 5.5px auto 0px;
      border-radius: 50%;
      font-size: 10px;
      background-color:#E5E16C;
      text-align: center;
      line-height: 50px;
      position: relative;
      z-index: 100;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

  .wrapper {
    width: 32px;
    height: 80px;
    position: absolute;
    top: 0;
    overflow: hidden;
  }
  .right {
    float: left;
    right: 0.1px;
  }
  .left {
    float: left;
    left: 0.1px;
  }
  .circleProgress {
    width: 62px;
    height: 62px;
    border: 6px solid green;
    border-radius: 50%;
    position: absolute;
    top: 0;
		margin-top:-1px;
    -webkit-transform: rotate(45deg);
  }
  .rightcircle {
    border-top: 6px solid green;
    border-right: 6px solid green;
    right: 0;
  }
  .activea {
    animation: circleProgressLoad_right 5s linear 1;
  }
  .leftcircle {
    border-bottom: 6px solid green;
    border-left: 6px solid green;
    left: 0;
  }
  .activeb {
    animation: circleProgressLoad_left 5s linear 1;
  }
/*
  @keyframes circleProgressLoad_right {
    0% {
      border-top: 6px solid #ed1a1a;
      border-right: 6px solid #ed1a1a;
      -webkit-transform: rotate(45deg);
    }
    50% {
      border-top: 6px solid rgb(232, 232, 12);
      border-right: 6px solid rgb(232, 232, 12);
      border-left: 6px solid rgb(81, 197, 81);
      border-bottom: 6px solid rgb(81, 197, 81);
      -webkit-transform: rotate(225deg);
    }
    100% {
      border-left: 6px solid green;
      border-bottom: 6px solid green;
      -webkit-transform: rotate(225deg);
    }
  }
  @keyframes circleProgressLoad_left {
    0% {
      border-bottom: 6px solid #ed1a1a;
      border-left: 6px solid #ed1a1a;
      -webkit-transform: rotate(45deg);
    }
    50% {
      border-bottom: 6px solid rgb(232, 232, 12);
      border-left: 6px solid rgb(232, 232, 12);
      border-top: 6px solid rgb(81, 197, 81);
      border-right: 6px solid rgb(81, 197, 81);
      -webkit-transform: rotate(45deg);
    }
    100% {
      border-top: 6px solid green;
      border-right: 6px solid green;
      border-bottom: 6px solid green;
      border-left: 6px solid green;
      -webkit-transform: rotate(225deg);
    }
  }*/
  width: 100vw;
  .fence {
    position: fixed;
    width: 100%;
    height: 120px;
    z-index: 3;
    left: 0;
    bottom: 0;
		font-size:16px;
    background-color: #cccccc;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: martop 0.5s 1;
    div {
      width: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div.Report {
      background-color: #fff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      i {
        color: #f00;
        font-size: 23px;
        margin-right: 13px;
      }
    }
  }
  .frame {
    position: fixed;
    width: 100%;
    height: 120px;
    z-index: 5;
    left: 0;
    bottom: 0;
    background-color: #cccccc;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: martop 0.5s 1;
		font-size:18px;
    .share {
      flex: 1;
      width: 100%;
      background-color: #fff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      button {
        width: 100%;
        height: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        #cd {
          font-size: 25px;
          color: #00ff00;
          margin-right: 20px;
        }
      }
      button::after {
        border: none;
      }
    }
    .cancel {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  @keyframes martop {
    0% {
      margin-bottom: -120px;
    }
    100% {
      margin-bottom: 0px;
    }
  }
  .videos {
    width: 100%;
    height: 90vh;
    video {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .comments {
    background-color: #fff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 2;
    width: 100vw;
    height: 10vh;
    display: flex;
		font-size:14px;
    justify-content: space-around;
    align-items: center;
    > div {
      flex: 1;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 0.5rem;
      i {
        margin-right: 5px;
      }
      .icon-tubiaozhizuo- {
        display: block;
        width: 23px;
        height: 30px;
        animation: changebox 2s infinite;
        color: rgb(0, 255, 0);
      }
			
      @keyframes changebox {
        0% {
          font-size: 20px;
        }
        50% {
          font-size: 24px;
        }
        100% {
          font-size: 20px;
        }
      }
    }
  }
  .conten {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .userinfo {
      display: flex;
      height: 60px;
      justify-content: space-between;
      align-items: center;
      position: relative;
      img {
        display: block;
        border-radius: 20px;
        width: 40px;
        height: 40px;
      }
      .user {
        position: absolute;
        left: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 12px;
        }
        .name {
          font-weight: bold;
        }
        .time {
          display: flex;
          margin-bottom: 5px;
          span {
            font-size: 10px;
            background-color: #ff2063;
            color: #fff;
            display: block;
            margin-right: 5px;
            box-sizing: border-box;
            padding: 2px 4px;
            border-radius: 5px;
          }
        }
      }
      .More {
        font-size: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .gd {
          width: 40px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 10px;
          background-color: #ff2063;
          color: #fff;
          margin-bottom: 5px;
        }
      }
    }
    .detailss {
      height: 30px;
      display: flex;
      box-sizing: border-box;
      padding: 0px 15px;
      justify-content: space-between;
      align-items: center;
      > div {
        font-size: 12px;
        display: flex;
        i {
          margin-right: 3px;
        }
      }
    }
    .CommentArea {
      box-sizing: border-box;
      padding: 0 10px;
      width: 98%;
      margin: 0 auto;
      font-size: 16px;
      line-height: 30px;
    }
  }
  .Recommend {
    width: 100vw;
    background-color: #dddddd;
    .title {
      width: 100%;
      height: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
    }
    .products {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .product {
        width: 50%;
        height: 200px;
        box-sizing: border-box;
        padding: 6px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        .pic {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          overflow: hidden;
        }
        .tle {
          width: 94%;
          position: absolute;
          top: 6px;
          left: 6px;
          font-size: 12px;
          color: #fff;
          padding: 0px 10px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .bgc {
          position: absolute;
          width: 50px;
          height: 50px;
          left: 50%;
          top: 50%;
          margin-left: -25px;
          margin-top: -25px;
        }
        .time {
          position: absolute;
          width: 94%;
          left: 6px;
          bottom: 6px;
          display: flex;
          justify-content: space-between;
          padding: 0px 10px;
          box-sizing: border-box;
          div {
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }
	.hongbao{
    width:240px;
    height:320px;
    background: #FF5645;
    // border:1px solid red;
    position: fixed;
    top:50%;
    left:50%;
    margin:-160px auto auto -120px;
    border-radius: 8px;
    .title{
      position: absolute;
      text-align: center;
      color: #fdc07a;
      background: #FF5645;
      font-size: 20px;
      font-family: '楷体';
      top:80px;
      width: 100%;
    }
    .imgs{
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
	 .activea {
    animation: circleProgressLoad_right 5s linear 1;
  }
	.activeb {
    animation: circleProgressLoad_left 5s linear 1;
  }
	@keyframes circleProgressLoad_right {
    0% {
      border-top: 6px solid #ed1a1a;
      border-right: 6px solid #ed1a1a;
      -webkit-transform: rotate(45deg);
    }
    50% {
      border-top: 6px solid rgb(232, 232, 12);
      border-right: 6px solid rgb(232, 232, 12);
      border-left: 6px solid rgb(81, 197, 81);
      border-bottom: 6px solid rgb(81, 197, 81);
      -webkit-transform: rotate(225deg);
    }
    100% {
      border-left: 6px solid green;
      border-bottom: 6px solid green;
      -webkit-transform: rotate(225deg);
    }
  }
  @keyframes circleProgressLoad_left {
    0% {
      border-bottom: 6px solid #ed1a1a;
      border-left: 6px solid #ed1a1a;
      -webkit-transform: rotate(45deg);
    }
    50% {
      border-bottom: 6px solid rgb(232, 232, 12);
      border-left: 6px solid rgb(232, 232, 12);
      border-top: 6px solid rgb(81, 197, 81);
      border-right: 6px solid rgb(81, 197, 81);
      -webkit-transform: rotate(45deg);
    }
    100% {
      border-top: 6px solid green;
      border-right: 6px solid green;
      border-bottom: 6px solid green;
      border-left: 6px solid green;
      -webkit-transform: rotate(225deg);
    }
  }
}
</style>
