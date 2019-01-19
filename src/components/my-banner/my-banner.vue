<template lang="pug">
  div
    swiper.banner(interval='5000', :indicator-dots='false', :autoplay='true')
      swiper-item(v-for="item in banner", :key="item.image_id.id")
        img(:src="item.image_id.image_url")
</template>

<script>
export default {
  props: {
    banner: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  /* banner */
  .banner
    width: 750rpx
    height: 415rpx
    img
      width: 750rpx
      height: 415rpx
  /* banner */
</style>
