<template lang="pug">
  div.nav-container(:class="{float, 'fixed-color': fixedColor}",
    :style="containerStyle")
    div.capsule(:style="capsuleStyle")
      img(src="__IMAGE__/icon/edit.png")
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
  @import "~css/base"
  .nav-container
    z-index: 100
    width: 100%
    padding-bottom: $nav-bottom
    .capsule
      display: flex
      justify-content: space-around
      align-items: center
      background-color: black
      opacity: 0.15
      border-radius: 25px
      margin-left: 20rpx
      img
        width: 35rpx
        height: 35rpx
  .de
</style>
