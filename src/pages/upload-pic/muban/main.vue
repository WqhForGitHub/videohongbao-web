<template>
<div>
  <div class="uploadPic-box">
    <div @click="box">
        <div class="tab-warp">
            <ul class="ul">
              <li @click="showvideo" :class="tabstat.show?'active':'integral'">视频/图片</li>
              <li @click="showpic" :class="tabstat.show?'integral':'active'">投放积分</li>
            </ul>
        </div>
        <div class="count-box">
          <div class="count-menu">
        <!-- 图片视频区域 -->
            <div :class="tabstat.show?'Upload-count':'hide'">
              <div class="pic-box" v-for="(item,i) in piclist" :key="i">
                <p>{{i+1}}</p>
                <img :src="item" alt="" mode='aspectFill'>
              </div>
              <div class="pic-box" v-for="(item,i) in videourl" :key="i">
                <img :src="item+'?vframe/jpg/offset/1'" alt="" mode='aspectFill'>
                <img src="/static/video2.png" alt="" class="shou">
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
			   <!--
              <div class="input-box">
                <input type="text" placeholder="请输入广告预算最低10元起"  v-model="sendnum" @input="parse">
                <input type="text" placeholder="请输入投放份数最低10份起"  v-model="sendfen" @input="parse">
              </div>-->
			  <div class="input-box">
				  <van-field v-model="sendnum" placeholder="请输入广告预算最低10元起" @input="parse" />
				  <van-field style="margin-top:3%;" v-model="sendfen" placeholder="请输入投放份数最低10份起" @input="parse" />
			  </div>
              <div class="radio-box">
                <p>指定对象</p>
                <div class="radio-group">
                  <checkbox-group class="checkbox-group" @change="radioChange" @click="radioClick">
                    <div><radio value="PRI" color="#FF6029" checked="true"/>私密</div>
                    <!-- <radio class="checkbox" color="#FF6029"  :checked='shopopen'/>商品 -->
                  </checkbox-group>
                  <checkbox-group class="checkbox-group ink" @change="assignChange">
                    <radio class="checkbox" color="#FF6029" value="assignRedPackChecked" :checked="assignRedPackChecked"/>好友
                  </checkbox-group>
                </div>
              </div>
              <div class="radio-box2">
                <!-- <p>扣除积分</p> -->
                <div class="index">
                  <!-- <div>
                    <span>积分支付:</span><span style="font-size:16px;line-height:40px;">{{userjifen}}积分</span>
                  </div> -->
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
    
  </div>
</div>
</template>
<script>
import { uploadMyVideo,cfgGet,pengyouquans,videomuvban,addVideoredpackorder, getjifenpay,videoredpackorderPay ,videoredpackGrab,getAlipay, getselecteditemgoods,getIntegral} from '../../../api'
import { statusCode } from '../../../config/api.cfg'
import moment from 'moment'
import { qnAction } from '../../../api/upload'
import { mapGetters } from 'vuex'
import store from '../../../store/index'
export default{
  store,
    computed: {
      ...mapGetters(['userInfo'])
    },
  data(){
    return{
     tabstat:{
       show:true,
       hidee:false,
     },
     height:0,
     box:true,
     index:null,
     shopopen:false,
     count:0,
     videourl:[],
     type:'PRI',
     sendnum:'',
     sendfen:'',
     url:'',
     duration:0,
     muban:'',
     shenhelist:null,
     show:false,
     shenhe:true,
     selectedArray:'',
     assignRedPackChecked:false,
     usermonney:0,
     userjifen:0,
     key:[],
     video:false,
     heights:true,
     imageheight: (wx.getSystemInfoSync().windowHeight)-40,
     form:{remark:'',},
     piclist:[],
    }
  },
  methods: {
    parse(){
    if(this.sendnum==''&& this.sendfen==''){
      this.usermonney=0;
    }
     if(this.sendnum!==''&& this.sendfen==''){
       let num=this.sendnum 
       this.usermonney=parseInt(this.sendnum)
     }
     if(this.sendnum==''&&this.sendfen!==''){
       this.usermonney=parseInt(this.sendfen)*0.02
     }
     if(this.sendnum!==''&& this.sendfen!==''){
       let fen=parseInt(this.sendfen)
       let num=parseInt(this.sendnum)
       this.usermonney=(num+(fen)*0.02).toFixed(2)
     }
     if(this.selectedArray.length>0){
       let num =(parseInt(this.sendnum)*0.05)
       this.usermonney=parseInt(this.sendnum)+num
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
      wx.navigateTo({url:`/pages/deltevideo/main?index=${i}`})
    },
    showpic(){
      this.tabstat.show=false;
    },
    text(){
      wx.navigateTo({url:`/pages/text/main?yanzheng=1&remark=${this.form.remark}`})
    },
    play(src){
      wx.navigateTo({url:`/pages/video/main?src=${JSON.stringify(src)}`})
    },
    desc(){
        wx.navigateTo({url:`/pages/delectpic/main?picurl=${JSON.stringify(this.piclist)}`})
    },
    addshop(){
         wx.navigateTo({ url: '/pages/shopping/main' })
    },
    async onvideomuvban(){
      const res =await videomuvban()
      console.log(res)
      this.muban=res.data.data.content
      wx.setStorageSync('videolist',this.muban)
      console.log(this.muban)
    },
    async onpengyouquan(){
      const res = await pengyouquans()
      if(res.data.data.length==0){
        wx.showToast({
          title:'没有更多数据了'
        })
      }else{this.shenhelist=res.data.data;console.log(this.shenhelist)}
    },
    radioChange (val) {
      this.type = val.target.value
      console.log(this.type);
    },
     assignChange (val) {
        // console.log(val)
        if (val.mp.detail.value.length !== 0) {
          wx.navigateTo({ url: `/pages/assign-red-pack/main?muban=1` })
        }
      },
      async videoredpackorders (id) {
        const obj=wx.getStorageSync('shopobj')
         let a=JSON.stringify(obj)
        const res = await getselecteditemgoods({
          storagedetails:a,
          videoid:id
        });
        console.log(res)
      },
    async ongetjifenpay(id){
      const res = await getjifenpay({
        videoid:id,
      })
      console.log(res)
      if(res.data.code===statusCode.OK){
        wx.showToast({title:'发布成功'})
        wx.navigateTo({ url:`/pages/personal-video/main?id=${this.userInfo.id}`}) 
        this.type = 'PRI';
        this.box=true;
        this.tabstat.show=true;
        this.shopopen=false;
        this.url="",
        wx.setStorage({key:"shopobj",data:[]})
         wx.setStorageSync("selectedArray",[]);
        this.piclist=[];
        this.form.remark='';
        this.sendnum='';
        this.sendfen='';
        this.videourl=[];
        this.userjifen=0;
        this.usermonney=0;
        wx.setStorageSync('picurl',[])
      }else{
        wx.showToast({title:'积分不足',icon:'none'})
        return
      }
    },
    async videoredpackorder (id, sendMoney, sendNum, affiliateid) {
        let arr=wx.getStorageSync('selectedArray')
        let arrs=JSON.stringify(arr)
        this.videoidnum=id
        const res = await addVideoredpackorder({
          videoid: id,
          amount: sendNum,
          money: sendMoney*100,
          muban:'0',
          affiliateid: 7,
          allowReceivers: arrs
        })
        if (res.data.code === statusCode.OK) {
          if(this.usermonney>this.count){
            let num=this.usermonney-this.count
            this.payVideoredpackorder(num)
          }else{
            this.ongetjifenpay(id) 
          }
        }
      },
    async videoredpackorders (id) {
        const obj=wx.getStorageSync('shopobj')
         let a=JSON.stringify(obj)
         console.log(a)
        const res = await getselecteditemgoods({
          storagedetails:a,
          videoid:id
        });
        console.log(res)
    },
    async btnclick(){
      if(this.sendnum<10){wx.showToast({title:'最低10元',icon:'none'});return}
      if(this.assignRedPackChecked==false){
        if(this.sendfen<10){wx.showToast({title:'最低10份',icon:'none'});return}
      }else if(this.sendfen<1){wx.showToast({title:'不能低于1份',icon:'none'});return}
        if((this.sendnum/this.sendfen)<0.1){wx.showToast({title:'每份平均不能少于0.1元',icon:'none'});return}
      if(this.selectedArray.length>0){
        if(this.type!="PRI"){
          wx.showToast({title:'好友红包只能选择私密',icon:'none'});return
        }
        if(parseInt(this.sendfen)>(this.selectedArray.length)){
          wx.showToast({title:'红包份数不能大于选择好友人数',icon:'none'});return
        }
      }
      const myvideo =  await uploadMyVideo({
        cover:JSON.stringify(this.piclist),remark:this.form.remark,duration:this.duration,muban:'0',sendNum:this.sendfen,type:this.type,url:this.videourl[0],sendMoney:this.sendnum,title:this.userInfo.nickName,name:'video名称'
      })
      if(myvideo.data.code === statusCode.OK){
        const data = myvideo.data.data
        const affiliateid = wx.getStorageSync('affiliateid')
        const obj=wx.getStorageSync('shopobj')
        if(obj.length!==0){
          this.videoredpackorders(myvideo.data.data.id)
        }
        if (affiliateid !== undefined && affiliateid !== null) {
          console.log(affiliateid )
          this.videoredpackorder(data.id, data.sendMoney, data.sendNum, affiliateid)
        }else{
          console.log(45)
          this.videoredpackorder(data.id, data.sendMoney, data.sendNum, '')
        }
      }else {
          this.showToast('发送红包失败', 'none')
      }
      
    },
    async payVideoredpackorder (monney) {
      console.log(monney)
          const res= await getAlipay({
          openId:this.userInfo.openid,
          money:monney,
          appId:'wx04669c909368ae5c',
          integral:this.userjifen,
          status: 0
          // money:0.01
        })
        if (res.status === statusCode.OK){
          var payModel = res.data;
          wx.requestPayment({
            'timeStamp': payModel.timeStamp,
            'nonceStr': payModel.nonceStr,
            'package': payModel.package,
            'signType': 'md5',
            'paySign': payModel.sign,
            success:(res)=>{
              wx.showToast({title:'发布成功'})
              wx.navigateTo({ url:`/pages/personal-video/main?id=${this.userInfo.id}`}) 
              this.type = 'PRI';
              this.box=true;
              this.tabstat.show=true;
              this.shopopen=false;
              this.url="",
              wx.setStorage({key:"shopobj",data:[]})
              wx.setStorageSync("selectedArray", []);
              this.piclist=[];
              this.videourl=[];

              this.form.remark='';
              this.sendnum='';
              this.sendfen='';
              this.userjifen=0;
              this.usermonney=0;
              wx.setStorageSync('picurl',[])
            },
            fail: (res) => {
              wx.showToast({title:'支付失败',icon:'none'})
            }
          })
        }  
      },
    async getInc(){
      const res=await getIntegral({
        userid: this.userInfo.id
      })
      if (res.data.code === statusCode.OK) {
        this.count=res.data.data.integral
      }
    },
  },
   onShow(){
     let shop=wx.getStorageSync('shopobj')
      if(shop.length!==0){
        this.shopopen=true;
      }
     this.heights=true;
     this.getInc()
     this.selectedArray = wx.getStorageSync('selectedArray')
      if (this.selectedArray.length!=0) {
        this.assignRedPackChecked = true
        this.parse()
      } else {
        this.assignRedPackChecked = false
      }
    // this.piclist=Picture
  },
  onLoad(res){
    if(res.muban!=='1'){
      wx.setStorageSync('selectedArray',[])
    }
    if(res.obj=='1'){
      this.form.remark=res.remark
    }else{
      let obj=JSON.parse(res.src)
      this.duration=obj.duration
      this.piclist=obj.pictureURLs
      this.videourl.splice(0,1,obj.videoURL)
      if(obj.explains==null){
        this.form.remark='';
      }else{
        this.form.remark=obj.explains
      }
      console.log(this.videourl)
    }
    
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
  font-size:14px;
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
  height:100vh;
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
	  margin-top:2%;
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
  bottom: 20px;
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