<template>
  <div class="view">
    <section v-if="data.length !== 0">
      
      <checkbox-group class="checkbox-group" @change="change">
        <div class="item" v-for="(item, index) in data" :key="index" style="padding:0 5px;">
          <div style="border-bottom:1px solid #333; display:flex;justify-content:space-between;padding:3px 0;">
          <div style="width:45%; display:flex;justify-content:space-between;">
            <div style="border-radius:5px;width:20%;height:90%;">
            <img :src="item.followUser.avatarUrl" style="width:100%;height:100%;border-radius:5px;"/>
            </div>
            <div class="nickname">{{ item.followUser.nickName }}</div>
          </div>
           <div class="receive">
                <p>{{item.followUser.receiveNum}}个</p>
                <p>领取红包</p>
            </div>
            <div class="receive">
                <p>{{item.followUser.sendNum}}个</p>
                <p>发出红包</p>
            </div>
            
          <checkbox color="#FF6029" :value="item.followUser.id"  style="transform:translate(0px,10%) scale(0.8);"/>
          </div>
        </div>
      </checkbox-group>
      <NoMore v-if="showNoMore"></NoMore>
    </section>
     <div class="save-wrap">
      <button class="save" @click="save">保存</button>
    </div>
    <!-- <div class="view">
        <div class="list">
          <div class="list-content" v-for="(item, index) in data" :key="index">
            <div class="portrait"><img :src="item.followUser.avatarUrl" style="width:100%;height:100%;" alt="" mode="aspectFill"></div>
            <div class="nickname">{{ item.followUser.nickName }}</div>
            <div class="receive">
                <p>20个</p>
                <p>领取红包</p>
            </div>
            <div class="receive">
                <p>20个</p>
                <p>发出红包</p>
            </div>
           <checkbox-group bindchange="checkboxChange" style="padding-top:5px;">
              <label class="checkbox">
              <checkbox style="transform: scale(0.8);"/>
              </label>
            </checkbox-group>
          </div>
          <NoMore v-if="showNoMore"></NoMore>
        </div>
    </div> -->
     <div class="save-wrap">
        <button class="save" @click="save">保存</button>
    </div> 
  </div>
  
</template>

<script>
import { followByme, follow } from "../../api";
import { statusCode } from "../../config/api.cfg";
import NoMore from "../../components/noMore";
export default {
  name: "attention",
  components: {
    NoMore
  },
  data() {
    return {
      data: [],
      radio: false,
      params: {
        page: 0,
        size: 10
      },
      totalPages: 0,
      showNoMore: false,
      selectedArray: []
    };
  },
  methods: {
    radiochange() {
      this.radio = !this.radio;
      return;
    },
    save() {
      uni.setStorageSync("selectedArray", this.selectedArray);
      uni.switchTab({ url: "../upload-pic/main" });
    },
    change(val) {
      this.selectedArray = val.mp.detail.value;
    },
    async loadData() {
      const res = await followByme(this.params);
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
      const res = await follow({
        followuserid: item.followUser.id,
        unfollow: item.isAttention
      });
      if (res.data.code === statusCode.OK) {
        item.isAttention = !item.isAttention;
      }
    }
  },
  async onPullDownRefresh() {
    uni.showNavigationBarLoading(); // 在标题栏中显示加载
    this.data = await this.loadData();
    uni.hideNavigationBarLoading(); // 完成停止加载
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
  },
  async onReady() {
    uni.setNavigationBarTitle({
      title: "选择领取人"
    });
    this.data = await this.loadData();
    console.log(this.data);
  }
};
</script>

<style lang="less" scoped>
@import "../../common/style/variable";
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
    width: 10%;
    height: 35px;
    border-radius: 5px;
    margin: auto 0;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      border-radius: 5px;
    }
  }
  .nickname {
    text-align: center;
    width: 25%;
    color: #fff;
    font-size: 14px;
    line-height: 38px;
    overflow: hidden;
  }
  .receive {
    widows: 30%;
    text-align: center;
    padding-top: 5px;
    p:nth-child(1) {
      color: #fff;
      font-size: 13px;
    }
    p:nth-child(2) {
      color: #666;
      font-size: 11px;
    }
  }
  .radio {
    width: 15px;
    height: 15px;
    border: 1px solid #ffffff;
    border-radius: 50%;
    background: #2c273d;
    display: flex;
    justify-content: center;
    margin: auto 0;
    div {
      width: 6px;
      height: 6px;
      background: red;
      margin-top: 5px;
      border-radius: 50%;
    }
  }
}
.list:nth-child(1) {
  margin-top: 0;
}
.view {
  height: 100vh;
  width: 100%;
  background: #2c273d;
  min-height: 100vh;
}
.save-wrap {
  position: fixed;
  bottom: 20%;
  width: 100%;
}
.save {
  margin: 0 20px;
  background: #ff6029;
  border-radius: 31px;
  font-size: @font-size-medium-x;
  color: @color-white;
  letter-spacing: 0;
}
.receive {
    widows: 30%;
    text-align: center;
    padding-top: 5px;
    p:nth-child(1) {
      color: #fff;
      font-size: 13px;
    }
    p:nth-child(2) {
      color: #666;
      font-size: 11px;
    }
  }
  .nickname {
    text-align: center;
    width: 60%;
    color: #fff;
    font-size: 14px;
    line-height: 37px;
    overflow: hidden;
    display: inline-block;
  }
</style>

