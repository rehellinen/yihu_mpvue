<template lang="pug">
  div.container.load-container(:style="colorStyle")
    p(v-if="hasMore") 加载中
    p(v-else) 暂无更多内容
    img(src="/static/images/theme/page-loading.gif", v-if="hasMore")
</template>

<script>
  /**
   * 组件介绍：加载中组件
   * props：
   * 1. hasMore true时显示加载中对应的样式
   * 2. backgroundColor 组件的背景颜色
   */
  export default {
    props: {
      hasMore: {
        type: Boolean,
        default: true
      },
      backgroundColor: {
        type: String,
        default: ''
      }
    },
    computed: {
      colorStyle () {
        if (this.backgroundColor === this.$config.COLOR.WHITE) {
          return `background-color:${this.$config.COLOR.WHITE}`
        } else {
          return `background-color:${this.$config.COLOR.BACKGROUND_COLOR}`
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"
  .load-container
    height: 100rpx
    color: $light-font-color
    display: flex
    align-items: center
    flex-direction: row
    justify-content: center
    font-size: $small-font-size
    img
      width: 30rpx
      height: 30rpx
      margin-left: 15rpx
</style>
