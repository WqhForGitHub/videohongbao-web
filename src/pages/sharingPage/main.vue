<template>
  <!-- <div class="view"> -->
    <!-- <header class='header'> -->
      <!-- <img src="../../../static/cg.png" class="img"> -->
      <!-- <p>红包审核中</p> -->
    <!-- </header> -->
    <!-- <section class="main">
      <img src="../../../static/ey.png" class="img">
      <button open-type="share" class="sharing-btn">发送给朋友</button>
    </section> -->
  <!-- </div> -->
  <div class="view">
    <header class='header'>
      <!-- <img src="../../../static/cg.png" class="img"> -->
      <div class="shenhe">
      <img src="http://sphbvideo.25010086.com/20181113154008.png" alt="" style="height:100%;width:100%;" mode="aspectFill">
      <div class="shenhep">正在审核中</div>
      </div>
    </header>
    <section class="main">
      <button open-type="share" class="sharing-btn">发送给朋友</button>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'sharingPage',
    data () {
      return {
        videoList: [],
        params: {
          page: 0,
          size: 10
        }
      }
    },
    methods: {
  
    },
    onLoad (options) {
      
      uni.setNavigationBarTitle({
        title: '发红包'
      })
      setTimeout(() => {
      uni.navigateTo({
        url:`../details-video/main?videoid=${options.videoid}&status=1`
      })
      }, 3000);
    }
  }
</script>

<style lang="less" scoped>
  .header {
  width: 100%;
  text-align: center;
  .shenhe {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .img {
    width: 40px;
    height: 40px;
  }
}
.main {
  margin: 15px;
  .img {
    width: 100%;
    height: 300px;
  }
  .sharing-btn {
    margin: 15px 0;
  }
}
.shenhep {
bottom:35%;
  font-size: 14px;
  text-align: center;
  color: #fff;
  position: absolute;
  left:38%;
background:#7902b8;
width:26%;
  border-radius: 30rpx;
  height: 30px;
  line-height: 30px;
}
</style>
