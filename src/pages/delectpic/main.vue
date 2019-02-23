<template>
  <div class="delect-box">
    <div class="title-box">
      <div class="delect-title">
        <h3>移除照片</h3>
        <p @click="filsh">完成</p>
      </div>
      <div class="delect-titles">
        <span>{{ picurl.length}}/9</span>
        <span @click="quanbu">清空重做</span>
      </div>
       <checkbox-group  @change="onChange" :value="result" class="Upload-count">
          <div class='pic-box' v-for="(item,i) in picurl" :key='i'>
            <img :src="item" alt="" class="img" mode='aspectFill'>
            <img src="/static/video2.png" alt="" :class="i===index?'shou':'hide'">
           <checkbox :value="i" class='ceck-box' />
          </div>
        </checkbox-group>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        picurl:[],
        index:null,
        inset:null,
        open:false,
        checked:false,
        result:[],
      }
    },
    methods:{
      onChange(e){
        this.result=e.detail.value
         console.log(this.result)
      },
      desc(i,e){
        console.log(i)
        if(i==this.index){
          this.index=null
        }
        this.picurl.splice(i,1)
        console.log(this.picurl)
      },
			sortNumber(a,b) {
				return b-a
			},
      filsh() {
				// 数组倒转，从后往前删除,数组下标准确
				console.log(this.result.sort(this.sortNumber));
        for(var key of this.result){
          this.picurl.splice(key,1)
					console.log(key)
        }
        console.log(this.picurl)
        this.result=[];
      // console.log(this.picurl.length)
       uni.setStorageSync('picurl', this.picurl)
      if (this.picurl.length!==0) {
        uni.reLaunch({url:`../upload-pic/main?pic=0&open=true`})
      } else {
        uni.reLaunch({url:`../upload-pic/main?pic=0&open=false`})
      }
      },
      quanbu(){
        var that =this
        uni.showModal({
          title:'提示',
          content:'确定全部清空吗?',
          success(res){
            if(res.confirm){
              uni.setStorageSync('picurl',[])
              that.picurl=[];
              uni.reLaunch({url:`../upload-pic/main?pic=1`})
            }
          }
        })
      }
    },
    onShow(res){
      let Picture= uni.getStorageSync('picurl')
      this.picurl=Picture
      for(var key in Picture){
        if(Picture[key].indexOf('vframe/jpg/offset/1')!=-1){
          this.index=parseInt(key) 
          return   
        }else{this.video=false;this.index=null}
     }
    }
  }
</script>
<style lang="less">
// .pic-boxs{
//   width:21.9%;
//   height:80px;
//   margin:10px 5px; 
//   border-radius: 5px;
//   background: #fff;
//   border:1px solid #ddd;
//   position: relative;
//   img{
//     width: 100%;
//     height: 100%;
//   }
// }
.hide{
  display: none;
}
.delect-box{
  .title-box{
    border:1px solid #ddd;
    height: 40px;
  }
  .delect-title{
    width: 95%;
    margin:0px auto;
    display: flex;
    justify-content: space-between;
    h3{font-size: 24px;line-height: 40px;}
    p{font-size: 16px;line-height: 40px; color: #E83864;}
  }
   .delect-titles{
    width: 95%;
    margin:10px auto;
    display: flex;
    justify-content: space-between;
    span{font-size: 12px;color:#B0B0B1}
  }
  .Upload-count{
      display:flex;
      flex-wrap: wrap;
      box-sizing: border-box;
			z-index:10;
     .pic-box{
        width:21.9%;
        height:80px;
        margin:10px 5px; 
        border-radius: 5px;
        background: #fff;
        border:1px solid #ddd;
        position: relative;
        .ceck-box{
          top:-2px;
          right: 2px;
					z-index:100;
          transform: scale(0.9);
          position: absolute;
        }
        .img{
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
        .checkbox{
          border-radius: 25px;
        }
      }
    }
}
</style>
