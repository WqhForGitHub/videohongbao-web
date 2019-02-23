<template>
    <div class="view">
    <div class="box" v-for='(item,i) in shopping' :key="i">
      <div class="chex">
        <checkbox-group class="checkbox" v-on:change="change1(i)">
            <checkbox value="123" class="cb" v-model="value" :checked="item.checked" :disabled="item.bancheckbox" />
        </checkbox-group>
      </div>
      <div class="count">
        <div class="img">
          <img :src="item.pictUrl" alt="" mode='aspectFill'>
        </div>
        <div class="count-box">
          <p>{{item.title}}</p>
          <div class="pirce">
            <span class="quan">券后价</span>
            <span style="color:red;">￥{{item.zkFinalPrice}}</span>
            <span class="OriginalPrice">原价: ￥{{item.reservePrice}}</span>
          </div>
          <div class="btn-group">
            <p>月销量:{{item.volume}}</p>
            <p>佣金:{{(item.tkRate)*0.5}}%</p>
            <button @click="btn(i)">选择</button>
          </div>
        </div>
      </div>
    </div>
    <div class="Selectedgoods">
      <div class="Selectedgoodsitem"><span :style="selecteditem.length==6?'color:red':'color:#fff'">已选中{{selecteditem.length}}件商品(最多选6件商品)</span></div>
      <button  class="save" @click="saveselecteditem"><span>保存</span></button>
    </div>
  </div>
</template>
<script>
 import {gettaokeshoplist,getAlipay,getshopping} from '../../api'
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
            value:'',
            page:0,
            heightst:0,
            shopping:null,
            loadnum: 1,
            totalpage:null,
            favaid:null,
            count:false,
            additem:[], //追加的数组
            selecteditem:[], //已经选中数组
        }
    },
       
    methods :{
      async ongetshopping(page,size){
          const res= await getshopping({
            page:this.page,
            size:20,
        })
        this.totalpage=res.data.data.totalPages
        res.data.data.content.forEach((item, index) => {
              item.checked = false;
              item.bancheckbox = false;
            });
         if (this.loadnum == 1) {
              this.shopping = res.data.data.content;
              console.log(this.shopping);
            } else {
              this.additem = res.data.data.content;
              if(this.shopping.length <res.data.data.totalElements){
                this.shopping.push(...this.additem);
              }
            }
      },
      saveselecteditem() {
        uni.setStorage({key:"shopobj",data:this.selecteditem})
          uni.navigateBack({ delta: 1})
        this.clearshoppingArray();
          // console.log(this.selecteditem);
            },
      clearshoppingArray() {
          this.shopping.forEach((item, index) => {
                if(item.checked === true) {
                  item.checked = false
                }
          });
          this.selecteditem.splice(0,this.selecteditem.length);
      },
      // 监听checkbox的变化
      change1(i) {
        this.shopping.forEach((item, index) => {
            if(index == i) {
              // 已经选中项的的时候进行删除
                if(item.checked == true) {
                  item.checked = false;
                  this.selecteditem.splice(this.selecteditem.indexOf(item), 1);
                  console.log("已经删除")
                  console.log(this.selecteditem)
                } else {
                  item.checked = true;
                  this.selecteditem.push(item);
                }
            }    
        });
        // 没有选够6件商品的时候其他解绑
        if(this.selecteditem.length <= 5) {
            this.shopping.forEach((item, index) => {
            item.bancheckbox = false
          });
        } else {
        // 多于6件的时候未选中的其他checkbox禁用
          this.shopping.forEach((item, index) => {
            if(item.checked === false) {
                item.bancheckbox = true
            }
          });
          
          uni.showToast({  
            title: '只能选6件商品',  
            icon: 'success',  
          })  
        }
      },
      // 点击选择按钮
      btn(i){
        this.heightst=(this.selecteditem.length+1)*50

        console.log(i)
        console.log(this.shopping[i]);
        this.shopping.forEach((item, index) => {
            if(index == i) {
              if(item.checked == false) {
                // 选择的商品不能大于6件
                if(this.selecteditem.length <= 5 ) {
                    item.checked = true;
                this.selecteditem.push(item);
                console.log(this.selecteditem);
                }
              }
            }
        });

          // 没有选够6件商品的时候其他解绑
          if(this.selecteditem.length <= 5) {
              this.shopping.forEach((item, index) => {
              item.bancheckbox = false
            });
          } else {
          // 多于6件的时候未选中的其他checkbox禁用
            this.shopping.forEach((item, index) => {
              if(item.checked === false) {
                  item.bancheckbox = true
              }
            });
            uni.showToast({  
              title: '只能选6件商品',  
              icon: 'success',  
              duration: 3000 
          })  
        }
      },
      },
      onPullDownRefresh(){
            let page=0;
            this.ongetshopping(this.page)
            setTimeout(() => {
                   uni.showToast({
                 title: "刷新成功",
                 success(){
                    uni.stopPullDownRefresh()
                 }
                });
            }, 1500);
              
          
        },
      onReachBottom() {
      this.page++;
      this.loadnum++;
      if(this.page>=this.totalpage){
        uni.showToast({title:'没有更多数据了'})
        return

      }
       this.ongetshopping(this.page)
      // tongetshopping(this.pa)
      },
     
      onShow(){
        this.page=0;
        this.ongetshopping(this.page)
      },
        mounted () {
        // this.shop(this.page)
      }
  }
</script>
<style lang='less'>
.totalcount{
  height: 100%;
  width: 100%;
  border:1px solid blue;
  display: flex;
  flex-wrap: wrap;
  .delect{
    width: 100%;
    height: 20px;
    border:1px solid green;
    display: flex;
    justify-content: space-between;
    p{
      color:#fff;
    }
    button{
      width: 60px;
      height: 20px;
      font-size: 10px;
      text-align: center;
      background: red;
      line-height: 20px;
    }

  }
}

.chex{
  width:9vw;
  position: relative;
}
.checkbox{
  /*border:1px solid blue;*/
  width: 15px;
  height: 15px;
  position: absolute;
  margin-left:9px;
  top:50%;
  left: 0;
}
.cb{
  width:7vw;
  position: absolute;
  margin:0;
  padding:0;
  left: 0;
  transform: scale(0.6,0.6);
  margin-left:-2vw;
  margin-top:-2vh;
  position:absolute;
}
.box{
  width: 95%;
  height: 100px;
  margin:0px auto;
  display: flex;
  border-radius: 10px;
  border:1px solid #ddd;
  justify-content: space-between;
}

.count{
  display: flex;
  justify-content: space-between;
  position:absolute;
  margin-left:35px;
  .img{
    width:78px;
    height:78px;
    margin-top:2vh;
    position:absolute;
    img{
      width: 100%;
      height: 100%;
    }
  }
  span{
    margin:20px 15px;
  }
}
.btn-group{
  padding:0 20px;
  display: flex;
  margin-top:10px;
  margin-left:-5vw;
  justify-content: space-between;
  button{
    margin:auto 0;
    margin-top:1vh;
    width: 60px;
    height: 20px;
    background: red;
    color:#fff;
    font-size: 10px;
    line-height: 20px;
    border-radius: 25px;
  }
}
.count-box{
  width:62vw;
  margin-left:80px;
  font-size: 12px;
  .pirce{
    width:70vw;
    margin-top:10px;
    margin-left:0.2vw;
    font-size: 10px;
  .quan{
    width:60vw;
    border:1px solid red;
    border-radius: 5px;
    letter-spacing:5px;
    text-align: center;
    font-size: 10px;
    margin-left:-0.5vw;
    padding:2px;
    
  }
  .OriginalPrice {
   
      width:50vw;
      margin-top:-0.01vh;
      position:absolute;
    }
  }
  }
  p{
    font-size:12px;
    max-height:16px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin: 7px 0 0 0;
  }
.Selectedgoods {
  width:100%;
  height: 40px;
  background-color: #999;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  position:fixed;
  .Selectedgoodsitem {
    color:black;
    font-size:14px;
    margin:auto 0;
    padding: 0 10px;
    height: 100%;
    text-align: center;
    span{
      font-size: 16px;
      line-height: 40px;
    }
  }
  .save {
    width:70px;
    height: 25px;
    margin:auto 10px;
    line-height: 25px;
    background: #67c23a;
    color:#FFf;
  }
}
/* .chex{
  
} */
/* .checkbox{
  transform: translate(-50%, -50%) scale(1);
} */
  /* .cb{
  transform: scale(0.6,0.6);
  border:1px solid red;
} */
</style>
