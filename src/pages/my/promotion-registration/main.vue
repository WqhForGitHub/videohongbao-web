<template>
  <div class="view">
    <p>分享此页面用户注册即可获得25%的佣金奖励</p>
    <button class="confirm" @click="setProxyOrder">立即分享</button>
  </div>
</template>

<script>
  import { createBecomeProxyOrder, payProxyOrderByWxPub } from '../../../api'
  import { statusCode } from '../../../config/api.cfg'
  import { mapGetters } from 'vuex'
  import store from '../../../store'
  export default {
    name: 'promotion-registration',
    store,
    computed: {
      ...mapGetters(['userInfo'])
    },
    data () {
      return {
        data: []
      }
    },
    methods: {
      async setProxyOrder () {
        const res = await createBecomeProxyOrder()
        if (res.data.code === statusCode.OK) {
          this.getPayProxyOrderByWxPub(res.data.data.data.merchantOrderNo)
        }
      },
      async getPayProxyOrderByWxPub (orderid) {
        const res = await payProxyOrderByWxPub({
          orderid: orderid,
          openid: this.userInfo.openid,
          paychannel: 'wx_lite'
        })
        if (res.data.code === statusCode.OK) {
          const data = res.data.data
          const credential = JSON.parse(data.data.charges[0].credential)
          uni.requestPayment({
            timeStamp: credential.timeStamp,
            nonceStr: credential.nonceStr,
            package: credential.package,
            signType: credential.signType,
            paySign: credential.paySign,
            success: (res) => {
              console.log(res)
            },
            fail: (res) => {
              console.log(res)
            }
          })
        }
      }
    },
    async onShow () {
      uni.setNavigationBarTitle({
        title: '加入代理'
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../common/style/variable";
  .view{
    height: 100vh;
    padding: 0 20px;
    .confirm{
      margin: 28px 0;
      background: #FF6029;
      border-radius: 31px;
      font-size: @font-size-medium-x;
      color: @color-white;
      letter-spacing: 0;
    }
  }
</style>

