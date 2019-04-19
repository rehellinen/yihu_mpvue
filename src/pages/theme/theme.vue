<template lang="pug">
  div
    my-loading(:showLoading="showLoading")
    div.theme-container(v-if="goods.length !== 0")
      div.theme-left
        div.category(v-for="(item,index) in categories" :key="index"
          :class="{selected: index === currentIndex}"
          @click="switchTabs(index)")
          p {{item.name}}

      div.theme-right(:style="switchStyle")
        scroll-view.scroll(scroll-y="true", @scrolltolower="lowerLoad",
          v-for="(item, index) in categories", :key="index")
          img.category-image(:src="item.image_id.image_url"
            @load="imageLoaded" :data-type="pageEnum.THEME")
          div.text-container
            p {{item.name}}
          div.goods-container
            div.single-goods(v-for="(ware,wareIndex) in goods[index]" :key="ware.id" @click="toDetail({id: ware.id, type: ware.type})")
              img.goods-image(:src="ware.image_id.image_url"
                @load="imageLoaded" :data-type="pageEnum.THEME")
              p.goods-text {{ware.name}}
          page-loading(:hasMore="hasMore[index]", :backgroundColor="backgroundColor")
</template>

<script>
  import {ThemeModel} from '../../model/ThemeModel'
  import {GoodsModel} from '../../model/GoodsModel'
  import PageLoading from '../../components/page-loading/page-loading'
  import MyLoading from '../../components/my-loading/my-loading'
  import {mapGetters, mapActions} from 'vuex'
  import {share} from '../../utils/utils'

  let Theme = new ThemeModel()
  let Goods = new GoodsModel()
  const goodsSize = 12

  export default {
    data () {
      return {
        categories: [],
        currentIndex: 0,
        goods: [],
        page: [],
        hasMore: [],
        switchStyle: '',
        backgroundColor: this.$config.COLOR.WHITE,
        pageEnum: this.$config.pageEnum
      }
    },
    onShareAppMessage (res) {
      return share(this.title, `page/theme/main?id=${this.id}`)
    },
    onLoad () {
      this.id = this.$root.$mp.query.id
      this.title = this.$root.$mp.query.name
      wx.setNavigationBarTitle({
        title: this.title
      })
      this._loadData(this.id)
    },
    onUnload () {
      this.categories = []
      this.goods = []
      this.currentIndex = 0
      this.page = []
      this.hasMore = []
      this.switchStyle = ''
      this.resetLoadingState(this.$config.pageEnum.THEME)
    },
    methods: {
      _setLoading (length) {
        if (this.currentIndex !== 0) {
          return
        }
        let total
        const topImageCount = 1
        if (length > 12) {
          total = 12 + topImageCount
        } else {
          total = length + topImageCount
        }
        this.setLoadingState({
          type: this.pageEnum.THEME,
          total
        })
      },
      toDetail ({id, type}) {
        wx.navigateTo({
          url: `../goods-detail/main?id=${id}&type=${type}`
        })
      },
      lowerLoad () {
        this.page[this.currentIndex]++
        if (this.hasMore[this.currentIndex]) {
          this._loadGoods()
        }
      },
      _loadData (themeID) {
        Theme.getCategory(themeID).then(res => {
          this.categories = res
          this._processData()
          this._loadGoods()
        })
      },
      _loadGoods () {
        let categoryID = this.categories[this.currentIndex].id
        Goods.getGoodsByCategoryID(categoryID, this.page[this.currentIndex], goodsSize).then(res => {
          this._setLoading(res.length)
          if (this.goods[this.currentIndex]) {
            res = this.goods[this.currentIndex].concat(res)
          }
          this.$set(this.goods, this.currentIndex, res)
          if (res.length < goodsSize) {
            this.$set(this.hasMore, this.currentIndex, false)
          }
        }).catch(ex => {
          this.$set(this.hasMore, this.currentIndex, false)
          this._setLoading(0)
        })
      },
      switchTabs (index) {
        this.currentIndex = index
        // 过渡动画
        this.switchStyle = `transform:translate(0, -${index}00vh)`
        // 只当此tab没有数据时才加载
        if (!this.goods[index] && this.hasMore[index]) {
          this._loadGoods()
        }
      },
      _processData () {
        let length = this.categories.length
        for (let i = 0; i < length; i++) {
          this.hasMore[i] = true
          this.page[i] = 1
        }
      },
      ...mapActions([
        'setLoadingState',
        'resetLoadingState'
      ])
    },
    computed: {
      showLoading () {
        return this.loadState[this.pageEnum.THEME]
      },
      ...mapGetters([
        'loadState'
      ])
    },
    components: {
      PageLoading,
      MyLoading
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
    font-size: $smaller-font-size
    margin-top: 10rpx
</style>
