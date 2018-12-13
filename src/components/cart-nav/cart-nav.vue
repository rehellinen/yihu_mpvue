<template lang="pug">
  div
    .placeholder(:style="placeHolderStyle")
    .nav-container(:style="containerStyle")
      p 购物车
</template>

<script>
export default {
  created () {
    this._setStyle()
  },
  data () {
    return {
      containerStyle: '',
      placeHolderStyle: ''
    }
  },
  methods: {
    _setStyle () {
      const position = wx.getMenuButtonBoundingClientRect()
      // define the parameters of the search box and the container
      const containerHeight = position.bottom - position.top
      const containerPaddingTop = position.top
      const containerPaddingBottom = 15 / 2 + 60
      const holderHeight = containerHeight + containerPaddingTop
      this.containerStyle = `height:${containerHeight}px;
      padding-top:${containerPaddingTop}px;
      padding-bottom:${containerPaddingBottom}px`
      this.placeHolderStyle = `height:${holderHeight}px`
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .nav-container
    display: flex
    width: 100%
    padding-bottom: 15rpx
    background-color: $nav-color
    position: fixed
    z-index: 10
    top: 0
    align-items: center
    p
      color: white
      font-size: $big-font-size
      margin-left: 30rpx
      letter-spacing: 2px
</style>
