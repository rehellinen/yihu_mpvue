<template lang="pug">
  div.info-container(v-if="seller.id")
    div.avatar
      img(:src="seller.avatar_image_id.image_url")
      p {{seller.name}}
    div.info
      img(src="__IMAGE__/icon/phone.png")
      p 电 话：{{seller.telephone}}
    div.info
      img(src="__IMAGE__/icon/wechat.png")
      p 微 信：{{seller.weixin}}
    div.info
      img(src="__IMAGE__/icon/zhifubao.png")
      p 支付宝：{{seller.zhifubao}}
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"
  .info-container
    display: flex
    flex-direction: column
    margin: 30rpx 20rpx
  .avatar
    display: flex
    align-items: center
    img
      width: 150rpx
      height: 150rpx
    p
      margin-left: 50rpx
  .info
    display: flex
    align-items: center
    margin-top: 10rpx
    img
      width: 50rpx
      height: 50rpx
    p
      font-size: $small-font-size
      margin-left: 25rpx
</style>
