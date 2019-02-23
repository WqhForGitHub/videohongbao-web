<template>
  <div class="view">
    <div class="img">
      <img :src="shopobj.pic" alt="" mode='aspectFit'>
    </div>
    <div class="kouling">
      <div class="ling">
        <p>复制框没整段文字，打开【手淘APP】即可领券购买。</p>
      </div>
      <div class="ine"><button @click="copyboard">一键复制</button></div>
    </div>
    <div class="scroll">
  <scroll-view :scroll-y='true' :style="{'height':heightst}" class="src">
             <div class="products" >
              <div class="product" v-for="(item,index) in productarr" :key="index" @click="toshow(item.pictUrl,item.couponClickUrl,item.title,item.clickUrl)">
                <div class="pic">
                  <img :src="item.pictUrl" alt="">
                </div>
                 <p class="text">{{item.title}}</p>
                 <div class="discount">
                   <div class="left">劵后<span style="color:red">￥{{item.zkFinalPrice}}元</span></div>
                   <div class="right"> <div class="button" >领取</div></div>
                 </div>
              </div>
          </div>   
  </scroll-view>
    </div>
  </div>
</template>

<script>
import {gettaokeshoplist,getAlipay,getshopping,taokouling} from '../../api'
import { statusCode } from "../../config/api.cfg";
export default {
  data() {
    return {
      shopobj: {},
      link: null,
      open:true, 
      heightst:null,
      productarr:0,
      kouling:true,
    };
  },
  methods: {
    async ongettaokelist(){
          const res= await gettaokeshoplist({
            fields:'favorites_title,favorites_id,type',
        })
        // console.log(123)
        if (res.data.code === statusCode.OK){
          console.log(res.data.data)
          for(var key of res.data.data){
          this.favaid=key.favoritesId
           this.ongetshopping(key.favoritesId)
        }
        }
        
       
      },
      async ongetshopping(favoritesid,page,size){
          const res= await getshopping({
            adzoneid:69673100292,
            favoritesid,
            page:0,
            size:200,
            fields:'coupon_click_url,title,pict_url,reserve_price,zk_final_price,tk_rate,volume,click_url'

        })
        this.productarr=res.data.data.content
      },
      async ongettaokouling(pic,link,title){
        // console.log(link)
        if(link===null){
          this.kouling=false;
           uni.showToast({
            title: '优惠券已失效',
          })
        }
        const res= await taokouling({
          url:link,test:title,logo:pic
        })
        this.link=res.data.data
        this.shopobj.pic=pic
        // this.link=obj.data.data
      },
      toshow(pic,link,title,taoke){
        if(link==null){
          link=taoke
        }
        this.ongettaokouling(pic,link,title)

    },
    openerr(){
      this.open=false
    },
     copyboard() {
      uni.setClipboardData({
        data:this.link,
        success:(res)=> {
        }
      })
    },
    close(){
      this.open=true
    }
  },
    onShow(){
    this.link = uni.getStorageSync('shoplink')
    this.taoke = uni.getStorageSync('taoke')
    if(this.link==''){
      this.link=this.taoke
      console.log()
    }
    let height=0;
    this.ongettaokouling(this.pic,this.link,this.title)
      uni.getSystemInfo({
      success:(obj)=>{
        console.log(obj.windowHeight);
        
        height=(obj.windowHeight)-390
        console.log(height);
        this.heightst=height+'px'
      }
    })
    this.ongettaokelist()
  },
  onLoad(res) {
    this.shopobj=JSON.parse(res.link)
    this.title=this.shopobj.title
    this.pic=this.shopobj.pic
  }
};
</script>

<style lang="less" scoped>
.view {
 background: #2c273d;
 height: 100vh;
  display:  flex;
  flex-direction: column;
  .img {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .kouling{
    font-size: 12px;
    display: flex;
    height: 40px;
    justify-content: space-between;
    width: 100%;
    margin:5px auto;
    text-align: left;
    color:#fff;
    border:1px dashed red;
    .ine{
      padding: 4.5px 10px ;
      width: 40%;
      height: 100%;
      box-sizing: border-box;
    }
    .ling{
      margin:auto 0;
      p{
        padding: 0 10px;
        border-right: 1px dashed #fff;
      }
    }
    button{
      height: 100%;
      font-size: 12px;
      height: 30px;
      margin:auto 0;
      line-height: 30px;
      border-radius: 25px;
      background: red;
      color: #fff;
    }
  }
  .scroll{
   flex: 1;
   white-space: nowrap;
   .src{
     .products{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .product{
      width: 30%;
      height: 150px;
      border-radius: 5px;
      margin: 5px;
      box-sizing: border-box;
      overflow: hidden;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      position: relative;
      .pic{
        width: 100%;
        height: 60%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        font-size: 12px;
        white-space:normal;
        // text-align: center;
        overflow: hidden;
        height: 30px;
        padding: 2px;
      }
      .discount{
         display: flex;
         height:25px;
         width:100%;
         position: absolute;
         bottom: 5px;
         .left{
           flex: 2;
           font-size: 10px;
           display: flex;
           align-items: center;
         }
         .right{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          .button{
            width: 90%;
            height: 60%;
            background-color: gold;
            font-size: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }
         }
      }
  }
  }
   }

  }
}
</style>
