<template lang="pug">
  div.container.pay-result-container
    div.success(v-if="payStatus === payEnum.PAY_SUCCESS")
      img(src="__IMAGE__/icon/pay@success.png")
      p.pay-title 支付成功
      p.pay-text 感谢~
      button(size='mini' type="default" @click="viewOrder") 查看订单

    div.success(v-else)
      img(src="__IMAGE__/icon/pay@error.png")
      p.pay-title 抱歉，支付失败
      p.pay-text 如需购买，可在个人中心查看订单
      button(size='mini' type="default" @click="viewOrder") 查看订单
</template>

<script>
import {payEnum} from '../../utils/config'
export default {
  data () {
    return {
      payStatus: payEnum.PAY_FAIL,
      payEnum
    }
  },
  mounted () {
    this.payStatus = parseInt(this.$root.$mp.query.status)
  },
  methods: {
    viewOrder () {
      wx.switchTab({
        url: '../personal/main'
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .pay-result-container
    padding-top: 180rpx
    background-color: $background-color
    min-height: 100vh
    width: 100%
    img
      width: 160rpx
      height: 160rpx

  .success
    display: flex
    flex-direction: column
    align-items: center

  .pay-title
    font-size: $big-font-size
    color: $base-font-color
    margin-top: 20rpx

  .pay-text
    font-size: $small-font-size
    color: $grey-font-color
    margin-top: 20rpx

  button
    margin: 60rpx 20rpx
    width: 380rpx
    border: 1rpx solid $deep-font-color
    border-radius: 13px
</style>
