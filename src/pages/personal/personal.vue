<template lang="pug">
  div
    my-loading(:showLoading="showLoading")
    div.container.personal-container(v-if="!showLoading")
      // 个人信息栏
      top-image(:avatar="avatar", :name="name")
      div.icon-container
        img(src="__IMAGE__/icon/edit.png")
      // 个人信息栏
</template>

<script>
  import MyLoading from 'base/my-loading/my-loading'
  import TopImage from 'base/top-image/top-image'

  export default {
    data () {
      return {
        showLoading: false,
        avatar: '__IMAGE__/theme/personal@avatar.jpg',
        name: 'tuntematon'
      }
    },
    components: {
      MyLoading,
      TopImage
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
