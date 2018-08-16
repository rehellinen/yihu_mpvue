<template lang="pug">
  div.container.edit-container
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
export default {
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
    border-bottom: 1rpx solid $light-font-color
    margin-left: 5%
    width: 90%
    display: flex
    align-items: center

  .section p
    font-size: $small-font-size
    color: $grey-font-color

  .section input
    font-size: $small-font-size
    color: $grey-font-color
    padding: 20rpx 0

  .submit-btn
    width: 89%
    margin: 20rpx 5.4%
    height: 75rpx

  .submit-btn p
    font-size: $normal-font-size
    color: $grey-font-color
</style>
