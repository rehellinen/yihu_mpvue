<template lang="pug">
  div
    my-nav()
    my-loading(:showLoading="showLoading")
    div.container.personal-container(:class="showLoading ? 'hidden' : ''")
      // 个人信息栏
      top-image(type="user")
      // 个人信息栏

      // 我的订单
      div.order-container
        div.image-container
          img(src="__IMAGE__/theme/personal@order.png")
        order-list(:orders="orders", @reload="reload")
        see-more(href="../order/main", v-if="orders.length !==0")
        page-loading(:hasMore="false" backgroundColor="white" v-else)
      // 我的订单

      // 跳转到其他小程序
      about-us
      // 跳转到其他小程序
</template>

<script>
  import MyLoading from '../../components/my-loading/my-loading'
  import MyNav from '../../components/my-nav/my-nav'
  import TopImage from '../../components/top-image/top-image'
  import PageLoading from '../../components/page-loading/page-loading'
  import AboutUs from '../../components/about-us/about-us'
  import SeeMore from '../../components/see-more/see-more'
  import OrderList from '../../components/order-list/order-list'
  import {OrderModel} from '../../model/OrderModel'
  import {loading} from '../../mixins/loading'
  import {mapGetters, mapActions} from 'vuex'

  let Order = new OrderModel()
  const ORDER_PAGE = 1
  const ORDER_COUNT = 2

  export default {
    data () {
      return {
        orders: []
      }
    },
    onLoad () {
      if (!this.ordersChange) {
        this._loadData()
      }
    },
    onHide () {
      this.setOrderChange(false)
    },
    onShow () {
      if (this.ordersChange) {
        this.reload()
        this.setOrderChange(false)
      }
    },
    computed: {
      ...mapGetters([
        'ordersChange'
      ])
    },
    methods: {
      reload () {
        this.orders = []
        this._loadData()
      },
      _loadData () {
        // 获取订单
        Order.getOrder(this.$config.orderEnum.ALL, ORDER_PAGE, ORDER_COUNT).then(res => {
          this._processOrder(res)
          this.hideLoading()
        }).catch(ex => {
          this.hideLoading()
        })
      },
      _processOrder (order) {
        if (order.length >= 2) {
          this.orders.push(order[0])
          this.orders.push(order[1])
        } else {
          this.orders = order
        }
      },
      ...mapActions([
        'setOrderChange'
      ])
    },
    components: {
      MyLoading,
      TopImage,
      SeeMore,
      OrderList,
      PageLoading,
      AboutUs,
      MyNav
    },
    mixins: [loading]
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .personal-container
    background-color: $background-color
    padding-bottom: $card-margin-top
    min-height: 100vh
    width: 750rpx
    overflow: hidden

  .order-container
    display: flex
    flex-direction: column
    background-color: white
    margin-top: 20rpx
    width: $card-width
    margin-left: $card-margin-left
    border-radius: $card-border-radius
    overflow: hidden
    .image-container
      display: flex
      justify-content: center
      padding: 30rpx 0
      border-bottom: 1rpx solid $lighter-font-color
      width: 90%
      margin-left: 5%
      align-items: center
      img
        width: 170rpx
        height: 50rpx
</style>
