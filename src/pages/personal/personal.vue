<template lang="pug">
  div
    my-loading(:showLoading="showLoading")
    div.container.personal-container(v-if="!showLoading")
      // 个人信息栏
      top-image(:avatar="avatar", :name="name")
      div.icon-container
        img(src="__IMAGE__/icon/edit.png")
      // 个人信息栏

      // 电费栏
      electricity(:threeDays="threeDays", :surplus="surplus")
      // 电费栏
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import TopImage from 'base/top-image/top-image'
  import Electricity from 'base/electricity/electricity'

  export default {
    data () {
      return {
        showLoading: false,
        avatar: '__IMAGE__/theme/personal@avatar.jpg',
        name: 'tuntematon',
        threeDays: 0,
        surplus: 0
      }
    },
    components: {
      MyLoading,
      TopImage,
      Electricity
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .icon-container
    position: absolute
    width: 80rpx
    height: 80rpx
    top: 30rpx
    right: 20rpx
    background-color: white
    border-radius: 50px
    opacity: 0.8
    display: flex
    justify-content: center
    align-items: center
    z-index: 100
    img
      width: 40rpx
      height: 40rpx
  .personal-container
    background-color: $background-color
</style>
