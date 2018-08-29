<template lang="pug">
  div.theme-container(v-if="categories.length !== 0")
    div.theme-left
      div.category(v-for="(item,index) in categories" :key="index"
        :class="{selected: index === currentIndex}"
        @click="switchTabs(index)")
        p {{item.name}}

    div.theme-right(:style="switchStyle")
      scroll-view.scroll(scroll-y="true", @scrolltolower="lowerLoad",
        v-for="(item, index) in categories", :key="index")
        img.category-image(:src="item.image_id.image_url")
        div.text-container
          p {{item.name}}
        div.goods-container
          div.single-goods(v-for="(ware,wareIndex) in goods[index]" :key="ware.id")
            img.goods-image(:src="ware.image_id.image_url")
            p.goods-text {{ware.name}}
</template>

<script>
  import {ThemeModel} from '../../model/ThemeModel'
  import {GoodsModel} from '../../model/GoodsModel'

  let Theme = new ThemeModel()
  let Goods = new GoodsModel()
  const goodsSize = 12

  export default {
    data () {
      return {
        categories: [],
        currentIndex: 0,
        goods: [],
        page: [1],
        hasMore: [true],
        switchStyle: ''
      }
    },
    onLoad () {
      let themeID = this.$root.$mp.query.id
      wx.setNavigationBarTitle({
        title: this.$root.$mp.query.name
      })
      this._loadData(themeID)
    },
    onUnload () {
      this.categories = {}
      this.goods = []
      this.currentIndex = 0
      this.page = [1]
      this.hasMore = [true]
      this.switchStyle = ''
    },
    methods: {
      lowerLoad () {
        this.page[this.currentIndex] ? this.page[this.currentIndex]++ : this.page[this.currentIndex] = 1
        if (this.hasMore[this.currentIndex] === undefined) {
          this.hasMore[this.currentIndex] = true
        }
        if (this.hasMore[this.currentIndex]) {
          this._loadGoods()
        }
      },
      _loadData (themeID) {
        Theme.getCategory(themeID).then(res => {
          this.categories = res
          this._loadGoods()
        })
      },
      _loadGoods () {
        let categoryID = this.categories[this.currentIndex].id
        Goods.getGoodsByCategoryID(categoryID, this.page[this.currentIndex], goodsSize).then(res => {
          if (this.goods[this.currentIndex]) {
            res = this.goods[this.currentIndex].concat(res)
          }
          this.$set(this.goods, this.currentIndex, res)
        }).catch(ex => {
          this.hasMore[this.currentIndex] = false
        })
      },
      switchTabs (index) {
        this.currentIndex = index
        // 过渡动画
        this.switchStyle = `transform:translate(0, -${index}00vh)`
        // 只当此tab没有数据时才加载
        if (!this.goods[index]) {
          this._loadGoods()
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"
  .theme-container
    display: flex
    color: $base-font-color
    overflow: hidden
    height: 100vh

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
    flex-wrap: wrap
    width: 600rpx
    transition: all 0.5s ease-in-out

  .scroll
    display: flex
    flex-direction: column
    height: 100vh

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

  .text-container p::before, .text-container p::after
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
    margin-bottom: 40rpx

  .goods-image
    width: 110rpx
    height: 110rpx
    border-radius: 120rpx

  .goods-text
    font-size: $small-font-size
    margin-top: 10rpx
</style>
