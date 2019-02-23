<template>
    <div class="view">
       <!-- 视屏详情 -->
       <div class="audit" >
           <div class="product">

               <video :src="url" :autoplay='true' :custom-cache='false' objectFit="cover"></video>
                  <!-- 不通过的状态 -->
               <div class="videostaus" v-if="noPass">
                   <p class="cause">审核不通过原因:</p>
                    <div class="statusbtn">
                    <!-- <p class="reason">{{banReason}}<p> -->
 
                        <p class="notvideo">{{banReason}}</p>
                    </div>
               </div>
               <!-- 通过的状态 -->
                 <div class="passStaus" v-if="pass">
                     <div class="text">审核已通过</div>
                      <!-- <div class="passbtn">转发</div> -->
                      <button open-type="share">转发</button>
                 </div>
                 <!-- 审核中 -->
                 <div class="inReview" v-if="inReview">
                     审核中
                 </div>
           </div>     
       </div>
    </div>
</template>

<script>
import {
    getVideoinformation,
    getvideostatus,gettotalmsg
}from '../../api/index';
import { statusCode } from "../../config/api.cfg";
import { formatTime } from "../../utils";
import { mapGetters } from "vuex";
import store from "../../store";
export default {
    store,
    computed: {
    ...mapGetters(["userInfo"])
  },
    data () {
        return {
            videolist:[],
            pass:false,
            noPass:false,
            inReview:false,
            banReason:'',
            url:''
     
        }
    },
    methods:{
    async ongettotalmsg(){
        const res =await gettotalmsg()
        console.log(res)
      },
    },
     onShareAppMessage () {
    this.ongettotalmsg()
      return {
        title: `${this.userInfo.nickName}    邀你一起来玩`,
        path: `../index/main`,
        success:res=>{
          this.getshar()
          uni.showToast({
            title:'转发成功',
          })
        }
      }
    },
    onUnload(){
      console.log('离开'); 
      this.inReview=false
      this.pass=false
      this.noPass=false
      this.banReason=""
      this.url=""
    },
   async onLoad (options){
       console.log(options);
       
    if(options.status==1){
          const obj = await getvideostatus({videoId:options.videoid})
          console.log(obj);
          if (obj.data.code === statusCode.OK) {
             if(obj.data.data.status=="REVIEW"){
                // 审核中
                this.inReview=true
                this.banReason=obj.data.data.banReason
                this.url=obj.data.data.url
                
             }else if(obj.data.data.status=="PUBLISHED"){
                // 已通过
               this.pass=true
                this.banReason=obj.data.data.banReason
                this.url=obj.data.data.url
             }else if(obj.data.data.status=="BANNED"){
                // 未通过
                this.noPass=true
                 this.banReason=obj.data.data.banReason==null?"获取数据失败":obj.data.data.banReason;
                this.url=obj.data.data.url
             }

          }
       }
    }

}
</script>

<style lang="less" scoped>
.view{
    background: #2c273d;
    min-height: 100vh;
	height:auto;
.audit{
    padding-top: 5px;
    .product{
        video{
        display: block;
            width: 100%;
            height: 500px;
            margin: 0 auto;
        }
        .videostaus{
            width: 95%;
            height: 100px;
            margin: 5px auto;
            border: 1px solid #cccccc;
            border-radius: 5px;
            background: rgba(88, 55, 199, 0.5);
            .cause{
                width: 100%;
                height: 20px;
                text-align: left;
                font-size: 14px;
                line-height: 30px;
                padding-left: 10px;
                color: #999;
            }
            .statusbtn{
                width: 80%;
                height: 40px;
                border: 1px solid #cccccc;
                border-radius: 10px;
                overflow: hidden;
                margin: 10px auto;
                background: #f60163;
                .notvideo{
                width: 100%;
                height: 20px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                color: #ffffff
                }
                .VideoState{
                    width: 100%;
                    height: 10px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 12px;
                }
            }
        }
        .passStaus{
            width: 95%;
            height: 80px;
            margin: 10px auto;
            border: 1px solid #cccccc;
            border-radius: 5px;
            background: rgba(88, 55, 199, 0.5);
            .text{
                height:20px;
                color: #999;
                font-size: 16px;
                text-align: center;
            }
            button{
                width: 50%;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                margin:10px auto;
            }
        }
       .inReview{
            width: 95%;
            height: 80px;
            margin: 10px auto;
            border: 1px solid #cccccc;
            border-radius: 5px;
            background: rgba(88, 55, 199, 0.5);
            font-size: 20px;
            color: #ffffff;
            text-align: center;
            line-height: 80px;
       }
    }
}
}
</style>

