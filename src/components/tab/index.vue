<template>
  <div class="tab-view">
    <div class="tab-item" v-for="(item, index) in tabList" :key="index" @click="onTabClick(index)">
      <div class="item-text">{{ item.text }}</div>
      <span class="item-line" :class="{ active : currentIndex === index}"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      tabList: {
        type: Object,
        default: () => {
          return {}
        }
      },
      currentIndex: {
        type: Object,
        default: 0
      }
    },
    data () {
      return {
      }
    },
    methods: {
      onTabClick (index) {
        this.$emit('onTabClick', index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .tab-view{
    display: flex;
    justify-content: space-between;
    left: 0;
    top: 0;
    width: 100%;
  /*white-space: nowrap;*/
  .tab-item{
    position: relative;
    display: inline-block;
    width: 50%;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    color: #5a5a5a;
    text-align: center;
    padding: 0 25px;
  .active{
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 70px;
    height: 2px;
    background: #333333;
    border-radius: 100px;
  }
  }
  }
</style>
