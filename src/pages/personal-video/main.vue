<template>
  <div class="view">
    <div class="header-img">
      <img src="http://sphbvideo.25010086.com/20181220165209.jpg" alt="" mode='aspectFill'>
    </div>
    <div class="userin">
      <div class='avale'>
        <img :src="userInfos.avatarUrl" alt="" mode='aspectFill'>
      </div>
      <div class="user-name">
        <p class="header-name">{{userInfos.nickName}}</p>
        <p style="color:#AFAFAF;font-size:12px;margin:5px 0;">ID:&nbsp;{{user.User.id}}</p>
        <div class="guangzhu">
          <span>关注&nbsp;{{userInfos.meFocuson}}</span>
          <span>粉丝&nbsp;{{userInfos.focusonMe}}</span>
        </div>
      </div>
    </div>
    <div class="user-msg">
      <div class='header'>
        <div @click="open"><p :class="show?'color':''" style="width:60px;">动态</p></div>
        <div @click="opent"><p :class="showt?'color':''">公开影集</p></div>
				<div @click="opens"><p :class="shows?'color':''">我的视频</p></div>
      </div>
    </div>
		<!--动态-->
    <div :class="show?'video':'hide'">
      <div class="tabulate" >
        <div class="box" v-for="(item,index) in videolist" :key="index" @click="particulars(item.video.id)">
          <img :src="item.url+'?vframe/jpg/offset/1'" mode='aspectFill' class='img'>
          <div class="count">
            <div class="count-box">
              <p>{{item.title}}</p>
              <div>
                  {{item.createTime}}
              </div>
            </div>
            <div class="btn">
              <div>
                <p v-if="item.status=='PUBLISHED'" class="radius" style="border: 2px solid #6a9955;">pass</p>
                <p v-if="item.status=='REVIEW'" class="radius" style="border: 2px solid #c586c0;">审核中</p>
                <p v-if="item.status=='BANNED'" class="radius" style="border: 2px solid red;">NOT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
		<!--公开影集-->
    <div :class="showt?'video':'hide'">
      <div class="tabulate" >
          <div class="box" v-for="(item,index) in sharvideo" :key="index" @click="particulars(item.id)">
              <img :src="item.url+'?vframe/jpg/offset/1'" mode='aspectFill' class="imgs">
          </div>
      </div>
    </div>
		<!--我的视频-->
		<div :class="shows?'video':'hide'">
      <div class="tabulate" >
          <div class="box" v-for="(item,index) in  myvideo.list" :key="index" @click="particulars(item.id)">
              <img :src="item.url+'?vframe/jpg/offset/1'" mode='aspectFill' class="imgs">
              <p class='status'>{{item.type=='PUB'?'公开':'私密'}}</p>
          </div>
      </div>
    </div>
</div>
</template>

 <script>
import {getVideoinformation,getvideostatus,getPubVideoList,getfocuson,getmyvideo }from '../../api/index';
import { statusCode } from "../../config/api.cfg";
import { formatTime } from "../../utils";
import { mapGetters } from 'vuex'
import store from '../../store/index'
  export default{
     store,
    computed: {
      ...mapGetters(['userInfo'])
    },
    data(){
      return{
        show:true,
        shows:false,
        showt:false,
        videolist:[],
        userId:null,
        page:0,
        size:8,
        onlime:true,
        status:'open',
        myvideo:{
          size:9,
          page:0,
          list:[],
          status:false,
          totalPages:0,
        },
        userInfos:null,
        sharvideo:null,
        params: {
          sort: 'createTime,desc',
          page: 0,
          size: 8
        },
        totalPages:0,
      }
    },
    methods: {
      open(){
        this.show=true;
        this.showt=false;
        this.shows=false;
      },
			opent() {
				this.show=false;
        this.showt=true;
        this.shows=false;
			},
			opens() {
				this.show=false;
        this.showt=false;
        this.shows=true;
				if(this.onlime){
          this.ongetmyvideo()
        }
			},
      particulars(id){
        uni.navigateTo({
            url:`../details-video/main?videoid=${id}&status=1`
        })

      },
			async ongetmyvideo(open) {
				const res = await getmyvideo({
					session:this.userInfo.token.userToken,
					userId:this.userInfo.User.id,
					size:this.myvideo.size,
					page:this.myvideo.page
				})
				console.log(res)
				if(open == false) {
					this.myvideo.list.push(...res.data.data.content)
				} else {
					this.myvideo.list=res.data.data.content
          this.myvideo.totalPages=res.data.data.totalPages
				}
			},
			// 公开影集
			async ongetfocuson(onse, other) {
				console.log(this.userInfo.User.id)
				// Id是本人
				if (other === false) {
					const res =await getfocuson(
						{
							userId:this.user.User.id, 
							UserId:this.userInfo.User.id,
							session: this.userInfo.token.userToken,
							page:0,
							size: 10
						}
					)
					console.log(res)
						if (res.data.code === statusCode.OK) {
						 if(onse == false) {
							this.sharvideo.push(...res.data.data.video.content) 
							console.log(this.sharvideo)
						} else {
							this.sharvideo=res.data.data.video.content
							this.userInfos=res.data.data.user
							this.totalPages=res.data.data.video.totalPages
						}
					}  
				} else { // Id是其他人
					const res =await getfocuson(
						{
							UserId:this.user.User.id,
							userId:this.userInfo.User.id,
							session: this.userInfo.token.userToken,
							page:0,
							size: 10
						}
			      )
						console.log(res)
							if (res.data.code === statusCode.OK) {
							 if(onse == false) {
								this.sharvideo.push(...res.data.data.video.content) 
								console.log(this.sharvideo)
							} else {
								this.sharvideo=res.data.data.video.content
								this.userInfos=res.data.data.user
								this.totalPages=res.data.data.video.totalPages
							}
						}  
				}
			},
			// 获取动态
			async getvideoInfo(other){
				// 如果是本人Id
				if (other === false) {
					const res = await getVideoinformation(
					{
						session:this.userInfo.token.userToken,
						userIds:this.userInfo.User.id,
						userId:this.userInfo.User.id
					})
// 					console.log("个人动态: ")
// 					console.log(res)
					 if (res.data.code === statusCode.OK) {
						this.videolist=res.data.data.content
						console.log("个人动态")
						console.log(this.videolist)
						this.videolist.forEach((ele) => {    
						 ele.createTime=formatTime(new Date(ele.createTime))
						});
					}
				} else {
					const res = await getVideoinformation(
					{
						session:this.userInfo.token.userToken,
						userIds:this.userInfo.User.id,
						userId:this.user.User.id
					})
					console.log(res)
					 if (res.data.code === statusCode.OK) {
						this.videolist=res.data.data.content
						console.log("个人动态")
						console.log(this.videolist)
						this.videolist.forEach(ele => {    
						 ele.createTime=formatTime(new Date(ele.createTime))
						});
					}
				}

			},
		},
		onShow(){
		  this.params.page=0
		},
		onLoad(res){
			this.onlime=true;
			let that = this
			uni.getStorage({
				key: 'list',
				success: (res) => {
				console.log(res.data)
				that.user = res.data
				}
			});
			console.log('我的关注的人的Id为: ')
			console.log(res.id)
			console.log(this.user.User.id)
			// 判断是本人和他人的Id
			if (res.id == this.user.User.id) {
				console.log('相等')
				let onse = true;
				let other = false;
				this.ongetfocuson(onse,other)
				this.getvideoInfo(other);
			} else {
				console.log('不相等')
				this.user.User.id = res.id
				let onse = true;
				let other = true;
				this.ongetfocuson(onse,other)
				this.getvideoInfo(other);
			}
		},
		// 上拉触底事件
	 async onReachBottom() {
      if(this.status=='open'){
        this.params.page++
        if (this.params.page>= this.totalPages) {
          uni.showToast({title:'没有更多数据了',icon:'none'})
          return
        }
        let open=false
        this.ongetfocuson(open)
      }else{
        this.myvideo.page++
        if(this.myvideo.page>this.myvideo.totalPages){
          this.onlime=false;
          uni.showToast({title:'没有更多数据了',icon:'none'})
          return
        }
        let opens=false
        this.ongetmyvideo(opens)
      }
    }
  }
</script>

<style lang="less" scoped>
.view{
	font-size:21px;
  .header-img{
    width: 100%;
    height:100px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .userin{
    width: 100%;
    min-height: 150px;
		height:auto;
    .avale{
      width: 80px;
      height: 80px;
      margin:-40px auto 0 auto;
      border-radius: 25px;
      img{
        width: 100%;
        height: 100%;
        border:4px solid #fff;
        border-radius: 50px;
      }
    }
    .user-name{
      width:170px;
      min-height: 70px;
			height:auto;
      text-align: center;
      margin:10px auto;
      overflow: hidden;
      .guangzhu{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color:#B3B3B3;
        padding: 0 10px;
      }
    }
  }
  .user-msg{
		position:relative;
    .header{
      width: 100%;
      height: 40px;
      margin:10px auto;
      display: flex;
      justify-content: space-between;
      border-bottom:1px solid#ddd;
      div{
        width: 50%;
        text-align: center;
        p{
          margin:0 auto;
          width:100px;
          font-size: 12px;
          line-height: 40px;
        }
      }
      .color{
        color:#F5427E;
        box-sizing: border-box;
        border-bottom: 5px solid #F5427E;
      }
    }
  }
  .video{
    .tabulate{
      padding:10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
			margin-top:-4%;
      .box{
        width: 48%;
        height: 200px;
        border-radius: 10px;
        margin-bottom: 10px;
				margin-top:7%;
				.status{
          width:37px;
					height:20px;
					border:1px solid #fff;
					text-align: center;
					font-size:14px;
					margin-top:-8%;
					margin-left:34vw;
					border-radius:3px;
					position:absolute;
        }
        .imgs{
          width: 100%;
          height: 100%;
          border-radius: 10px;
					object-fit: cover;
        }
        .img{
            width:100%;
            height: 180px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
						object-fit: cover;
        }
        .count{
            display:flex;
            justify-content: space-between;
            font-size: 12px;
						.count-box{
								p{
										margin:5px 0;
								}  
						}
					.btn{
							.radius{
								 width:40px;
								 height: 40px;
								 border-radius: 50%;
								 border: 2px solid red;
								 font-size: 12px;
								 text-align: center;
								 line-height: 37px;
							}
					}
        }
      }
    }
  }
  // .videox{
  //   border:1px solid red;
  // }
  .hide{
    display: none;
  }
}
</style>