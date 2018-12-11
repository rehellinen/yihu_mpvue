<template lang="pug">
div.container
  search
  my-loading(:showLoading="showLoading")
  div.header(:class="showLoading ? 'hidden' : ''")
    img(src="__IMAGE__/theme/shop@header.png")
  shop-list(:shops="pageArray")
  page-loading(:hasMore="hasMore")
</template>

<script>
  import MyLoading from '../../components/my-loading/my-loading'
  import PageLoading from '../../components/page-loading/page-loading'
  import ShopList from '../../components/shop-list/shop-list'
  import Search from '../../components/search/search'
  import {ShopModel} from '../../model/ShopModel'
  import {pageMixin} from '../../utils/mixins'
  import {LazyLoad} from '../../utils/lazyload'
  import {share} from '../../utils/utils'

  const shop = new ShopModel()
  const shopSize = 8
  const imageUrl = '__IMAGE__/icon/no-goods.png'

  export default {
    data () {
      return {
        showLoading: true
      }
    },
    onShareAppMessage (res) {
      return share('自营商店', 'page/shop/main')
    },
    mounted () {
      this.setPageSize(shopSize)
      this._loadData()
    },
    methods: {
      _loadData () {
        shop.getShops(this.page, this.shopSize).then(res => {
          this.setMoreData(res)
          this._processData()
          this._setLazyLoad(res)
          this.showLoading = false
        }).catch(ex => {
          this.hasMore = false
        })
      },
      _setLazyLoad (res) {
        const start = this.getCurrentStart()
        if (this.lazyLoad) {
          this.lazyLoad.reset({
            data: this.pageArray,
            imagesStart: start * 4,
            dataStart: start
          })
        } else {
          this.lazyLoad = new LazyLoad({
            data: this.pageArray,
            page: this,
            imagesStart: start * 4,
            dataStart: start,
            dataLength: res.length,
            per: 4
          })
        }
      },
      _processData () {
        const imageObj = {image_id: {image_url: imageUrl}}
        this.pageArray.forEach(function (item) {
          const main = item.main_image_id
          if (main.length >= 3) {
            item.main_image_id = item.main_image_id.slice(0, 3)
          } else {
            const addLen = 3 - main.length
            for (let i = 0; i < addLen; i++) {
              item.main_image_id.push(imageObj)
            }
          }
        })
      }
    },
    components: {
      MyLoading,
      ShopList,
      Search,
      PageLoading
    },
    mixins: [pageMixin]
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .container
    background-color: $background-color
    .header
      width: 100%
      height: 435rpx
      img
        width: 100%
        height: 435rpx
</style>
