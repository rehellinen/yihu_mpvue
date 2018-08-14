<template lang="pug">
    div.elec-container
      img(src="__IMAGE__/theme/personal@backElec.jpg" mode="aspectFill")
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
  import {ElectricityModel} from 'model/ElectricityModel'

  let Electricity = new ElectricityModel()
  export default {
    data () {
      return {
        threeDays: 0,
        surplus: 0
      }
    },
    created () {
      this._getData()
    },
    methods: {
      _getData () {
        Electricity.getSurplus().then((res) => {
          this.surplus = res.elec
        })
        Electricity.getThreeDays().then((res) => {
          this.threeDays = res.elec
        })
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .elec-container
    background-color: white
    width: $card-width
    margin-left: $card-margin-left
    margin-top: $card-margin-top
    border-radius: $card-border-radius
    height: 185rpx
    img
      width: 710rpx
      height: 185rpx
      border-radius: $card-border-radius
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
      margin-top: 30rpx
      color: $base-font-color

    .surplus-num
      font-size: $vast-font-size
      z-index: 40
      color: $base-font-color
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
