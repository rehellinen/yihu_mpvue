<template lang="pug">
  .loading-container(v-if="showLoading")
    img(src="/static/images/theme/loading.gif")
</template>

<script>
  /**
   * 组件介绍：加载中样式（全屏）
   * props：
   * 1. showLoading true时展示，false时收起
   */
  export default {
    props: {
      showLoading: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .loading-container
    position: absolute
    top: 0
    left: 0
    display: flex
    justify-content: center
    align-items: center
    width: 750rpx
    z-index: 50
    min-height: 100vh
    background-color: white
    img
      width: 300rpx
      height: 300rpx
</style>
