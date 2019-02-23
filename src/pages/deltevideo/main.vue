<template>
  <div class='box'>
    <div class="detale-video">
      <div class="title">
        <h3>编辑照片</h3>
        <div><button @click="fish">完 成</button></div>
      </div>
    </div>
    <div class="pic-box" :style="{'height':imageheight+'px'}">
      <!-- 左侧 -->
      <scroll-view scroll-y class="left">
        <div class='left-box' v-for="(item,i) in imgarr" :key="i" @click="openimg(item,i)" :style="i==index?'border:3px solid #FF3666;':''">
          <img :src="item" alt="" mode='aspectFill' class='img'>
          <p>{{i+1}}</p>
          <img src="/static/video2.png" alt="" :class="i===indexu?'shou':'hide'">
        </div>
      </scroll-view>
      <!-- 右侧 -->
      <div class="right">
        <div class='img'>
          <img :src="img" alt="" mode='aspectFit' class='parse'>
          <img src="/static/play.png" alt="" :class="play?'play':'hide'" @click="plays">
          </div>
				<!--前一张和后一张-->
        <div class="jianji">
          <div class='houtui' @click="houtui">
            <img src="/static/qianjin.png" alt="">
          </div>
          <div class='qianjin' @click="qianjin">
            <img src="/static/houtui.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class='buttom'>
      <div @click="up">
        <img src="/static/shang.png" alt="">
        <p>上移</p>
      </div>
      <div @click="down">
        <img src="/static/xia.png" alt="">
        <p>下移</p>
      </div>
        <!-- <button @click="up">上移</button>
        <button @click="down">下移</button> -->
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{ 
     imageheight: (uni.getSystemInfoSync().windowHeight)-55,
     img:null,
     index:null,
     indexu:null,
     imgarr:[],
     play:false,
    }
  },
  methods: {
    openimg(url,index){
      this.img=url
      this.index=index
      if(this.img.indexOf('vframe/jpg/offset/1')!=-1){this.play=true}else{this.play=false}
    },
    houtui(){
      if(this.index>0){
        this.index--
        this.img=this.imgarr[this.index]
        if(this.img.indexOf('vframe/jpg/offset/1')!=-1){this.play=true}else{this.play=false}

        console.log(123)
      }else{uni.showToast({title:'已经是第一张了',icon:'none'});}
    },
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2,1,arr[index1])[0]
      return arr;
    },
    up(){
      if(this.index==0){
        uni.showToast({title:'已经是第一张了',icon:'none'})
        return
      }
       this.swapItems(this.imgarr, this.index, this.index - 1);
       this.index--;
      // console.log(newArray)
    },
    down(){
      if(this.index==this.imgarr.length-1){
        uni.showToast({title:'已经是最后一张了',icon:'none'})
        return
      }
      this.swapItems(this.imgarr, this.index, this.index + 1);
      this.index++;
    },
    qianjin(){
      if(this.index<this.imgarr.length-1){
        this.index++
        this.img=this.imgarr[this.index]
        if(this.img.indexOf('vframe/jpg/offset/1')!=-1){this.play=true}else{this.play=false}
      }else{uni.showToast({title:'是最后一张了',icon:'none'});}
    },
    fish() {
      if(this.imgarr.length!==0){
        uni.navigateTo({url:`../upload-pic/main?pic=0&open=true`})
      }else{
          uni.navigateTo({url:`../upload-pic/main?pic=0&open=false`})
      }
      uni.setStorageSync('picurl', this.imgarr) 
    },
    plays(){
      console.log(this.img)
        uni.navigateTo({url:`../hairhongbao/main?url=${this.img}`})
    }
  },
  onShow(){
    let Picture= uni.getStorageSync('picurl')
    console.log(Picture)
    this.imgarr=Picture
    this.img=this.imgarr[this.index]
     if(this.img.indexOf('vframe/jpg/offset/1')!=-1){
       console.log(123)
       this.play=true;
     }else{
       this.play=false;
       console.log(456)
     }
    for(var key in Picture){
        if(Picture[key].indexOf('vframe/jpg/offset/1')!=-1){
          this.indexu=parseInt(key) 
          return   
        }else{this.indexu=null}
     }
  },
  onLoad(res){
    this.index=parseInt(res.index)
  }
}
</script>
<style lang='less'>
.hide{
  display:none;
}
.box{
  width:100%;
  height: 100vh;
  overflow: hidden;
	font-size:16px;
  background: black;
}
 .detale-video{
   width: 95%;
   height: 100%;
   margin:10px auto;
   height: 40px;
   .title{
     color:#fff;
     display: flex;
     justify-content: space-between;
     div{
       margin:5px 0;
     }
     h3{
       line-height: 40px;
     }
     button{
       width: 60px;
       height: 30px;
       font-size: 12px;
       background: #FF3666;
       color: #fff;
			 text-align: center;
       border-radius: 25px;
			 line-height: 26px;
     }
   }
 }
 .pic-box{
   display: flex;
   width: 95%;
   margin:0 auto;
   justify-content: space-between;
   .left{
     width:86px;
     .left-box{
       width: 80px;
       height: 80px;
       margin:5px auto;
       position: relative;
      .shou{
          position: absolute;
          width: 17px;
          height: 15px;
          border-radius:0;
          right:0;
          bottom: 0;
        }
       p{
         width: 15px;
         height: 15px;
         color:#fff;
         background: #5C5C5C;
         position: absolute;
         left: 5px;
         top:5px;
         line-height: 15px;
         font-size: 10px;
         text-align: center;
         border-radius: 25px;
       }
       .img{
         width: 100%;
         height: 100%;
       }
     }
   }
   .right{
     width: 78%;
     height: 400px;
     .img{
       width: 80%;
       margin:0 auto;
       height: 100%;
       position: relative;
       .parse{
         width: 100%;
         height: 100%;
       }
       .play{
         position: absolute;
         width: 40px;
         height: 40px;
         top:50%;
         left: 50%;
         margin-top:-20px;
         margin-left: -20px;
         z-index: 99;
       }
     }
     .jianji {
       margin:40px auto;
       width: 100%;
       display: flex;
       justify-content: space-between;
       .houtui{
				 width:105px;
				 height:32px;
           img{
            width: 100%;
            height: 100%;
           }
         }
        div{
         padding: 0 10px;
         height: 30px;
         width: 80px;
         border-radius: 25px;
       }
       .qianjin{
				 width:105px;
				 height:33px;
         img{
           width: 100%;
           height: 100%;
         }
       }
     }
   }
 }
 .buttom{
   position: fixed;
   bottom:0;
   width: 100%;
   display: flex;
   justify-content: space-around;
   p{
     color:#fff;
     font-size: 12px;
   }
   img{
     width: 25px;
     height: 25px;
   }
 }
</style>