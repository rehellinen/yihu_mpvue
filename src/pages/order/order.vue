<template lang="pug">
  div.top-container
    switch-tab(:tabs="tabs", @switch="switchTabs")
      div(slot="0")
        order-list(:orders="orders[0]", card="true", @reload="reload")
      div(slot="1")
        order-list(:orders="orders[1]", card="true", @reload="reload" slot="1")
      div(slot="2")
        order-list(:orders="orders[2]", card="true", @reload="reload" slot="2")
      div(slot="3")
        order-list(:orders="orders[3]", card="true", @reload="reload" slot="3")
      div(slot="4")
        order-list(:orders="orders[4]", card="true", @reload="reload" slot="4")
</template>

<script>
import SwitchTab from 'base/switch-tab/switch-tab'
import OrderList from 'base/order-list/order-list'
import PageLoading from '../../base/page-loading/page-loading'
import {OrderModel} from 'model/OrderModel'
import {mapGetters, mapMutations} from 'vuex'

let Order = new OrderModel()

export default {
  onShow () {
    if (this.ordersChange) {
      this.reload()
      this.SET_ORDERS_CHANGE(false)
    } else {
      this._loadData()
    }
  },
  onHide () {
    this.SET_ORDERS_CHANGE(false)
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
  computed: {
    ...mapGetters([
      'ordersChange'
    ])
  },
  methods: {
    switchTabs (index) {
      this.currentIndex = index
      this._loadData()
    },
    _loadData () {
      let index = this.currentIndex
      if (this.hasMore[index]) {
        Order.getOrder(index, this.page[index]).then(res => {
          this.$set(this.orders, index, this.orders[index].concat(res))
        }).catch((ex) => {
          this.hasMore[index] = false
        })
        this.page[index]++
      }
    },
    reload () {
      this.orders = [[], [], [], [], []]
      this.page = [1, 1, 1, 1, 1]
      this.hasMore = [true, true, true, true, true]
      this._loadData()
    },
    ...mapMutations([
      'SET_ORDERS_CHANGE'
    ])
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
