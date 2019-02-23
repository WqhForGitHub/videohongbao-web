<template>
  <div class="view">
    <!-- <tabList :tabList="tabData" @onTabClick="onTabClick" :currentIndex="currentIndex"></tabList> -->
    <div class="box" v-if="this.data.length == 0"><p>没有更多数据!</p></div>
    <div v-if="this.data.length != 0" class="main">
      <header class="header-view">
        <div class="avatar-proxy">
          <img class="header-avatar" :src="userInfo.avatarUrl"/>
          <div class='name'>
          <p :class="open?'header-proxy-type':'hide'">{{name}}<span style="margin-left:15px;">{{oneEndTime}}</span></p>
          <p :class="open1?'header-proxy-type':'hide'">{{name1}} <span style="margin-left:15px;">{{twoEndTime}}</span> </p>
          </div>
        </div>
        <div class="bottom-content">
          <div>
            <P class="to-size">累计用户</P>
            <p style="color:#ff6700;">{{AgentCount}}</p>
          </div>
          <div>
            <P class="to-size">积分份数</P>
            <P style="color:#ff6700;">{{AgentSandCount}}</P>
          </div>
          <div>
            <P class="to-size">收益(积分)</P>
            <P style="color:#ff6700;">{{byget}}</P>
          </div>
        </div>
      </header>
      <div class="shuju">
          <p>数据详情</p>
      </div>
      <div class="user-main">
        <div class="list-content" v-for="(item,i) in userlist" :key="i">
          <div class="left">
            <div class="portrait"><img :src="item.offlineuser.avatarUrl" style="" alt=""></div>
            <div class="nickname">{{ item.offlineuser.nickName}}</div>
          </div>
          <div class="right">
            <div>
              <p>{{item.sandnumber}}</p>
              <p>积分份数</p>
            </div>
            <div>
              <p>{{item.offlineuser.sharenmber}}</p>
              <p>分享次数</p>
            </div>
            <div>
              <p>{{item.offlineuser.commission}}</p>
              <p>收益（积分）</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabList from "../../../components/tab";
import { proxyewardMyList, proxyRewardStats, gettuiguang,wechatBindCurrent } from "../../../api";
import { statusCode } from "../../../config/api.cfg";
import { formatTime } from "../../../utils";
import NoMore from "../../../components/noMore";
export default {
  name: "PromotionRecord",
  components: {
  },
  data() {
    return {
      tabData: [
        {
          text: "今日数据"
        },
        {
          text: "数据总汇"
        }
      ],
      currentIndex: 0,
      name:'',
      name1:'',
      open:false,
      open1:false,
      params: {
        page: 0,
        size: 10,
        fromdate: "",
        todate: ""
      },
      day:3,
      byget:0,
      data: [],
      userInfo:'',
      oneEndTime:null,
      twoEndTime:null,
      AgentCount:0,
      AgentSandCount:0,
      statsData: {},
      time: {
        startTime: "",
        endTime: ""
      },
      userlist:null,
      showNoMore: false,
      selectshow: false,
      shownum: 1,
			user:[]
    };
  },
  methods: {
    showshow() {
      this.selectshow = !this.selectshow;
    },
    seven() {
      this.today = this.sevenday;
      this.selectshow = false;
      this.shownum = 1;
    },
    month() {
      this.today = this.banmonth;
      this.selectshow = false;
      this.shownum = 2;
    },
    years() {
      this.today = this.banyears;
      this.selectshow = false;
      this.shownum = 3;
    },
    async onTabClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.loadProxyRewardStats(this.time.startTime, this.time.endTime);
          this.params.fromdate = this.time.startTime;
          this.params.todate = this.time.endTime;
          break;
        case 1:
          this.loadProxyRewardStats();
          this.params.fromdate = "";
          this.params.todate = "";
          break;
      }
      this.data = await this.loadData();
    },
    async loadData() {
      const res = await proxyewardMyList({
				
			});
      if (res.data.code === statusCode.OK) {
        console.log(res);
        const data = res.data.data.content;
        if (data.length === 0) {
          this.showNoMore = true;
        } else {
          this.showNoMore = false;
          data.forEach(item => {
            item.createTime = formatTime(new Date(item.createTime));
            item.money = (item.money / 100).toFixed(2);
          });
        }
        return Promise.resolve(data);
      }
    },
    formDate() {
      const date = new Date();
      const time1 = date.getTime();
      const time2 = date.valueOf();
      console.log(123, time1 + time2);
    },
    async loadProxyRewardStats(startTime, endTime) {
      const res = await proxyRewardStats({
        fromdate: startTime,
        todate: endTime
      });
      console.log(res)
      if (res.data.code === statusCode.OK) {
        this.statsData = res.data.data;
        this.statsData.redpackmoneysum = (
        this.statsData.redpackmoneysum / 100
        ).toFixed(2);
      }
    },
    async getUserInfo () {
			
      const res = await wechatBindCurrent()
      console.log(res)
      if (res.data.code === statusCode.OK) {
        this.userInfo = res.data.data
        if(this.userInfo.userType== 'PROXY1'&& this.userInfo.userType2=='USER'){
            this.name='一级代理';
            this.open=true
            this.oneEndTime=formatTime(new Date(this.userInfo.oneEndTime));
        }
        if (this.userInfo.userType== 'USER'&& this.userInfo.userType2=='PROXY2'){
          console.log('二级代理')
          this.name1='二级代理';
          this.open1=true;
          this.twoEndTime=formatTime(new Date(this.userInfo.twoEndTime));
        }
        if (this.userInfo.userType== 'PROXY1'&& this.userInfo.userType2=='PROXY2'){
          console.log('两个身份')
          this.name='一级代理'
          this.name1='二级代理'
          this.open=true;this.open1=true;
          this.oneEndTime=formatTime(new Date(this.userInfo.oneEndTime));
          this.twoEndTime=formatTime(new Date(this.userInfo.twoEndTime));
        }
      }
    },
		// 推广记录
      async getPersonal(size,page,open) {
				
      const res = await gettuiguang({
				userId:this.user.User.id,
				session:this.user.token.userToken,
        size:size,
				page:page
      });
      console.log(res)
      if(open==false){
        this.userlist.push(...res.data.data.bySVUser.content)
        console.log(this.userlist)
      }else{
        this.AgentCount=(res.data.data.number)
        this.AgentSandCount=res.data.data.number;
        this.byget=res.data.data.byGetlntegra
        this.totalpage=res.data.data.UserPage.totalPages
        // this.statsData.Takecommission=res.data.data.Takecommission;
        this.userlist=res.data.data.UserPage.content

      } 
  },
  },
  onReachBottom(){
    var that = this 
    that.params.page++;
    let open=false
    if(this.params.page>this.totalpage){
      uni.showToast({title:'没有更多数据了',icon:'none'})
      return
    }
    this.getPersonal(this.params.size,that.params.page,open)
    console.log(1231)
  },

  onShow(){
		
      this.params.page=0;
      this.selectshow=false;
      //this.getUserInfo()
      this.getPersonal(this.params.size,this.params.page);
      //  this.getPersonal();
		// 代理拥有权
    uni.setNavigationBarTitle({
      title: "推广记录"
    });
  },
	onLoad() {
		let that = this
		uni.getStorage({
			key: 'list',
			success: (res) => {
				console.log(res.data)
				that.user = res.data
			}
		});
	}
};
</script>

<style lang="less" scoped>
@import "../../../common/style/variable";
.hide{
  display: none;
}
.view {
  height: 100vh;
  background: #fff;
}
.shuju {
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 12px;
  padding: 10px 10px 0px 10px;
}
.userlist {
  display: flex;
  font-size: 12px;
  height: 40px;
  color: #fff;
  margin: 10px auto;
  text-align: center;
  padding: 0 10px;
  justify-content: space-between;
  .img {
    margin: auto 0;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    background: #fff;
  }
}
.main {
  .header-view {
    padding: 15px 30px;
    background: #fff;
    .avatar-proxy {
      width: 100%;
      display: flex;
      .header-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .name{
        margin:auto 20px;
        height: 100%;
      }
      .header-proxy-type {
        margin-bottom: 10px;
        font-size: @font-size-small;
        color: @color-gray-l;
      }
    }
    .to-size {
      font-size: @font-size-small;
      color: @color-gray-l;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .bottom-content {
      margin-top:10px;
      display: flex;
      justify-content: space-between;
      div {
        text-align: center;
      }
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    margin: 0 10px;
    border-bottom: 1px solid #eeeeee;
    font-size: @font-size-medium;
    .left-content {
      display: flex;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .left-text {
        .left-time {
          font-size: @font-size-small;
          color: @color-gray-l;
        }
      }
    }
    .middle-content {
      display: flex;
      align-items: center;
      font-size: @font-size-small;
      color: @color-gray-l;
    }
    .right-content {
      display: flex;
      align-items: center;
      .money {
        color: red;
      }
    }
  }
}
.select {
  background:#2c273d;
  width: 50px;
  height: 65px;
  position: absolute;
  right: 18px;
  border-radius: 5px;
  border:1px solid #9551fa;
  .select-tab {
    color: #fff;
    text-align: center;
    border-bottom: 2rpx solid #666;
    height: 33%;
    width: 75%;
    margin: 0 auto;
  }
  .select-tab:nth-child(3) {
    border: 0;
  }
  .selectcolor {
    color: #ff6700;
  }
}
.user-main{
  width: 100%;
  height: 100%;
  background-color: #2c273d;
  color: #fff;
  .list-content{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-basis: 30%;
      height: 100%;
      width: 30%;
      padding: 0 5px;
      font-size: 14px;
      .nickname{
        height: 20px;
        max-width: 60%;
        overflow: hidden;
        margin-left: 5px;
      }
      .portrait{
        img{
          width: 40px;
          height: 40px;
          border-radius: 5px;
        }
      }
    }
    .right{
      flex: 1;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.box{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
	p {
		text-align: center;
		line-height:60vh;
	}
}
.list:nth-child(1) {
  margin-top: 0;
}
</style>

