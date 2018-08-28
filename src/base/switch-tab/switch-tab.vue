<template lang="pug">
  div.wrap-container
    div.tab-container
      div.single-tab(
        v-for="(item, index) in tabs", :key="index"
        @click="switchTabs(index)"
        :class="{selected : index === tabIndex}")
        p {{item}}
    div.content
      div.switch-0(v-if="tabIndex === 0", :style="switchStyle[0]")
        slot(name="0")
      div.switch-1(v-if="tabIndex === 1", :style="switchStyle[1]")
        slot(name="1")
      div.switch-2(v-if="tabIndex === 2", :style="switchStyle[2]")
        slot(name="2")
      div.switch-3(v-if="tabIndex === 3", :style="switchStyle[3]")
        slot(name="3")
      div.switch-4(v-if="tabIndex === 4", :style="switchStyle[4]")
        slot(name="4")
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0,
      switchStyle: ['', '', '', '', '']
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
      // this.switchStyle[this.tabIndex] = `transform:translateX(750rpx)`
      // this.switchStyle[index] = `opacity:0`
      this.tabIndex = index
      this.$emit('switch', index)
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
  width: 100vw
  > div
    width: 100vw
</style>
