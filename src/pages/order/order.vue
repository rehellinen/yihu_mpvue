<template lang="pug">
  div.top-container
    switch-tab(:tabs="tabs", @switch="switchTabs", ref="switch")
      div(slot="0")
        order-list(:orders="orders[0]", card="true", @reload="reload")
        page-loading(:hasMore="hasMore[0]")
      div(slot="1")
        order-list(:orders="orders[1]", card="true", @reload="reload")
        page-loading(:hasMore="hasMore[1]")
      div(slot="2")
        order-list(:orders="orders[2]", card="true", @reload="reload")
        page-loading(:hasMore="hasMore[2]")
      div(slot="3")
        order-list(:orders="orders[3]", card="true", @reload="reload")
        page-loading(:hasMore="hasMore[3]")
      div(slot="4")
        order-list(:orders="orders[4]", card="true", @reload="reload")
        page-loading(:hasMore="hasMore[4]")
</template>

<script>
import SwitchTab from '../../base/switch-tab'
import OrderList from '../../base/order-list'
import PageLoading from '../../base/page-loading'
import {OrderModel} from '../../model/OrderModel'

let Order = new OrderModel()
const orderSize = 10

export default {
  onShow () {
    this.reload()
  },
  onUnload () {
    this.$refs.switch.switchTabs(0)
  },
  data () {
    return {
      orders: [[], [], [], [], []],
      page: [1, 1, 1, 1, 1],
      hasMore: [true, true, true, true, true],
      currentIndex: 0,
      tabs: ['全部', '待付款', '待发货', '待收货', '已完成'],
      switchStyle: ''
    }
  },
  methods: {
    switchTabs (index) {
      this.currentIndex = index
      this._loadData()
    },
    _loadData () {
      let index = this.currentIndex
      if (this.hasMore[index]) {
        Order.getOrder(index, this.page[index], orderSize).then(res => {
          if (res.length < 12) {
            this.$set(this.hasMore, index, false)
          }
          this.$set(this.orders, index, this.orders[index].concat(res))
        }).catch((ex) => {
          this.$set(this.hasMore, index, false)
        })
        this.page[index]++
      }
    },
    reload () {
      this.orders = [[], [], [], [], []]
      this.page = [1, 1, 1, 1, 1]
      this.hasMore = [true, true, true, true, true]
      this._loadData()
    }
  },
  onReachBottom () {
    this._loadData()
  },
  components: {
    SwitchTab,
    OrderList,
    PageLoading
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .top-container
    background-color: $background-color
    min-height: 100vh
</style>
