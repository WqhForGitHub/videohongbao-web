<template>
    <div class="view">
      <p class="content">{{ content }}</p>
    </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    content: {
      type: String,
      default: () => {
        return '没有更多了~'
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
  @import "../../common/style/variable";
  .view{
    .content{
      font-size: @font-size-medium-x;
      text-align: center;
 
    }
  }
</style>
