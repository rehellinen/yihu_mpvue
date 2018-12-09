<template lang="pug">
  div
    <!--search(@touchmove="touchmove")-->
    my-loading(:showLoading="showLoading")
    div.container.index-container(v-show="!showLoading")
      <!--search(:pullDown="pullDown")-->
      // 轮播图
      swiper.banner.header-image.header(interval='5000' :indicator-dots='false' :autoplay='true')
          swiper-item(v-for="item in banners" :key="item.image_id.id")
            img(:src="item.image_id.image_url"
              @load="imageLoaded" :data-type="pageEnum.INDEX")

      // 精选主题
      div.theme
        p 精 选 主 题
        div.theme-photo-container
          img(v-for="item in themes", :src="item.image_id.image_url"
            :key="item.image_id.id" @click="toTheme({id: item.id, name: item.name})"
            @load="imageLoaded" :data-type="pageEnum.INDEX")

      // 发现鲜货
      div.find
        img(src="__IMAGE__/theme/find.png")
      goods-list(:goods="newGoods" :from="pageEnum.INDEX")
      div(@click="toGoodsMore(GoodsType.NEW_GOODS)")
        see-more

      // 旧物漂流
      div.find
        img(src="__IMAGE__/theme/old.png")
      goods-list(:goods="oldGoods" :from="pageEnum.INDEX")
      div(@click="toGoodsMore(GoodsType.OLD_GOODS)")
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
  import {searchMixin} from '../../utils/mixins'
  import {mapGetters} from 'vuex'
  import {share} from '../../utils/utils'

  let Banner = new BannerModel()
  let Theme = new ThemeModel()
  let Goods = new GoodsModel()

  export default {
    mixins: [searchMixin],
    data () {
      return {
        banners: [],
        themes: [],
        newGoods: [],
        oldGoods: [],
        goodsImages: [],
        GoodsType: this.$config.GoodsType,
        pageEnum: this.$config.pageEnum
      }
    },
    computed: {
      showLoading () {
        return this.loadState[this.$config.pageEnum.INDEX]
      },
      ...mapGetters([
        'loadState'
      ])
    },
    onLoad () {
      this._getData()
    },
    onShareAppMessage (res) {
      return share('校园易乎', 'page/index/main')
    },
    methods: {
      touchmove (event) {
        console.log(event)
      },
      toTheme ({id, name}) {
        wx.navigateTo({
          url: `../theme/main?id=${id}&name=${name}`
        })
      },
      toGoodsMore (type) {
        wx.navigateTo({
          url: `../goods-more/main?type=${type}`
        })
      },
      _getData () {
        Banner.getBanners().then((res) => {
          this.banners = res
        })
        Theme.getThemes().then((res) => {
          this.themes = res
        })
        Goods.getIndexNewGoods().then((res) => {
          this.newGoods = res
          this.newGoodsLazyLoad = new LazyLoad({
            data: this.newGoods,
            page: this,
            imagesStart: 0,
            dataStart: 0,
            dataLength: 6
          })
        })
        Goods.getIndexOldGoods().then((res) => {
          this.oldGoods = res
          this.oldGoodsLazyLoad = new LazyLoad({
            data: this.oldGoods,
            page: this,
            imagesStart: 6,
            dataStart: 0,
            dataLength: 6
          })
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
