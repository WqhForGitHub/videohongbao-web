<template>
    <div class="view">
      <div class="left">
        <img :src="data.icon" alt="" mode='aspectFit'>
        <p>{{ data.label }}</p>
      </div>
      <!-- <div class="right" style="border:1px solid blue;">
        <span>{{ data.value }}</span>
      </div> -->
    </div>
</template>

<script>
export default {
  name: 'myItem',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showIcon: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .view{
    width: 100%;
    // display: flex;
    // display: flex;
    // justify-content: space-between;
    // background: #fff;
    // padding: 16px 0;
    // font-size: 16px;
    // letter-spacing: 0;
    .left{
      text-align: center;
      p{
        font-size: 16px;
        margin:15px 0;
      }
    }
    img{
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    span{
      margin:0 10px;
    }
  }
</style>
