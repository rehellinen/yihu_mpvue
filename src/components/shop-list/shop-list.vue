<template lang="pug">
  div
    div.shop-container(v-for="(item, index) in shops" :key="index")
      div.up
        div
          img.shop-avatar(:src="item.avatar_image_id.image_url")
          p.avatar-text {{item.name}}
        img.come-image(src="__IMAGE__/theme/shop@come.png")
      div.down
        div.left
          img(:src="item.main_image_id[0].image_id.image_url", v-if="item.main_image_id[0]")
        div.right
          img.right1-image(:src="item.main_image_id[1].image_id.image_url", v-if="item.main_image_id[1]")
          img.right2-image(:src="item.main_image_id[2].image_id.image_url", v-if="item.main_image_id[2]")
</template>

<script>
export default {
  props: {
    shops: []
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
