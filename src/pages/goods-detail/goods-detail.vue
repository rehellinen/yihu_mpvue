<template lang="pug">
  div.container.detail-container
    my-loading(:showLoading="showLoading")
    div(:class="showLoading ? 'hidden' : ''")
      div.cart-container(@click="toCart", :class="{animate: isShake}" :style="cartStyle")
        div.cart
          img(src="__IMAGE__/icon/cart.png")
          div.cart-count {{cartDetail.selectedCount}}

      div.goods-container
        // 商品头图
        img.head-image(:src="goods.image_id.image_url",
          v-if="goods.image_id"
          @load="imageLoaded", :data-type="pageEnum.GOODS_DETAIL")
        // 详细信息
        div.info
          div.info-up
            div.name-container
              div
                p.two-handed(v-if="goods.type === 2") 二手
                p.name {{goods.name}}
              p.subtitle {{goods.subtitle}}
            picker(:range="countArray"
              @change="pickerChange"
              :disabled="cartCount >= goods.quantity"
              )
              div.picker.normal(:class="{disabled : cartCount >= goods.quantity}")
                p 数量 {{cartCount < goods.quantity ? selectedCount : 0}}
                img(src="__IMAGE__/icon/arrow@downOrange.png" v-if="cartCount < goods.quantity")
                img(src="__IMAGE__/icon/arrow@downGrey.png" v-else)

          div.hr

          div.info-down
            div.price-quantity-container
              p.price ￥{{goods.price}}
              p.quantity 库存：{{goods.quantity}}
            div.cart-text-container(@click="addGoodsToCart" :class="{disabled : cartCount >= goods.quantity}")
              p {{cartCount < goods.quantity ? '加入购物车' : '库存不足'}}
              img(src="__IMAGE__/icon/cart.png" v-if="cartCount < goods.quantity")
              img(src="__IMAGE__/icon/cart@grey.png" v-else)
              img.small-top-img(:class="{animate: fastTap}"
                :src="goods.image_id.image_url"
                :style="translateStyle"
                v-if="goods.image_id"
                mode="aspectFill")

      div.photo-text-detail
        switch-tab(:tabs="['商品信息', '商家详情']", @switch="switchTabs", ref="switch")
          div(slot=0)
            GoodsDesc(:desc="goods.description")
          div(slot=1)
            seller-info(:seller="seller")
</template>

<script>
import {GoodsModel} from '../../model/GoodsModel'
import {CartModel} from '../../model/CartModel'
import {ShopModel} from '../../model/ShopModel'
import SwitchTab from '../../components/switch-tab/switch-tab'
import {mapGetters, mapActions} from 'vuex'
import MyLoading from '../../components/my-loading/my-loading'
import SellerInfo from '../../components/seller-info/seller-info'
import GoodsDesc from '../../components/goods-desc/goods-desc'
import {share} from '../../utils/utils'

let Goods = new GoodsModel()
let Shop = new ShopModel()

export default {
  data () {
    return {
      goods: {},
      selectedCount: 1,
      fastTap: false,
      isShake: false,
      translateStyle: '',
      switchStyle: '',
      cartStyle: '',
      pageEnum: this.$config.pageEnum,
      seller: {}
    }
  },
  onLoad () {
    this._changeCartPosition()
  },
  onShow () {
    let {id, type} = this.$root.$mp.query
    this._loadData(id, type)
  },
  onShareAppMessage (res) {
    return share(this.goods.name, `page/goods=detail/main?id=${this.goods.id}&type=${this.goods.type}`)
  },
  onUnload () {
    this.goods = {}
    this.selectedCount = 1
    this.switchStyle = ''
    this.resetLoadingState(this.$config.pageEnum.GOODS_DETAIL)
    this.$refs.switch.switchTabs(0)
  },
  computed: {
    showLoading () {
      return this.loadState[this.$config.pageEnum.GOODS_DETAIL]
    },
    ...mapGetters([
      'loadState'
    ]),
    cartCount () {
      let res = CartModel._isExistedThatOne(this.goods.id, this.cartData)
      if (res.index !== -1) {
        return res.data.count
      }
      return 0
    },
    countArray () {
      let maxCount = this.goods.quantity - this.cartCount
      if (this.selectedCount > maxCount) {
        this.selectedCount = maxCount
      }
      let countArr = []
      for (let i = 1; i <= maxCount; i++) {
        countArr.push(i)
      }
      return countArr
    },
    ...mapGetters([
      'cartDetail',
      'cartData'
    ])
  },
  methods: {
    toCart () {
      wx.switchTab({
        url: '../cart/main'
      })
    },
    pickerChange (event) {
      this.selectedCount = this.countArray[event.mp.detail.value]
    },
    addGoodsToCart (event) {
      // 防止快速点击
      if (this.fastTap) {
        return
      }
      this._addCartAnimation(event.mp)
      this._addToCart()
    },
    // 处理加入购物车的动画
    _addCartAnimation (event) {
      let touches = event.touches[0]
      let relative = {
        x: '5px',
        y: 15 - touches.clientY + 'px'
      }
      let style = `display: block;transform:translate(${relative.x},${relative.y}) rotate(350deg) scale(0)`
      this.fastTap = true
      this.translateStyle = style

      setTimeout(() => {
        this.translateStyle = 'transform: none'
        this.fastTap = false
        this.isShake = true

        setTimeout(() => {
          this.isShake = false
        }, 200)
      }, 1300)
    },
    // 处理加入购物车的逻辑
    _addToCart () {
      this.addGoods({
        goods: this.goods,
        count: this.selectedCount
      })
    },
    _loadData (id, type) {
      Goods.getGoodsDetail(id, type).then((res) => {
        wx.setNavigationBarTitle({title: res.name})
        this.goods = res
        if (parseInt(type) === this.$config.GoodsType.NEW_GOODS) {
          Shop.getShopByID(res.foreign_id).then(res => {
            this.seller = res
          })
        } else {
          Shop.getSellerByID(res.foreign_id).then(res => {
            this.seller = res
          })
        }
      })
    },
    _changeCartPosition () {
      const position = wx.getMenuButtonBoundingClientRect()
      const cartTop = position.bottom + 5
      const cartRight = (750 - position.right * 2)
      this.cartStyle = `top:${cartTop}px;right:${cartRight}rpx`
    },
    ...mapActions([
      'addGoods',
      'resetLoadingState'
    ])
  },
  components: {
    SwitchTab,
    MyLoading,
    SellerInfo,
    GoodsDesc
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
  .cart-container.animate
    animation: aCartScale 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67)
    animation-fill-mode: backwards

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
    padding-bottom: 15rpx

  .head-image
    width: 750rpx
    height: 600rpx

  .info
    width: 90%
    margin-left: 5%
    display: flex
    flex-direction: column

  .info-up
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 15rpx

  .name-container
    display: flex
    flex-direction: column
    flex-basis: 73%
    div
      display: flex
      align-items: flex-end

  .name
    color: $deep-font-color
    font-size: $normal-font-size

  .two-handed
    font-size: $smaller-font-size
    color: $base-font-color
    margin-right: 13rpx

  .subtitle
    color: $cart-color
    font-size: $small-font-size
    margin-top: 8rpx

  .picker
    display: flex
    justify-content: flex-end
    align-items: center
    font-size: $small-font-size
    color: $cart-color
    img
      width: 15px
      height: 15px
      margin-left: 10px
  .picker.disabled
    color: $light-font-color

  .selected-count
    margin-left: 20rpx

  .hr
    width: 100%
    height: 1px
    background-color: $lighter-font-color
    margin-top: 12px
    margin-bottom: 8px

  .info-down
    display: flex
    justify-content: space-between
    align-items: center

  .price-quantity-container
    display: flex
    align-items: center

  .price
    font-size: $biggest-font-size
    color: $cart-color

  .quantity
    margin-top: 6px
    margin-left: 16rpx
    font-size: $small-font-size
    color: $grey-font-color

  .cart-text-container
    width: 50%
    display: flex
    justify-content: flex-end
    align-items: center
    font-size: $normal-font-size
    color: $cart-color
    img
      width: 30px
      height: 30px
      margin-left: 20rpx
  .cart-text-container.disabled
    color: $light-font-color

  .photo-text-detail
    margin-top: 20rpx
    margin-bottom: 20rpx

  .small-top-img
    height: 300rpx
    width: 300rpx
    right: 20rpx
    position: absolute
    opacity: 0
    border-radius: 50px
  .small-top-img.animate
    opacity: 1
    transition: all 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)
</style>
