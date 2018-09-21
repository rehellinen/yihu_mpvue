<template lang="pug">
  div.more-container
    div
      p {{text}}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '查 看 更 多'
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .more-container
    z-index: 10
    width: 100%
    height: 75rpx
    display: flex
    justify-content: center
    align-items: center
    div
      color: $base-font-color
      font-size: $smaller-font-size
      display: flex
      align-items: center
      justify-content: center
      height: 35rpx
      padding: 2rpx 40rpx
</style>
