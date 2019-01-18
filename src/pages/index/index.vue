<template lang="pug">
  div
    search
    my-loading(:showLoading="showLoading")
    div.container.index-container(:class="showLoading ? 'hidden' : ''")
      swiper.banner(interval='5000', :indicator-dots='false', :autoplay='true')
          swiper-item(v-for="item in banner", :key="item.image_id.id")
            img(:src="item.image_id.image_url")

      div.theme
        p 精 选 主 题
        div.theme-photo-container
          div(v-for="item in theme", :key="item.image_id.id")
            a(:href="'../theme/main?id=' + item.id + '&name=' + item.name")
              img(:src="item.image_id.image_url")

      div.find
        img(src="__IMAGE__/theme/find.png")
      goods-list(:goods="newGoods")
      a(:href="'../goods-more/main?type=' + GoodsType.NEW_GOODS")
        see-more

      div.find
        img(src="__IMAGE__/theme/old.png")
      goods-list(:goods="oldGoods")
      a(:href="'../goods-more/main?type=' + GoodsType.OLD_GOODS")
        see-more
</template>

<script>
  import MyLoading from '../../components/my-loading/my-loading'
  import SeeMore from '../../components/see-more/see-more'
  import GoodsList from '../../components/goods-list/goods-list'
  import {BannerModel} from '../../model/BannerModel'
  import {ThemeModel} from '../../model/ThemeModel'
  import {GoodsModel} from '../../model/GoodsModel'
  import {LazyLoad} from '../../utils/lazyload'
  import Search from '../../components/search/search'
  import {share} from '../../utils/utils'

  const banner = new BannerModel()
  const theme = new ThemeModel()
  const goods = new GoodsModel()

  export default {
    data () {
      return {
        banner: [],
        theme: [],
        newGoods: [],
        oldGoods: [],
        GoodsType: this.$config.GoodsType,
        showLoading: true
      }
    },
    onLoad () {
      this._getData()
    },
    onShareAppMessage (res) {
      return share('易乎', 'page/index/main')
    },
    methods: {
      _getData () {
        const promises = [
          banner.getBanners(),
          theme.getThemes(),
          goods.getIndexNewGoods(),
          goods.getIndexOldGoods()
        ]

        Promise.all(promises).then(res => {
          this.banner = res[0]
          this.theme = res[1]
          this.newGoods = res[2]
          this.oldGoods = res[3]
          this._setLazyLoad()
          this.showLoading = false
        })
      },
      _setLazyLoad () {
        new LazyLoad({
          data: this.newGoods,
          page: this,
          imagesStart: 0,
          dataStart: 0,
          dataLength: 6
        })
        new LazyLoad({
          data: this.oldGoods,
          page: this,
          imagesStart: 6,
          dataStart: 0,
          dataLength: 6
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
