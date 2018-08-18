<template lang="pug">
  div.container.card(@click="toEdit")
    div(v-if="!isCompleted")
      p + 补充信息
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
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .card
    display: flex
    justify-content: center
    align-items: center
    height: 120rpx
    font-size: $small-font-size
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
      padding: 0 55rpx 0 25rpx
    img
      width: 28rpx
      height: 28rpx
    p
      margin-left: 10rpx
  .address
    margin-top: 22rpx
    margin-left: 25rpx
    color: $grey-font-color
</style>
