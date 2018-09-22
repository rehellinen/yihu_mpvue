<template lang="pug">
  div.container.shop-detail-container(v-if="shop.top_image_id")
    my-loading(:showLoading="showLoading")
    top-image(:top_image="shop.top_image_id.image_url" :avatar="shop.avatar_image_id.image_url"
    :name="shop.name" :quote="shop.major"
    type="shop", :from="pageEnum.SHOP_DETAIL")
    div.goods-container
      switch-tab(:tabs="tabs" @switch="switchTabs" ref="switch")
        div(slot="0")
          goods-list(:goods="allGoods" :from="pageEnum.SHOP_DETAIL")
          page-loading(:hasMore="hasMore" backgroundColor="white")
        div(slot="1")
          goods-list(:goods="recentGoods")
          page-loading(:hasMore="false" backgroundColor="white")
</template>

<script>
import TopImage from '../../base/top-image'
import GoodsList from '../../base/goods-list'
import MyLoading from '../../base/my-loading'
import SwitchTab from '../../base/switch-tab'
import PageLoading from '../../base/page-loading'
import {ShopModel} from '../../model/ShopModel'
import {GoodsModel} from '../../model/GoodsModel'
import {LazyLoad} from '../../utils/lazyload'
import {mapGetters, mapActions} from 'vuex'
import {share} from '../../utils/utils'

let Shop = new ShopModel()
let Goods = new GoodsModel()

export default {
  data () {
    return {
      shop: {},
      tabs: ['全部商品', '新品上架'],
      allGoods: [],
      recentGoods: [],
      index: 0,
      page: 1,
      hasMore: true,
      pageEnum: this.$config.pageEnum
    }
  },
  onLoad () {
    this.shopID = this.$root.$mp.query.id
    this._loadData()
    Shop.getShopByID(this.shopID).then((res) => {
      this.shop = res
      wx.setNavigationBarTitle({
        title: res.name
      })
    })
    Goods.getRecentGoodsByShopId(this.shopID).then(res => {
      this.recentGoods = res
      this.recentLazyLoad = new LazyLoad({
        data: this.recentGoods,
        page: this
      })
    })
  },
  onShareAppMessage (res) {
    return share(this.shop.name, `page/shop-detail/main?id=${this.shop.id}`)
  },
  onUnload () {
    this.shop = {}
    this.allGoods = []
    this.recentGoods = []
    this.index = 0
    this.page = 1
    this.hasMore = true
    this.$refs.switch.switchTabs(0)
    this.recentLazyLoad = undefined
    this.lazyLoad = undefined
    this.resetLoadingState(this.$config.pageEnum.SHOP_DETAIL)
  },
  methods: {
    _setLoading (length) {
      let total
      const topImageCount = 2
      if (length > 4) {
        total = 4 + topImageCount
      } else {
        total = length + topImageCount
      }
      this.setLoadingState({
        type: this.pageEnum.SHOP_DETAIL,
        total
      })
    },
    _loadData () {
      Goods.getGoodsByShopId(this.shopID, this.page).then(res => {
        this._setLoading(res.length)
        this.allGoods = this.allGoods.concat(res)
        if (!this.lazyLoad) {
          this.lazyLoad = new LazyLoad({
            data: this.allGoods,
            page: this,
            dataLength: res.length
          })
        } else {
          this.lazyLoad.reset({data: this.allGoods})
        }
      }).catch((ex) => {
        this.hasMore = false
        if (this.page === 1) {
          this._setLoading(0)
        }
      })
    },
    switchTabs (index) {
      this.index = index
    },
    ...mapActions([
      'setLoadingState',
      'resetLoadingState'
    ])
  },
  computed: {
    showLoading () {
      return this.loadState[this.pageEnum.SHOP_DETAIL]
    },
    ...mapGetters([
      'loadState'
    ])
  },
  components: {
    TopImage,
    SwitchTab,
    GoodsList,
    MyLoading,
    PageLoading
  },
  onReachBottom () {
    if (this.hasMore && this.index === 0) {
      this.page++
      this._loadData()
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .shop-detail-container
    background-color: $background-color
  .goods-container
    margin-top: 20rpx
    background-color: white
</style>
