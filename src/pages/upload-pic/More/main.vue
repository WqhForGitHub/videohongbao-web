<template>
<div class="item-box">
	<div class="item" v-for="(item, index) in itemList" :key="index">
		<div class="pc">
			<div class="Avatar">
				<img :src="item.videoURL+'?vframe/jpg/offset/1'" alt="" mode='aspectFill' @click="play(item)" />
				<img src="/static/video.png" class="play" />
			</div>
		</div>
		<p>{{item.explains}}</p>
		<div class="icon" @click="cirfim(item)"></div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			itemList:[]
		}
	},
	methods: {
		cirfim(item) {
		uni.navigateTo({
			url:`../muban/main?src=${JSON.stringify(item)}`
		}); 
		},
		play(src) {
			uni.navigateTo({
				url:`../video/main?src=${JSON.stringify(src)}`
			})
		}
	},
	onLoad() {
		let that = this
		uni.getStorage({
			key: 'muban',
			success: (res) => {
				that.itemList = res.data
				console.log(that.itemList)
			}
		});
	}
}
</script>

<style lang="less">
.item-box {
	font-size:14px;
}
.item {
	width:100%;
	height:60px;
	margin-top:1%;
	font-size:14px;
	display: flex;
	border-bottom: 1px solid #f0f0f0;
	.pc {
		width:55px;
		height:100%;
		margin-left:2%;
		.Avatar {
			width:55px;
			height:90%;
			margin-left:2%;
			border:1px solid #000;
			border-radius:5px;
			img {
				width:100%;
				height:100%;
			}
			.play {
				display: block;
				width:15px;
				height:15px;
				margin-top:-36%;
				margin-left:74%;
				background-size:100% 100%;
			}
		}
		
	}	
	p {
		width:64%;
		font-size:17px;
		line-height: 50px;
		margin-left:6%;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap
	}
	.icon {
		width:32px;
		height:32px;
		margin-top:3.2%;
		margin-left:2%;
		background-image:url(../../../../static/select.png);
	}
}
</style>
