<template lang="pug">
div.goods-list-container
  div.goods-container(v-for="(item, index) in goods", :key="item.id")
    img.lazy(:src="item.lazy_url" mode='aspectFill' :data-index="index", :class="item.transition")
    div.text-container
      div
        text.two-handed(v-if="item.type === 2") 二手
        text {{item.name}}
      text.price ￥{{item.price}}
</template>

<script>
  export default {
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .goods-list-container
    display: flex
    flex-direction: row
    flex-wrap: wrap
    width: 750rpx
    background-color: white
    padding-bottom: 5rpx

  .goods-container
    display: flex
    flex-direction: column
    width: 350rpx
    height: 365rpx
    margin-left: 17rpx
    margin-top: 25rpx
    box-shadow: 0 0 6px #ebebeb
    border-radius: 8px
    img
      width: 350rpx
      height: 250rpx
      border-radius: 8px 8px 0 0

  .text-container
    display: flex
    flex-direction: column
    justify-content: space-around
    height: 115rpx
    color: $deep-font-color
    font-size: $small-font-size
    margin-top: 8rpx
    div
      margin-left: 20rpx
    .two-handed
      font-size: $smallest-font-size
      margin-right: 8rpx
  .price
    color: #fa3e3d
    font-size: $normal-font-size
    width: 50%
    margin-left: 20rpx
</style>
