<template lang="pug">
  div.card.desc-container
    div.goods-icon-container
      img(src="/static/images/icon/goods-detail.png")
      p 商品详情：
    p.desc(v-if="desc") {{desc}}
    p.no-goods-desc(v-else) 暂无商品介绍
</template>

<script>
  export default {
    props: {
      desc: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"
  .no-goods-desc
    text-align: center
    margin: 30rpx 0
    font-size: $small-font-size
  .goods-icon-container
    display: flex
    margin: 0 20rpx
    padding: 20rpx 0 15rpx 0
    align-items: center
    border-bottom: 1px solid $lighter-font-color
    img
      width: 35rpx
      height: 35rpx
      margin-left: 20rpx
    p
      font-size: $small-font-size
      margin-left: 15rpx
  .desc
    padding: 20rpx 20rpx
    font-size: $small-font-size
</style>
