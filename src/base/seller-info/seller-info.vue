<template lang="pug">
  div.card.info-container(v-if="seller.id", @click="toShop")
    div.avatar
      img(src="__IMAGE__/theme/personal@avatar.jpg" v-if="!seller.avatar_image_id"
        @load="imageLoaded", :data-type="from")
      img(:src="seller.avatar_image_id.image_url" v-else
        @load="imageLoaded", :data-type="from")
      p {{seller.name}}
    div.info
      img(src="__IMAGE__/icon/phone.png"
        @load="imageLoaded", :data-type="from")
      p 电 话：{{seller.telephone}}
    div.info
      img(src="__IMAGE__/icon/wechat.png"
        @load="imageLoaded", :data-type="from")
      p 微 信：{{seller.weixin}}
    div.info
      img(src="__IMAGE__/icon/zhifubao.png"
        @load="imageLoaded", :data-type="from")
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
      },
      from: {
        type: String,
        default: ''
      }
    },
    methods: {
      toShop () {
        wx.navigateTo({
          url: `../shop-detail/main?id=${this.seller.id}`
        })
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"
  .info-container
    display: flex
    flex-direction: column
    padding: 30rpx 0rpx
  .avatar
    display: flex
    align-items: center
    margin-bottom: 20rpx
    margin-left: 20rpx
    img
      width: 150rpx
      height: 150rpx
      border-radius: 5px
    p
      margin-left: 50rpx
  .info
    display: flex
    align-items: center
    margin-top: 10rpx
    margin-left: 20rpx
    img
      width: 50rpx
      height: 50rpx
    p
      font-size: $small-font-size
      margin-left: 25rpx
</style>
