<template lang="pug">
  div
    // 加载中动画
    my-loading(:showLoading="showLoading")
    // 主内容
    div.container.index-container(:class="showLoading ? 'hidden' : ''")
      // 轮播图
      my-banner(:banner="banner")

      div.theme
        p 精 选 主 题
        div.theme-photo-container
          div(v-for="item in theme", :key="item.image_id.id" @click="toTheme(item)")
            img(:src="item.image_id.image_url" mode="aspectFill")

      div.find
        img.find-img(src="/static/images/theme/find.png")
        goods-list(:goods="newGoods")
        see-more(:href="`../goods-more/main?type=${GOODS.NEW_GOODS}`")

      div.find
        img.find-img(src="/static/images/theme/old.png")
        goods-list(:goods="oldGoods")
        see-more(:href="`../goods-more/main?type=${GOODS.OLD_GOODS}`")
</template>

<script>
  import MyLoading from '../../components/my-loading/my-loading'
  import MyBanner from '../../components/my-banner/my-banner'
  import SeeMore from '../../components/see-more/see-more'
  import GoodsList from '../../components/goods-list/goods-list'
  import {BannerModel} from '../../model/BannerModel'
  import {ThemeModel} from '../../model/ThemeModel'
  import {GoodsModel} from '../../model/GoodsModel'
  import {LazyLoad} from '../../utils/lazyload'
  import {share} from '../../utils/utils'
  import {loading} from '../../mixins/loading'

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
        GOODS: this.$config.GOODS
      }
    },
    onLoad () {
      this._getData()
    },
    onShareAppMessage (res) {
      return share('易乎', 'page/index/main')
    },
    methods: {
      toTheme (item) {
        wx.navigateTo({
          url: `../theme/main?id=${item.id}&name=${item.name}`
        })
      },
      _getData () {
        const promises = [
          banner.getBanners(),
          theme.getThemes(),
          goods.getIndexNewGoods(),
          goods.getIndexOldGoods()
        ]

        Promise.all(promises).then(res => {
          [this.banner, this.theme, this.newGoods, this.oldGoods] = res
          this._setLazyLoad()
          this.hideLoading()
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
      MyBanner
    },
    mixins: [loading]
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import '~css/base'
  .index-container
    background-color: $background-color

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
        margin-left: 1vw
  /* theme */

  /* find */
  .find
    display: flex
    flex-direction: column
    align-items: center
    background-color: white
    width: 750rpx
    .find-img
      width: 300rpx
      height: 63rpx
      margin-top: 20rpx
  /* find */
</style>
