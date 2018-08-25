<template lang="pug">
div
  my-loading(:showLoading="showLoading")
  div.container.shop-container(v-show="!showLoading")
    <!--search(:pullDown="pullDown")-->
    div.header-image.header
      img(src="__IMAGE__/theme/shop@header.png")
    shop-list(:shops="shops")
  page-loading(:hasMore="hasMore")
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import PageLoading from '../../base/page-loading/page-loading'
  import ShopList from 'components/shop-list/shop-list'
  import Search from 'base/search/search'
  import {ShopModel} from 'model/ShopModel'
  import {searchMixin, pageMixin} from 'utils/mixins'
  import {mapGetters} from 'vuex'
  import {pageEnum} from 'utils/config'
  import {LazyLoad} from '../../utils/lazyload'

  let Shop = new ShopModel()
  const shopSize = 8
  const imageUrl = '__IMAGE__/icon/no-goods.png'

  export default {
    data () {
      return {
        shops: [],
        hasMore: true
      }
    },
    computed: {
      showLoading () {
        return this.loadState[pageEnum.SHOP]
      },
      ...mapGetters([
        'loadState'
      ])
    },
    mounted () {
      this._loadData()
    },
    methods: {
      _loadData () {
        Shop.getShops(this.page, shopSize).then(res => {
          this.shops = Array.concat(this.shops, res)
          this._processData()
          let start = (this.page - 1) * shopSize
          this.lazyLoad = new LazyLoad({
            data: this.shops,
            page: this,
            imagesStart: start * 4,
            dataStart: start,
            dataLength: 8,
            per: 4
          })
        }).catch(ex => {
          console.log(ex)
          this.hasMore = false
        })
      },
      _processData () {
        let imageObj = {image_id: {image_url: imageUrl}}
        this.shops.forEach(function (item) {
          let main = item.main_image_id
          if (main.length >= 3) {
            item.main_image_id = item.main_image_id.slice(0, 3)
          } else if (main.length === 2) {
            item.main_image_id.push(imageObj)
          } else if (main.length === 1) {
            item.main_image_id.push(imageObj, imageObj)
          } else {
            item.main_image_id.push(imageObj, imageObj, imageObj)
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
    mixins: [searchMixin, pageMixin]
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
    background-color: #F9F9F9
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
