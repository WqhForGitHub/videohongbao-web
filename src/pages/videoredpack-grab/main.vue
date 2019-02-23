<template>
  <div>
    <div class="integral">
      <div class="left">
        <div class="img">
          <img :src="user.avatarUrl" alt>
        </div>
        <div class="title">{{user.nickName}}</div>
      </div>
      <div class="right">
        <div class="Total">
          <div class="Quota">红包总额：{{balance/100}}</div>
          <button class="exchanges" @click="submits">提现</button>
        </div>
        <!-- <div class="Amount">
          <div class="Number">
            <div class="number">兑换数额</div>
            <input type="text" v-model.number.trim="money">
          </div>
          <div class="exchange">
            <button @click="submit">兑换</button>
          </div>
        </div>-->
      </div>
    </div>
    <div class="Record">
      <div class="top">
        <div class="left">
          <span>{{obj.sendcount}}/{{obj.allcount}}</span>
          <i class="iconfont icon-hongbao1"></i>
        </div>
        <div class="right">
          <button open-type="share">
            <span>{{obj.shareNum}}</span>
            <i class="iconfont icon-icon-test"></i>
          </button>
        </div>
      </div>
      <div class="Receive" v-for="(item,index) in arrlist" :key="index">
        <div class="img">
          <img :src="item.videoRedpack.receiver.avatarUrl">
        </div>
        <div class="time">
          <span>{{item.videoRedpack.money}}积分</span>
          <span>{{item.videoRedpack.grabTime}}</span>
        </div>
        <div class="collar">
          <span>{{item.videoRedpack.receiver.receiveNum}}个</span>
          <span>领取红包</span>
        </div>
        <div class="hair">
          <span>{{item.videoRedpack.receiver.sendNum}}个</span>
          <span>发出红包</span>
        </div>
        <div class="turn">
          <i class="iconfont icon-icon-test"></i>
          <span>{{item.videoRedpack.receiver.sharenmber}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { videoredpackHistory } from "../../api/index";
import { statusCode } from "../../config/api.cfg";
export default {
  data() {
    return {
      balance: 0,
      money: "",
      user: "",
      arrlist: [],
      obj: {},
			userInfo:[]
    };
  },
  methods: {
    submits() {
      uni.navigateTo({ 
				url: `../my/withdraw/main?jifen=${this.balance}`,
				});
    },
    submit() {
      console.log(this.money);

      if (this.money == "" || this.money < 0) {
        uni.showToast({
          title: "输入格式错误",
          icon: "none"
        });
        return;
      } else if (typeof this.money !== "number") {
        uni.showToast({
          title: "请输入金额",
          icon: "none"
        });
        return;
      } else if (this.money > this.balance) {
        uni.showToast({
          title: "余额不足",
          icon: "none"
        });
        return;
      } else {
      }
    },
    async render(id) {
			let that = this
      const res = await videoredpackHistory({
				userId:that.userInfo.User.id,
				session:that.userInfo.token.userToken,
				videoid: id
			});
      if (res.data.code === statusCode.OK) {
        console.log(res);
        res.data.data.sendlist.forEach(ele => {
          let now = new Date(ele.videoRedpack.grabTime);
          const hour = now.getHours();
          const minute = now.getMinutes();
          const second = now.getSeconds();
          ele.videoRedpack.grabTime = `${hour}:${minute}:${second}`;
        });
        this.obj = res.data.data;
        this.user = res.data.data.user;
        this.balance = res.data.data.user.integral;
        this.arrlist = res.data.data.sendlist;
      }
    }
  },
  onLoad(res) {
   
		let that = this
		uni.getStorage({
		key: 'list',
		success: (res) => {
		that.userInfo = res.data
	}
	});
	 this.render(res.videoid);
  },
  onShareAppMessage(res) {
    return {
      title: `${this.user.nickName}邀你一起领红包`,
      path: `../login/main`
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../../../static/css/font.css");
.integral {
  width: 100%;
  height: 160px;
  display: flex;
  border-bottom: 10px solid violet;
  button::after {
    border: none;
  }
  .left {
    width: 120px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    .img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .Total {
      flex: 1;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      .exchanges {
        width: 70px;
        height: 25px;
        display: block;
        background-color: #ccc;
        text-align: center;
        line-height: 25px;
        font-size: 14px;
        margin: 0;
        padding: 0;
      }
    }
    .Amount {
      flex: 1;
      display: flex;
      font-size: 14px;
      box-sizing: border-box;
      padding: 0 10px 0 0;
      .Number {
        flex: 2;
        box-sizing: border-box;
        padding: 10px 20px 25px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        input {
          border-bottom: 1px solid #ccc;
        }
        .number {
          box-sizing: border-box;
          padding-left: 10px;
        }
      }
      .exchange {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 70px;
          height: 25px;
          background-color: #ccc;
          text-align: center;
          line-height: 25px;
          font-size: 14px;
        }
      }
    }
  }
}
.Record {
  width: 100%;
  background-color: gold;
  .top {
    width: 100%;
    height: 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 1px solid violet;
    .left,
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
    .right {
      margin-right: 12px;
      button {
        height: 28px;
        margin: 0px;
        padding: 0px;
        display: flex;
        background-color: #fff;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
      }
      button::after {
        border: 0;
      }
    }
  }
  .Receive {
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid violet;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
    .img {
      img {
        width: 30px;
        height: 30px;
        border-radius: 5px;
      }
    }
  }
}
</style>
