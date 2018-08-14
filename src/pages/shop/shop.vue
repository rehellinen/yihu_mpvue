<template lang="pug">
div
  my-loading(:showLoading="showLoading")
  div.container.shop-container(v-if="!showLoading")
    div.header-image(:style="topStyle")
      img(src="__IMAGE__/theme/shop@header.jpg")
    div.recommend-image(:style="topStyle")
      img(src="__IMAGE__/theme/recommend.jpg")
    div.top-title(:style="titleStyle")
      p 自营商店
    shop-list(:shops="shops")
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import ShopList from 'components/shop-list/shop-list'
  import {ShopModel} from 'model/ShopModel'
  import {Load} from 'utils/load'

  let Shop = new ShopModel()
  const REQUEST_NUMBER = 1

  export default {
    data () {
      return {
        showLoading: false,
        page: 1,
        shops: [],
        topStyle: '',
        titleStyle: ''
      }
    },
    created () {
      this._getShops()
    },
    mounted () {
      this.selector = wx.createSelectorQuery().select('.recommend-image')
      this.load = new Load(this, REQUEST_NUMBER)
    },
    onPageScroll (opt) {
      const topImageHeight = 217
      const recommendHeight = 85
      const totalHeight = topImageHeight + recommendHeight

      this.selector.boundingClientRect(res => {
        let scale = (res.top + recommendHeight) / totalHeight
        let blur = 30 * (1 - scale)
        this.topStyle = `filter:blur(${blur}rpx);-webkit-filter:blur(${blur}rpx);`
        this.titleStyle = `opacity:${1 - scale}`
      }).exec()
    },
    methods: {
      _getShops () {
        Shop.getShops(this.page).then(res => {
          this._processData(res)
        })
      },
      _processData (shops) {
        this.shops = shops
      }
    },
    components: {
      MyLoading,
      ShopList
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .top-title
    background-color: $nav-color
    position: fixed
    top: 0
    height: 60rpx
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    opacity: 0
    p
      font-size: $normal-font-size
      color: whitesmoke
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
