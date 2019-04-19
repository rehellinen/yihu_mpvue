<template lang="pug">
  div
    div.shop-container(v-for="(item, index) in shops" :key="index")
      div.up(@click="toShopDetail(item.id)")
        div
          img.shop-avatar.lazy(:src="item.lazy_url[0]",
            :class="{afterShow: item.transition}")
          p.avatar-text {{item.name}}
        img.come-image(src="/static/images/theme/shop@come.png")
      div.down
        div.left
          img.lazy(:src="item.lazy_url[1]", mode="aspectFill"
            :class="{disabled : !item.main_image_id[0].id, afterShow: item.transition}"
            @click="toGoodsDetail(item.main_image_id[0].id)")
        div.right
          img.right1-image.lazy(:src="item.lazy_url[2]", mode="aspectFill"
            :class="{disabled : !item.main_image_id[1].id, afterShow: item.transition}"
            @click="toGoodsDetail(item.main_image_id[1].id)")
          img.right2-image.lazy(:src="item.lazy_url[3]", mode="aspectFill"
            :class="{disabled : !item.main_image_id[2].id, afterShow: item.transition}"
            @click="toGoodsDetail(item.main_image_id[2].id)")
</template>

<script>
export default {
  data () {
  },
  props: {
    shops: []
  },
  methods: {
    toShopDetail (id) {
      wx.navigateTo({
        url: `../shop-detail/main?id=${id}`
      })
    },
    toGoodsDetail (id) {
      wx.navigateTo({
        url: `../goods-detail/main?id=${id}&type=1`
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .shop-container
    display: flex
    flex-direction: column
    width: $card-width
    margin-top: $card-margin-top
    margin-left: $card-margin-left
    background-color: white
    padding-bottom: 15rpx
    border-radius: $card-border-radius

    .up
      height: 100rpx
      margin: 0 25rpx
      display: flex
      align-items: center
      justify-content: space-between
      div
        display: flex
        align-items: center
        height: 100rpx

      .shop-avatar
        height: 50rpx
        width: 50rpx
        border-radius: 4px

      .avatar-text
        font-size: 13px
        margin-left: 30rpx
        color: $base-font-color

      .come-image
        width: 105rpx
        height: 45rpx
        margin-top: 2.5px
        float: right

    .down
      display: flex
      flex: row
      img
        border-radius: 5px
      .left
        flex-basis: 55%
        margin-left: 3%
        img
          width: 100%
          height: 320rpx

      .right
        display: flex
        flex-direction: column
        flex-basis: 39%
        margin-left: 5rpx

      .right1-image
        width: 100%
        height: 155rpx

      .right2-image
        width: 100%
        height: 162rpx
        margin-top: 5rpx
</style>
