<template lang="pug">
  div.theme-container(v-if="categories.length !== 0")
    div.theme-left
      div.category(v-for="(item,index) in categories" :key="index"
        :class="{selected: index === currentIndex}"
        @click="switchTabs(index)")
        p {{item.name}}
    div.theme-right
      img.category-image(:src="categories[currentIndex].image_id.image_url")
      div.text-container
        p {{categories[currentIndex].name}}
      div.goods-container
        div.single-goods
          img
          p test
</template>

<script>
  import {ThemeModel} from '../../model/ThemeModel'
  import {GoodsModel} from '../../model/GoodsModel'

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
        this._loadData()
      })
    },
    methods: {
      _loadData () {
        this.categoryID = this.categories[this.currentIndex].id
      },
      switchTabs (index) {
        this.currentIndex = index
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

  .theme-right
    display: flex
    flex-direction: column

  .category-image
    width: 550rpx
    height: 300rpx
    margin-left: 25rpx
    margin-top: 25rpx

  .text-container
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    font-size: 28rpx
    height: 80rpx

  .text-container text::before, .text-container text::after
    content: ''
    display: inline-block
    position: relative
    bottom: 8rpx
    width: 70rpx
    height: 2rpx
    margin: 0 25rpx
    background-color: #979797

  .goods-container
    width: 600rpx
    display: flex
    flex-wrap: wrap
    margin-top: 15rpx

  .single-goods
    width: 30%
    margin-left: 2.5%
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    margin-bottom: 10rpx

  .goods-image
    width: 100rpx
    height: 100rpx
    border-radius: 120rpx

  .goods-text
    font-size: $small-font-size
    margin-top: 10rpx
</style>
