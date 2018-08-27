<template lang="pug">
  div
    p.desc(v-if="desc") {{desc}}
    p.no-goods-desc(v-else) 暂无商品介绍
</template>

<script>
  export default {
    props: {
      desc: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="sass">
  .no-goods-desc
    text-align: center
    margin: 30rpx 0
  .desc
    margin: 20rpx 20rpx
</style>
