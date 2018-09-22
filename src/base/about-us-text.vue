<template lang="pug">
  div.more-container
    img(:src="image")
    p {{text}}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '查 看 更 多'
    },
    image: {
      type: String,
      default: '__IMAGE__/icon/info.png'
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
    color: $base-font-color
    font-size: $smaller-font-size
    letter-spacing: 2px
    img
      width: 25rpx
      height: 25rpx
      margin-right: 15rpx
</style>
