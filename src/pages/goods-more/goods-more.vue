<template lang="pug">
  div.goods-more-container.header
    my-loading(:showLoading="showLoading")
    //search(:pullDown="pullDown")
    div(v-show="!showLoading")
      title-panel(:title="title")
      goods-list(:goods="goods", backgroundColor="#f9f9f9", :from="pageEnum.GOODS_MORE")
</template>

<script>
import GoodsList from 'base/goods-list/goods-list'
import {searchMixin, pageMixin} from 'utils/mixins'
import {GoodsModel} from 'model/GoodsModel'
import {LazyLoad} from 'utils/lazyload'
import TitlePanel from 'base/title-panel/title-panel'
import {GoodsType, pageEnum} from 'utils/config'
import Search from 'base/search/search'
import MyLoading from 'base/my-loading/my-loading'
import {mapGetters} from 'vuex'

let Goods = new GoodsModel()

export default {
  data () {
    return {
      page: 1,
      goods: [],
      title: '',
      size: 12,
      pageEnum
    }
  },
  mixins: [searchMixin, pageMixin],
  computed: {
    showLoading () {
      return this.loadState[pageEnum.GOODS_MORE]
    },
    ...mapGetters([
      'loadState'
    ])
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
      Goods.getGoods(this.type, this.page, this.size).then(res => {
        this.goods = this.goods.concat(res)
        // let start = (this.page - 1) * this.size
        if (this.lazyLoad) {
          this.lazyLoad.reset({
            data: this.goods
          })
        } else {
          this.lazyLoad = new LazyLoad({
            data: this.goods,
            page: this,
            dataLength: res.length
          })
        }
      }).catch(ex => {
        this.hasMore = false
      })
    }
  },
  components: {
    GoodsList,
    TitlePanel,
    Search,
    MyLoading
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
