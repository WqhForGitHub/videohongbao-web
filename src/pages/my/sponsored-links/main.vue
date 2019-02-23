
<template>
  <div class="view">
     <!--NEXT-->
     <div class='bosx'>
       <div></div>
       <div class='next-box'>
          <div class="buttongroups" >
            <p class="NEXTText" @click="send">NEXT</p>
          </div>
          <div class="zhuanfagroups" style="z-index:5">
            <button class="zhuanfabutton" open-type="share">转发推广</button>
          </div>
        </div>
     </div>
     
   
    <div class="video">
      <video :src='userlistz.url' id="video-id" autoplay objectFit='cover' :custom-cache='false'></video>
    </div>
    <div class="count">
      <img :src="userlistz.author.avatarUrl" alt="" mode="aspectFill"> 
       <span class="video-description">{{ userlistz.remark }}</span>
    </div>
    <div class="pcitem">
      <div  class="img-item" v-for="(picItem, picIndex) in userlistz.covers" :key="picIndex">
          <img :src="picItem" class="img-view" mode='aspectFill' @click="onPreviewImage(userlistz.covers,picItem)" />
      </div>       
    </div> 
  </div>
</template>

<script>
import {
  reviewVideoList,
  reviewVideoAccept,
  videoredpackGrab,
  getMyReviewStats,
  videosend,
  gettotalmsg,
  getvideonum
} from "../../../api";
import { statusCode } from "../../../config/api.cfg";
import { mapGetters } from "vuex";
import store from "../../../store/index";

export default {
  name: "tutorialDetail",
  store,
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      tabData: [],
      data: {},
      url: null,
      userlistz:null,
      num: 4,
      params: {
        page: 0,
        size: 1
      },
      text: "",
      videoids: 0,
      videourltext: "",
      userinfoid:0,
      jsontext:{}
    };
  },
  methods: {
    onPreviewImage(picList, item) {
      uni.previewImage({
        urls: picList,
        current: item
      });
    },
    send() {
      this.params.page++
      console.log(this.params.page)
      this.loadData(this.params.page,this.params.size)
    },
    async ongettotalmsg(){
        const res =await gettotalmsg()
        console.log(res)
      },
    async loadData(page,size) {
      const res = await getvideonum({page,size});
      if (res.data.code === statusCode.OK) {
        console.log(res.data.data);
        this.userlistz=res.data.data.content[0];
        if(res.data.data.content.length==0){
          uni.showToast({title:'没有更多数据了'})
          return
        }
        console.log(this.userlistz)
      }
    },
  },
  onLoad(){
       this.params.page=0;
  },
  onShow() {
    uni.setNavigationBarTitle({
      title: "推广链接"
    });
    this.loadData(this.params.page,this.params.size); 
  },
  onShareAppMessage(res) {
    let user={
      userid:this.userlistz.author.id,
      videoid:this.userlistz.id
    }
    this.ongettotalmsg()
    // if (res.from === "button") {
      return {  
        title: `${this.userInfo.nickName}  邀您来一起抢红包`,
        path: `../../login/main?id=${this.userInfo.id}&user=${JSON.stringify(user)}`,
        imageUrl: `${this.userlistz.url}?vframe/jpg/offset/1`,
        success:res=>{
          uni.showToast({title:'推广成功',icon:'success'})
          this.params.page++
          this.loadData(this.params.page,this.params.size);
        }
      };
  }
};
</script>
<style lang="less" scoped>
//@import "../../common/style/variable";
.view {
  width: 100%;
  min-height: 120vh;
  height: auto;
  background:#2c273d;
  position: absolute;
	font-size:14px;
  border-radius: 5px;
}
.video {
  width: 100%;
  height: 500px;
  //margin: 0px auto;
  video {
    width: 100%;
    height: 100%;
  }
}
.bosx{
  position: fixed;
  bottom: 20px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  z-index: 999999;

}
.next-box{
  display: flex;
  justify-content: space-between;
  .buttongroups{
    width:90px;
    height: 30px;
    margin:0 20px;
    background: #9C0CF7;
    color: #F5805C;
    border-radius: 25px;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
  }
  .zhuanfagroups{
    button{
    width:90px;
    height: 30px;
    background: #9C0CF7;
    color: #F5805C;
    border-radius: 25px;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    }
    
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
  min-height: 40px;
  margin: 1% auto;
  border: 1px solid #a196c6;
  border-radius: 5px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    vertical-align: middle;
  }
  span {
    color: #fff;
    margin-left: 5px;
    font-size: 16px;
  }
}
.pcitem {
  width: 98%;
  min-height: 200px;
  height: auto;
	margin-left:1%;
  position: relative;
  .img-item {
    width: 111px;
    margin-left: 8px;
    margin-top: 10px;
    min-height: 130px;
    height: auto;
    float: left;
    img {
      border-radius: 7px;
      width: 100%;
      height: 128px;
    }
  }
}
@media screen and (min-width:768px) and (max-width:1020px){
	.pcitem {
	  width: 98%;
	  min-height: 200px;
	  height: auto;
		margin-left:1%;
	  position: relative;
	  .img-item {
	    width: 115px;
	    margin-left: 8px;
	    margin-top: 10px;
	    min-height: 130px;
	    height: auto;
	    float: left;
	    img {
	      border-radius: 7px;
	      width: 100%;
	      height: 133px;
	    }
	  }
	}
}
@media screen and (min-width:1024px) {
	.pcitem {
	  width: 98%;
	  min-height: 200px;
	  height: auto;
		margin-left:1%;
	  position: relative;
	  .img-item {
	    width: 110px;
	    margin-left: 13px;
	    margin-top: 10px;
	    min-height: 130px;
	    height: auto;
	    float: left;
	    img {
	      border-radius: 7px;
	      width: 100%;
	      height: 133px;
	    }
	  }
	}
}
.footer {
  position: fixed;
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
}

@media only screen and (min-width: 768px) and(max-width:1024px) {
  .zhuanfagroup {
    display: flex;
    justify-content: space-between;
    margin-top: 395px;
    position: fixed;
    .zhuanfabutton {
      width: 80px;
      height: 30px;
      position: fixed;
      margin-left: 200px;
      margin-top: 45px;
      margin-bottom: 2px;
      background-color: #9a0cf4;
      border-radius: 10px;
      text-align: center;
    }
  }
}
</style>

