<template lang="pug">
  div.search-container(:class="containerClass", :style="containerStyle")
    input(
      placeholder="请输入搜索内容",
    :class="inputClass"
        )
</template>

<script>
export default {
  props: {
    pullDown: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      containerClass: '',
      containerStyle: '',
      inputClass: 'up'
    }
  },
  watch: {
    pullDown (newValue) {
      if (-newValue > 50) {
        this.containerClass = 'down-container'
        this.inputClass = 'down'
      } else {
        this.containerClass = ''
        this.inputClass = 'up'
      }
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .search-container
    display: flex
    justify-content: center
    align-items: center
    height: 100rpx
    width: 100%
    position: fixed
    top: 0
    transition: all 0.4s
    z-index: 100
  .relative
    position: relative
  .down-container
    background-color: $nav-color

  input
    width: 85%
    height: 65rpx
    border-radius: 42px
    font-size: $small-font-size
    padding-left: 10px
    border: 2px solid $nav-color
  .up
    background-color: white
    color: $base-font-color

  .down
    background-color: white
    color: $base-font-color
</style>
