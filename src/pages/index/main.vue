<template>
  <div class="video">
    <div class="videoproduct" v-for="(item,index) in userlist" :key="index">
        <img src="../../../static/video.png" class="bgc" @click="goto(item)">
      <!--<img
        class="pic"
        :src="item.url+'?vframe/jpg/offset/1'"
        alt
        mode="aspectFill"
        @click="goto(item.id,item.storagedetails,item.author.id)"
      />-->
			<div class="imgpc">
				<img class="pic"
        :src="item.url+'?vframe/jpg/offset/1'"
        alt
        mode="aspectFill"
        @click="goto(item)" />
			</div>
			
			
      <div class="title">{{item.remark==null?'':item.remark}}</div>
      <div class="Record">
        <span>{{item.playNum}}次播放</span>
        <span>{{item.createTime}}</span>
      </div>
      <div class="userinfo">
        <img :src="item.author.avatarUrl" @click="goingfo(item.author.id)">
        <div class="username">
          <span>{{item.author.nickName}}</span>
          <span>{{item.author.province}}-{{item.author.city}}</span>
        </div>
        <div class="share">
          <button :open-type="share" :data-rid="index" :data-videoid="item.id">
            <img src="../../../static/wx.png" alt>
            <span>分享</span>
          </button>
        </div>
      </div>
    </div>
    <div class="tabbar">
				<div class="Home">
					<div class="Homeicon">
						<img src="/static/SHOUYE-an.png" />
					</div>
					<p style="color:#FF2063">首页</p>
				</div>
				<div class="upload" @click="gotoupload">
					<div class="uploadicon">
						<img src="/static/videosx.png" />
					</div>
					<p>上传</p>
				</div>
				<div class="personalcenter" @click="gotopersonal">
					<div class="personalcentericon">
						<img src="/static/WO-P.png" />
					</div>
					<p>我的</p>
				</div>
		</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../../store";
import {
  getAllVideoList,
  videolist,
  gettotalmsg,
  getvideotranspond,
  getqueryimg,
  cfgGet
} from "../../api/index";
import { statusCode } from "../../config/api.cfg";
import { log } from "util";
// import util from "../../utils/bluebird.js";
export default {
  store,
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      userlist: null,
      size: 8,
      page: 0,
      pages: null,
      img: "",
			Homeicon:true,
			uploadicon:true,
			personalicon:true,
			appid:'wx9570f1379d9db1dd'
    };
  },

  methods: {
		gotoupload() {
			 uni.redirectTo({
			 	url: '../upload-pic/main'
			 })
		},
		gotopersonal() {
			uni.redirectTo({
				url: '../my/main'
			})
		},
    goingfo(id) {
      uni.navigateTo({
        url: `../personal-video/main?id=${id}`
      });
    },
    // async bgp(){
    // const  res= await cfgGet("pictype");
    // if(res.data.data.contentStr!=="99"){
    //   console.log(123)
    //    uni.redirectTo({ url: "/pages/false-home/main" })
    // }

    // },
    formatTimes(date) {
      let now = new Date(date);
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      const t2 = [hour, minute, second].map(formatNumber).join(":");
    },
    async getvideolist(size, page, ont) {
      const res = await videolist({
        size,
				page
      });
			console.log(res)
      if (res.data.code === statusCode.OK) {
        if (ont === false) {
          if (res.data.data.content.length != 0) {
            uni.setStorageSync("videolist", this.userlist);
            res.data.data.content.forEach(ele => {
              let now = new Date(ele.createTime);
              const hour = now.getHours();
              const minute = now.getMinutes();
              const second = now.getSeconds();
              ele.createTime = `${hour}:${minute}:${second}`;
            });
            this.userlist.push(...res.data.data.content);
          }
          if (res.data.data.content.length == 0) {
            uni.showToast({
              title: "已经到底了"
            });
          } else {
            // uni.setStorageSync("pages", this.pages);
          }
        } else {
          res.data.data.content.forEach(ele => {
            let now = new Date(ele.createTime);
            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();
            ele.createTime = `${hour}:${minute}:${second}`;
          });

          this.userlist = res.data.data.content;
          // uni.setStorageSync("videolist", this.userlist);
        }
      }
    },
    async ongettotalmsg() {
      const res = await gettotalmsg();
      console.log(res);
    },
    goto(res) {
//       console.log("即将要跳转的数据" + res + obj + user)
				 uni.setStorage({ key: "shop", data: res.storagedetails });
//       uni.navigateTo({
//         url: `../home/main?videoid=${res}&userid=${user}`
//       });
			uni.setStorage({
				key: 'videoDetail',
				data: res,
				success: () => {
					uni.navigateTo({
						url: `../home/main`
					})
				}
			});
    },

    async getshar(id) {
      const res = await getvideotranspond({ videoId: id });
    },
    async getimage() {
      const res = await getqueryimg(
				/*{appid:this.appid}*/
			);
      if (res.data.code === statusCode.OK) {
        this.img = res.data.data.pictureURL;
      }
    }
  },
  ///下拉刷新
  onPullDownRefresh() {
    let size = 8,
      page = 0;
    this.getvideolist(size, page);
    setTimeout(() => {
      uni.showToast({
        title: "刷新成功",
        success() {
          uni.stopPullDownRefresh();
        }
      });
    }, 1500);
  },
  onShareAppMessage(res) {
    this.getimage();
    let img = "";
    if (res.from == "button") {
      img = `${this.userlist[res.target.dataset.rid].url}?vframe/jpg/offset/1`;
      this.getshar(res.target.dataset.videoid);
    } else {
      img = this.img;
    }
    return {
      title: `${this.userInfo.nickName}    邀你一起领红包`,
      path: `/pages/login/main`,
      imageUrl: img
    };
  },
  created() {
    this.getvideolist(this.size, this.page);
  },
  onReachBottom: function() {
    this.pages++;
    uni.showLoading({
      title: "玩命加载中"
    });
    this.getvideolist(this.size, this.pages, false);
  },
  onShow() {
    this.pages = 0;
    this.getimage();
    // this.bgp()
    // const token=uni.getStorageSync('token')
    // const vuex=uni.getStorageSync('vuex')
    // console.log(vuex)
    // if(token==''||vuex==''){
    //   uni.reLaunch({url:'/pages/login/main'})
    // }
    // uni.hideShareMenu();
  },
  onLoad(){
  }
};
</script>
<style lang="less" scoped>
.video {
  width: 100vw;
  background-color: #ddd;
  box-sizing: border-box;
	padding-bottom:45px;
  padding-top: 5px;
	font-size:14px;
  .videoproduct {
    width: 100%;
    height: 270px;
    margin: 5px auto;
    position: relative;
    padding-bottom: 20px;
    background-color: #fff;
    box-sizing: border-box;
    .bgc {
      width: 60px;
      height: 60px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -30px;
      margin-top: -30px;
    }
    .imgpc {
      display: block;
      width: 94%;
      height: 220px;
      border-radius: 5px;
			background:#000;
      margin: 0 auto;
			.pic {
				width:100%;
				height:100%;
				object-fit: cover;
			}
    }
    .title {
      position: absolute;
      left: 0;
      top: 2px;
      width: 100%;
      color: #ffffff;
      box-sizing: border-box;
      padding: 5px 10px 5px 15px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .Record {
      width: 100%;
      position: absolute;
      left: 0;
      top: 185px;
      box-sizing: border-box;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        color: #ffffff;
      }
    }
    .userinfo {
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      margin-top: 5px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
      }
      div {
        font-size: 12px;
      }
      .username {
        position: absolute;
        left: 50px;
        top: 0;
        display: flex;
        flex-direction: column;
        span {
          font-size: 10px;
        }
      }
      .share {
        width: 50px;
        height: 20px;
        button {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: #1dc886;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          img {
            width: 12px;
            height: 12px;
          }
          span {
            margin-left: 2px;
            font-size: 10px;
            color: #fff;
          }
        }
      }
    }
  }
		.tabbar {
			width:100vw;
			height:50px;
			position:fixed;
			display: flex;
			justify-content:space-around;
			border:1px solid #fafafa;
			background:#fff;
			bottom:0px;
			.Home {
				width:50px;
				height:100%;
				.Homeicon {
					width:65%;
					height:60%;
					margin:0 auto;
					img {
						width:100%;
						height:100%;
					}
				}
				p {
					font-size:12px;
					text-align: center;
				}
			}
			.upload {
				width:50px;
				height:100%;
				.uploadicon {
					width:60%;
					height:60%;
					margin-left:24%;
					margin-top:0.7%;
					img {
						width:100%;
						height:100%;
					}
				}
				p {
					font-size:12px;
					text-align: center;
				}
			}
			.personalcenter {
				width:50px;
				height:100%;
				.personalcentericon {
					width:55%;
					height:60%;
					margin:0 auto;
					img {
						width:100%;
						height:100%;
					}
				}
				p {
					font-size:12px;
					text-align: center;
				}
			}
	}
}
</style>
