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
        text.theme-text 精 选 主 题
        div.theme-photo-container
          img(v-for="item in themes", :src="item.image_id.image_url" :key="item.image_id.id")
</template>

<script>
  import MyLoading from 'components/my-loading/my-loading'
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
      MyLoading
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
</style>
