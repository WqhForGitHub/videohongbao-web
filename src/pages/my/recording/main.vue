<template>
<div class="view">
  
  <div class="tab">
      <div :class="{purple:purple}" @click="fachu">已发出</div>
      <div :class="{purple:tpurple}" @click="shoudao">收到的</div>
  </div>
    <div v-if="purple">
      <div class="count">
          <div class="">  <img src="../../../../static/jine.png" alt=""><span>{{wofachudeqian}}</span></div>
          <div class="">  <img src="../../../../static/hongbao.png" alt=""><span>{{wofachudezongfenshu}}</span></div>
      </div>
    </div>
    <div class="list" v-if="purple"  > 
      <div class="list-content" v-for="(item, index) in fachulist" :key="index">
        <div class="portrait">
          <img :src="userInfo.avatarUrl" style="" alt="" @click="click(item.videoid)">
          <div class="nickname">{{ userInfo.nickName }}</div>
        </div>
        <div class="portrait1">
          <div class="receive">
              <p>{{item.amount}}</p>
              <p>份数</p>
          </div>
          <div class="jine">
              <p>{{ (item.money)}}</p>
              <p>积分</p>
          </div>
          <div class="time">
             <p>{{item.createTime}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 收到的 -->
    <div v-if="tpurple">
      <div class="count">
          <div class=""><img src="../../../../static/jine.png" alt=""><span>{{woshoudaodeqian}}</span></div>
          <div class=""><img src="../../../../static/hongbao.png" alt=""><span>{{woshoudaodezongfenshu}}</span></div>
      </div>
    </div>
    <div class="list"  v-if="tpurple" scroll-y bindscrolltolower='lower'> 
      <div class="list-content" v-for="(item, i) in shoudaolist" :key="i">
        <div class="portrait">
          <img :src="item.portrait"  alt="" @click="openclick(item.videoid)">
          <div class="nickname">{{ item.nickname }}</div>
        </div>
        <div class="portrait1">
          <div class="receive">
              <p>1</p>
              <p>份数</p>
          </div>
          <div class="jine">
              <p>{{ (item.money/100).toFixed(2)}}</p>
              <p>元</p>
          </div>
          <div class="time">
              <p>{{item.grabTime}}</p>
          </div>
        </div>
      </div>
    </div>
  <div class="box"></div>
</div>
</template>

<script>
import {
  getVideoMyListAll,
  videoredpackMyStats,
  getMyReceivedRedPack,
  getmyvideolist,
  myrecordvideo,
  myenvelopes,
} from "../../../api";
import { statusCode } from "../../../config/api.cfg";
import { mapGetters } from "vuex";
import store from "../../../store";
import NoMore from "../../../components/noMore";
import { formatTime } from "../../../utils";
export default {
  name: "recording",
  store,
  computed: {
    ...mapGetters(["userInfo"])
  },
  components: {
    NoMore
  },
  data() {
    return {
      tabList: [
        {
          text: "我发出的"
        },
        {
          text: "我收到的"
        }
      ],
      woshoudaodeqian:0,
      woshoudaodezongfenshu:0,
      wofachudeqian:0,
      wofachudezongfenshu:0,
      height: "",
      pages: null,
      purple: true,
      tpurple: false,
      currentIndex: 0,
      data: [],
      size: 14,
      page: 0,
      pages:0,
      fachutotal:0,
      shoudaototal:0,
      videoId: null,
      fachuzongshu: [],
      shoudaolist: null,
      fachulist: [],
      params: {
        sort: "createTime,desc",
        page: 0,
        size: 10
      },
      user: {},
      userList:{},
      videoRedPackStats: {},
      mapFetchFn: {
        send: getVideoMyListAll,
        receive: getMyReceivedRedPack
      },
      totalPages: 0,
      showNoMore: false,
			userInfo:{}
    };
  },
  methods: {
    fachu() {
      this.purple = true;
      this.tpurple = false;
    },
    shoudao() {
      this.purple = false;
      this.tpurple = true;
    },
    //我的记录视频收到红包
    async loadmyenvelopes(size, page, open){
			let that = this
      const res = await myenvelopes({size:size,page:page,userId:that.userInfo.id,session:that.userInfo.token})
			console.log(res)
			if (res.data.code === statusCode.OK) {
				this.woshoudaodeqian = res.data.data.Money
				this.woshoudaodezongfenshu = res.data.data.count
				if (open === false) {
					if (this.pages > this.shoudaototal) {
						uni.showToast({
							title: '没有更多数据了',
							icon: 'none',
						})
						return 
					} else {
						res.data.data.VideoRedpack.content.forEach((item, i) => {
						  item.money = item.money ;
							if (item.grabTime == null) {
									item.grabTime = formatTime(new Date(item.createTime))
							} else {
								 item.grabTime = formatTime(new Date(item.grabTime));
							}
						 
						});
						this.shoudaolist.push(...res.data.data.VideoRedpack.content);
					}
				} else {
					this.shoudaolist = res.data.data.VideoRedpack.content; ////收到金额列表
					this.shoudaototal=res.data.data.VideoRedpack.totalPages////收到总页数
					this.shoudaolist.forEach((item, i) => {
					  if (item.grabTime == null) {
					  		item.grabTime = formatTime(new Date(item.createTime))
					  } else {
					  	 item.grabTime = formatTime(new Date(item.grabTime));
					  }
					});
				}
			}
			
			
			
			
			
			/*
      this.woshoudaodeqian = res.data.data.Money
      this.woshoudaodezongfenshu = Number(res.data.data.count)
      console.log(this.woshoudaodeqian)
      console.log(res)
       if (open == false) {
        if(this.pages>this.shoudaototal){
          uni.showToast({
            title: '没有更多数据了',
            icon: 'none',
          });
          return
        }else{
					
           res.data.data.VideoRedpack.content.forEach((item, i) => {
          item.money = item.money ;
          item.grabTime = formatTime(new Date(item.grabTime));
        });
				
          this.shoudaolist.push(...res.data.data.VideoRedpack.content);
        } 
      } else {
				
        this.shoudaolist = res.data.data.VideoRedpack.content; ////收到金额列表
        this.shoudaototal=res.data.data.VideoRedpack.totalPages////收到总页数
        this.shoudaolist.forEach((item, i) => {
          // item.money = (item.money / 100).toFixed(2);
          item.grabTime = formatTime(new Date(item.grabTime));
        });
      } */
    },
    //收到信息获取
    async loadmyrecordvideo(videoId) {
      const res = await myrecordvideo({ videoId: videoId });
      console.log(res)
      this.user.city = res.data.data.author.city;
      this.user.id = res.data.data.url;
      this.user.name = res.data.data.author.nickName;
      this.user.user = res.data.data.author.id;
      this.user.videoid = res.data.data.id;
      this.user.playNum = res.data.data.playNum;
      this.user.remark = res.data.data.remark;
      this.user.pic=res.data.data.covers
      this.user.index=0,
      console.log(this.user);
      let oonp=JSON.stringify(this.user)
      uni.navigateTo({url: `../../home/main?user=${oonp}`});
    },
    openclick(videoid) {
			
      this.loadmyrecordvideo(videoid);
    },
    click(videoid) {
			
      this.loadmyrecordvideo(videoid);
    },
    async loadVideoredpackMyStats() {
      const res = await videoredpackMyStats();
      if (res.data.code === statusCode.OK) {
        this.videoRedPackStats = JSON.parse(res.data.data);
         //console.log(this.videoRedPackStats);
        this.videoRedPackStats.amountMySendTotal = (this.videoRedPackStats.amountMySendTotal / 100).toFixed(2)
        this.videoRedPackStats.amountMyReceive =(this.videoRedPackStats.amountMyReceive / 100 ).toFixed(2)
      }
    },
    async getmylist(size, page, open) {
		let that = this
		const res = await getmyvideolist({size:size,page:page,userId:that.userInfo.id,session:that.userInfo.token});
		console.log(res)
		if (res.data.code === statusCode.OK) {
			this.wofachudeqian = res.data.data.sunMoney
			this.wofachudezongfenshu = res.data.data.size
			if (open === false) {
				if (this.pages > this.fachutotal) {
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none',
					});
					return
				} else {
					
					res.data.data.pagesand.content.forEach((item, i) => {
						item.createTime = formatTime(new Date(item.createTime));
					});
					this.fachulist.push(...res.data.data.pagesand.content);
				}
			} else {
				this.fachulist = res.data.data.pagesand.content; ///发出记录列表
				this.fachutotal=res.data.data.pagesand.totalPages/////发出总页数
				this.fachulist.forEach((item, i) => {
				 item.money = (item.money / 100).toFixed(2);
				  item.createTime = formatTime(new Date(item.createTime));
				});
			}
		}
    }
  },
  onPullDownRefresh() {
		this.pages++
		let open = false;
    this.getmylist(this.size, this.pages, open);
    // this.loadmyenvelopes(this.size,0)
	  uni.stopPullDownRefresh();
  },
	/*
  onReachBottom() {
    this.pages++
    let open = false;
    this.getmylist(this.size, this.pages, open);
   // this.loadmyenvelopes(this.size, this.pages, open);
  },*/
  async onShow() {
    // this.loadVideoredpackMyStats()
    uni.setNavigationBarTitle({
      title: "我的记录"
    });
		this.getmylist(this.size, this.page);
    this.loadmyenvelopes(this.size,this.page) 
  },
	onLoad() {
		let that = this
			// 获取用户id
			uni.getStorage({
			        key: 'list',
			        success: function (res) {
			        console.log(res.data);
							that.userInfo.id=res.data.User.id
							that.userInfo.avatarUrl = res.data.User.avatarUrl
							that.userInfo.nickName=res.data.User.nickName
			    }
			})
			// 获取token
			uni.getStorage({
			key: 'token',
			success: (res) => {
				that.userInfo.token = res.data
				console.log(that.userInfo.token)
			}
		});
	}
};
</script>

<style lang="less" scoped>
.view {
  background: #fff;
  background-size: 100%;
  height: 100%;
  .box{
    position: fixed;
    background: #fff;
    width: 100%;
    height: 100%;
  }
  .tab {
    z-index: 999;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #000;
    align-items: center;
    padding: 20px 0px;
    div:nth-child(1) {
      margin-left: 20%;
    }
    div:nth-child(2) {
      margin-right: 20%;
    }
    .purple {
      color: #c10ad3;
    }
  }
  .list {
    width: 100%;
    .list-content {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #3e3757;
      height: 50px;
      align-items: center;
      .portrait {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;
        width: 30%;
        height: 100%;
        img {
          width: 30px;
          height: 30px;
          border-radius: 5px;
        }
        .nickname {
					color:black;
          max-width: 60%;
          flex-wrap: wrap;
          overflow: hidden;
          font-size: 12px;
        }
      }
      .portrait1 {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #000;
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }
      }
      .jine {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: #000;
      }
      .time {
        max-width: 30%;
        flex-wrap: wrap;
        color: #000;
        text-align: center;
      }
    }
  }
  .list:nth-child(1) {
    margin-top: 0;
  }
  .count {
    height: 35px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #3e3757;
    background: #fff;
    color: #000;
    font-size: 11px;
    div {
      display: flex;
      align-items: center;
      img {
        width: 13px;
        height: 15px;
        margin-right: 5px;
      }
    }
  }
}
</style>

