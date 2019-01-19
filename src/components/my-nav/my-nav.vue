<template lang="pug">
  div.nav-container(:class="{float, 'fixed-color': fixedColor}",
    :style="containerStyle")
    div.capsule(:style="capsuleStyle")
      div.mask(:style="capsuleStyle")
      img(src="__IMAGE__/icon/edit@white.png")
      div.vertical
      img(src="__IMAGE__/icon/home.png")
</template>

<script>
export default {
  created () {
    this._setStyle()
  },
  props: {
    float: {
      type: Boolean,
      default: true
    },
    fixedColor: {
      type: Boolean,
      default: false
    },
    href: {
      type: Object,
      default: ''
    }
  },
  data () {
    return {
      containerStyle: '',
      capsuleStyle: ''
    }
  },
  methods: {
    _setStyle () {
      const position = wx.getMenuButtonBoundingClientRect()
      const containerHeight = position.bottom - position.top

      this.capsuleStyle = `height:${containerHeight}px;
      width:${position.right - position.left}px;`
      this.containerStyle = `height:${containerHeight}px;
      padding-top:${position.top}px`
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .float
    position: fixed
    top: 0
  .fixed-color
    background-color: $nav-color
  .nav-container
    z-index: 100
    width: 100%
    padding-bottom: $nav-bottom
    .capsule
      display: flex
      justify-content: space-between
      align-items: center
      border-radius: 25px
      margin-left: 20rpx
      .mask
        position: absolute
        border-radius: 25px
        background-color: black
        opacity: 0.15
        z-index: 0
      .vertical
        width: 1px
        height: 65%
        background-color: white
      img
        width: 38rpx
        height: 38rpx
        z-index: 10
        margin: 0 20rpx
      img:last-child
        width: 43rpx
        height: 43rpx
  .de
</style>
