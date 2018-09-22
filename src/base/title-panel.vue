<template lang="pug">
  div.panel-container
    img(:src="image")
    div
      p {{title}}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: '__IMAGE__/icon/find.png'
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .panel-container
    width: 750rpx
    background-color: white
    height: 150rpx
    display: flex
    align-items: center
    justify-content: space-between
    img
      width: 90rpx
      height: 90rpx
      margin-left: 50rpx
    div
      flex: 1
      text-align: center
    p
      color: $deep-font-color
      font-size: $bigger-font-size
      letter-spacing: 2px
</style>
