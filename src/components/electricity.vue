<template lang="pug">
  div.electricity-container.card
    img.background-img(src="__IMAGE__/theme/electricity.jpg")
    title(title="我的电量" img="__IMAGE__/icon/elec.png")
    div.detail
      div
        p.count {{surplus}}
        p.comment 剩余电量
      div
        p.count {{threeDays}}
        p.comment 最近三天用电
</template>

<script>
import Title from '../base/title'
import {ElectricityModel} from '../model/ElectricityModel'

let elec = new ElectricityModel()

export default {
  data () {
    return {
      surplus: 0,
      threeDays: 0
    }
  },
  onLoad () {
    elec.getThreeDays().then((res) => {
      this.threeDays = res.elec
    })
    elec.getSurplus().then((res) => {
      this.surplus = res.elec
    })
  },
  components: {
    Title
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .electricity-container
    display: flex
    flex-direction: column
    align-items: center
    position: relative
    .background-img
      width: 100%
      height: 100%
      position: absolute
      top: 0
      z-index: 0
  .detail
    z-index: 10
    display: flex
    width: 100%
    padding-bottom: 40rpx
    div:first-child
      border-right: 1px solid $grey-font-color
    div
      width: 50%
      display: flex
      flex-direction: column
      align-items: center
      padding: 15rpx 0
    .count
      font-size: 38px
    .comment
      font-size: $small-font-size
      margin-top: 10rpx
</style>
