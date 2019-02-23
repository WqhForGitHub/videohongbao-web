<template>
  <div class="view">
	<div class="group">
		<div class="Tel">
			<p class="Teltext">手机号</p>
			 <input @input="getTelnum" v-model="Telnum" maxlength="220" type="number" class="Telnum"  placeholder="请输入手机号" />
	 </div>
	 <div class="Pas">
		 <p class="password">密码</p>
		  <input @input="getpassword" v-model="password" maxlength="220" type="text" class="inputpassword"  placeholder="请输入密码" />
	 </div>
	 	<van-button class="Login" type="primary" @click="getTel">登 录</van-button>
		<van-button class="register" type="warning" @click="Toregister">注 册</van-button>
	 </div>
  </div>
</template>

<script>
import {getTel} from "../../api/index";
import { statusCode } from "../../config/api.cfg";
import store from "../../store/index";
import * as types from "../../store/mutation-types";
export default {
	store,
	data() {
		return {
			Telnum:'',  // 电话号码
			password:'' ,// 密码
			lists:[]
		}
	},
	methods:{
		Toregister() {
			uni.navigateTo({
				url:'../register/main'
			})
		},
		getTelnum(e) {
			this.Telnum = e.target.value;
		},
		getpassword(e) {
			this.password = e.target.value;
		},
		ToLogin() {
			uni.navigateTo({
				url:'../index/main'
			})
		},
		async getTel() {
			if (!(/^1[34578]\d{9}$/.test(this.Telnum))) {
				uni.showToast({
					title: '您输入的手机号码有误',
					icon: "none",
					duration: 2000
				});
				return 
			}
			let that = this
			const res = await getTel({phone:this.Telnum,passwd:this.password});
			if(res.data.code===statusCode.OK){
				console.log('获取到的数据：')
				console.log(res.data.data)
				if(res.data.data.User.mobile === this.Telnum) {
					this.$store.commit(types.SET_USER_INFO, res.data.data);
					this.lists=res.data.data
					uni.setStorage({
						key: 'list',
						data: this.lists,
						success: () => {
						console.log('success set list');
					}
					});
					uni.setStorage({
							key: 'token',
							data: res.data.data.token.userToken,
							success: () => {
							console.log('success set token');
						}
					});
					uni.redirectTo({
						url:'../index/main'
					})
				} else {
					uni.showToast({
						title:'当前用户未授权',
						icon: "none",
						duration:2000
					})
				}
			} else {
				uni.showToast({
					title:'您输入的密码有误或者当前用户未授权',
					icon: "none",
					duration:2000
				})
			}
		}			
	},
	onShow() {
	  this.password = '';
	}
}
</script>

<style lang="less" scoped>
.view {
	width:100%;
	min-height:100%;
	height:auto;
	background-image:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546690305359&di=373643600fa8ab9851ff6a3d3aa4bc68&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b8395574ed430000009fcb9723d5.jpg);
	background-size:cover;
	font-size:14px;
	position:absolute;
	.group {
		width:100%;
		min-height:100px;
		height:auto;
		margin:400rpx auto;
	.Tel {
		width:85%;
		height:40px;
		display: flex;
		margin:0 auto;
		.Teltext {
			width:22%;
			font-size:1rem;
		}
		.Telnum {
			width:70%;
			font-size:0.65rem;
			background:#fff;
		}
	}
	.Pas {
			width:85vw;
			height:40px;
			display: flex;
			margin:0.8rem auto;
			.password {
				width:18.8%;
				margin-left:3%;
				font-size:0.96rem;
			}
			.inputpassword {
				width:70%;
				font-size:0.65rem;
				background:#fff;
			}
		}
	}
	.Login {
		width:60%;
		height:70rpx;
		display: block;
		font-size:0.8rem;
		line-height: 70rpx;
		margin:15% auto;
	}
	.register {
		width:60%;
		height:70rpx;
		display: block;
		font-size:0.8rem;
		line-height: 70rpx;
		margin:-10% auto;
	}
}

</style>