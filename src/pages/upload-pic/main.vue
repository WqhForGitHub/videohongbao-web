<template>
  <div class="uploadPic-box">
    <div :class="box?'upload':'hide'" @click="box">
      <div class="upload-box" @click="menu">
        <div class="menu-samll">
          <img src="/static/upload.png" alt="">
          <p>做广告</p>
        </div>
      </div>
			<!--推荐模板-->
			<div class="recommendedtemplate">
				<div class="title">
					<p class="muban">推荐模板</p>
					<p class="More" @click="More">更多</p>
				</div>
				<!--视频数据-->
				<div class="data">
					<!--可滚动视图区域-->
						<div class="scrollitem">
							<div class="video" v-for="(item, index) in muban" @click="play(item)">
								<img :src="item.videoURL+'?vframe/jpg/offset/1'" alt="" mode='aspectFill' />
								<img src="/static/video.png" class="play" />
							</div>
						</div>
				</div>
			</div>
      <div :style="{'height':(imageheight-200)+'px'}" @click="close"></div>
    </div>
    <div :class="box?'hide':''" :style="{'height':imageheight+'px'}" @click="box">
        <div class="tab-warp">
            <ul class="ul">
              <li @click="showvideo" :class="tabstat.show?'active':'integral'">视频/图片</li>
              <li @click="showpic" :class="tabstat.show?'integral':'active'">投放金额</li>
            </ul>
        </div>
        <div class="count-box" >
        <div class="count-menu">
        <!-- 图片视频区域 -->
          <div :class="tabstat.show?'Upload-count':'hide'">
            <div class="pic-box" v-for="(item,i) in piclist" :key="i" @click="delectpic(i)">
              <p>{{i+1}}</p>
              <img :src="item" alt="" mode='aspectFill'>
              <img src="/static/video2.png" alt="" :class="i===index?'shou':'hide'">
            </div>
            <div class="pic-img" @click="menu">
              <img src="/static/add.png" alt="">
            </div>
            <div class="pic-img" @click="desc">
              <img src="/static/desc.png" alt="">
            </div>
          </div>
        <!-- 积分区域 -->
          <div :class="tabstat.show?'hide':'hount'">
            <div class="title" @click="text">
              <div class="title-iner">
                <p class="h3">标题:</p>
                <span>{{form.remark}}</span>
              </div>
              <img src="/static/qianjin3.png" alt="">
            </div>
            <div class="Inputnumber">
								<van-field  :disabled="flagmoney" @input="parse" v-model="sendnum" placeholder="请输入广告预算最低10元起" />
								<van-field  :disabled="flagmoney" style="margin-top:8px;border:none;" @input="parse" v-model="sendfen" placeholder="请输入投放份数最低10份起" />
							   <!--
                <input type="text" placeholder="dsfsdf"  v-model="sendnum" @input="parse">
                <input type="text" placeholder=""  v-model="sendfen" @input="parse">-->
			  <div class="radio-box" style="margin-top:10px;">
			      <p>支付类型</p>
				  <radio-group class="radio-group" @change="moneychange">
					<div><radio value="money" checked="true" color="#FF6029"/>付费</div>
					<div><radio value="free" color="#FF6029" />免费</div>
				  </radio-group>
			  </div>
              <div class="radio-box" style="margin-top:10px;">
                <p>投放对象</p>
                <radio-group class="radio-group" @change="radioChange">
                  <div><radio value="PUB" color="#FF6029"/>公开</div>
                  <div><radio value="PRI" color="#FF6029" checked="true"/>私密</div>
                </radio-group>
              </div>
              <div class="radio-box">
                <p>指定对象</p>
                <div class="radio-group">
                  <checkbox-group class="checkbox-group" @change="addshop">
                    <radio class="checkbox" color="#FF6029"  :checked='shopopen'/>商品
                  </checkbox-group>
                  <checkbox-group class="checkbox-group ink" @change="assignChange">
                    <radio class="checkbox" color="#FF6029" value="assignRedPackChecked" :checked="assignRedPackChecked"/>好友
                  </checkbox-group>
                </div>
              </div>
              <div class="radio-box2">
                <!-- <p>扣除积分</p> -->
                <div class="index">
                  <div>
                    <span>积分支付:</span><span style="font-size:16px;line-height:40px;">{{userjifen*100}}积分</span>
                  </div>
                  <div class='pay' >
                    <span>微信支付:</span><span style="font-size:16px; color:#FF3766; line-height:40px;">{{usermonney}}元</span>
                  </div>
                </div>
                <!-- <span>{{userjifen}}积分</span> -->
              </div>
            </div>
          </div>  
        </div>
    </div>
		<button class="send" @click="btnclick">立即发布</button>
    </div>
    <van-popup v-model='show' @click='menu'  position="bottom" class='props' custom-style='props' style="z-index=100;">
      <div class="menu-sun"  @click="openImage">
          <img src="/static/upload.png" alt="">
          <div class="title" >
            <h3>上传图片</h3>
            <p>从手机上传新照片(最多9张)</p>
          </div>
      </div>
      <div class="menu-sun2" @click="openVideo">
        <img src="/static/plays.png" alt="">
        <div class="title" >
          <h3>上传视频</h3>
          <p>支持30秒小于25M的视频片段</p>
        </div>
      </div>
       <div class="menu-sun2" style="border-bottom:0;">
          <img src="/static/pictrue.png" alt="">
          <div class="title">
            <h3>已上传</h3>
            <p>从时光优视选择以上传视频</p>
          </div>
        </div>
       <div @click="close" class="close"><p>取消</p></div>
    </van-popup>
     <div class="tabbar">
    		<div class="Home" @click="gotoHomes">
    			<div class="Homeicon">
    				<img src="/static/faxian-P.png"/>
    			</div>
    			<p>首页</p>
    		</div>
    		<div class="upload">
    			<div class="uploadicon">
    				<img src="/static/videoss.png"/>
    			</div>
    			<p style="color:#FF2063">上传</p>
    		</div>
    		<div class="personalcenter" @click="gotopersonal">
    			<div class="personalcentericon">
    				<img src="/static/WO-P.png" />
    			</div>
    			<p>我的</p>
    		</div>
    </div>
  </div>
</template>
<script>
import { uploadMyVideo, addVideoredpackorder, getjifenpay,videoredpackorderPay ,
videoredpackGrab,getAlipay, getselecteditemgoods,getIntegral,videomuvban} from '../../api'
import { statusCode } from '../../config/api.cfg'
import moment from 'moment'
import { qnAction } from '../../api/upload'
import { mapGetters } from 'vuex'
import store from '../../store/index'
export default{
  store,
    computed: {
      ...mapGetters(['userInfo'])
    },
  data(){
    return{
		flagmoney: false,
			user:{},
			Homeicon:true,
			uploadicon:true,
			personalicon:true,
     tabstat:{
       show:true,
       hidee:false,
     },
     height:0,
     box:true,
     index:null,
     shopopen:false,
     count:0,
     type:'PRI',
     sendnum:'',
     sendfen:'',
     url:'',
     show:false,
     selectedArray:'',
     assignRedPackChecked:false,
     usermonney:0,
     userjifen:0,
     key:[],
     video:false,
     heights:true,
     imageheight: (uni.getSystemInfoSync().windowHeight)-40,
     form:{remark:'',},
     piclist:[],
		 muban:[],
		 imgurl:[{},{},{},{},{},{}],
	freevideo: false
    }
  },
  methods: {
		  moneychange(e) {
			  console.log(e.target.value)
			  if (e.target.value == 'free') {
				  this.flagmoney = true
			  } else {
				  this.flagmoney = false
			  }
		  },
		More() {
			uni.navigateTo({
				url:'./More/main'
			})
		},
		close() {
				this.show = false
		},
		gotoHomes() {
				uni.redirectTo({
					url: '../index/main'
				})
		},
		gotopersonal() {
			uni.redirectTo({
				url: '../my/main'
			})
		},
		play(src) {
				uni.navigateTo({
					url:`./video/main?src=${JSON.stringify(src)}`
				})
		},
    parse(){
    if(this.sendnum==''&& this.sendfen==''){
      let num=0;
      this.userjifen=num;this.usermonney=0;
	  this.sendnum = parseInt(0);
	  this.sendfen = parseInt(0);
	  this.freevideo = true // 免费视频
    }
     if(this.sendnum!==''&& this.sendfen==''){
       let num=this.sendnum
       this.userjifen=parseInt(this.sendnum)
     }
     if(this.sendnum==''&&this.sendfen!==''){
       this.userjifen=parseInt(this.sendfen)*2
     }
     if(this.sendnum!==''&& this.sendfen!==''){
       let fen=parseInt(this.sendfen)
       let num=parseInt(this.sendnum)
       this.userjifen=num+(fen)*2
     }
     if(this.selectedArray.length>0){
       let num =(parseInt(this.sendnum)*0.05)
       this.userjifen=parseInt(this.sendnum)+num
     }
     if(this.userjifen>this.count){
       let total=parseInt(this.userjifen);
       this.userjifen=this.count;
       let art=(total-this.count)/2
       this.usermonney=(art*0.02).toFixed(2)
     }else{
       this.usermonney=0;
     }
    },
    showvideo(){
      this.tabstat.show=true;
    },
    menu(){
      this.heights=false;
      this.show=!this.show;
    },
    delectpic(i){
      uni.navigateTo({url:`../deltevideo/main?index=${i}`})
    },
    showpic(){
      this.tabstat.show=false;
    },
    text(){
      uni.navigateTo({url:`../text/main`})
    },
    desc(){
        uni.navigateTo({url:`../delectpic/main?picurl=${JSON.stringify(this.piclist)}`})
    },
    addshop(){
         uni.navigateTo({ url: '../shopping/main' })
    },
    radioChange (val) {
      this.type = val.target.value
      console.log(this.type);
    },
     assignChange (val) {
        // console.log(val)
        if (val.mp.detail.value.length !== 0) {
          uni.navigateTo({ url: '../assign-red-pack/main' })
        }
      },
      async videoredpackorders (id) {
        const obj=uni.getStorageSync('shopobj')
         let a=JSON.stringify(obj)
        const res = await getselecteditemgoods({
          storagedetails:a,
          videoid:id
        });
        console.log(res)
      },
	 // 积分支付
    async ongetjifenpay(id){
      const res = await getjifenpay({
				session:this.userInfo.token.userToken,
				userId:this.userInfo.User.id,
        videoid:id,
      })
      console.log(res)
      if(res.data.code===statusCode.OK){
        uni.showToast({title:'发布成功'})
        // uni.navigateTo({ url: `../sharingPage/main?videoid=${this.videoidnum}`})
				uni.navigateTo({
					url:`../personal-video/main?id=${this.userInfo.User.id}`
				})
        this.type = 'PRI';
        this.box=true;
        this.tabstat.show=true;
        this.shopopen=false;
        this.url="",
        uni.setStorage({key:"shopobj",data:[]})
         uni.setStorageSync("selectedArray",[]);
        this.piclist=[];
        this.form.remark='';
        this.sendnum='';
        this.sendfen='';
        this.video=false;
        this.userjifen='';
        this.usermonney=0;
        uni.setStorageSync('picurl',[])
      }else{
        uni.showToast({title:'积分不足',icon:'none'})
        return
      }
    },
    async videoredpackorder (id, sendMoney, sendNum, affiliateid) {
        let arr=uni.getStorageSync('selectedArray')
        let arrs=JSON.stringify(arr)
        this.videoidnum=id
		// 添加视频红包
        const res = await addVideoredpackorder({
		  session:this.userInfo.token.userToken,
		  userId:this.userInfo.User.id,
          videoid: id,
          amount: sendNum,
          money: sendMoney*100,
          affiliateid: 7,
          allowReceivers: arrs
        })
			console.log('skjdfhksadhfkashdfkhsdakjfhksdhfkhsdkjfhkjsh')
			console.log(res)
        if (res.data.code === statusCode.OK) {
          console.log(res)
          if(this.usermonney>0){
            this.payVideoredpackorder(this.usermonney)
          }else{
           this.ongetjifenpay(id)
          }
        }
      },
    async videoredpackorders (id) {
        const obj=uni.getStorageSync('shopobj')
         let a=JSON.stringify(obj)
         console.log(a)
        const res = await getselecteditemgoods({
          storagedetails:a,
          videoid:id
        });
        console.log(res)
    },
	// 推荐模板
	async onvideomuban() {
		const res = await videomuvban()
		if (res.data.code == statusCode.OK) {
			console.log(res.data)
			this.muban = res.data.data.content;
			uni.setStorage({
				key: 'muban',
				data: res.data.data.content,
				success: () => {
						console.log('success');
				}
			});
		}
	},
    async btnclick() {
      if(this.piclist.length==0)
		{
			uni.showToast({title:'请上传视频图片',icon:'none'});
			return
		}
		else {
         for(var key in this.piclist) {
          if(this.piclist[key].indexOf('vframe/jpg/offset/1')!=-1){
            let arr=this.piclist.slice(0)
            arr.splice(key,1)
            this.key=arr
            let str=this.piclist[key].split('?')
            this.url=str[0]
//             if(this.piclist.length<2) 
// 			{	uni.showToast({title:'最少要上传一张图片',icon:'none'});
// 				return console.log(2);
// 			} 
          }
        }
      }
      if(this.url=='')
		{
			uni.showToast({title:'请上传视频',icon:'none'});
			return
		}
		// 付费视频
		if (this.flagmoney == false) {
		  if(this.sendnum<10)
			{
				uni.showToast({title:'最低10元',icon:'none'});
				return
			}
		  if(this.assignRedPackChecked==false)
		  {
			console.log(123)
			if(this.sendfen<10){uni.showToast({title:'最低10份',icon:'none'});return}
		  } else if (this.sendfen<1) {
			  uni.showToast({title:'不能低于1份',icon:'none'});
			 return
		   }
		   this.freevideo = false
		} else {
		   this.freevideo = true
		}
      if(this.selectedArray.length>0){
        if(this.type!="PRI"){
          uni.showToast({title:'好友红包只能选择私密',icon:'none'});return
        }
        if(parseInt(this.sendfen)>(this.selectedArray.length)){
          uni.showToast({title:'红包份数不能大于选择好友人数',icon:'none'});return
        }
      }
			let that = this
			uni.getStorage({
				key: 'list',
				success: (res) => {
					that.user = res.data
				console.log(res.data);
			}
			});
			uni.showLoading({
				title:'正在发布...',
				mask:true
			})
			console.log("Url: ")
			console.log(this.url)
			console.log('key')
			console.log(JSON.stringify(this.key))
			console.log("份数: ")
			console.log(this.sendfen)
			console.log("发送的金额: ")
			console.log(this.sendnum)
			//发布
      const myvideo =  await uploadMyVideo(
		{
		session:this.user.token.userToken,
		userId:this.user.User.id,
		cover:JSON.stringify(this.key),    // 图片数组
        duration:this.duration,
        remark:this.form.remark,
        sendNum:this.sendfen,
        type:this.type,
        url:this.url,				  // 视频URL
        sendMoney:this.sendnum,
        title:this.userInfo.nickName,
        name:'video名称',
	    freevideo:this.freevideo
		})
		console.log('发布视频为:   ')
		console.log(myvideo)
      if(myvideo.data.code === statusCode.OK) {
		uni.showToast({
			title:'发布成功',icon:'none'
		})
        const data = myvideo.data.data
        const affiliateid = uni.getStorageSync('affiliateid')
        const obj=uni.getStorageSync('shopobj')
		// 免费视频
		if (this.sendnum == '' && this.sendfen == '') {
			uni.navigateTo({
				url:`../personal-video/main?id=${this.userInfo.User.id}`,
			})
			return 
		} else {  
			if(obj.length!==0){
			  console.log(123)
			  this.videoredpackorders(myvideo.data.data.id)
			}
			if (affiliateid !== undefined && affiliateid !== null) {
			  console.log(affiliateid )
			  this.videoredpackorder(data.id, data.sendMoney, data.sendNum, affiliateid)
			}else{
			  console.log(45)
			 this.videoredpackorder(data.id, data.sendMoney, data.sendNum, '')
			}
		}
      } else {
		 uni.showToast({
				title:'发送红包失败',icon:'none'
		 });
      }
      
    },
		// 支付
    async payVideoredpackorder (monney) {
      console.log(monney)
          const res= await getAlipay({
          openId:this.userInfo.openid,
          money:monney,
          integral:this.userjifen,
          status: 0
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
              uni.showToast({title:'发布成功'})
              uni.navigateTo({ url: `../sharingPage/main?videoid=${this.videoidnum}`})
              this.type = 'PRI';
              this.box=true;
              this.tabstat.show=true;
              this.shopopen=false;
              this.url="",
              uni.setStorage({key:"shopobj",data:[]})
              uni.setStorageSync("selectedArray", []);
              this.piclist=[];
              this.form.remark='';
              this.sendnum='';
              this.sendfen='';
              this.video=false;
              this.userjifen='';
              this.usermonney=0;
              uni.setStorageSync('picurl',[])
            },
            fail: (res) => {
              uni.showToast({title:'积分不足',icon:'none'})
            console.log(res)
            }
          })
        }  
      },
			// 获取积分
    async getInc(){
      const res=await getIntegral({
				session:this.userInfo.token.userToken,
				userId:this.userInfo.User.id,
        userid: this.userInfo.User.id
      })
      if (res.data.code === statusCode.OK) {
        console.log(res)
        this.count=res.data.data.integral
      }
    },
    openVideo () {
      for(var key of this.piclist){
        if(key.indexOf('vframe/jpg/offset/1')!=-1){
          this.video=true;
          uni.showToast({
            title:'仅支持上传一个视频'
          });
          console.log(this.video)
          return
        }
      }
      uni.chooseVideo({
        compressed: false,
        success: (res) => {
          console.log(res.thumbTempFilePath)
          this.form.poster = res.thumbTempFilePath
          this.onUploadFile(res.tempFilePath, true,1)
        }
      })
    },
    openImage () {
      console.log(this.piclist.length)
      console.log(this.video)
      if(this.video){
        if(this.piclist.length==10) {
          uni.showToast({title: '仅支持上传9张图片',})
          return
        }
      } else if(this.piclist.length==9) {
        uni.showToast({title: '仅支持上传9张图片',})
        return
      }
      uni.chooseImage({
        sizeType: ['original'],
        count:9,
        success: (res) => {
          console.log(res)
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            this.onUploadFile(res.tempFilePaths[i], false,res.tempFilePaths.length)
          }
        }
      })
    },
    onUploadFile (Filepath, isVideo, num) {
		var token = uni.getStorageSync('qnToken')
        let upfile = uni.uploadFile({
          url: qnAction,
          name: 'file',
          filePath: Filepath,
          header: {
            //'content-type': 'multipart/form-data;boundary=ABCD',
						'Content-Disposition': 'form-data;name='+ token
          },
          formData: {
            token: uni.getStorageSync('qnToken')
          },
          success: (res) => {
						console.log("上传的图片为:")
            console.log(res)
            const data = JSON.parse(res.data)
						// 上传视频
            if (isVideo) {
              this.piclist.push(`${uni.getStorageSync('uploadDomain')}/${data.hash}?vframe/jpg/offset/1`)
              uni.setStorageSync('picurl',this.piclist)
              this.video=true;
              this.box=false;
              this.heights=true;
              this.index=(this.piclist.length)-1;
            } else { // 上传图片
              if(this.video) {
                if(this.piclist.length < 10) {
                  this.piclist.push(`${uni.getStorageSync('uploadDomain')}/${data.hash}`)
                  uni.setStorageSync('picurl',this.piclist)
                  return
                }
              } else if(this.piclist.length < 9) {  
                  this.piclist.push(`${uni.getStorageSync('uploadDomain')}/${data.hash}`)
                  uni.setStorageSync('picurl',this.piclist)
              }
              this.box=false;
              this.heights=true;
            }
          }
        })
				// 监听上传进度变化
        upfile.onProgressUpdate((res) => {
				let progress = res.progress.toString() + '%'
					uni.showLoading({
						title: progress
					})
					if(res.progress==100){
						uni.hideLoading()
					}
			})
    }
  },
   onShow(){
		 // 报Login的错误
		 
     let shop=uni.getStorageSync('shopobj')
      if(shop.length!==0){
        this.shopopen=true;
      }
     this.heights=true;
     this.getInc()
     this.selectedArray = uni.getStorageSync('selectedArray')
      if (this.selectedArray.length!=0) {
        this.assignRedPackChecked = true
        this.parse()
      } else {
        this.assignRedPackChecked = false
      }
    this.piclist=Picture
  },
  onLoad(res){
		this.freevideo = false
		console.log('预览图片为:')
		console.log(res)
    if(res.obj=='1') 
		{
			console.log(131)
		}
    if(res.pic=='1')
		{
			// 清空
			this.box=true;this.piclist=[];this.url='';
		}
		if (res.flag == "yes") {
			this.form.remark=res.remark
			this.showpic()
			this.box=false;
			this.heights=true;
			console.log('sdfsdhfkshdfkjhsdjkfhsdkhfkjsdhfkjsdhfkdsjfh')
		} else {
			this.box=true;
			this.heights=false;
		}
		
		// 判断是否有视频
    if(res.pic=='0') {
     let arr = uni.getStorageSync('picurl')
     this.piclist=arr;
     for(var key in arr) {
        if(arr[key].indexOf('vframe/jpg/offset/1')!=-1) {
          this.video=true;
          console.log('真的有视频嘛,真的有')
          this.index=parseInt(key) 
					// 返回视频/图片
					this.box = false
					this.heights = true;
					this.tabstat.show=true;
          return   
        } else
				{
					this.video=false;this.index=null;this.url='';console.log('视频被删除了')
					// 返回视频/图片
					this.box = false
					this.heights = true;
					this.tabstat.show=true;
				}
     }
    }
		
		  if(res.open =='true') 
		{
			this.box = false
			this.heights = true;
			this.tabstat.show=true;
		}
		else if (res.open =='false') 
		{
			this.box = false
			this.heights = true;
		}
		this.onvideomuban()
  }
}
</script>


<style lang="less" scoped>
.upload-box{
  width: 95%;
  background: #F8F8F8;
  height: 200px;
  margin:10px auto;
  border-radius: 10px;
  position: relative;
  .menu-samll{
    position: absolute;
    width: 100px;
    height:100px;
    top:50%;
    left:50%;
    margin-top:-50px;
    margin-left: -50px;
    text-align: center;
    img{
      margin:5px auto;
      width: 35px;
      height: 35px;
    }
  }
}
.recommendedtemplate {
		width:94.5vw;
		height:130px;
		margin:2% auto;
		font-size:14px;
		.title {
			width:100%;
			height:25px;
			display: flex;
			flex-wrap: nowrap;
			justify-content:space-between;
			.muban {
				line-height:25px;
				font-size:16px;
			}
			.More {
				color:gray;
				line-height:25px;
				font-size:15px;
			}
		}
		.data {
			width:100%;
			height:80%;
			display: flex;
			overflow:scroll;
			//background:blue;
				.scrollitem {
					display:flex;
					margin-left:-1.4%;
					.video {
						width:100px;
						height:85px;
						margin-left:1%;
						margin-top:1%;
						background:red;
						border-radius:5px;
						img {
							width:100%;
							height:100%;
						  border-radius:5px;
						}
						.play {
							display: block;
							width:30px;
							height:30px;
							margin-top:-60px;
							margin-left:30px;
							background-size:100% 100%;
						}
					}
				}
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
.menu-box{
  width: 100%;
  z-index: 99;
  height: 0px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.3s;
  border-top:1px solid #ddd;
}
.menu-box2{
  width: 100%;
  z-index: 99;
  height: 230px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  background: #fff;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.3s;
  border-top:1px solid #ddd;
}
.menu-sun{
  display: flex;
  height: 60px;
  width: 94%;
  margin:0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ddd;
  img{
    margin:auto 10px;
    width: 30px;
    height: 30px;
  }
  .title{
    margin:auto 0;
    p{
      font-size: 12px;
    }
  }
}
.menu-sun2{
  display: flex;
  height: 60px;
  width: 94%;

  margin:0 auto;
  border-bottom: 1px solid #ddd;

  img{
    margin:auto 10px;
    width: 30px;
    height: 28px;
  }
  .title{
    margin:auto 0;
    p{
      font-size: 12px;
    }
  }
}
.close{
  height: 50px;
  width: 100%;
  text-align: center;
  background: #F8F8F8;
  p{
    line-height: 50px;
  }
}
.uploadPic-box{
  width: 100%;
  height: 100vh;
	font-size:16px;
  background: #fff;
}
.tab-warp{
  display: flex;
  width: 95%;
  height: 40px;
  align-items: center;
  margin:0 auto;
  .ul{
   display: flex;
   width: 100%;
    .active{
     width: 50%;  
     height: 40px;
     margin:0 auto;
     background:#EEEFF3;
     line-height: 40px;
     text-align: center;
     border-top-left-radius: 10px;
     border-top-right-radius: 10px;

  }
  .integral{
    width: 50%;  
     height: 40px;
     margin:0 auto;
     background:#fff;
     line-height: 40px;
     text-align: center;
  }
  }
  
}
.hide{
  display: none;
}
.count-box{
  height: 100%;
  width: 100%;
  background:#EEEFF3; 
  .count-menu{
    width: 95%;
    height: 100%;
    margin:0 auto;
    overflow: hidden;
      box-sizing: border-box;

    .Upload-count{
      display:flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      .pic-img{
        width:21.9%;
        height:80px;
        margin:10px 5px; 
        border-radius: 5px;
        background: #fff;
        position: relative;
        img{
          width: 20px;
          height: 20px;
          position: absolute;
          top:50%;
          left: 50%;
          margin-left: -10px;
          margin-top: -10px;
        }
      }
     .pic-box{
        width:21.9%;
        height:80px;
        margin:10px 5px; 
        border-radius: 5px;
        background: #fff;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
        .shou{
          position: absolute;
          width: 17px;
          height: 15px;
          border-radius:0;
          right:0;
          bottom: 0;
        }
        p{
          position: absolute;
          top:5px;
          left: 5px;
          width: 15px;
          height: 15px;
          border-radius: 25px;
          opacity: 0.5;
          line-height: 15px;
          font-size: 12px;
          text-align: center;
          background: rgba(122, 122,122,0.8);
          color:#fff;
        }
      }
    }
    
  }
}
.hount{
  height: 100%;
  overflow: hidden;
  img{
    width: 20px;
    height: 20px;
    margin:auto 0;
  }
  .title{
    height: 40px;
    background:#fff;
    line-height: 40px;
    border-radius: 5px;
    display: flex;
    margin:10px 0;
    padding:0 10px;
    justify-content: space-between;
    .title-iner{
      height: 100%;
      display: flex;
      width: 90%;
      overflow: hidden;
      .h3{
        width: 60px;
      }
      span{
        color:#848484;
        width: 300px;
        font-size: 14px;
        margin:0 10px;
        line-height:3;
      }
    }
  }
  .Inputnumber{
    .input-box{
     input{
       height: 40px;
       padding:0 10px;
       background: #fff;
       border:1px solid #Ddd;
       margin:10px 0;
       border-radius: 5px;
       font-size: 12px;
     }
    }
    .radio-box{
      border:1px solid #ddd;
      height: 40px;
      background: #fff;
      text-align: center;
      line-height: 40px;
      display: flex;
      margin-bottom: 10px;
      border:1px solid #ddd;
      border-radius: 5px;
      overflow: hidden;
      p{
        width:30%;
      }
      .radio-group{
        width: 70%;
        display: flex;
        justify-content:space-around;
      }
    }
    .radio-box2{
      border:1px solid #ddd;
      height: 40px;
      background: #fff;
      text-align: center;
      line-height: 40px;
      display: flex;
      overflow: hidden;
      justify-content: space-between;
      margin-bottom: 10px;
      border:1px solid #ddd;
      border-radius: 5px;
      // overflow: hidden;
      .index{
        width: 90%;
        display: flex;
        margin:0 auto;
        justify-content: space-between;
        pay{
          margin-right: 40px;
        }
      }
    }
  }
}
.send{
  position: absolute;
  bottom: 80px;
  left: 50%;
  margin-left: -25%;
  width: 50%;
  line-height: 40px;
  height: 40px;
  color:#fff;
  border-radius: 25px;
  background: #FF3766;
}
</style>
