<template>
  <div class="view">
    <header class="bg">
      <div class="drag">
        <div class='aval'>
          <img :src="userInfo.User.avatarUrl" class="header-avatar">
        </div>
        <div class="userin">
          <p class="header-name">{{ userInfo.User.nickName }}</p>
          <p style="font-size:12px; color:#BCBBBB;">ID:&nbsp;{{ userInfo.User.id }}</p>
        </div>
      </div>
    </header>
    <div class="config" >
        <div @click="oop" class='my'>
          <button>我的主页</button>
        </div>
        <div  class='jifen'>
          <div class='fens'>
             <div>
              <p>{{ income }}</p> 
                <p>红包收益</p>
             </div>   
          </div>
          <p class="border"></p>
          <div @click="jifens" class="duihuan">
             <p>红包提现</p>            
          </div>
        </div>
    </div>
    <div class="main" >
      <div class="my-item"  v-for="(item, index) in itemList" :key="index" @click="onItemClick(index)" >
				<div class="icon">
					<img :src="item.icon" />
				</div>
				<p>{{item.label}}</p>
      </div>
    </div>
		<div class="UnLogin">
			<van-button class="button" type="danger" @click="UnLogin">退出登录</van-button>
		</div>
		<div class="tabbar">
				<div class="Home" @click="gotoHomes">
					<div class="Homeicon">
						<img src="/static/faxian-P.png" />
					</div>
					<p>首页</p>
				</div>
				<div class="upload" @click="gotoupload">
					<div class="uploadicon">
						<img src="/static/videosx.png" />
					</div>
					<p>上传</p>
				</div>
				<div class="personalcenter">
					<div class="personalcentericon">
						<img src="/static/WO.png" />
					</div>
					<p style="color:#FF2063">我的</p>
				</div>
		</div>
  </div>
</template>

<script>
  import { wechatBindCurrent, Balance, getIntegral } from '../../api'
  // import { getImSignature } from 'src/api/im'
  import { statusCode } from '../../config/api.cfg'
	import { mapGetters } from 'vuex'
  import store from '../../store'
  export default {
		store,
    name: 'my',
    components: {
      //myItem
    },
		computed: {
			...mapGetters(['userInfo'])
		},
    data () {
      return {
				Homeicon:true,
				uploadicon:true,
				personalicon:true,
        itemList: [],
        balance: '',
        name:"",
        count:0.00,
        monny:null,
				income:0.0
      }
    },
    methods: {
			UnLogin() {
					uni.redirectTo({
						url: '../login/main'
					})
			},
			gotoHomes() {
					uni.redirectTo({
						url: '../index/main'
					})
			},
			gotoupload() {
				 uni.redirectTo({
				 	url: '../upload-pic/main'
				 })
			},
      async loadIntegral () {
				/*
        await getIntegral()*/
      },
      jifens(){
				uni.navigateTo({ 
					url:`./withdraw/main?jifen=${this.income}`,
				})  
      },
      oop(){
        uni.navigateTo({ url:`../personal-video/main?id=${this.userInfo.User.id}`})        
      },
      onItemClick (index) {
        uni.navigateTo({ url: this.itemList[index].link })
      },
      oon (i) {
        uni.navigateTo({ url: this.monny[i].link })
      },
      initItemList (userType,userType2) {
        console.log(13)
				
        if (userType== 'PROXY2'&& userType2=='USER') {
            console.log('二级代理')
            this.itemList = [
            {
              icon: '/static/wenben.png',
              label: '我的记录',
              value: '',
              link: '../my/recording/main',
              showIcon: true
            },
            {
              icon: '/static/monny.png',
              label: '提现记录',
              value: '',
              link: '../my/withdrawals-record/main',
              showIcon: true
            },
            {
              icon: '/static/guanzhu.png',
              label: '我的关注',
              value: '',
              link: '../my/attention/main',
              showIcon: true
            },
            {
              icon: '/static/daili.png',
              label: '加入代理',
              value: '',
              link: '../my/join-proxy/main',
              showIcon: true
            },
            {
              icon: '/static/shenhe.png',
              label: '审核视频',
              value: '',
              link: '../../pages/review-video/main',
              showIcon: true
            },
            {
              icon: '/static/about.png',
              label: '关于我们',
              value: '',
              link: '../../pages/about/main',
              showIcon: true
            },
          ]
				}
        if (userType== 'USER'&& userType2=='USER'){
          console.log('普通用户')
          this.itemList = [
            {
              icon: '/static/wenben.png',
              label: '我的记录',
              value: '',
              link: '../my/recording/main',
              showIcon: true
            },
            {
              icon: '/static/monny.png',
              label: '提现记录',
              value: '',
              link: '../my/withdrawals-record/main',
              showIcon: true
            },
            {
              icon: '/static/guanzhu.png',
              label: '我的关注',
              value: '',
              link: '../my/attention/main',
              showIcon: true
            },
            {
              icon: '/static/daili.png',
              label: '加入代理',
              value: '',
              link: '../my/join-proxy/main',
              showIcon: true
            },
            {
              icon: '/static/shenhe.png',
              label: '审核视频',
              value: '',
              link: '../../pages/review-video/main',
              showIcon: true
            },
            {
              icon: '/static/about.png',
              label: '关于我们',
              value: '',
              link: '../../pages/about/main',
              showIcon: true
            },
          ]
        }
        if(userType== 'PROXY1'&& userType2=='USER'){
          console.log('一级代理')
          this.itemList = [
            {
              icon: '/static/wenben.png',
              label: '我的记录',
              value: '',
              link: '../my/recording/main',
              showIcon: true
            },
            {
              icon: '/static/monny.png',
              label: '提现记录',
              value: '',
              link: '../my/withdrawals-record/main',
              showIcon: true
            },
            {
              icon: '/static/jilu.png',
              label: '推广收益',
              value: '',
              link: '../my/promotion-record/main',
              showIcon: true
            },
            {
              icon: '/static/guanzhu.png',
              label: '我的关注',
              value: '',
              link: '../my/attention/main',
              showIcon: true
            },
            {
              icon: '/static/lianjie.png',
              label: '推广链接',
              value: '',
              link: '../my/sponsored-links/main',
              showIcon: true
            },
            {
              icon: '/static/daili.png',
              label: '加入代理',
              value: '',
              link: '../my/join-proxy/main',
              showIcon: true
            },
            {
              icon: '/static/shenhe.png',
              label: '审核视频',
              value: '',
              link: '../../pages/review-video/main',
              showIcon: true
            },
            {
              icon: '/static/about.png',
              label: '关于我们',
              value: '',
              link: '../../pages/about/main',
              showIcon: true
            },
          ]
        }
        if (userType == 'PROXY1' && userType2 =='PROXY2'){
          console.log('一级二级代理')
          this.itemList = [
            {
              icon: '/static/wenben.png',
              label: '我的记录',
              value: '',
              link: '../my/recording/main',
              showIcon: true
            },
            {
              icon: '/static/monny.png',
              label: '提现记录',
              value: '',
              link: '../my/withdrawals-record/main',
              showIcon: true
            },
            {
              icon: '/static/jilu.png',
              label: '推广收益',
              value: '',
              link: '../my/promotion-record/main',
              showIcon: true
            },
            {
              icon: '/static/guanzhu.png',
              label: '我的关注',
              value: '',
              link: '../my/attention/main',
              showIcon: true
            },
            {
              icon: '/static/lianjie.png',
              label: '推广链接',
              value: '',
              link: '../my/sponsored-links/main',
              showIcon: true
            },
            {
              icon: '/static/daili.png',
              label: '加入代理',
              value: '',
              link: '../my/join-proxy/main',
              showIcon: true
            },
            {
              icon: '/static/shenhe.png',
              label: '审核视频',
              value: '',
              link: '../../pages/review-video/main',
              showIcon: true
            },
            {
              icon: '/static/about.png',
              label: '关于我们',
              value: '',
              link: '../../pages/about/main',
              showIcon: true
            },
          ]
        }
      },
      async getUserInfo () {
        const res = await wechatBindCurrent()
        if (res.data.code === statusCode.OK) {
          this.userInfo = res.data.data
          console.log(this.userInfo)
          this.initItemList(this.userone,this.usertwo)
          this.getInc()
        }
      },
      async getInc(){
				
        const res=await getIntegral({
          userid: this.userInfo.id
        })
        if (res.data.code === statusCode.OK) {
					console.log("积分兑换运算")
           console.log(res)
          this.count=((res.data.data.integral)/100).toFixed(2)
          //this.balance = ((res.data.data.Wallet)/100).toFixed(2)
        }
      },
      async getBalance () {
        const res = await Balance({
          app: 'yunsheng3.youshiji',
          userid: this.userInfo.id
        })
        if (res.data.code === statusCode.OK) {
          // this.balance = res.data.data.data.amount / 100
          // this.balance = this.balance.toFixed(2)
          // this.integral=res.data.data.integral;
          // console.log(this.integral)

        }
      }
    },
    onShow () {
      uni.setNavigationBarTitle({
        title: '我的'
      })
			console.log(this.userInfo)
			this.initItemList(this.userInfo.User.userType,this.userInfo.User.userType2)
     this.getUserInfo()
     this.loadIntegral()
    },
    onLoad(){
		 this.income = (this.userInfo.User.integral / 100).toFixed(2)
		}
  }
</script>

<style lang="less" scoped>
  .view{
    width: 100vw;
		height: 90vh;
		position:absolute;
    background:#FDF9F9;
  }
	@media screen and (min-width:768px) {
		.view {
			font-size:20px;
		}
	}
	@media screen and (max-width:760px) {
		.view {
			font-size:16px;
		}
	}
	.UnLogin {
		width:60%;
		height:40px;
		background:red;
		bottom:90px;
		margin-left:20%;
		position:fixed;
		border-radius:7px;
		.button {
			width:100%;
			height:100%;
			font-size:16px;
			line-height: 40px;
			border-radius:7px;
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
  .bg{
    width:100%;
    height:159px;
    position: relative;
    z-index:1;
    //opacity: 0.5;
    background: #FDF9F9;
  }
  .bg:after{
    content: "";
    width:100%;
    height:159px;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(10px);
    z-index: 2;
  }
    .config{
    width:100%;
    height: 70px;
    display: flex;
    .jifen{
      text-align: left;
      display: flex;
      width: 70%;
      height: 100%;
      margin:auto 0;
      justify-content: space-between;
      align-items: center;
      .border{
        border-left:1px solid #ddd;
        height: 80%;
      }
      .fens{
        width: 50%;
        height: 100%;
        font-size: 17px;
        align-items: center;
        text-align: center;
       div{
         margin:15px 0;
       }
      }
      .duihuan{
        width: 40%;
        text-align: center;
        line-height: 70px;
        height: 100%;
        // border-left: 1px solid #ddd;
        // border-bottom: 1px solid #ddd;
      }
    }
    button{
      width: 100px;
      height: 45px;
      font-size: 14px;
      color:#fff;
      line-height: 45px;
      background:#ddd;
    }
    .my{
      text-align: center;
      width:30%;
      margin:auto 0;
      align-items: center;
      p{
        padding:2px 0;
        margin:auto 0;
      }
      p:first-child{
        color:black;
      }
      p:last-child{
        color:#605F5F;
      }
    }
  }
  .drag{
    position: absolute;
    left:0;
    top:0;
    /*transform: translate(-50%,-50%);*/
    width:100%;
    /*height:200px;*/
    text-align: left;
    margin: 32px 0 29px 0;
    z-index:11;
    display: flex;
    color: #e7e1cd;
    .aval{
      width: 80px;
      height: 80px;
      margin:0 40px;
    }
    .header-avatar{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .userin{
      p{
        margin:10px 0;
        color:black;
      }
    }
  }
  .header{
    text-align: center;
    padding: 15px 0;
    filter: blur(2px);
    .drag{
      .header-avatar{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .header-name{
        color: #fff;
      }
    }
  }
  .main{
    min-height: 20%;
		height:auto;
    display: flex;
    margin:10px 30px;
    flex-wrap: wrap;
    .my-item{
      width: 25%;
      height: 80px;
      box-sizing: border-box;
			//background:red;
			.icon {
				width:1.8rem;
				height:1.6rem;
				margin:0 auto;
			}
			@media screen and (min-width:768px) {
				.icon {
					width:1rem;
					height:1rem;
					margin:0 auto;
				}
			}
			img {
				width:100%;
				height:100%;
			}
			p {
				margin-top:10%;
				text-align: center;
				font-size:0.5rem;
			}
    }
  }
</style>

