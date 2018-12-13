<template lang="pug">
  div.cart-box(v-if="goods.length > 0")
    div.cart-item(v-for="(item, index) in goods" :key="item.id")
      // 最左侧的复选框
      div.cart-item-checkbox(@click="selectOneTap(index)", v-if="showOperation")
        img(src="__IMAGE__/icon/circle@selected.png", v-if="item.selected")
        img(src="__IMAGE__/icon/circle@noselected.png", v-else)
      div.left-holder(v-else)
      // 最左侧的复选框

      // 商品图片
      div.cart-item-img(@click="toDetail(index)")
        img(:src="item.image_id.image_url" mode="aspectFill")
      // 商品图片

      // 右侧详细信息
      div.cart-item-word
        // 上部分
        div.title-box(@click="toDetail(index)")
          p.name {{item.name}}
          p ￥{{item.price}}
        // 上部分

        // 下部分
        div.bottom-box(v-if="showOperation")
          div.cart-item-count
            div
              img(src="__IMAGE__/icon/minus.png", @click="minusOne(index)" v-if="item.count > 1")
              img(src="__IMAGE__/icon/minus@disabled.png" v-else)
            p {{item.count}}
            div
              img(src="__IMAGE__/icon/plus.png", @click="plusOne(index)" v-if="item.count < item.quantity")
              img(src="__IMAGE__/icon/plus@disabled.png" v-else)

          div.delete
            img(src="__IMAGE__/icon/delete.png", @click="deleteGoods(item.id)")

        div.note-container(v-if="showInput")
          div.note
            input(placeholder="请输入备注", placeholder-style="color:#999", @blur="addRemark" :data-index="index")
          p.count x {{item.count}}

        div.count-container(v-if="showInfo")
          p.remark {{item.remark}}
          p.count x {{item.count}}
        // 下部分
      // 右侧详细信息
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    props: {
      goods: {
        type: Array,
        default: () => []
      },
      showOperation: {
        type: Boolean,
        default: false
      },
      showInput: {
        type: Boolean,
        default: false
      },
      showInfo: {
        type: Boolean,
        default: false
      },
      goodsType: {
        type: Number,
        default: null
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
        if (this.goodsType) {
          type = this.goodsType
          id = this.goods[index].goods_id
        }
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
      justify-content: space-around
      background-color: white
      box-sizing: border-box
      width: $card-width
      margin-top: $card-margin-top
      margin-left: $card-margin-left
      border-radius: $card-border-radius
      padding: 20rpx 20rpx 20rpx 0
      height: 220rpx
      z-index: 10
      > div
        height: 100%
      /* 左侧复选框 */
      .cart-item-checkbox
        display: flex
        align-items: center
        justify-content: center
        width: 90rpx
        img
          height: 44rpx
          width: 44rpx
      .left-holder
        width: 30rpx
      /* 左侧复选框 */

      /* 商品主图 */
      .cart-item-img
        width: 230rpx
        height: 100%
        background-color: $light-font-color
        border-radius: 10rpx
        img
          border-radius: 10rpx
          width: 100%
          height: 100%
      /* 商品主图 */

      /* 右侧信息 */
      .cart-item-word
        display: flex
        flex-direction: column
        justify-content: space-between
        padding-left: 30rpx
        color: $base-font-color
        width: 490rpx
        /* 上 */
        .title-box
          display: flex
          justify-content: space-between
          width: 100%
          .name
            flex-basis: 70%
        /* 上 */

        /* 下 */
        .bottom-box
          display: flex
          align-items: center
          justify-content: space-between
          font-size: $smaller-font-size
          height: 75rpx
          .cart-item-count
            width: 220rpx
            display: flex
            justify-content: space-between
            align-items: center
            color: $base-font-color
            height: 100%
            p
              font-size: $small-font-size
            div
              display: flex
              height: 100%
              align-items: center
              width: 50rpx
              justify-content: center
              img
                width: 30rpx
                height: 30rpx
          .delete
            width: 30rpx
            height: 100%
            margin-right: 10rpx
            display: flex
            align-items: center
            img
              width: 30rpx
              height: 30rpx
        /* 下 */
      /* 右侧信息 */





    /* 未重构 */

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
