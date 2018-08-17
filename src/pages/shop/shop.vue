<template lang="pug">
div
  my-loading(:showLoading="showLoading")
  div.container.shop-container(v-if="!showLoading")
    search(:pullDown="pullDown")
    div.header-image.header
      img(src="__IMAGE__/theme/shop@header.jpg")
    shop-list(:shops="shops")
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import ShopList from 'components/shop-list/shop-list'
  import Search from 'base/search/search'
  import {ShopModel} from 'model/ShopModel'
  import {Load} from 'utils/load'
  import {searchMixin, pageMixin} from 'utils/mixins'

  let Shop = new ShopModel()
  const REQUEST_NUMBER = 1

  export default {
    mixins: [searchMixin, pageMixin],
    data () {
      return {
        showLoading: false,
        shops: []
      }
    },
    mounted () {
      this._loadData()
      this.load = new Load(this, REQUEST_NUMBER)
    },
    methods: {
      _loadData () {
        Shop.getShops(this.page).then(res => {
          this.shops = this.shops.concat(res)
        }).catch(ex => {
          this.hasMore = false
        })
      }
    },
    components: {
      MyLoading,
      ShopList,
      Search
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
    padding-bottom: $card-margin-left

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
