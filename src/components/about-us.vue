<template lang="pug">
  div.card
    title(title="更多" img="__IMAGE__/icon/more.png")
    div.redirect-container
      div
        navigator(target="miniProgram", app-id="wx026b7698d91e0904", hover-class="none") 商家版
      div
        navigator(target="miniProgram", app-id="wxe869b1edab698fd5", hover-class="none") 暨先生
    see-more(text="关于我们")
</template>

<script>
import Title from '../base/electricity/title'
import SeeMore from '../base/electricity/see-more'

export default {
  components: {
    Title,
    SeeMore
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
    div
      padding: 20rpx 0
      flex-basis: 50%
      text-align: center
    div:first-child
      border-right: 1px solid $grey-font-color
    .about-us
      font-size: $small-font-size
      text-align: center
      margin-bottom: 15rpx
</style>
