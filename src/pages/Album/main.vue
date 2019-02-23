<template>
  <div style="font-size:14px;">
    <swiper
      indicator-dots="true"
      indicator-color="#fff"
      indicator-active-color="#000"
      autoplay="true"
      circular="true"
      interval='1500'
    >
      <swiper-item v-for="(item,index) in imgarr" :key="index">
        <img :src="item" alt>
      </swiper-item>
    </swiper>
    <div class="conten">
      <div class="userinfo" v-if="userlist.author">
        <img :src="userlist.author.avatarUrl" @click="goingfo">
        <div class="user">
          <p class="time">
            <span>作品&nbsp;{{userlist.author.videoNum}}</span>
            <span @click="follow">{{text}}</span>
          </p>
          <p class="name">{{userlist.author.nickName}}</p>
        </div>
        <div class="More" @click.stop="showstr('fence')">
          <div class="gd">更多</div>
          <div class="sj">{{userlist.reviewTime }}</div>
        </div>
      </div>
      <div class="CommentArea">{{userlist.remark}}</div>
      <div class="detailss">
        <div>
          <i class="iconfont icon-bofang"></i>
          <span>{{userlist.playNum}}</span>
        </div>
        <div @click.stop="showstr('frame')">
          <i class="iconfont icon-fenxiang"></i>
          <span>{{userlist.sharevideo}}</span>
        </div>
      </div>
    </div>
		
		
		<!-- 红包区域 -->
    <div class='imgbox' v-show="name" :animation="animations">
      <div class='title'>{{subnum}}</div>
      <!-- <div class='header'>
        <img src="http://sphbvideo.25010086.com/20190109141136.png" alt="">
      </div> -->
      <div class="imgs">
        <img src='http://sphbvideo.25010086.com/20190109143923.png' @error='onse' @load='load'/>
      </div>
      <div class='open' @click="open" :animation='animation'>
        <img :src='openimg' />
      </div>
    </div>
		
		
		
    <div class="products">
      <div
        class="box"
        v-for="(item,index) in produc"
        :key="index"
        @click="toshow(item.pictUrl,item.couponClickUrl,item.title)"
      >
        <div class="product">
          <img :src="item.pictUrl">
          <div class="text">
            <div class="left">
              劵后
              <span style="color:red">￥{{item.zkFinalPrice}}</span>
            </div>
            <div class="right">
              <button>领取</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="classhow=='frame'">
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
    <div v-if="classhow=='fence'">
      <div class="fence">
        <div class="Report" @click.stop="Report(userlist.id)">
          <i class="iconfont icon-jubao"></i>
          <span>举报</span>
        </div>
        <div class="cancel" @click.stop="noshow">取消</div>
      </div>
    </div>
    <div class="comments" :style="{backgroundColor:colour,marginBottom:heights,color:colours}">
      <div :style="{color:colours}" @click="Album">
        <i class="iconfont icon-video" style="color:red"></i>
        <span>视频</span>
      </div>
      <!-- <div :style="{color:colours}">
        <i class="iconfont icon-pinglun"></i>
        <span>评论</span>
      </div> -->
      <div :style="{color:colours}" @click.stop="showstr('frame')">
        <i class="iconfont icon-tubiaozhizuo-"></i>
        <span>分享</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getvideorecode, getguanzhustate, follow, getvideotranspond,
getshopping,getvideostate, videoredpackGrab} from "../../api/index";
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
      imgarr: [],
      produc: [],
      userlist: {},
      text: "+关注",
      user: "",
      subnum:'',
      hongbao:false,
      name:true,
      openimg:'http://sphbvideo.25010086.com/20190109094223.png',
      animation:{},
      animations:{},
      animationx:{},
      animationY:{},
      animation:null,
      cls:true,
      onopen:true,
      remark:'1231',
      arrid:[],
      also:false,
      private:false,
      videoid:'',
      classhow: "",
      colour: "rgb(0,0,0)",
      colours: "rgb(255,255,255)",
      heights: "0px"
    };
  },
  methods: {
		 // 获取红包状态
		 async modify(obj) {
      const res = await getvideostate({ 
				userId:this.userInfo.User.id,
				session:this.userInfo.token.userToken,
				videoid:obj
			});
			console.log('红包状态为:')
      console.log(res.data.data)
      if (res.data.code === statusCode.OK) {
				
				// 红包过期
        if(res.data.data.regression) {
          this.openimg='http://sphbvideo.25010086.com/20190110095133.png'
          this.subnum='红包过期'
          this.ongetvideorecode()
          console.log('红包已退回')
          return
        }
				
				// 红包抢完
        if (res.data.data.also == false) {        
          this.openimg='http://sphbvideo.25010086.com/20190110095132.png'
          this.subnum='来晚了'
          this.ongetvideorecode()
          console.log('红包已抢完')
          return
        }

        // 好友的红包
        if(res.data.data.userList.length!==0) {
          this.private=true;
          console.log('好友红包')
          let arr=[];
          res.data.data.userList.forEach((item)=>{
             arr.push(item.id)
          })
          this.arrid=arr
        }
				
				// 红包可以领取
        if (res.data.data.state == false && res.data.data.also == true) {
          this.openimg='http://sphbvideo.25010086.com/20190109094223.png'
          console.log('红包可以领取')
          this.also=true
          this.onvideoredpackGrab()   //用户抢红包
        } 
      }
    },
		// 上传未抢到红包用户
		async ongetvideorecode() {
			// ??????????????????????????接口返回用户未登录
      const res= await getvideorecode({
				userId:this.userInfo.User.id,
				session:this.userInfo.token.userToken,
        videoid:this.videoid
      })
			console.log('上传未抢到红包用户为:')
			console.log(res)
    },
		// 抢红包
		async onvideoredpackGrab() {
			if(this.private) {
				//console.log('12345689')
				for(var key of this.arrid) {
					if (this.userInfo.User.id == key) {
						const res = await videoredpackGrab({
							userId:this.userInfo.User.id,
							session:this.userInfo.token.userToken,
							videoid: this.videoid
						});
						console.log('抢红包为:')
						console.log(res)
						this.subnum = ((res.data.data)/100).toFixed(2)+'元';
						this.openimg = 'http://sphbvideo.25010086.com/20190109094223.png'
					} else {
						this.subnum='好友红包'
						this.openimg='http://sphbvideo.25010086.com/20190110103637.png'
						this.ongetvideorecode()
						return
					}
				}
			}
			if(this.also) {
				console.log('12345689')
				const res = await videoredpackGrab({ 
					userId:this.userInfo.User.id,
					session:this.userInfo.token.userToken,
					videoid: this.videoid
				});
				console.log('sdkfhsdkjfh')
				console.log(res)
				this.subnum = ((res.data.data)/100).toFixed(2)+'元';
				this.openimg='http://sphbvideo.25010086.com/20190109094223.png'
     }
		},
    async ongetshopping() {
      const res = await getshopping({
          page:0,
          size:200,
      })
      console.log(res)
      this.produc.push(...res.data.data.content)
    },
    Album() {
      uni.navigateBack({
        delta: 1
      });
    },
    goingfo() {
      uni.navigateTo({
        url: `../personal-video/main?id=${this.userlist.author.id}`
      });
    },
		setint(){
        let timer=setTimeout(()=>{
          if(this.onopen=='2'){
            clearTimeout(timer)
            return
          }
          this.name=!this.name
          this.fades()
          this.dans()
          this.titlesy()
          uni.navigateBack({
            delta: 1
          });
        },3000)  
      
    },
		titles() {
			/*
			var animation = uni.createAnimation({
				duration:500,
				timingFunction:'linear'
			})
			animation.translateY(-30).step();
			this.animationY = animation.export();*/
		},
		dan() {
			var animation = uni.createAnimation({
				duration:200,
				timingFunction:'linear'
			})
			animation.opacity(0).step();
			this.animationx = animation.export();
		},
		open() {
			this.title = false;
			/*
			var animation = uni.createAnimation({
				duration: 2000,
				timingFunction:'linear'
			})
			animation.rotateY(720).step();
			this.animation = animation.export();*/
// 			setTimeout(() => {
//  				animation.rotateY(0).step();
// 				this.animation = animation.export();
				//this.dan();
				//this.titles()
				//this.setint()
			// },1000)
		},
    toshow(pic, link, title) {
      uni.setStorage({ key: "shoplink", data: link });
      let shopobj = { pic, title };
      let ink = JSON.stringify(shopobj);
      uni.navigateTo({
        url: `../count/main?link=${ink}`
      });
    },
    async follow() {
      if (this.userlist.author.id == this.user.id) {
        uni.showToast({ title: "不能关注自己", icon: "none" });
        return;
      }
      if (this.text == "+关注") {
        const res = await follow({
          followuserid: this.userlist.author.id,
          unfollow: false
        });
        if (res.data.code === statusCode.OK) {
          this.text = "已关注";
          uni.showToast({
            title: "关注成功~"
          });
        }
      } else if (this.text == "已关注") {
        const res = await follow({
          followuserid: this.userlist.author.id,
          unfollow: true
        });
        if (res.data.code === statusCode.OK) {
          this.text = "+关注";
          uni.showToast({
            title: "已取消关注~"
          });
        }
      }
    },
		// 创建动画对象
		fade() {
      var animation =  uni.createAnimation({
        duration:200,    // 动画持续时间0.2s
        timingFunction:'linear',  // 匀速
      })
     setTimeout(() => {  // 0.5s后执行
      var height=uni.getSystemInfoSync().windowHeight  // 获取可使用手机高度
			animation.translateY((height/2)+150).step() // 设置Y轴偏移量
			this.animations=animation.export()  // export方法每次调用后会清掉之前的动画操作
			this.open()
		 },500)
    },
		fades() {
			var animation = uni.createAnimation({
				duration:0,
				timingFunction:'linear'
			})
			var height = uni.getSystemInfoSync().windowHeight;
			animation.translateY(0).step();
			this.animations = animation.export();
			this.name = true;
		},
		titlesy(){
      var animation =  uni.createAnimation({
        duration:0,
        timingFunction:'linear',
      })
      animation.translateY(0).step()
      this.animationY=animation.export()
    },
		dans(){
      var animation =  uni.createAnimation({
        duration:0,
        timingFunction:'linear',
      })
      animation.opacity(1).step()
      this.animationx=animation.export()
    },
    async concerned() {
      if (this.userlist.author.id == this.user.id) {
        return;
      }
      const res = await getguanzhustate({
        VideoUserId: this.userlist.author.id,
        UserId: this.user.id
      });
      if (res.data.code === statusCode.OK) {
        if (res.data.data) {
          this.text = "已关注";
        } else {
          this.text = "+关注";
        }
      }
    },
    showstr(res) {
      if (res == "frame") {
        this.classhow = "frame";
      } else if (res == "fence") {
        this.classhow = "fence";
      }
    },
    noshow() {
      this.classhow = "";
    },
    Report(res) {
      const obj = {
        id: res,
        type: "reviewVideo",
        status: 0
      };
      uni.navigateTo({
        url: "../report-reason/main?obj=" + JSON.stringify(obj)
      });
    },
    async getshar() {
      const res = await getvideotranspond({ videoId: this.userlist.id });
    }
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
  onLoad(res) {
		console.log('userInfo的值:')
		console.log(this.userInfo)
		let that = this
    //接收来自Home页面的videoid和remark
		uni.getStorage({
			key:'videoDetail',
			success:(res) => {
				console.log('相册为:')
				console.log(res.data)
				that.userlist = res.data;
				that.imgarr = JSON.parse(that.userlist.cover);
			}
		})
		// 直接点击相册，则不显示红包
		if (res.hongbao == 'false') {
			//******调试红包
			
			this.name = false
			//this.fade()
		} else { // 点击红包
				if(this.userlist.id!=='1') {
					this.modify(this.userlist.id)  // 获取红包状态
					this.videoid=this.userlist.id
					//this.fade()    // 创建动画对象
					//this.ongettaobao(this.userlist.id)
					
					setTimeout(() => {
						this.name = false // 领取红包详情在4s后关闭
						uni.navigateBack({ // 跳回上一级
							delta: 1
						});
					},4500)
			
				} else{
					console.log(45)
				 // this.ongettaobao(this.userlist.videoid)
				}
				this.onopen=true;
				if (this.userlist.remark !== null) {
					this.remark=this.userlist.remark
					this.hongbao=true
				} else{
					this.remark='用户太懒了什么都没写';this.hongbao=false
				}
		}
    this.private=false;
  },
  onShow() {
    this.heights = "0px";
    this.colour = "rgb(0,0,0)";
    this.colours = "rgb(255,255,255)";
    this.produc = uni.getStorageSync("shop");
    console.log(this.produc)
    this.concerned();
    this.ongetshopping();
    this.user = this.userInfo;
  },
  onShareAppMessage(ops) {
    this.getshar();
    return {
      title: `${this.user.nickName} 邀你一起领红包`,
      path: `/pages/login/main`,
      imageUrl: `${this.userlist.url}?vframe/jpg/offset/1`
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../../../static/css/font.css");

swiper {
  width: 100vw;
  height: 100vh;
  swiper-item {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

// 红包
.imgbox{
	   width:260px;
		 min-height:332px;
		 height:auto;
		 z-index:999;
		 position:fixed;
		 bottom:25vh;
		 left: 0px;
		 right: 0px;
		 margin-left:auto;
     margin-right:auto;
		 background:#D62520;
		  .imgs{
      position: absolute;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
		.open{
      position: absolute;
      bottom: 72px;
      height:86px;
      width: 86px;
      border:2px solid gold;
      border-radius: 50%;
      left: 51%;
      margin-left: -40px;
    }
		 .header{
      position: absolute;
      // height: 100%;
      height:85px;
      top:0;
      left: 0;
      width: 100%;
      z-index: 9999999;
      img{
        width: 100%;
        height: 100%;
      }
    }
	   .title {
			position: absolute;
      // top: 12.5px;
      background: #F4B158;
      top:-5px;
      left: 50%;
      line-height:53px;
      height:85px;
      font-weight:500;
      letter-spacing:2px;
      margin-left: -48%;
      width:96%;
      text-align: center;
      color:red;
      font-size:28px;
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
.products {
  width: 100vw;
  background-color: #ddd;
  display: flex;
  flex-wrap: wrap;
  .box {
    width: 33.33%;
    height: 200px;
    box-sizing: border-box;
    padding: 5px;
    .product {
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      overflow: hidden;

      img {
        width: 100%;
        height: 150px;
      }
      .text {
        flex: 1;
        background-color: #fff;
        font-size: 10px;
        display: flex;
        .left {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          button {
            margin: 0;
            padding: 0;
            font-size: 10px;
            background-color: gold;
            padding: 0 5px;
          }
          button::after {
            border: none;
          }
        }
      }
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
.fence {
  position: fixed;
  width: 100%;
  height: 120px;
  z-index: 3;
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
.comments {
  background-color: #fff;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 2;
  width: 100vw;
  height: 10vh;
  display: flex;
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
    font-size: 12px;
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
</style>
