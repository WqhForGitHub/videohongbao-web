<template>
    <div class='renzheng-box'>
        <div class='header'>
            <p>请务必填写真实信息,虚假信息将导致积分兑换失败!</p>
        </div>
        <div class="msg">
            <div><span style="letter-spacing:10px;">姓名:</span><input type="text" placeholder="请输入姓名" v-model="name"></div>
            <div><span>身份证:</span><input type="text" placeholder="请输入身份证号码" maxlength="18" v-model.lazy="num" ></div>
            <div><span>银行卡:</span><input type="text" placeholder="请输入银行卡号码" maxlength="19" v-model.lazy="mark" ></div>
            <!-- <div><span>银行卡:</span><input type="text" placeholder="请输入银行卡" maxlength="18" v-model.lazy="num" ></div></div> -->
            <p style="color:red;font-size:12px;text-align:center; "><span :class="checks?'hide':''">身份证格式不对!</span><span :class="marks?'hide':''">银行卡格式不对!</span></p>
        </div>
        <div class="border"></div>
        <div>
            <div class="msg">
            <p>绑定微信与手机</p>
            
            <div><span >微信号:</span><input type="text" placeholder="请输入微信号码" v-model="wechat"></div>
            <div><span style="letter-spacing:10px;">手机:</span><input type="text" placeholder="请输入手机号码" maxlength="18" v-model.lazy="phone" ></div>
            <p style="color:red;font-size:12px;text-align:center; " :class="iphone?'hide':''">手机号格式不对!</p>
        </div>
        </div>
        <div class="btn"><button @click="check">保存</button></div>
    </div>
</template>
<script>
import {renzheng} from "../../../api";
import { statusCode } from '../../../config/api.cfg'

export default{
    data(){
        return{
            name:'',
            num:'',
            mark:'',
            phone:'',
            wechat:'',
            iphone:true,
            checks:true,
            marks:true,
        }
    },
    methods: {
        check(){
             let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
             let pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
             let isIDCard1=/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
             if(this.name==''){
                 uni.showToast({title:'姓名不能为空',icon:'none'})
                 return
             }
              if(reg.test(this.num) === false){
                 this.checks=false;
                 return
              }else{this.checks=true}
             if(pattern.test(this.mark) ===false){
                 this.marks=false
                 return
             }else{this.marks=true}
             if(this.wechat==''){
                 uni.showToast({title:'微信名不能为空',icon:'none'})
                 return
             }
             if(isIDCard1.test(this.phone)===false){
                 this.iphone=false;
             }else{this.iphone=true}
            this.onrenzheng()
        },
        async onrenzheng(){
            const res= await renzheng({
                CertificateIdentification:this.num,
                AuthenticationName:this.name,
                BankCard:this.mark,
                WechatNumber:this.wechat,
                PhoneNumber:this.phone,
            });
            if (res.data.code === statusCode.OK){
                console.log(res)
                uni.showToast({title:'认证成功'})
                uni.navigateBack({delta:1,})
            }
        },
    },
    onShow(){
        this.checks=true;
        this.iphone=true;
        this.marks=true;
    }
}
</script>
<style lang="less">
.hide{
    display: none;
}
.header{
    background:#FF2063;
    color: #fff;
    text-align: center;
    height: 25px;
    line-height: 25px;
    font-size: 12px; 
}
.btn{
    width: 50%;
    margin:40px auto;
    button{
        border-radius: 25px;
        background: #FF2063;
        color:#fff;
    }
}
.border{
    border:5px solid #FF2063;
    width: 96%;
    margin:10px auto;
}
.msg{
    width: 96%;
    // border:1px solid red;
   
    margin:0 auto;
    div{
        // border:1px solid blue;
        margin: 5px 0;
        padding:5px 0;
        display:flex;
        border-bottom: 1px solid #ddd;
        font-size: 16px;
    }
    span{
        width: 20%;
        letter-spacing:3px;
    }
}
</style>
