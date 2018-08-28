<template lang="pug">
  div.card.desc-container
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
  @import "~css/base"
  .no-goods-desc
    text-align: center
    margin: 30rpx 0
    font-size: $small-font-size
  .desc
    padding: 20rpx 20rpx
    font-size: $small-font-size
</style>
