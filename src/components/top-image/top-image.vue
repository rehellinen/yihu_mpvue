<template lang="pug">
div.info
  img.header-image(:src="top_image", @load="imageLoaded", :data-type="from")
  open-data.avatar-name(type="userNickName", v-if="type === 'user'")
  open-data.avatar(type="userAvatarUrl", v-if="type === 'user'")
  img.avatar(:src="avatar", v-if="type !== 'user'", @load="imageLoaded", :data-type="from")
  p.avatar-name(v-if="type !== 'user'") {{name}}
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
      },
      type: {
        type: String,
        default: 'user'
      },
      from: {
        type: String,
        default: ''
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
    position: relative

  .header-image
    width: 750rpx
    height: 375rpx

  .avatar
    width: 150rpx
    height: 150rpx
    position: absolute
    top: 300rpx
    border-radius: 50%
    display: block
    overflow: hidden

  .avatar-name
    margin-top: 85rpx
    color: $theme-color
    font-size: $biggest-font-size

  .avatar-quote
    color: $light-font-color
    font-size: $smaller-font-size
    margin: 15rpx 20rpx 20rpx 20rpx
</style>
