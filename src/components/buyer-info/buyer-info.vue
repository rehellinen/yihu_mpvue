<template lang="pug">
  div.container.info(@click="toEdit")
    div.supply(v-if="!isCompleted")
      p + &nbsp;补充信息
    div.info-container(v-else)
      div.photo-name
        div
          img(src="__IMAGE__/icon/user.png")
          p {{buyer.name}}
        div
          img(src="__IMAGE__/icon/mobile.png")
          p {{buyer.telephone}}
      div.address
        p 收货地址：{{buyer.dormitory}}
</template>

<script>
import {UserModel} from '../../model/UserModel'

let User = new UserModel()

export default {
  created () {
    this._loadData()
  },
  onShow () {
    this._loadData()
  },
  data () {
    return {
      buyer: {},
      isCompleted: false
    }
  },
  methods: {
    toEdit () {
      wx.navigateTo({
        url: '../edit-info/main'
      })
    },
    _loadData () {
      User.getBuyerInfo().then(res => {
        this.buyer = res
        this._isCompeleted()
      })
    },
    _isCompeleted () {
      let flag = true
      for (let key in this.buyer) {
        if (!this.buyer[key]) {
          flag = false
        }
      }
      this.isCompleted = flag
      this.$emit('isCompleted', flag)
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .container
    background-color: white
    font-size: 15px
    height: 140rpx
  .supply
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    width: 100%
  .info-container
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
  .photo-name
    display: flex
    width: 100%
    justify-content: space-between
    margin-top: 15rpx
    div
      display: flex
      align-items: center
      padding: 10rpx 50rpx 0 50rpx
    img
      width: 30rpx
      height: 30rpx
    p
      margin-left: 10rpx
  .address
    margin: 22rpx 0 15rpx 50rpx
    color: $grey-font-color
    font-size: $small-font-size
</style>
