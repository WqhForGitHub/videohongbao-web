<template>
  <div class="count"> 
    <div class="header">
      <div>
        <span style="font-size:24px; color:black;">标题</span><span>{{form.number}}/70</span>
      </div>
      <div class="btn"><button @click="btn">完成</button></div> 
    </div>
    <textarea maxlength="70" v-model="form.remark" placeholder="输入广告标题"  class="text" @input="parst"/>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        form:{
          remark:'',
          number:0,
        }
      }
    },
    methods:{
      parst(){
        this.form.number=this.form.remark.length
      },
      btn(){
        if(this.form.remark==''){
          var that =this
          uni.showModal({
          title: '确定要离开吗？',
          content: '您还没有输入标题！',
          success (res) {
           if(res.confirm){
              uni.reLaunch({url:`../upload-pic/main?remark=${that.form.remark}&obj=1&flag=no`})  
             return
           }
          }
        })
        } else {
        uni.reLaunch({url:`../upload-pic/main?remark=${this.form.remark}&obj=1&flag=yes`}) 
        this.form.remark=''       
        }
      },
    }
  }
</script>
<style lang="less">
  .count{
    width: 95%;
    height: 100%;
    margin:0 auto;
    .header{
      width: 100%;
      height: 30px;
      display: flex;
      margin:10px auto;
      justify-content: space-between;
      span{
        font-size: 16px;
        color:#9D9D9D;
        margin:0 7px;
      }
     .btn{
       margin:auto 0;
     }
      button{
        width: 80px;
        height: 30px;
        font-size: 14px;
        border-radius: 25px;
        background: #F9355C;
        color:#fff;
        line-height: 30px;
      }
    }
    .text{
      width:100%;
      margin:20px auto;
      height: 200px;
      padding: 10px;
      background:#F4F4F4;
      font-size: 12px;
      border-radius: 8px;
    }
  }
</style>

