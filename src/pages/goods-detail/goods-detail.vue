<template lang="pug">
  div.container.detail-container
    div.cart-container
      div.cart
        img(src="__IMAGE__/icon/cart.png")
        div.cart-count {{cartDetail.selectedCount}}

    div.goods-container
      img.head-image(:src="goods.image_id.image_url", v-if="goods.image_id")
      div.info
        div.info-up
          div.name-container
            div
              p.two-handed(v-if="goods.type === 2") 二手
              p.name {{goods.name}}
            p.subtitle {{goods.subtitle}}

          picker(:range="countArray"
            @change="pickerChange"
            :value="selectedCount")
            div.picker.normal
              p 数量 {{selectedCount}}
              img(src="__IMAGE__/icon/arrow@downOrange.png")
        div.hr
        div.info-down
</template>

<script>
import {GoodsModel} from 'model/GoodsModel'
import {mapGetters} from 'vuex'

let Goods = new GoodsModel()

export default {
  data () {
    return {
      goods: {},
      countArray: [],
      selectedCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'cartDetail'
    ])
  },
  mounted () {
    let {id, type} = this.$root.$mp.query
    this._getData(id, type)
  },
  methods: {
    // picker改变时触发的函数
    pickerChange (event) {
      this.selectedCount = event.mp.detail.value
    },
    _getData (id, type) {
      Goods.getGoodsDetail(id, type).then((res) => {
        wx.setNavigationBarTitle({title: res.name})
        this.goods = res
        this._processData()
      })
    },
    _processData () {
      let maxCount = this.goods.quantity
      let countArr = []
      for (let i = 0; i <= maxCount; i++) {
        countArr.push(i)
      }
      this.countArray = countArr
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .detail-container
    background-color: #f9f9f9
    min-height: 100vh

  .cart-container
    position: fixed
    width: 80rpx
    height: 80rpx
    top: 30rpx
    right: 20rpx
    background-color: white
    border-radius: 100px
    opacity: 0.95
    display: flex
    justify-content: center
    align-items: center
    img
      width: 50rpx
      height: 50rpx
      margin-top: 8rpx

  .cart-count
    width: 20px
    height: 20px
    background-color: $nav-color
    border-radius: 50px
    text-align: center
    line-height: 20px
    position: absolute
    top: -5px
    right: -5px
    color: white
    font-size: $smaller-font-size


  .cart-container.animate
    animation: aCartScale 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67)
    animation-fill-mode: backwards

  @keyframes aCartScale
    0%
      -webkit-transform: scale(1.1)
    100%
      -webkit-transform: scale(1)

  .goods-container
    background-color: white
    padding-bottom: 15px

  .head-image
    width: 750rpx
    height: 500rpx

  .info
    width: 90%
    margin-left: 5%
    display: flex
    flex-direction: column

  .info-up
    display: flex
    justify-content: space-between
    align-items: center

  .name-container
    display: flex
    flex-direction: column
    flex-basis: 73%

  .name
    color: $deep-font-color
    font-size: $normal-font-size

  .subtitle
    color: #d99009
    font-size: $small-font-size
    margin-top: 8rpx

  .picker
    display: flex
    justify-content: flex-end
    align-items: center
    font-size: $small-font-size
    img
      width: 15px
      height: 15px
      margin-left: 10px

  .picker.disabled
    color: $light-font-color

  .picker.normal
    color: #d99009

  .selected-count
    margin-left: 20rpx

  .hr
    width: 100%
    height: 1px
    background-color: $lighter-font-color
    margin-top: 12px
    margin-bottom: 8px
</style>
