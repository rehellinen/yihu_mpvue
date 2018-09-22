<template lang="pug">
  div.about-container
    div.title
      p About us
      div.line
    div.who
      p.who-title WHO WE ARE
      p.who-detail 暨 南 人 网 络 联 盟
      p.who-detail 我 们 是 一 个 很 有 爱 的 部 门
    div.detail
      img(src="__IMAGE__/theme/qr.jpg" @click="preview")
      p 欢迎关注我们的公众号~
      <!--div.description-->
        <!--p.desc-title DESCRIPTION-->
        <!--p.desc-text 这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍-->
    div.contact
      p 开发：陈棋轩
      p 设计：张裕桦
</template>

<script>
export default {
  methods: {
    preview () {
      wx.previewImage({
        urls: ['https://20298479.rehellinen.cn/fleamarket/public/upload/qr.jpg'],
        current: 'https://20298479.rehellinen.cn/fleamarket/public/upload/qr.jpg'
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .about-container
    display: flex
    flex-direction: column
    color: $base-font-color
    height: 85vh
    .title
      display: flex
      flex-direction: column
      justify-content: center
      height: 200rpx
      letter-spacing: 2px
      padding-left: 40rpx
      font-size: $biggest-font-size
      .line
        height: 2px
        background-color: $base-font-color
        margin-top: 15rpx
        width: 60rpx

    .who
      text-align: center
      letter-spacing: 1px
      margin-top: 40rpx
      .who-title
        color: #e43256
      .who-detail
        font-size: $smaller-font-size
        margin-top: 10rpx

    .detail
      display: flex
      flex: 1
      flex-direction: column
      justify-content: center
      align-items: center
      img
        width: 300rpx
        height: 300rpx
      p
        font-size: $normal-font-size
        margin-top: 10rpx

    .contact
      position: absolute
      bottom: 0
      left: 0
      display: flex
      justify-content: space-around
      width: 100%
      height: 80rpx
      font-size: $smaller-font-size
      align-items: center
  .de
</style>
