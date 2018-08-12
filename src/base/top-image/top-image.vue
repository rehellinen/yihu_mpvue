<template lang="pug">
div.info
  img.header-image(:src="top_image")
  img.avatar(:src="avatar")
  p.avatar-name {{name}}
  p.avatar-quote {{quote}}
</template>

<script>
  export default {
    props: {
      top_image: {
        type: String,
        default: '__IMAGE__/theme/personal@header.jpg'
      },
      avatar: {
        type: String,
        default: '__IMAGE__/theme/personal@avatar.jpg'
      },
      name: {
        type: String,
        default: 'tuntematon'
      },
      quote: {
        type: String,
        default: '生活就像海洋，只有意志坚强的人才能到达彼岸'
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .info
    display: flex
    flex-direction: column
    align-items: center
    background-color: white

  .header-image
    width: 750rpx
    height: 325rpx

  .avatar
    width: 150rpx
    height: 150rpx
    position: absolute
    top: 250rpx
    border-radius: 50%
    display: block

  .avatar-name
    margin-top: 80rpx
    color: $theme-color
    font-size: $biggest-font-size

  .avatar-quote
    color: $light-font-color
    font-size: $smaller-font-size
    margin: 10rpx 20rpx 20rpx 20rpx
</style>
