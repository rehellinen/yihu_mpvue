<template lang="pug">
  div
    div.reference
    div.nav-container(:class="{float, 'fixed-color': fixedColor}",
      :style="containerStyle")
      div.back-color(:style="colorStyle + opacityStyle",
        v-if="!fixedColor")
      div.capsule(:style="capsuleStyle")
        div.mask(:style="capsuleStyle")
        div.img-container
          img(src="__IMAGE__/icon/edit@white.png" @click="toCustom")
        div.img-container
          img(src="__IMAGE__/icon/home.png" @click="toHome")
</template>

<script>
export default {
  created () {
    this._setStyle()
    this._moveNav()
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
      capsuleStyle: '',
      opacityStyle: '',
      colorStyle: ''
    }
  },
  methods: {
    toCustom () {
      if (!this.href) wx.navigateBack()
      else wx.navigateTo({ url: this.href })
    },
    toHome () {
      wx.switchTab({
        url: '../index/main'
      })
    },
    _moveNav () {
      this.interval = setInterval(() => {
        wx.createSelectorQuery().select('.reference').boundingClientRect(res => {
          let top = res.top
          this.opacityStyle = `opacity:${-top / 50}`
        }).exec()
      }, 15)
    },
    _setStyle () {
      const position = wx.getMenuButtonBoundingClientRect()
      const containerHeight = position.bottom - position.top

      this.capsuleStyle = `height:${containerHeight}px;
      width:${position.right - position.left}px;`
      this.containerStyle = `height:${containerHeight}px;
      padding-top:${position.top}px;`
      this.colorStyle = `height:${position.bottom}px;`
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
    .back-color
      position: fixed
      padding-bottom: $nav-bottom
      top: 0
      left: 0
      width: 100%
      opacity: 0
      background-color: $nav-color
    .capsule
      display: flex
      justify-content: space-around
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
      .img-container
        width: 50%
        display: flex
        justify-content: center
        align-items: center
        z-index: 10
        img
          width: 40rpx
          height: 40rpx
      .img-container:last-child
        border-left: 1rpx solid white
  .de
</style>
