<template>
  <div class="view">
    <header class="header">
      <img :src="userInfo.User.avatarUrl" class="header-avatar">
      <p class="header-title">{{ shenfen }}</p>
    </header>
      <p style="margin-bottom: 10px;font-size:17px;">佣金收益将在每周日系统订单打款提现</p>
      <div v-for="(item, index) in data" :key="index" :data="item">
        <span slot="middle">提现：</span>
      </div>
    <div v-if="data.length === 0" class="Nodata" style="font-size:16px">暂无数据~</div>
  </div>
</template>

<script>
  import { getWithdrawList,userin } from '../../../api'
  import { mapGetters } from 'vuex'
  import store from '../../../store'
  import { statusCode } from '../../../config/api.cfg'
  import { formatTime } from '../../../utils'
  export default {
    name: 'withdraw',
    store,
    computed: {
      ...mapGetters(['userInfo'])
    },
    components: {
     // recordingItem,
      //NoMore
    },
    data () {
      return {
        data: [],
        status: {
          SUBMITTED: '审核中',
          PENDING: '已通过',
          TRANSFER: '发放中',
          SUCCEED: '已到账',
          REJECTED: '失败'
        },
        proxyType: {
          USER: '普通用户',
          PROXY1: '一级代理',
          PROXY2: '二级代理',
          PROXY3: '三级级代理'
        },
        params: {
          page: 0,
          size: 10,
          sort: 'createTime,desc'
        },
        totalPages: 0,
        showNoMore: false,
				shenfen:'',
				id:'',
				token:''
      }
    },
    methods: {
      async onuserin(){
				let that = this
        const res = await userin({
					pages:0,
					size:10,
					userId: that.userInfo.User.id,
					session: that.userInfo.token.userToken
        })
				console.log(res)
        if (res.data.code === statusCode.OK){
          const data = res.data.data.content
          this.totalPages = res.data.data.totalPages
          data.forEach((item) => {
            item.createTime = formatTime(new Date(item.createTime))
            item.status = this.status[item.status]
          })
         // return Promise.resolve(data)

        }
      },
      async loadData () {
        const res = await getWithdrawList({
          userid: this.userInfo.id,
          ...this.params
        })
        if (res.data.code === statusCode.OK) {
          const data = res.data.data.content
          this.totalPages = res.data.data.totalPages
          data.forEach((item) => {
            item.createTime = formatTime(new Date(item.createTime))
            item.status = this.status[item.status]
          })
          return Promise.resolve(data)
        }
      }
    },
    async onPullDownRefresh () {
      this.params.page = 0
      this.showNoMore = false
      uni.showNavigationBarLoading() // 在标题栏中显示加载
      this.data = await this.onuserin()
      uni.hideNavigationBarLoading() // 完成停止加载
      uni.stopPullDownRefresh()
    },
    async onReachBottom () {
      this.params.page++
      if (this.params.page >= this.totalPages) {
        this.showNoMore = true
        return
      }
      const data = await this.onuserin()
      this.data.push(...data)
    },
    onShow () {
      uni.setNavigationBarTitle({
        title: '提现记录'
      })
      this.params.page=0;
     // this.data = await this.onuserin()
       this.onuserin()
    },
		onLoad () {
			let that = this
			if (this.userInfo.User.userType === 'USER' && this.userInfo.User.userType2 === 'PROXY2') {
				this.shenfen = '二级代理'
			} else if (this.userInfo.User.userType === 'USER' && this.userInfo.User.userType2 === 'USER') {
				this.shenfen = '普通用户'
			} else if (this.userInfo.User.userType === 'PROXY1' && this.userInfo.User.userType2 === 'USER') {
				this.shenfen = '一级代理'
			} else if (this.userInfo.User.userType === 'PROXY1' && this.userInfo.User.userType2 === 'PROXY2') {
				this.shenfen = '一级二级代理'
			}
		}
  }
</script>

<style lang="less" scoped>
  .view {
    height: 100vh;
		font-size:16px;
		.Nodata {
			width:100vw;
			height:200px;
			margin-left:37%;
			margin-top:5%;
			font-size:16px;
		}
  }
  .header{
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    background: #f9f9f9;
    .header-avatar{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
	
</style>

