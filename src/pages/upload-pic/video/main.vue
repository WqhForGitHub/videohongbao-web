<template>
  <div class='video-box'>
    <div class="video">
      <video :src="src.videoURL"
      :custom-cache="false"
      objectFit="cover"
      :controls="true"
      autoplay
       ></video>
	   	<div class="queding" @click="cirfim">
				<p>确 定</p>
			</div>
    </div>
	<!--视频数据-->
	<div class="data">
		<!--可滚动视图区域-->
		<div class="scrollitem">
			<div class="video" v-for="(item, index) in muban" @click="play(item)">
				<img :src="item.videoURL+'?vframe/jpg/offset/1'" alt="" mode='aspectFill' />
				<img src="/static/video.png" class="play" />
			</div>
		</div>
	</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
		src:'',
		muban:[],
	  imgurl:[{},{},{},{},{},{},{},{}]
    }
  },
  methods: {
    play(obj){
      this.src=obj
    },
    cirfim(){
      uni.navigateTo({
        url: `../muban/main?src=${JSON.stringify(this.src)}`,
      });
    }
  },
  onShow(){
		let that = this
    uni.getStorage({
    	key: 'muban',
    	success: (res) => {
    			console.log(res.data);
					that.muban = res.data
    	}
    });
  },
  onLoad(res){
    this.src=JSON.parse(res.src)
  }
}
</script>
<style lang="less">
	.video-box {
		font-size:14px;
	}
  .meun{
    width: 50px;
    height: 50px;
    position: absolute;
    top:50%;
    right: 5px;
    margin:-30px 0 0 0;
    button{
      width: 50px;
       height: 50px;
       font-size: 12px;
       line-height: 50px;
       background: #FF3666;
       color: #fff;
       border-radius: 25px;
    }
  }
  .video{
    width: 100%;
    height: 500px;
    video{
      width: 100%;
      height: 100%;
    }
  }
  .data {
  	width:100%;
  	height:110px;
  	display: flex;
  	overflow:scroll;
  	//background:blue;
	.scrollitem {
		height:100%;
		display:flex;
		margin-left:-1.4%;
		.video {
			width:100px;
			height:85px;
			margin-left:1%;
			margin-top:1%;
			background:red;
			border-radius:5px;
			img {
				width:100%;
				height:100%;
			  border-radius:5px;
			}
				.play {
					display: block;
					width:30px;
					height:30px;
					margin-top:-60px;
					margin-left:30px;
					background-size:100% 100%;
				}
		}
  	}
  }
  .queding {
	  width:50px;
	  height:50px;
	  position:absolute;
	  margin-top:-26vh;
	  margin-left:84vw;
	  border-radius:50%;
		background:red;
		z-index:100;
		p {
			font-size:10px;
			text-align: center;
			line-height: 49px;
			color:white;
		}
  }
  @media screen and (min-width:768px) {
	  .queding {
		  margin-left:92vw;
			margin-top:-19vh;
	  }
  }
</style>
