<template lang="pug">
  div.container.edit-container
    title-panel(:title="title")
    div.form-container
      form(@submit="formSubmit")
        div.section
          p 姓名：
          input(name="name" auto-focus :value='info.name')
        div.section
          p 学号：
          input(type="number" name="number" :value='info.number')
        div.section
          p 手机：
          input(type="number" name="telephone" :value='info.telephone')
        div.section
          p 微信：
          input(name="weixin" :value='info.weixin')
        div.section
          p 宿舍：
          input(type="number" name="dormitory" :value='info.dormitory')
        div.section
          p 邮箱：
          input(name="email" :value='info.email')
        button.submit-btn(formType="submit")
          p 保存
</template>

<script>
import TitlePanel from 'base/title-panel/title-panel'
import {UserModel} from 'model/UserModel'
import {toast} from 'utils/utils'

let User = new UserModel()

export default {
  mounted () {
    User.getBuyerInfo().then((res) => {
      this.info = res
    })
  },
  data () {
    return {
      title: '修 改 信 息',
      info: {}
    }
  },
  methods: {
    formSubmit (event) {
      let data = event.mp.detail.value
      User.updateBuyerInfo(data).then(res => {
        toast('修改信息成功')
      })
    }
  },
  components: {
    TitlePanel
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"

  .edit-container
    background-color: $background-color
    min-height: 100vh

  .form-container
    background-color: white
    width: $card-width
    margin-left: $card-margin-left
    margin-top: 20rpx
    border-radius: $card-border-radius
  form
    display: block
    margin-top: 20rpx

  .section
    border-bottom: 1rpx solid $lighter-font-color
    margin-left: 5%
    width: 90%
    display: flex
    align-items: center

  .section p
    font-size: $small-font-size
    color: $grey-font-color
    padding: 20rpx 0 15rpx 0

  .section input
    font-size: $small-font-size
    color: $grey-font-color
    padding: 20rpx 0 15rpx 0

  .submit-btn
    width: 89%
    margin: 50rpx 5.4%
    height: 75rpx

  .submit-btn p
    font-size: $normal-font-size
    color: $grey-font-color
</style>
