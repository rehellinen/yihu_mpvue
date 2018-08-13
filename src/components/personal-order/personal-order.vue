<template lang="pug">
div.order-container
  div.image-container(v-if="order.length !== 0")
    img(src="__IMAGE__/theme/personal@order.png")
  see-more(v-if="order.length !== 0")
</template>

<script>
  import SeeMore from 'base/see-more/see-more'
  export default {
    props: {
      order: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      SeeMore
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
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
