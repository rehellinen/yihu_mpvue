<template lang="pug">
  div.goods-more-container
    title-panel(:title="title")
    goods-list(:goods="goods", backgroundColor="#f9f9f9")
</template>

<script>
import GoodsList from 'base/goods-list/goods-list'
import {searchMixin} from 'utils/mixins'
import {GoodsModel} from 'model/GoodsModel'
import {LazyLoad} from 'utils/lazyload'
import TitlePanel from 'base/title-panel/title-panel'
import {GoodsType} from 'utils/config'

let Goods = new GoodsModel()

export default {
  data () {
    return {
      page: 1,
      goods: [],
      title: ''
    }
  },
  mixins: [searchMixin],
  onPageScroll () {
    this.lazyLoad.refresh()
  },
  mounted () {
    let type = this.$root.$mp.query.type
    if (parseInt(type) === GoodsType.NEW_GOODS) {
      this.title = '发现鲜货'
    } else {
      this.title = '旧物漂流'
    }
    Goods.getGoods(type, this.page).then(res => {
      this.goods = res
      this.lazyLoad = new LazyLoad(this.goods, this)
    })
  },
  components: {
    GoodsList,
    TitlePanel
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import '~css/base'
  .goods-more-container
    background-color: $background-color
    min-height: 100vh
    overflow: hidden
</style>
