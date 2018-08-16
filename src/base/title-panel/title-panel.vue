<template lang="pug">
  div.panel-container
    p {{title}}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .panel-container
    width: $card-width
    margin-left: $card-margin-left
    background-color: white
    height: 110rpx
    border-radius: $card-border-radius
    display: flex
    align-items: center
    justify-content: center
    margin-top: $card-margin-top

</style>
