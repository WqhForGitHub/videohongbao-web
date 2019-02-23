<template>
<div class="view">
    <!-- <div class="iind">敬请期待!</div> -->
    <div class="vedio"></div>
    <div class="add-box">
        <div class="title">
            添加商品名称
        </div>
        <div class="details">
            <div class="pirce"><div>价格（元）</div><div><input type="text"></div></div>
            <div class="pirce"><div>积分（送）</div><div><input type="text"></div></div>
        </div>
    </div>
    <button class="btn" @click="btn">选择添加商品</button>
    <div class="save">保存</div>
</div>
</template>
<script>
 import { mapGetters } from 'vuex'
 import store from '../../store/index'
export default {
     store,
    computed: {
      ...mapGetters(['userInfo'])
    },
    data(){
        return{}
    },
    methods:{
        btn(){
            uni.navigateTo({
                url:`../shopping/main`
            });
        },
    }
}
</script>
<style lang="less" scoped>
.view{
    background: #2c273d;
    min-height:100vh;
    padding:15px 10px;
    .btn{
        margin:10px auto;
        border-radius: 25px;
        background: red;
        font-size: 12px;
        color:#fff;
    }
    .vedio{
            width:100%;
            background: #000;
            height:220px;
    }
    .iind{
        width: 100%;
        height: 80px;
        position: absolute;
        top:50%;
        font-size: 32px;
        color:#fff;
        text-align: center;
        margin-top:-40px;
    }
    .add-box{
        width:100%;
        background: #fff;
        height:160px;
        .title{
            text-align: center;
            font-size:15px;
            height:40px;
            width:100%;
            color:#000;
            line-height:40px;
            border-bottom:1px solid #e9e6e6;
                    }
        .details{
            height:90px;
            display: flex;
            justify-content: space-evenly;;
            .pirce{
                color:#b9b9b9;
                font-size:14px;
                display: flex;
                justify-content: center;
                padding-top:35px;
                div:nth-child(1){
                    width:40%;
                }
                div:nth-child(2){
                    width:30%;
                }
            }
            .jifen{color:#b9b9b9;font-size:14px;}
        }
    }
    input{border-bottom:1px solid #b9b9b9;color:#e89d9d;text-align: center;}
    .save{
       width:80%;
        height:86rpx;
        background:#e62319;
        border-radius:40px;
        position:absolute;
        bottom:20px;
        left:50%;
        margin-left:-40%;
        color: #fff;
        text-align: center;
        line-height: 86rpx;
        letter-spacing:23rpx;
        font-size:30rpx;
        text-indent:15px;

    }
}
</style>


