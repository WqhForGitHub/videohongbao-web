<template>
       <div class="view">
      <!-- 视屏列表 -->
    <div class="tabulate" >
      <div class="box" v-for="(item,index) in videolist" :key="index" @click="particulars(item.video.id)">
        <img :src="item.video.url+'?vframe/jpg/offset/1'" >
        <div class="count">
          <div class="count-box">
            <p>{{item.video.title}}</p>
            <div>
                 {{item.createTime}}
            </div>
          </div>
          <div class="btn">
            <div>
              <p v-if="item.video.status=='PUBLISHED'" class="radius" style="border: 2px solid #6a9955;">已通过</p>
               <p v-if="item.video.status=='REVIEW'" class="radius" style="border: 2px solid #c586c0;">审核中</p>
               <p v-if="item.video.status=='BANNED'" class="radius" style="border: 2px solid red;">未通过</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提示信息 -->
       <div v-if="videolist.length==0" class="not">没有视频</div>
  </div>

</template>

<script>
import {getVideoinformation,getvideostatus}from '../../api/index';
import { statusCode } from "../../config/api.cfg";
import { formatTime } from "../../utils";
export default {
    data () {
        return {
            videolist:[],
        }
    },
    methods:{
       particulars(id){
        uni.navigateTo({
            url:`../details-video/main?videoid=${id}&status=1`
        })

       }
    },
   async onLoad (options){
       console.log(options);
       if(options.status==0){
        const res=  await getVideoinformation()
            console.log(res);
           if (res.data.code === statusCode.OK) {
                 this.videolist=res.data.data
               this.videolist.forEach(ele => {    
                ele.createTime=formatTime(new Date(ele.video.createTime))
               });
          }
        // wx.setNavigationBarTitle({
        //  title: '当前页面'
        //  })
       }
    }

}
</script>
<style lang="less" scoped>
.view{
    background: #ffffff;
    height: 100vh;
  .not{
      height: 100%;
      text-align: center;
      line-height: 100vh;
  }
  .tabulate{
    padding:10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
   .box{
    width: 48%;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 10px;
    img{
        width:100%;
        height: 150px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
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
               line-height: 40px;
            }
        }
    }
}
}
}
</style>


