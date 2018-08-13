<template lang="pug">
  div
    my-loading(:showLoading="showLoading")
    div.container.personal-container(v-if="!showLoading")
      // 个人信息栏
      top-image(type="user")
      div.icon-container
        img(src="__IMAGE__/icon/edit.png")
      // 个人信息栏

      // 电费栏
      electricity
      // 电费栏

      // 我的订单
      div.order-container
        div.image-container(v-if="order.length !== 0")
          img(src="__IMAGE__/theme/personal@order.png")
        order-list
        see-more(v-if="order.length !== 0")
      // 我的订单
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import TopImage from 'base/top-image/top-image'
  import Electricity from 'base/electricity/electricity'
  import SeeMore from 'base/see-more/see-more'
  import OrderList from 'base/order-list/order-list'

  export default {
    data () {
      return {
        showLoading: false,
        order: []
      }
    },
    created () {
      this._getData()
    },
    methods: {
      _getData () {
        // 关于电费
      }
    },
    components: {
      MyLoading,
      TopImage,
      Electricity,
      SeeMore,
      OrderList
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .icon-container
    position: absolute
    width: 80rpx
    height: 80rpx
    top: 30rpx
    right: 20rpx
    background-color: white
    border-radius: 50px
    opacity: 0.8
    display: flex
    justify-content: center
    align-items: center
    z-index: 100
    img
      width: 40rpx
      height: 40rpx
  .personal-container
    background-color: $background-color

  .order-container
    display: flex
    flex-direction: column
    background-color: white
    margin-top: 20rpx
    width: 750rpx
    .image-container
      display: flex
      justify-content: center
      padding: 30rpx 0
      border-bottom: 1rpx solid $light-font-color
      width: 90%
      margin-left: 5%
      align-items: center
      img
        width: 170rpx
        height: 50rpx
</style>
