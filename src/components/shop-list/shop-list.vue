<template lang="pug">
  div.shop-container(v-for="(item, index) in shops" :key="index")
    div.up
      div
        img.shop-avatar
        p.avatar-text
      img.come-image(src="__IMAGE__/theme/shop@come.png")
        div.left
          img(src="item.main_image_id[0].image_id.image_url")
        div.right
          img.right1-image(src="item.main_image_id[1].image_id.image_url")
          img.right2-image(src="item.main_image_id[2].image_id.image_url")
    div.down
</template>

<script>
export default {
  props: {
    shops: []
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .shop-container
    display: flex
    flex-direction: column
    width: 750rpx
    margin-top: 20rpx
    background-color: white
    padding-bottom: 15rpx

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
        color: black

      .come-image
        width: 105rpx
        height: 45rpx
        margin-top: 2.5px
        float: right

    .down
      margin: 0 25rpx
      display: flex
      flex: row

      .left
        width: 420rpx
        img
          width: 420rpx
          height: 320rpx

      .right
        display: flex
        flex-direction: column
        width: 277rpx
        margin-left: 5rpx

      .right1-image
        width: 277rpx
        height: 155rpx

      .right2-image
        width: 277rpx
        height: 162rpx
        margin-top: 5rpx
</style>
