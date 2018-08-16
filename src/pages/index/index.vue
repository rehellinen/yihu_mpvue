<template lang="pug">
  div
    my-loading(:showLoading="showLoading")
    div.container.index-container(v-if="!showLoading")
      search(:pullDown="pullDown")
      // 轮播图
      swiper.banner.header-image(interval='5000' :indicator-dots='false' :autoplay='true')
          swiper-item(v-for="item in banners" :key="item.image_id.id")
            img(:src="item.image_id.image_url")

      // 精选主题
      div.theme
        p 精 选 主 题
        div.theme-photo-container
          img(v-for="item in themes", :src="item.image_id.image_url" :key="item.image_id.id")

      // 发现鲜货
      div.find
        img(src="__IMAGE__/theme/find.png")
      goods-list(:goods="newGoods")
      see-more

      // 旧物漂流
      div.find
        img(src="__IMAGE__/theme/old.png")
      goods-list(:goods="oldGoods")
      see-more
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import SeeMore from 'base/see-more/see-more'
  import GoodsList from 'base/goods-list/goods-list'
  import {BannerModel} from 'model/BannerModel'
  import {ThemeModel} from 'model/ThemeModel'
  import {GoodsModel} from 'model/GoodsModel'
  import {LazyLoad} from 'utils/lazyload'
  import {Load} from 'utils/load'
  import Search from 'base/search/search'
  import {searchMixin} from 'utils/mixins'

  let Banner = new BannerModel()
  let Theme = new ThemeModel()
  let Goods = new GoodsModel()

  const REQUEST_NUMBER = 4

  export default {
    mixins: [searchMixin],
    data () {
      return {
        showLoading: true,
        banners: [],
        themes: [],
        newGoods: [],
        oldGoods: [],
        goodsImages: []
      }
    },
    mounted () {
      this._getData()
      this.load = new Load(this, REQUEST_NUMBER)
    },
    onPageScroll (opt) {
      this.newGoodsLazyLoad.refresh()
      this.oldGoodsLazyLoad.refresh()
    },
    methods: {
      _getData () {
        Banner.getBanners().then((res) => {
          this.banners = res
          this.load.isLoadedAll()
        })
        Theme.getThemes().then((res) => {
          this.themes = res
          this.load.isLoadedAll()
        })
        Goods.getIndexNewGoods().then((res) => {
          this.newGoods = res
          this.load.isLoadedAll()
          this.newGoodsLazyLoad = new LazyLoad(this.newGoods, this)
        })
        Goods.getIndexOldGoods().then((res) => {
          this.oldGoods = res
          this.load.isLoadedAll()
          this.oldGoodsLazyLoad = new LazyLoad(this.oldGoods, this, 6)
        })
      }
    },
    components: {
      MyLoading,
      SeeMore,
      GoodsList,
      Search
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import '~css/base'
  .index-container
    background-color: $background-color

  /* banner */
  .banner
    width: 750rpx
    height: 415rpx
    img
      width: 750rpx
      height: 415rpx
  /* banner */

  /* theme */
  .theme
    display: flex
    flex-direction: column
    color: $base-font-color
    background-color: white
    align-items: center
    p
      margin-bottom: 5px
      font-size: $big-font-size

  .theme-photo-container
    display: flex
    flex-direction: row
    flex-wrap: wrap
    img
      width: 48.5vw
      height: 183rpx
      margin-top: 10rpx
      margin-left: 1vw
  /* theme */

  /* find */
  .find
    display: flex
    align-items: center
    justify-content: center
    padding: 40rpx 0 20rpx 0
    background-color: white
    width: 750rpx
    height: 63rpx
    img
      width: 300rpx
      height: 63rpx
  /* find */
</style>
