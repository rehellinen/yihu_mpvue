<template lang="pug">
  div.container.order-container
    my-loading(:showLoading="showLoading")
    buyer-info(@isCompleted="complete")
    cart-list(:goods="selectedCartData" :from="pageEnum.ORDER_CONFIRM" @remark="addRemark")
    div.accounts
      div.total-account
        p 付款合计：￥{{cartDetail.totalPrice}}
      div.pay(:class="{disabled: !isCompleted}" @click="preOrder")
        p 去付款
</template>

<script>
import BuyerInfo from '../../base/buyer-info'
import MyLoading from '../../base/my-loading'
import CartList from '../../base/cart-list'
import {OrderModel} from '../../model/OrderModel'
import {mapGetters, mapActions} from 'vuex'
import {pageEnum} from '../../utils/config'

let Order = new OrderModel()

export default {
  data () {
    return {
      isCompleted: false,
      pageEnum,
      remarks: []
    }
  },
  computed: {
    showLoading () {
      return this.loadState[pageEnum.ORDER_CONFIRM]
    },
    ...mapGetters([
      'cartDetail',
      'selectedCartData',
      'loadState'
    ])
  },
  components: {
    BuyerInfo,
    CartList,
    MyLoading
  },
  methods: {
    addRemark ({index, remark}) {
      this.remarks[index] = remark
    },
    complete (flag) {
      this.isCompleted = flag
    },
    preOrder (event) {
      let orderInfo = []
      let goodsInfo = this.selectedCartData

      // 订单中商品的信息
      for (let i = 0; i < goodsInfo.length; i++) {
        orderInfo.push({
          goods_id: goodsInfo[i].id,
          count: goodsInfo[i].count,
          remark: this.remarks[i]
        })
      }

      Order.placeOrder(orderInfo).then((res) => {
        if (res.pass) {
          let orderNo = res.order_no
          this._execPay(orderNo)
        } else {
          this._orderFail(res)
        }
      })
    },
    _execPay (orderNo) {
      let payEnum = this.$config.payEnum
      Order.execPay(orderNo).then(({status, res}) => {
        console.log(status)
        if (status === payEnum.PAY_SUCCESS) {
          // 支付成功
          wx.redirectTo({
            url: `../pay-result/main?status=${status}`
          })
          this.deleteAllGoods()
        } else if (status === payEnum.OUT_OF_STOCK) {
          // 库存不足
          Order.orderFail(res)
        } else {
          // 支付失败
          wx.redirectTo({
            url: `../pay-result/main?status=${payEnum.PAY_FAIL}`
          })
          this.deleteAllGoods()
        }
      })
    },
    // 删除所有下单成功的商品
    deleteAllGoods () {
      let ids = []
      for (let i = 0; i < this.selectedCartData.length; i++) {
        ids.push(this.selectedCartData[i].id)
      }
      this.deleteGoods(ids)
      this.setOrderChange(true)
    },
    ...mapActions([
      'deleteGoods',
      'setOrderChange'
    ])
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .order-container
    min-height: 100vh
    background-color: $background-color

  .accounts
    background-color: #fff
    position: fixed
    bottom: 0
    height: 92rpx
    width: 100%
    display: flex
    border-top: 1rpx solid #ccc
    border-bottom: 1rpx solid #ccc
    align-items: center

  .total-account
    flex: 1
    color: #93312e
    padding-left: 25rpx
    font-size: $small-font-size

  .pay
    display: flex
    align-items: center
    justify-content: center
    flex-basis: 240rpx
    font-size: $normal-font-size
    height: 100%
    background-color: #ab956d
    color: #fff

  .pay:active
    background: #84704d

  .pay.disabled
    background: rgba(171, 149, 109, 0.6)
</style>
