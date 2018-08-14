<template lang="pug">
div
  my-loading(:showLoading="showLoading")
  div.container.shop-container(v-if="!showLoading")
    div.header-image
      img(src="__IMAGE__/theme/shop@header.png")
    div.recommend-image
      img(src="__IMAGE__/theme/recommend.png")

    shop-list(:shops="shops")
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import ShopList from 'components/shop-list/shop-list'
  import {Load} from 'utils/load'

  const REQUEST_NUMBER = 1

  export default {
    data () {
      return {
        showLoading: false,
        shops: []
      }
    },
    mounted () {
      this.load = new Load(this, REQUEST_NUMBER)
    },
    components: {
      MyLoading,
      ShopList
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .shop-container
    background-color: #F9F9F9

  .header-image
    width: 100%
    height: 435rpx
    background-color: white
    img
      width: 100%
      height: 435rpx

  .recommend-image
    width: 750rpx
    height: 170rpx
    background-color: white
    display: flex
    justify-content: center
    align-items: center
    img
      width: 250rpx
      height: 153rpx
</style>
