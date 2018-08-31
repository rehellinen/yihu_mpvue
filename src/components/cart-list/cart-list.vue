<template lang="pug">
  div.cart-box(v-if="goods.length > 0")
    div.cart-item(v-for="(item, index) in goods" :key="item.id" :class="{deleteThat: deleteIndex === index, deleteAfter: deleteIndex && index > deleteIndex}")
      div.cart-item-checkbox(@click="selectOneTap(index)", v-if="from === pageEnum.CART")
        img(src="__IMAGE__/icon/circle@selected.png", v-if="item.selected")
        img(src="__IMAGE__/icon/circle@noselected.png", v-else)

      div.cart-item-img(@click="toDetail(index)")
        img.goods-image(:src="item.image_id.image_url" mode="aspectFill"
          @load="imageLoaded", :data-type="from")

      div.cart-item-word
        div.title-box(@click="toDetail(index)")
          p.name {{item.name}}
          p.price ￥{{item.price}}
        div.bottom-box(v-if="from === pageEnum.CART")
          div.cart-item-count
            img(src="__IMAGE__/icon/minus.png", @click="minusOne(index)" v-if="item.count > 1")
            img.disabled(src="__IMAGE__/icon/minus@disabled.png" v-else)

            div {{item.count}}

            img(src="__IMAGE__/icon/plus.png", @click="plusOne(index)" v-if="item.count < item.quantity")
            img.disabled(src="__IMAGE__/icon/plus@disabled.png" v-else)

          img.delete(src="__IMAGE__/icon/delete.png", @click="deleteGoods(item.id)")
        div.note-container(v-if="from === pageEnum.ORDER_CONFIRM")
          div.note
            input(placeholder="请输入备注", placeholder-style="color:#999", @blur="addRemark" :data-index="index")
          p.count x {{item.count}}
        div.count-container(v-if="from === pageEnum.ORDER_DETAIL")
          p.remark {{item.remark}}
          p.count x {{item.count}}
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      },
      from: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        deleteIndex: null,
        pageEnum: this.$config.pageEnum
      }
    },
    methods: {
      addRemark (event) {
        this.$emit('remark', {
          remark: event.mp.detail.value,
          index: event.mp.currentTarget.dataset.index
        })
      },
      minusOne (index) {
        this.changeCount({index, count: -1})
      },
      plusOne (index) {
        this.changeCount({index, count: 1})
      },
      // 单选按钮
      selectOneTap (index) {
        let selected = !this.goods[index].selected
        this.selectOne({index, selected})
      },
      // 跳转商品详情
      toDetail (index) {
        let id = this.goods[index].id
        let type = this.goods[index].type
        wx.navigateTo({
          url: `../goods-detail/main?id=${id}&type=${type}`
        })
      },
      ...mapActions([
        'selectOne',
        'changeCount',
        'deleteGoods'
      ])
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .cart-box
    display: flex
    flex-direction: column
    margin-bottom: 110rpx
    font-size: $small-font-size
    width: 100%

  .cart-item
    display: flex
    flex-direction: row
    justify-content: space-around
    background-color: white
    width: $card-width
    margin-top: $card-margin-top
    margin-left: $card-margin-left
    border-radius: $card-border-radius
    padding: 15rpx 0
    height: 186rpx
    opacity: 1
    > view
      height: 100%
  .deleteThat
    transform: translate(0,-150rpx)
    transition: all 0.5s ease-in-out
    opacity: 0
  .deleteAfter
    transition: all 1s ease-in-out
    transform: translate(0,-234rpx)

  .cart-item-checkbox
    display: flex
    align-items: center
    justify-content: center
    width: 84rpx
    img
      height: 44rpx
      width: 44rpx

  .cart-item-img
    width: 186rpx
    height: 100%
    background-color: $light-font-color
    border-radius: 10rpx
    img
      border-radius: 10rpx
      width: 100%
      height: 100%


  .cart-item-word
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 8rpx 0 8rpx 30rpx
    color: $base-font-color
    width: 490rpx

  .title-box
    display: flex
    justify-content: space-between
    width: 100%
    .name
      flex-basis: 70%
    .price
      margin-right: 20rpx

  .bottom-box
    display: flex
    align-items: center
    justify-content: space-between
    font-size: $smaller-font-size
    height: 80rpx

  .cart-item-count
    width: 220rpx
    display: flex
    justify-content: space-between
    align-items: center
    color: $base-font-color
    img
      width: 30rpx
      height: 30rpx
    div
      font-size: $small-font-size
  .delete
    width: 30rpx
    height: 30rpx
    margin-right: 20rpx

  .note-container
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 10rpx
  .note
    width: 80%
    border-bottom: 1rpx solid $lighter-font-color
    input
      color: $grey-font-color
  .count
    margin-right: 20rpx
  .count-container
    width: 100%
    display: flex
    justify-content: space-between
    margin-bottom: 10rpx
    .remark
      width: 70%
      word-wrap: break-word
</style>
