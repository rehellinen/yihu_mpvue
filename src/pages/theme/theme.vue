<template lang="pug">
  div.theme-container
    div.theme-left
      div.category(v-for="(item,index) in categories" :key="index"
        :class="{selected: index === currentIndex}"
        @click="switchTabs(index)")
        p {{item.name}}
    div.right
      img
      div
        p test
      div
</template>

<script>
  import {ThemeModel} from '../../model/ThemeModel'

  let Theme = new ThemeModel()

  export default {
    data () {
      return {
        categories: [],
        currentIndex: 0
      }
    },
    onLoad () {
      let themeID = this.$root.$mp.query.id
      Theme.getCategory(themeID).then(res => {
        this.categories = res
      })
      this._loadData()
    },
    methods: {
      _loadData () {

      },
      switchTabs () {

      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"
  .theme-container
    display: flex
    min-height: 100vh

  .theme-left
    border-right: 1rpx solid $lighter-font-color
    display: flex
    flex-direction: column
    flex: 0 0 150rpx

  .category
    height: 90rpx
    display: flex
    align-items: center
    justify-content: center
    font-size: $small-font-size

  .category.selected
    color: $nav-color
    border-left: 3px solid $nav-color

</style>
