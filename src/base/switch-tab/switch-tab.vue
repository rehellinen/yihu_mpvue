<template lang="pug">
  div.wrap-container(:style="heightStyle")
    div.tab-container
      div.single-tab(
        v-for="(item, index) in tabs", :key="index"
        @click="switchTabs(index)"
        :class="{selected : index === tabIndex}")
        p {{item}}
    div.content(:style="widthStyle + switchStyle")
      slot(name="0")
      slot(name="1")
      slot(name="2")
      slot(name="3")
      slot(name="4")
</template>

<script>
// import {getSwitchTabHeight} from '../../utils/utils'

export default {
  data () {
    return {
      tabIndex: 0,
      switchStyle: '',
      heightStyle: ''
    }
  },
  computed: {
    widthStyle () {
      return `width:${this.tabs.length * 100}vw;`
    }
  },
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    switchTabs (index) {
      this.tabIndex = index
      this.switchStyle = `transform:translate(-${index * 750}rpx,0)`

      // const marginTop = 10
      // const tabHeight = 40
      // getSwitchTabHeight(index).then(height => {
      //   this.heightStyle = `height:${height + marginTop + tabHeight}px`
      // })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
@import "~css/base"
.wrap-container
  width: 750rpx
  overflow: hidden

.tab-container
  background-color: white
  height: 80rpx
  display: flex
  flex-direction: row
  justify-content: space-around
  align-items: center
  font-size: $small-font-size
  color: $light-font-color
  border-bottom: 1px solid $light-font-color

.single-tab
  display: flex
  justify-content: center
  align-items: center
  width: 50%
  height: 100%
.selected
  color: $cart-color
  border-bottom: 2px solid $cart-color

.content
  transition: all 0.4s ease-in-out
  display: flex
  flex-wrap: nowrap
  width: 100vw
  align-items: flex-start
</style>
