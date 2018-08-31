<template lang="pug">
  div.container.order-detail-container
    my-loading(:showLoading="showLoading")
    div.order-basic-info
      div.order-time-no
        div
          p.key 下单时间：
          p.value {{order.create_time}}
        div
          p.key 订单编号：
          p.order-no-text.value {{order.order_no}}
      div.order-status
        p(:class="statusClass") {{statusText}}

    seller-info(:seller="seller" :from="pageEnum.ORDER_DETAIL")
    cart-list(:goods="order.snap_items" :from="pageEnum.ORDER_DETAIL")

    div.order-accounts(v-if="!showLoading")
      div.total-account 付款合计：￥{{order.total_price}}
      div.pay(v-if="order.status === orderEnum.UNPAID", @click="toPay") 去付款
      div.pay(v-if="order.status === orderEnum.DELIVERED" @click="toConfirm") 确认收货
</template>

<script>
  import CartList from '../../components/cart-list/cart-list'
  import SellerInfo from '../../base/seller-info/seller-info'
  import MyLoading from 'base/my-loading/my-loading'
  import {OrderModel} from '../../model/OrderModel'
  import {ShopModel} from '../../model/ShopModel'
  import {mapActions, mapGetters} from 'vuex'

  let Order = new OrderModel()
  let Shop = new ShopModel()
  const sellerPhotosCount = 4

  export default {
    onLoad () {
      let {id} = this.$root.$mp.query
      this._loadData(id)
    },
    onUnload () {
      this.order = {}
      this.seller = {}
      this.resetLoadingState(this.$config.pageEnum.ORDER_DETAIL)
    },
    methods: {
      toConfirm () {
        wx.showModal({
          content: '是否确认收货',
          success: (res) => {
            if (res.confirm) {
              Order.confirm(this.order.id).then(() => {
                wx.showToast({
                  title: '已确认收货',
                  image: this.$config.iconType.SUCCESS
                })
                this.order.status = this.$config.orderEnum.COMPLETED
                this.setOrderChange(true)
              }).catch(ex => {
                console.log(ex)
                wx.showToast({
                  title: '确认收货失败',
                  image: this.$config.iconType.FAIL
                })
              })
            }
          }
        })
      },
      _loadData (id) {
        Order.getOrderByID(id).then(res => {
          this._setLoading(res.snap_items.length)
          this.order = res
          if (res.type === this.$config.GoodsType.NEW_GOODS) {
            return Shop.getShopByID(res.foreign_id)
          } else {
            return Shop.getSellerByID(res.foreign_id)
          }
        }).then(res => {
          this.seller = res
        })
      },
      _setLoading (length) {
        this.setLoadingState({
          total: length + sellerPhotosCount,
          type: this.pageEnum.ORDER_DETAIL
        })
      },
      ...mapActions([
        'setLoadingState',
        'resetLoadingState',
        'setOrderChange'
      ])
    },
    data () {
      return {
        order: {},
        seller: {},
        orderEnum: this.$config.orderEnum,
        pageEnum: this.$config.pageEnum
      }
    },
    computed: {
      showLoading () {
        return this.loadState[this.pageEnum.ORDER_DETAIL]
      },
      statusText () {
        let orderStatus = this.$config.orderEnum
        if (this.order.status === orderStatus.UNPAID) {
          return '未付款'
        } else if (this.order.status === orderStatus.PAID) {
          return '待发货'
        } else if (this.order.status === orderStatus.DELIVERED) {
          return '已发货'
        } else if (this.order.status === orderStatus.COMPLETED) {
          return '已完成'
        } else if (this.order.status === orderStatus.PAID_BUT_NO_GOODS) {
          return '库存不足'
        } else {
          return '未知状态'
        }
      },
      statusClass () {
        let orderStatus = this.$config.orderEnum
        if (this.order.status === orderStatus.UNPAID || this.order.status === orderStatus.PAID_BUT_NO_GOODS) {
          return 'unpay'
        } else if (this.order.status === orderStatus.PAID || this.order.status === orderStatus.DELIVERED) {
          return 'payed'
        } else if (this.order.status === orderStatus.COMPLETED) {
          return 'done'
        } else {
          return 'unpay'
        }
      },
      ...mapGetters([
        'loadState'
      ])
    },
    components: {
      CartList,
      SellerInfo,
      MyLoading
    }
  }
</script>

<style scoped lang="sass">
  @import "~css/base"
  .order-detail-container
    background-color: $background-color
    min-height: 100vh
  .order-basic-info
    border-bottom: 1rpx solid $lighter-font-color
    display: flex
    padding: 20rpx 0
    width: 750rpx
    font-size: $small-font-size
    background-color: white

  .order-time-no
    flex: 1
    margin-left: 30rpx
    div
      display: flex
    div:first-child
      margin-bottom: 20rpx

  .key
    color: #999

  .val
    margin-left: 10rpx
    color: #333

  .order-no-txt
    letter-spacing: 2rpx
    color: #999

  .order-status
    display: flex
    flex-basis: 110rpx
    align-items: center
    justify-content: flex-end
    margin-right: 30rpx
    font-size: $smaller-font-size
    .unpay
      color: #b42f2d
    .payed
      color: #ab956d
    .done
      color: #57ab53

  .order-accounts
    background-color: #fff
    position: fixed
    bottom: 0
    height: 90rpx
    width: 100%
    display: flex
    border-top: 1rpx solid $lighter-font-color
    border-bottom: 1rpx solid $lighter-font-color
    > view
      display: flex
      align-items: center

  .total-account
    flex: 1
    color: #93312e
    padding-left: 25rpx
    font-size: $small-font-size

  .pay
    flex-basis: 240rpx
    background-color: #ab956d
    color: #fff
    justify-content: center
    font-size: $normal-font-size
</style>
