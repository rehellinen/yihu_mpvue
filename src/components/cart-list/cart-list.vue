<template lang="pug">
  div.cart-box(v-if="cartData.length > 0")
    div.cart-item(v-for="(item, index) in cartData" :key="item.id")
      div.cart-item-checkbox
        img(src="__IMAGE__/icon/circle@selected.png", v-if="item.selected")
        img(src="__IMAGE__/icon/circle@noselected.png", v-else)
      div.cart-item-img
        img.goods-image(:src="item.image_id.image_url" mode="aspectFill")
      div.cart-item-word
        div.title-box
          p.name {{item.name}}
          p.price ￥{{item.price}}
        div.bottom-box
          div.cart-item-count
            img(src="__IMAGE__/icon/minus.png", @click="minusOne(item.id)")
            div {{item.count}}
            img(src="__IMAGE__/icon/plus.png")
          img.delete(src="__IMAGE__/icon/delete.png", @click="deleteOne(index)")
</template>

<script>
  export default {
    props: {
      cartData: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      deleteOne (index) {
        console.log(index)
      },
      minusOne (id) {
        console.log(id)
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .cart-box
    display: flex
    flex-direction: column
    margin-bottom: 92rpx
    font-size: $small-font-size
    width: 100%

  .cart-item
    display: flex
    flex-direction: row
    background-color: white
    width: $card-width
    margin-top: $card-margin-top
    margin-left: $card-margin-left
    border-radius: $card-border-radius
    padding: 15rpx 0
    height: 186rpx
    > view
      height: 100%

  .cart-item-checkbox
    display: flex
    align-items: center
    justify-content: center
    width: 84rpx
    img
      height: 44rpx
      width: 44rpx

  .cart-item-img
    width: 186rpx
    height: 100%
    background-color: $light-font-color
    border-radius: 10rpx
    img
      border-radius: 10rpx
      width: 100%
      height: 100%


  .cart-item-word
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 8rpx 0 8rpx 30rpx
    color: $base-font-color
    width: 380rpx

  .title-box
    display: flex
    justify-content: space-between
    .name
      flex-basis: 70%

  .bottom-box
    display: flex
    align-items: center
    justify-content: space-between
    font-size: $smaller-font-size
    height: 80rpx

  .cart-item-count
    width: 220rpx
    display: flex
    justify-content: space-between
    align-items: center
    color: $base-font-color
    img
      width: 30rpx
      height: 30rpx
    div
      font-size: $small-font-size
  .delete
    width: 30rpx
    height: 30rpx
</style>
