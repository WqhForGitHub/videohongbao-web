 <template>
  <div class="view">
		<!--视频-->
    <div class="video">
      <video objectFit='cover' :src="shobj.videourl" id="video-id" autoplay :custom-cache='false'></video>
			<div class="type">{{shobj.type=='PRI'?'私密':'公开'}}</div>
		</div>
		<!--用户审核信息-->
    <div class="count">
      <img :src="shobj.avaurl" alt="" mode="aspectFill">
       <span class="video-description">{{ shobj.remark }}</span>
    </div>
		<!--图片-->
     <div class="img-item" >
      <div @click="onPreviewImage(shobj.picurl, picItem)" mode='aspectFill' v-for="(picItem, picIndex) in shobj.picurl" :key="picIndex">
        <img :src="picItem" mode="aspectFill" />
      </div>
    </div>
    <div class="footer">
      <div @click="show?'':shenhevideo()">
        <div :class="Yesshow?'Noshow':'Yesshow'">
          <p>0</p>
          <p >Yes</p>
        </div>
        <!--显示倒计时-->
        <div :class="Yesshow?'hiddentime':'showtime'">
          <p class="number">{{num}}</p>
          <p class="numbertext">秒后继续审核</p>
        </div>
      </div>
      <div>
        <!-- <p>{{tabData.affilidaterewardmoneysum==null?'0':'tabData.affilidaterewardmoneysum'}}</p> -->
        <p>{{tow}}</p> 
        <p>元</p>
      </div>
      <div @click="firstclick?'':reviwFailClick()" style="height:14%;">
        <div  :class="showjubaotime?'hiddenNo':'showNo'">
          <p class="Notext">0</p>
          <p>NO</p>
        </div>
        <!--显示倒计时-->
        <div :class="showjubaotime?'jubaotime':'hiddenjubaotime'" style="">
          <p class="jubaonumber">{{jubaonum}}</p>
          <p class="jubaonumbertext">秒后继续审核</p>
        </div>
      </div>
    </div>
		<!--代理设置-->
		<!--
    <cover-view class='postios' v-if="widows">
      <cover-view class="title">成为二级代理即可审核视频</cover-view>
      <cover-view class='btn'>
        <button @click="payVideoredpackorder(2)">立即开通</button>
        <button open-type='contact'>联系客服</button>
      </cover-view>
      <cover-image src='/static/delete.png' class='img'  @click="close"/>
    </cover-view>-->
		<div class="postios" v-if="widows">
			<div class="title">成为二级代理即可审核视频</div>
			<div class='btn'>
			  <button class="kaitong" @click="payVideoredpackorder(2)">立即开通</button>
			  <button class="kefu" open-type='contact'>联系客服</button>
			</div>
			<img src='/static/delete.png' class='img'  @click="close"/>
		</div>
  </div>
</template>

<script>
  import {wechatBindCurrent, reviewVideoList,getAlipay,reviewVideoAccept, videoredpackGrab, getMyReviewStats,getvideoid,videoredpackHistory,videostate , getnoaudit} from '../../api'
  import store from '../../store'
  import { statusCode } from '../../config/api.cfg'
	import { mapGetters } from "vuex";
  export default {
    name: 'tutorialDetail',
    store,
		computed: {
			...mapGetters(["userInfo"])
		},
    data () {
      return {
        firstclick: true,
        jubaoclicknum: 1,
        jubaonum:4,
        showjubaotime: true,
        clickreviewaccept: 1,
        time:0,
        widows:true,
        Yesshow:false,
        tabData: [],
        data: {},
        userInfo:'',
        videoid:'',
        shobj:{
          videourl:'',
          avaurl:'',
          remark:'',
          picurl:null,
          total:null,
        },
        url:null,
        num:4,
        type:'',
        show:true,
        size:1,
        pages:0,
        reg:0,
        isshow:true,
        params: {
          sort: 'createTime,desc',
          page: 0,
          size: 1
        },
        one:1,
        tow:1,
        userlist:{}
      }
    },
    methods: {
      close(){
        this.widows=false;
      },
      async getUserInfo (){
      },
      // 代理支付
      async payVideoredpackorder (status) {
        console.log(123)
          const res= await getAlipay({
          openId:this.userInfo.openid,
          money:0.01,
          status
          // money:0.01
        })
        if (res.status === statusCode.OK){
          var payModel = res.data;
          uni.requestPayment({
            'timeStamp': payModel.timeStamp,
            'nonceStr': payModel.nonceStr,
            'package': payModel.package,
            'signType': 'md5',
            'paySign': payModel.sign,
            success:(res)=>{
              this.type='proxy2'
            }
          })
        }  
      },
      ////审核视频
      async ongetvideoid(size,page){
        const res = await getvideoid({
					session: this.userlist.token,
					userId: this.userlist.id,
					page:0,
          size:10
        })
				console.log("获取视频ID：")
        console.log(res);
        this.one=Number((res.data.data.Commission)/100).toFixed(2)
        this.tow=Number((res.data.data.Takecommission)/100/100).toFixed(2)
        if (res.data.code === 200){
          this.isshow=true;
					
					// 没有视频数据
          if(res.data.data.video.length==0){
            uni.showToast({
            title: "没有更多数据了"
            
           });
          this.isshow=false;
          this.shobj={}
          this.shobj.videourl=''
          this.videoid=null
          return;
          }
					res.data.data.video.forEach((item, index) => {
						this.videoid = item.id;
						this.shobj.videourl=item.url
						this.shobj.remark=item.remark
						this.shobj.avaurl=item.author.avatarUrl
						this.shobj.picurl=item.covers
						this.shobj.type = item.type
					})
					
					/*
          for(var key of res.data.data.video){
            this.videoid=key.id///获取视频ID
						console.log("key id")
						console.log(key.id)
            this.shobj.videourl=key.url
            this.shobj.remark=key.remark
            this.shobj.avaurl=key.author.avatarUrl
            this.shobj.picurl=key.covers
          }   */
					console.log("this.video is : ")
					console.log(this.videoid)
        }
      },
			
			// 审核视频
      async shenhevideo(){
        console.log(this.type)
        // 点击yes调用数据
        if(this.type!=='proxy2'){
          let that =this
          uni.showModal({
              title:'提示',
              content:'成为二级代理即可开通审核权限',
              async success(res){
                if(res.confirm){
									// 微信支付
                  that.payVideoredpackorder(2)

                }
              }
          })
          return
        }
				// 获取审核视频通过状态
        const res =await videostate({
					session:this.userlist.token,
					userId:this.userlist.id,
          videoid:this.videoid
        })
        console.log(res.data.code);
        if(res.data.msg=='该视频已被其他代理审核'){
            uni.showToast({
            title: "该视频已被其他代理审核",
            icon:'success'
          })
          setTimeout(()=>{
          this.ongetvideoid(this.size,this.pages)
          },500)
          return
        }
        if(res.data.data < 50&& res.data.code === 200){
           uni.showToast({
            title: "审核成功",
            icon:'success'
          })
        }
        if(res.data.msg == "ok"&& res.data.data > 49){
          const obj = await videoredpackGrab({
          videoid:this.videoid
        })
        
        }else if(res.data.msg=="该视频已被其他代理审核"){
           uni.showToast({
            title: "该视频已被其他代理审核",
            icon:'none'
          });
        }
          console.log(this.pages)
          setTimeout(() => {
          this.ongetvideoid(this.size,this.pages)
          }, 1000);
   
      },
      //第一次点击举报
      jubaofirstclick() {
        
        if(this.jubaoclicknum === 1) {
           let timer= setInterval(()=>{
          this.jubaonum--;
          if(this.jubaonum<=0){
            clearInterval(timer);
            this.firstclick=false;
            this.showjubaotime = false;
          }
        },1000)
        }
          //第二次点击后随机数0 ~ 7举报
        if(this.jubaoclicknum >= 2) {
          this.firstclick=true;
            this.showjubaotime = true;
            let number = Math.floor(Math.random()*8); // 0 ~ 7随机数
            this.jubaonum = number;
            let timer= setInterval(()=>{
          this.jubaonum--;
          if(this.jubaonum<=0){
            clearInterval(timer);
            this.firstclick=false;
            this.showjubaotime = false;
          }
        },1000)
        }
       
      },
      // 点击举报
      async reviwFailClick () {
        if(this.type!=='proxy2'){
          let that =this
          uni.showModal({
              title:'提示',
              content:'成为二级代理即可开通审核权限',
              async success(res){
                if(res.confirm){
                  that.payVideoredpackorder(2)

                }
              }
          })
          return
        }
        this.jubaoclicknum++;
        if(this.videoid!==null){
          
          getnoaudit({videoid:this.videoid}).then(res=>{
                console.log(res);
          })
              const obj = {
             id: this.videoid,
             type: 'reviewVideo',
             status:1
            }
            uni.navigateTo({ url: '../report-reason/main?obj=' + JSON.stringify(obj) })
              this.pages++
              this.ongetvideoid(this.size,this.pages)

        }else{
            uni.showToast({
            title: "没有视屏了",
            icon:'success'
          });
        }
      
      },
      onPreviewImage (picList, item) {
        uni.previewImage({
        urls: picList,
        current: item
        })
      },
      // 获取金钱
      async loadMyReviewStats () {
        const res = await getMyReviewStats()
        if (res.data.code === statusCode.OK) {
          const data = res.data.data
          this.tabData=data;
        }
      },
      async onVideoredpackGrab (id) {
        await videoredpackGrab({
          videoid: id
        })
        this.loadMyReviewStats()
        this.loadData()
      },
      // 首次倒计时3秒
      async loadData () {
        if(this.clickreviewaccept == 1) {
          let timer= setInterval(()=>{
          this.num--;
          if(this.num<=0){
            clearInterval(timer);
            this.show=false;
            this.Yesshow = true;
            // console.log(this.num)
          }
        },1000)
        }
				// 获取审核视频列表
        const res = await reviewVideoList(this.params)
        if (res.data.code === statusCode.OK) {
          this.data = res.data.data.content[0]
          this.url=this.data.author.avatarUrl;
          // this.videourl=this.data.url;
          const cover = JSON.parse(this.data.cover)
          this.$set(this.data, 'coverList', cover)
        }
      },
      async reviewAccept() {
        this.clickreviewaccept++; 
         this.jubaofirstclick()
        // 第二次点击后随机数0 ~ 7
        if(this.clickreviewaccept >= 2) {
          this.show = true
          this.Yesshow = false
           let number = Math.floor(Math.random()*8); // 0 ~ 7随机数
           this.num = number;
          this.Yesshow = false;
          let timer1= setInterval(()=>{
          this.num--;
          if(this.num<=0){
            this.show=false;
            this.Yesshow = true;
            clearInterval(timer1);
          }
        },1000)
        }
       //第二次点击后随机数0 ~ 7举报
        if(this.jubaoclicknum >= 2) {
          this.firstclick=true;
            this.showjubaotime = true;
            let number = Math.floor(Math.random()*8); // 0 ~ 7随机数
            this.jubaonum = number;
            let timer= setInterval(()=>{
          this.jubaonum--;
          if(this.jubaonum<=0){
            clearInterval(timer);
            this.firstclick=false;
            this.showjubaotime = false;
            // console.log(this.num)
          }
        },1000)
        }
      let id= this.videoid
      const res = await reviewVideoAccept(id);
      if (res.data.code === statusCode.OK) {
        console.log(res)
        const data = res.data.data;
        uni.showToast({
        title: "审核成功"
        });
    setTimeout(() => {
      this.params.page++;
      this.onVideoredpackGrab(data.id);
    }, 1000);
      } else {
      uni.showToast({
      title: res.data.msg,
      icon: "none"
      });
      }
  }
        
      },//reviewAccept
      
async noReviewAccept(id) {
  const res = await noReviewVideoAccept(id);
    if (res.data.code === statusCode.OK) {
      const data = res.data.data;
      console.log(data);
      uni.showToast({
        title: "驳回"
      });
  setTimeout(() => {
    this.noParams.page++;
    this.onVideoredpackGrab(data.id);
  }, 1000);
  if(this.disable == false){
    this.show =true
  }else{
    this.show = false
  }
  } else {
  uni.showToast({
    title: res.data.msg,
    icon: "none"
  });
 }
},

  onUnload: function () {
      
    uni.reLaunch({
      url: '../my/main'
    })
  },
	onLoad() {
		let that = this
		uni.getStorage({
			key: 'list',
			success: (res) => {
				that.userlist.id = res.data.User.id;
				that.userlist.token = res.data.token.userToken
				that.type = (res.data.User.userType2).toLocaleLowerCase();
			}
		});
	},
  onShow () {
		
    uni.setNavigationBarTitle({
      title: '视频审核'
    })
    this.loadMyReviewStats()
    this.loadData()
    this.getUserInfo()

    // this.getPersonal(this.params.size,this.params.page);
    this.jubaofirstclick()
    this.ongetvideoid(this.size,this.pages);

    },
       ///下拉刷新
        onPullDownRefresh(){
      this.ongetvideoid(1,0);
    
             
            setTimeout(() => {
                uni.showToast({
                 title: "刷新成功",
                 success(){
                    uni.stopPullDownRefresh()
                 }
                });
            }, 1500);
        },
  }
</script>

<style lang="less" scoped>
@import "../../common/style/variable";
.postios{
  position: absolute;
	/*
  top:40%;
  left: 50%;*/
  width:70vw;
	/*
  margin-top:-50px;
  margin-left:-140px;*/
  border-radius: 8px;
  text-align: center;
  background: #fff;
  color:black;
	font-size:1rem;
	left:18%;
	top:30%;
  .img{
    width: 25px;
    height: 25px;
    position: absolute;
    top:0;
    right: 0;
  }
  .title{
    font-size:0.6rem;
    margin:15px auto;
  }
  .btn{
		
    margin:20px auto;
    display:flex;
    justify-content:space-around;
		.kaitong {
			height:1.5rem;
			font-size:0.4rem;
			line-height: 1.5rem;
		}
		.kefu {
			height:1.5rem;
			font-size:0.4rem;
			line-height:1.5rem;
		}
    button{
      width: 40%;
    }
  }
}
.view {
  width: 100%;
  min-height: 120vh;
  height: auto;
  background: #fff;
	font-size:14px;
  position: absolute;
}
.video {
  width: 100%;
  height: 500px;
  margin: 0 auto;
  video {
    width: 100%;
    height: 100%;
  }
	.type {
		width:44px;
		height:22px;
		top: 10px;
    right: 5px;
    border:1px solid #fff;
    color:red;
		text-align: center;
		line-height:22px;
		position:absolute;
	}
}
.disable {
  background: gray;
  color: black;
}
.show {
  background: #2c273d;
  color: #fff;
}
.count {
  width: 95%;
  // min-height: 40px;
  font-size: 15px;
  margin: 0 auto;
  // border: 1px solid #a196c6;
  border-radius: 5px;
  padding: 3px;
  box-sizing: content-box;
  img {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    vertical-align: middle;
  }
  span {
    color: red;
    margin-left: 5px;
  }
}
.img-item {
  width: 100%;
  // min-height:400px;
  // height:auto;
  display: flex;
  flex-wrap: wrap;
  div {
    margin-top: 10px;
    width: 33.333333%;
    height: 130px;
    border-radius: 7px;
    padding: 5px;
    box-sizing: border-box;
    img {
      border-radius: 7px;
      width: 100%;
      height: 100%;
    }
  }
}
.footer {
  position: fixed;
  background: #2c273d;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  color: #fff;
  div {
    width: 25%;
  }
  button {
    display: inline-table;
    background: #2c273d;
    border: none;
    border-radius: 0px;
    outline: 0;
  }

.jubaotime {
      width:24vw;
      height:10vh;
      background-color: gray;
      margin-left:2vw;
      text-align:center;
      position:absolute;
      .jubaonumber
      {
				margin-top:-3px;
        font-size:20px;
      }
      .jubaonumbertext
      {
				margin-top:-2px;
        font-size:10px;
      }
    }
    .hiddenjubaotime {
      display:none;
    }
    .hiddenNo
    {
      display:none;
    }
    .showNo {
      text-align: center;
      margin-left:8vw;
      .Notext
      {
        margin-left:5px;
      }
    }

}
.Yesshow {
  display: none;
}
.showtime {
  // height: 60px;
  height:10vh;
  display: block;
  font-size: 23px;
  background-color: gray;
  text-align: center;
  position: absolute;
}
.hiddentime {
  display: none;
}
.Noshow {
  display: inline;
}
.number {
	margin-top:-3px;
  font-size:20px;
}
.numbertext {
  font-size: 10px;
	margin-top:-2px;
}
</style>