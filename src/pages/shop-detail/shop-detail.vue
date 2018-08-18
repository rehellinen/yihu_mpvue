<template lang="pug">
  div.container.shop-detail-container
    top-image(:top_image="shop.top_image_id.image_url" :avatar="shop.avatar_image_id.image_url"
      :name="shop.name" :quote="shop.major"
      type="shop")
    div.goods-container
      switch-tab(:tabs="tabs")
      div.goods
      goods-list(:goods="allGoods")
</template>

<script>
import TopImage from '../../base/top-image/top-image'
import SwitchTab from '../../base/switch-tab/switch-tab'
import {ShopModel} from '../../model/ShopModel'
import {GoodsModel} from '../../model/GoodsModel'
import GoodsList from '../../base/goods-list/goods-list'
import {pageMixin} from '../../utils/mixins'
import {LazyLoad} from '../../utils/lazyload'

let Shop = new ShopModel()
let Goods = new GoodsModel()

export default {
  data () {
    return {
      shop: {},
      tabs: ['全部商品', '新品上架'],
      allGoods: []
    }
  },
  onLoad () {
    this.shopID = this.$root.$mp.query.id
    Shop.getShopByID(this.shopID).then((res) => {
      this.shop = res
      wx.setNavigationBarTitle({
        title: res.name
      })
    })
    this._loadData()
  },
  methods: {
    _loadData () {
      Goods.getGoodsByShopId(this.shopID, this.page).then(res => {
        this.allGoods = this.allGoods.concat(res)
        this.lazyLoad = new LazyLoad(this.allGoods, this)
      }).catch((ex) => {
        this.hasMore = false
      })
    }
  },
  onPageScroll (opt) {
    this.lazyLoad.refresh()
  },
  components: {
    TopImage,
    SwitchTab,
    GoodsList
  },
  mixins: [pageMixin]
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .shop-detail-container
    background-color: $background-color
  .goods-container
    margin-top: 20rpx
    padding-bottom: 20rpx
    background-color: white
</style>