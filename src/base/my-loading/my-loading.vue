<template lang="pug">
div.loading-container(v-if="showLoading")
  img(src="__IMAGE__/theme/loading.gif")
</template>

<script>
  export default {
    props: {
      showLoading: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .loading-container
    display: flex
    justify-content: center
    align-items: center
    width: 750rpx
    min-height: 100vh

    img
      width: 300rpx
      height: 300rpx
</style>
