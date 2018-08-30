<template lang="pug">
div.order-list-contailer(:class="{'card-container': card}")
  div.detail-container(v-for="item in orders" :key="item.id"
    :class="{'card': card}")
    img.detail-image(:src="item.snap_img", mode='aspectFill', @click="toDetail(item.id)")
    div.two-text(@click="toDetail(item.id)")
      p.name-text {{item.snap_name}}
      p.status-text(v-if="item.status === orderEnum.UNPAID") 待付款
      p.status-text(v-if="item.status === orderEnum.PAID") 待发货
      p.status-text(v-if="item.status === orderEnum.DELIVERED") 已发货
      p.status-text(v-if="item.status === orderEnum.COMPLETED") 已完成
      p.status-text(v-if="item.status === orderEnum.PAID_BUT_NO_GOODS") 付款成功但库存量不足
    div.price-container
      p.price ￥{{item.total_price}}
      img.delete(src="__IMAGE__/icon/delete.png"
        v-if="item.status === orderEnum.UNPAID"
        @click="deleteOne(item.id)")
</template>

<script>
  import {orderEnum, iconType} from 'utils/config'
  import {modal, toast} from 'utils/utils'
  import {OrderModel} from 'model/OrderModel'
  import {mapActions} from 'vuex'

  let Order = new OrderModel()

  export default {
    data () {
      return {
        orderEnum
      }
    },
    props: {
      orders: {
        type: Array,
        default: []
      },
      // 是否为卡片样式
      card: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toDetail (id) {
        wx.navigateTo({
          url: `../order-detail/main?id=${id}`
        })
      },
      deleteOne (id) {
        modal('', '是否确定删除?', (res) => {
          if (res.confirm) {
            Order.delete(id).then(() => {
              this.setOrderChange(true)
              toast('删除成功', iconType.SUCCESS, false)
              this.$emit('reload')
            }).catch((ex) => {
              toast('删除失败', iconType.FAIL, false)
            })
          }
        })
      },
      ...mapActions([
        'setOrderChange'
      ])
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .order-list-contailer
    display: flex
    flex-direction: column
    background-color: white

  .detail-container
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 20rpx 0
    border-bottom: 1rpx solid $lighter-font-color
    width: 92%
    margin: 0 4%
  .card-container
    background-color: $background-color
  .card
    width: $card-width
    margin-left: $card-margin-left
    border-radius: $card-border-radius
    background-color: white
    border-bottom: 0
    margin-top: 20rpx
    justify-content: space-around

  .detail-image
    width: 200rpx
    height: 150rpx
    border-radius: 10rpx

  .two-text
    display: flex
    flex-direction: column
    width: 40%

  .name-text
    font-size: $small-font-size

  .status-text
    font-size: $small-font-size
    color: #ef7c00
    margin-top: 30rpx

  .price-container
    display: flex
    flex-direction: column
    align-items: flex-end
    justify-content: space-between

  .price
    font-size: $small-font-size
    margin-top: 2px

  .delete
    width: 30rpx
    height: 30rpx
</style>
