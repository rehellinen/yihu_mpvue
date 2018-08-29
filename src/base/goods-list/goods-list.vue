<template lang="pug">
div.goods-list-container(:style="style")
  div.goods-container(v-for="(item, index) in goods", :key="item.id"
    @click="toGoodsDetail(index)")
    img.lazy(:src="item.lazy_url[0]" mode='aspectFill'
      :data-index="index", :class="item.transition"
      @load="imageLoaded" :data-type="from")
    div.text-container
      div
        text.two-handed(v-if="item.type === 2") 二手
        text {{item.name}}
      text.price ￥{{item.price}}
</template>

<script>
  /**
   * 组件介绍：商品列表
   * props：
   * 1. goods 商品数组
   * 2. backgroundColor 背景颜色
   */
  export default {
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      },
      backgroundColor: {
        type: String,
        default: ''
      },
      from: {
        type: String,
        default: ''
      }
    },
    computed: {
      style () {
        if (this.backgroundColor === this.$config.color.BACKGROUND_COLOR) {
          return `background-color:${this.$config.color.BACKGROUND_COLOR}`
        } else {
          return `background-color:${this.$config.color.WHITE}`
        }
      }
    },
    methods: {
      toGoodsDetail (index) {
        let id = this.goods[index].id
        let type = this.goods[index].type
        wx.navigateTo({
          url: `../goods-detail/main?id=${id}&type=${type}`
        })
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
    background-color: $background-color
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
    background-color: white
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
