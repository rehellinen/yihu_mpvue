<template lang="pug">
  div
    my-loading(:showLoading="showLoading")
    div.container.index-container
      // 轮播图
      swiper.banner(interval='5000' :indicator-dots='showDots' :autoplay='autoPlay')
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
      see-more

      // 旧物漂流
      div.find
        img(src="__IMAGE__/theme/old.png")
      see-more
</template>

<script>
  import MyLoading from 'components/my-loading/my-loading'
  import SeeMore from 'components/see-more/see-more'
  import {BannerModel} from 'model/BannerModel'
  import {ThemeModel} from 'model/ThemeModel'

  let Banner = new BannerModel()
  let Theme = new ThemeModel()

  export default {
    data () {
      return {
        showLoading: false,
        autoPlay: true,
        showDots: false,
        banners: [],
        themes: []
      }
    },
    created () {
      Banner.getBanners().then((res) => {
        this.banners = res
      })
      Theme.getThemes().then((res) => {
        this.themes = res
      })
    },
    components: {
      MyLoading,
      SeeMore
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
      font-size: 35rpx

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
