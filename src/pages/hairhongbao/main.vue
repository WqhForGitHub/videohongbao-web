<template>
  <div>
     <video
        :src="url"
        id="video-id"
        class="video-view"
        objectFit="cover"
        :show-play-btn="false"
        :show-center-play-btn="true"
        :enable-progress-gesture="false"
        circular
        loop
        :controls="true"
        autoplay
        show-fullscreen-btn
        :custom-cache='false'>
      </video>
  </div>
</template>
<script>
export default{
  data(){
    return{
      url:null,
      imageheight: (uni.getSystemInfoSync().windowHeight),

    }
  },
  onLoad(res){
    this.url=res.url
    console.log(res.url)
  }
}
</script>
<style lang="less" scoped>
div{
  height: 100vh;
  background: black;
}
 .video-view{
   width:100%;
   height: 100%;

 }
</style>
