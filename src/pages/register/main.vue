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
		<van-button class="Login" type="primary" @click="getTel">确 定</van-button>
	 </div>
</div>
</template>

<script>
import {regisuser} from "../../api/index";
import { statusCode } from "../../config/api.cfg";
export default {
	data() {
		return {
			Telnum:'',
			password:''
		};
	},
	methods: {
		getTel() {
			let that = this
			uni.showModal({
				title: '注册',
				content: '确定要注册吗？',
				success:  (res) => {
					if (res.confirm) {
						that.register()
					} else if (res.cancel) {
					}
				}
			});
		},
		getTelnum(e) {
			this.Telnum = e.target.value;
		},
		getpassword(e) {
			this.password = e.target.value;
		},
		async register() {
			
			const res = await regisuser({
				phone:this.Telnum,
				passwd:this.password
			})
			console.log(res)
		}
	}
}
</script>

<style lang="less">
.view {
	width:100%;
	min-height:100%;
	height:auto;
	background-image:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547447410489&di=aa35038d973e9f1b08466687aa397136&imgtype=0&src=http%3A%2F%2Fimg2.3lian.com%2F2014cf%2Ff4%2F59%2Fd%2F39.jpg);
	background-size:cover;
	font-size:15px;
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
			font-size:0.6rem;
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
				font-size:0.6rem;
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
