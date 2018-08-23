<template lang="pug">
  div.container.load-container
    p(v-if="hasMore") 加载中
    p(v-else) 暂无更多内容
    img(src="__IMAGE__/theme/page-loading.gif", v-if="hasMore")
</template>

<script>
  export default {
    props: {
      hasMore: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"
  .load-container
    background-color: $background-color
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
