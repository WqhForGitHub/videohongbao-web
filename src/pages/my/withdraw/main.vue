<template>
  <div class="view">
       <div class='tishi-box'>
         <p style="color:#fff;margin-left:5%;">注:应监管方要求,网上来往资金经实名认证</p>
         <div class='btn' @click="renzheng"><button style="color:#FF0000">认证</button></div>
       </div>
      <div  class="contact">
        <div></div>
        <div><button open-type='contact' style="color:#FF0000">联系客服</button></div>
      </div>
      <!-- <p class="contact"></p> -->
      <div class="withdraw">
        <div class="balance-view" >
          <span>红包余额：{{count}}</span>
        </div>
        <div class='mountd'>
        <p class="margin">提现金额</p>
        </div>
        <div class="amount">
          <input v-model.number="amount" type="text" placeholder="请输入要兑换的金额,满0.3元可提现"/>
        </div>
        <div class="margin all-withdraw-view">
          <span class="all-withdraw-title">兑换直接到微信钱包</span>
          <span class="all-withdraw-text" @click="allWithdraw" style="color:#FF2063;">全部兑换</span>
        </div>
        <button class="margin withdraw-btn" @click="withdraw">兑换</button>
        <p class="arrival-time">1-5个工作日到账</p>
      </div>
  </div>
</template>

<script>
  import { withdrawAction, Balance,wechatBindCurrent } from '../../../api'
  import { statusCode } from '../../../config/api.cfg'
  export default {
    name: 'withdraw',
    data () {
      return {
        amount: '',
        balance: 0,
        userInfo:null,
        count:0,
      }
    },
    methods: {
      allWithdraw () {
        if (this.count <= 0) {
          uni.showToast({
            title: '您的积分余额为0',
            icon: 'none'
          })
          return
        }
        this.amount = this.count
      },
      async getUserInfo (){
        const res = await wechatBindCurrent()
        if (res.data.code === statusCode.OK) {
          this.userInfo = res.data.data
          console.log(this.userInfo)
        }
      },
      renzheng(){
        uni.navigateTo({url:`../renzheng/main`})
      },
      async withdraw () {
        if (this.amount === '' || this.amount === null) {
          uni.showToast({
            title: '请输入要兑换的积分',
            icon: 'none'
          })
          return
        }
        if (this.amount < 30) {
          uni.showToast({
            title: '兑换积分不能小于30',
            icon: 'none'
          })
          return
        }
        if(this.amount>this.count){
        uni.showToast({
            title: '兑换积分超出可兑换范围',
            icon: 'none'
          })
          return
        }
        if(this.userInfo.authentication==false){
          uni.showToast({title:'认证后可提现',icon:'none'})
          return
        }
        const res = await withdrawAction({
          money: this.amount,
          app: 'yunsheng3.youshiji'
        })
        if (res.data.code === statusCode.OK) {
          console.log(res);
          uni.showModal({
            title: '兑换申请已提交，等待处理',
            content: '点击确认查看账单',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                uni.redirectTo({
                  url: '../withdrawals-record/main'
                })
              }
            }
          })
        }
      },
    },
    onShow () {
      uni.setNavigationBarTitle({
        title: '我的积分'
      })
      this.getUserInfo()
      this.amount='';
    },
    onLoad(res){
      this.count=res.jifen
    }
  }
</script>

<style lang="less" scoped>
  .view{
    width:100%;
    height: 100vh;
    background: #FDF9F9;
    font-size: 12px;
    position:absolute;
  }
  .hide{
    display: none;
  }
    .tishi-box{
			width:100%;
    display: flex;
    justify-content: space-between;
		background:#FF0000;
    .btn{
			color:#FF0000;
      margin:auto 0;
    }
    p{
      line-height: 30px;
    }
    button{
      height:25px;
      color:#FF2063;
      line-height: 25px;
      font-size: 10px;
    }
    }
    .contact{
      display: flex;
      justify-content:space-between;
      button{
        background: #FDF9F9;
        height: 30px;
        font-size: 12px;
        color:#FF2063;
				line-height:30px;
				margin-top:10px;
        border:0.011px solid #FDF9F9;
      }
    }
    .withdraw{
      .balance-view{
        border-bottom:1px solid #Ddd;
        padding:10px 0;
        .balance{
          margin-left: 15px;
        }
      }
      .mountd{
        display: flex;
        justify-content: space-between;
      }
      .all-withdraw-view{
        font-size: 12px;
        .all-withdraw-text{
          color: blue;
          margin-left: 10px;
        }
        .all-withdraw-title{
          color:gray;
        }
      }
      .margin{
        margin: 10px 0;
      }
      .withdraw-btn{
        width: 80%;
				height:45px;
        color:#FF2063;
				font-size:17px;
				line-height:45px;
        margin: 40px auto 0 auto;
      }
      .amount{
        border-bottom: 1px solid gray;
        padding: 10px 0;
      }
      .arrival-time{
        margin-top:10px;
        text-align: center;
        color: gray;
        font-size: 12px;
      }
    }
</style>

