<template lang="pug">
  div.goods-more-container.header
    // search(:pullDown="pullDown")
    title-panel(:title="title")
    goods-list(:goods="goods", backgroundColor="#f9f9f9")
</template>

<script>
import GoodsList from 'base/goods-list/goods-list'
import {searchMixin, pageMixin} from 'utils/mixins'
import {GoodsModel} from 'model/GoodsModel'
import {LazyLoad} from 'utils/lazyload'
import TitlePanel from 'base/title-panel/title-panel'
import {GoodsType} from 'utils/config'
import Search from 'base/search/search'

let Goods = new GoodsModel()

export default {
  data () {
    return {
      page: 1,
      goods: [],
      title: ''
    }
  },
  mixins: [searchMixin, pageMixin],
  onPageScroll () {
    this.lazyLoad.refresh()
  },
  mounted () {
    this.type = this.$root.$mp.query.type
    if (parseInt(this.type) === GoodsType.NEW_GOODS) {
      this.title = '发现鲜货'
    } else {
      this.title = '旧物漂流'
    }
    this._loadData()
  },
  methods: {
    _loadData () {
      Goods.getGoods(this.type, this.page).then(res => {
        this.goods = this.goods.concat(res)
        this.lazyLoad = new LazyLoad(this.goods, this)
      }).catch(ex => {
        this.hasMore = false
      })
    }
  },
  components: {
    GoodsList,
    TitlePanel,
    Search
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import '~css/base'
  .goods-more-container
    background-color: $background-color
    min-height: 100vh
    overflow: hidden
    padding-bottom: 20rpx
</style>
