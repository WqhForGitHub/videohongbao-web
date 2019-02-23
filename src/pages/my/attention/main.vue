<template>
    <div class="view">
    <div class="kong" v-if="data.length == 0"><span>没有更多数据</span></div>
    <div class="view" v-if="data.length != 0">
        <div class="list">
          <div class="list-content" v-for="(item, index) in data" :key="index">
            <div class="portrait" @click="userclick(item.followUser.id)"><img :src="item.followUser.avatarUrl" style="width:100%;height:100%;" alt="" mode="aspectFill"></div>
            <div class="nickname">{{ item.followUser.nickName }}</div>
            <div class="receive">
                <p>{{item.followUser.receiveNum}}个</p>
                <p>领取红包</p>
            </div>
            <div class="receive">
                <p>{{item.followUser.sendNum}}个</p>
                <p @click='oog'>发出红包</p>
            </div>
            <div class="btnn">
               <span class="attention" :class="{ attentionActive : item.isAttention === false }" @click="cancelFollow(item)">{{ item.isAttention ? '已关注' : '关注' }}</span>
               <!-- <span :class="item.isAttention?'attention':'attentionActive'" @click="cancelFollow(item)">{{ item.isAttention ? '已关注' : '关注' }}</span> -->
            </div>
          </div>
          <!--<NoMore v-if="showNoMore"></NoMore>-->
        </div>
    </div>
  </div>
</template>

<script>
import { followByme, follow } from "../../../api";
import { statusCode } from "../../../config/api.cfg";
import { mapGetters } from "vuex";
import store from "../../../store";
import NoMore from "../../../components/noMore";
export default {
  name: "attention",
	store,
  components: {
    NoMore
  },
	computed: {
		...mapGetters(["userInfo"])
	},
  data() {
    return {
      data: [],
      open: true,
      params: {
        page: 0,
        size: 10
      },
      totalPages: 0,
      showNoMore: false
    };
  },
  methods: {
    userclick(id) {
      uni.navigateTo({ url: "../../personal-video/main?id=" + id });
    },
    async loadData() {
      const res = await followByme({
				session:this.userInfo.token.userToken,
				userId:this.userInfo.User.id,
				page:0,
				size:10
			});
			console.log(res)
      if (res.data.code === statusCode.OK) {
        const data = res.data.data.content;
        this.totalPages = res.data.data.totalPages;
        data.forEach(item => {
          this.$set(item, "isAttention", true);
        });
        return Promise.resolve(data);
      }
    },
    async cancelFollow(item) {
      console.log(item);
      const res = await follow({
				session:this.userInfo.token.userToken,
				userId:this.userInfo.User.id,
        followuserid: item.followUser.id,
        unfollow: item.isAttention
      });
      this.data = await this.loadData();
    }
  },
	
  avatarClick() {
    console.log(this.data);
  },
  onPullDownRefresh: function() {
    uni.stopPullDownRefresh();
  },
  async onReachBottom() {
    this.params.page++;
    if (this.params.page >= this.totalPages) {
      this.showNoMore = true;
      return;
    }
    const data = await this.loadData();
    this.data.push(...data);
    console.log(this.data);
  },
  async onReady() {
    uni.stopPullDownRefresh();
    uni.setNavigationBarTitle({
      title: "我关注的"
    });
    const data = await this.loadData();
    this.data.push(...data);
    console.log(this.data);
  }
};
</script>

<style lang="less" scoped>
@import "../../../common/style/variable";
.kong{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
	margin-top:-18%;
  background-color: #fff;
  font-size: 18px;
}
.list {
  width: 100%;
  .list-content {
    display: flex;
    justify-content: space-between;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #666;
  }
  .list-content:first-child {
    border-top: 1px solid #666;
  }
  .portrait {
    width: 30px;
    height: 30px;
    border-radius: 5px;
		margin:auto 2%;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      border-radius: 5px;
    }
  }
  .nickname {
    text-align: center;
    width: 20%;
    color: #000;
    font-size: 14px;
    line-height: 38px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .receive {
    widows: 30%;
    text-align: center;
    padding-top: 5px;
    p:nth-child(1) {
      color: #000;
      font-size: 13px;
    }
    p:nth-child(2) {
      color: #666;
      font-size: 11px;
    }
  }
}
.view {
  height: 100vh;
  width: 100%;
	font-size:18px;
  background: #fff;
  min-height: 100vh;
}
.attentionActive {
  background: #dddddd;
  display: inline-block;
  align-items: center;
  margin: 6px 0;
  border-radius: 25px;
  font-size: 12px;
  width: 70px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: #fff;
}
.attention {
  display: inline-block;
  align-items: center;
  margin: 6px 0;
  border-radius: 25px;
  font-size: 12px;
  width: 70px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background: #ec0000;
  color: #fff;
}
</style>

