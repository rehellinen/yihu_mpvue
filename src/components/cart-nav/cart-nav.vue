<template lang="pug">
  div.cart-nav-container
    .nav-top(:style="navTopStyle + navTopScroll")
      p 购物车
    div(:style="containerStyle")
      .nav-scroll(:style="navScrollStyle")
        p 购物车
</template>

<script>
export default {
  created () {
    this._setStyle()
    this._moveNav()
  },
  onHide () {
    clearInterval(this.interval)
  },
  data () {
    return {
      navScrollStyle: '',
      navTopStyle: '',
      containerStyle: '',
      navTopScroll: ''
    }
  },
  methods: {
    _moveNav () {
      this.interval = setInterval(() => {
        wx.createSelectorQuery().select('.cart-nav-container').boundingClientRect(res => {
          let top = res.top
          this.navTopScroll = `opacity:${-top / 50}`
          this.containerStyle = `transform:translateY(${top})`
        }).exec()
      }, 100)
    },
    _setStyle () {
      const position = wx.getMenuButtonBoundingClientRect()
      // define the parameters of the search box and the container
      const containerHeight = position.bottom - position.top
      const containerPaddingTop = position.top
      const containerPaddingBottom = 60

      this.navScrollStyle = `height:${containerHeight}px;
      padding-top:${containerPaddingTop}px;
      padding-bottom:${containerPaddingBottom}px`
      this.navTopStyle = `height:${containerHeight}px;
      padding-top:${containerPaddingTop}px;`
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .cart-nav-container
    height: 1px
    .nav-top
      display: flex
      justify-content: center
      position: fixed
      top: 0
      left: 0
      width: 100%
      z-index: 300
      transition: all linear 50ms
      padding-bottom: $nav-bottom
      opacity: 0
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
