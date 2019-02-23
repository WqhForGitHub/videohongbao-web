<template>
<div class="view">
  <img src="http://sphbvideo.25010086.com/20190108192703.png" alt="" @click="opss">
  <div class="ins">
      <div class='img' @click="clicks?'':ops()">
          <img src="http://sphbvideo.25010086.com/20190108193950.png" alt="">
          <div class='btns'><button open-type='contact'></button></div>
          </div>
  </div>
  <div  :class="open?'hide':'kefu'">
    <img :src="kefu" alt="" class="code" @click="previewImg()">
    <p style="color:red;">微信号:{{wechat}}</p>
    <div class="btn" @click="copyboard"><button>复制添加微信好友</button></div>
  </div>
  
</div>
</template>
<script>
import { getkefu,cfgGets } from "../../api";
import { mapGetters } from 'vuex'
import store from '../../store/index'
export default {
     store,
    computed: {
      ...mapGetters(['userInfo'])
    },
    data(){
        return{
            kefu:null,
            wechat:'',
            open:true,
            clicks:true,
        }
    },
    methods:{
        btn(){
            wx.navigateTo({
                url:`/pages/shopping/main`
            });
        },
        async bgp(){

            const  res= await cfgGets("wx04669c909368ae5c");
            if(res.data.data.contentStr=="99"){
                this.clicks=false
            }
        },
        ops(){
            this.open=!this.open
        },
        opss(){
            this.open=true
        },
        async ongetkefu(){
            const res= await getkefu()
            this.kefu=res.data.data.url
             let str = this.kefu
            let strs=str.slice(str.lastIndexOf('/')+1,str.lastIndexOf('.'))
            this.wechat=strs
        },
        previewImg(url){
            wx.previewImage({
                current:this.kefu,
                urls:[this.kefu]
            })
        },
        copyboard() {
            wx.setClipboardData({
                data:this.wechat,
                success:(res)=> {
                wx.showToast({title:'复制成功'})
                }
            })
        },
    },
    onLoad(){
        this.bgp()
        this.ongetkefu()
        this.open=true
    }
}
</script>
<style lang="less" scoped>
.view{
    width: 100%;
    height: 100vh;
    .hide{
        display: none;
    }
    img{
        width: 100%;
        height: 100%;
    }
    // .btns{
    //     position:absolute;
    //     right: 0;
    //     top:0;
        
    //     button{
    //     width: 50px;
    //     height:50px;
    //     }
    // }
    .ins{
        position: absolute;
        bottom: 0px;
        width: 100%;
        .img{
            width: 140px;
            height: 150px;
            margin: -50px  auto 0 auto;
            position: absolute;
            bottom: 50px;
            left: 50%;
            margin-left: -70px;
            img{
                width: 100%;
                height: 100%;
            }
            .btns{
            button{
                width:40px;
                height:40px;
                // top:0;
                position: absolute;
                bottom: 0;
                right: 5px;
                margin:0 auto;
                // background: #c70027;
                border:1px solid #fef200;
                background: url('http://sphbvideo.25010086.com/20190108194955.png');
                background-size: 100% 100%;
                // position: absolute;
                // right: 60px;
            }
        }
        }
        
        
    }
    .kefu{
        width: 150px;
        height: 180px;
        bottom: 50%;
        left:50%;
        margin-top: -90px;
        position: absolute;
        margin-left: -75px;
        background: #ddd;
        border-radius: 8px;
    }
    p{
        font-size: 13px;
        color:#fff;
        text-align: center;
    }
    .code{
        width: 120px;
        height: 120px;
        margin:10px 0 0 15px;
        
    }
    .btn{
        width:100%;
        height: 30px;
        margin: 10px auto;
        button{
            background:red;
            color:#fff;
            font-size: 12px;
        }
    }
}
</style>



