<template lang="pug">
  div.card
    title(title="相关小程序" img="__IMAGE__/icon/share@personal.png")
    div.redirect-container
      div
        navigator(target="miniProgram", app-id="wx026b7698d91e0904", hover-class="none")
          div.name
            img(src="__IMAGE__/icon/yishang.png")
            p 易乎商家版
          p.info 来成为一名优秀小商家
      div
        navigator(target="miniProgram", app-id="wxe869b1edab698fd5", hover-class="none")
          div.name
            img(src="__IMAGE__/icon/jixiansheng.jpg")
            p 暨先生
          p.info 暨大查询小神器
    div(@click="toAboutUs")
      about-us-text(text="关于我们")
</template>

<script>
import Title from '../base/title'
import AboutUsText from '../base/about-us-text'

export default {
  methods: {
    toAboutUs () {
      wx.navigateTo({
        url: '../about-us/main'
      })
    }
  },
  components: {
    Title,
    AboutUsText
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .redirect-container
    display: flex
    justify-content: space-around
    align-items: center
    font-size: $normal-font-size
    height: 100rpx
    letter-spacing: 2px
    > div:first-child
      border-right: 3rpx solid $lighter-font-color
    > div
      padding: 10rpx 0
      flex-basis: 50%
      text-align: center
      .name
        display: flex
        justify-content: center
        align-items: center
        font-size: $normal-font-size
        img
          width: 35rpx
          height: 35rpx
          margin-right: 15rpx
      .info
        font-size: $smallest-font-size
        color: $grey-font-color
        margin-top: 10rpx
  .de
</style>
