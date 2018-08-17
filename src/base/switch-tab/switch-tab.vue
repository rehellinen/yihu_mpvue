<template lang="pug">
  div.tab-container
    div.single-tab(
      v-for="(item, index) in tabs", :key="index"
      @click="switchTabs(index)"
      :class="{selected : index === tabIndex}")
      p {{item}}
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0
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
      this.$emit('switch', index)
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
@import "~css/base"
.tab-container
  width: 100%
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
</style>
