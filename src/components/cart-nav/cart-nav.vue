<template lang="pug">
  div.cart-nav-container(:style="containerStyle")
    .placeholder(:style="placeHolderStyle")
    <!--.nav-top(:style="[navTopStyle, navTopScroll]")-->
      <!--p 购物车-->
    .nav-scroll(:style="navScrollStyle")
      p 购物车
</template>

<script>
export default {
  created () {
    this._setStyle()
    this._moveNav()
  },
  data () {
    return {
      navScrollStyle: '',
      navTopStyle: '',
      placeHolderStyle: '',
      containerStyle: '',
      navTopScroll: ''
    }
  },
  methods: {
    _moveNav () {
      setInterval(() => {
        wx.createSelectorQuery().select('.cart-nav-container').boundingClientRect(res => {
          let top = res.top
          this.navTopScroll = `opacity:${-top / 60}`
          this.containerStyle = `transform:translateY(${top})`
        }).exec()
      }, 200)
    },
    _setStyle () {
      const position = wx.getMenuButtonBoundingClientRect()
      // define the parameters of the search box and the container
      const containerHeight = position.bottom - position.top
      const containerPaddingTop = position.top
      const containerPaddingBottom = 60
      const holderHeight = containerHeight + containerPaddingTop

      this.navScrollStyle = `height:${containerHeight}px;
      padding-top:${containerPaddingTop}px;
      padding-bottom:${containerPaddingBottom}px`
      this.navTopStyle = `height:${containerHeight}px;
      padding-top:${containerPaddingTop}px;`
      this.placeHolderStyle = `height:${holderHeight}px`
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .nav-top
    display: flex
    justify-content: center
    position: absolute
    top: 0
    left: 0
    width: 100%
    z-index: 300
    opacity: 1
    background-color: $nav-color
    p
      color: white
      font-size: $normal-font-size
      letter-spacing: 2px
  .nav-scroll
    display: flex
    width: 100%
    padding-bottom: 15rpx
    background-color: $nav-color
    position: absolute
    top: 0
    align-items: center
    p
      color: white
      font-size: $big-font-size
      margin-left: 30rpx
      letter-spacing: 2px
</style>
