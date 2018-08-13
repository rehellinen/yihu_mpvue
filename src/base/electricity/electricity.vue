<template lang="pug">
    div.elec-container
      img(src="__IMAGE__/theme/personal@backElec.png")
      div.elec-detail
        div.surplus
          text.surplus-text 剩余电量 (度)
          text.surplus-num {{surplus}}
        div.line
        div.surplus
          text.surplus-text 近三天用电 (度)
          text.surplus-num {{threeDays}}
</template>

<script>
  export default {
    data () {
      return {
        threeDays: 0,
        surplus: 0
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .elec-container
    background-color: white
    width: 750rpx
    height: 185rpx
    border-radius: 8px

    img
      width: 750rpx
      height: 185rpx
      position: absolute

  .elec-detail
    position: absolute
    text-align: center
    width: 98%
    display: flex
    flex-direction: row
    height: 185rpx

  .surplus
    width: 49%
    text-align: center
    display: flex
    flex-direction: column

    .surplus-text
      font-size: $smaller-font-size
      z-index: 40
      color: #000
      margin-top: 30rpx

    .surplus-num
      font-size: $vast-font-size
      z-index: 40
      color: #000
      margin-top: 20rpx

  .line
    background-color: $light-font-color
    width: 1.5px
    height: 80%
    margin-left: 49.5%
    margin-top: 2.5%
    z-index: 80
    position: absolute
</style>
