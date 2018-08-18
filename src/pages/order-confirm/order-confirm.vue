<template lang="pug">
  div.container.order-container
    buyer-info
    cart-list(:isConfirm="true")
</template>

<script>
import BuyerInfo from '../../components/buyer-info/buyer-info'
import CartList from '../../components/cart-list/cart-list'

export default {
  components: {
    BuyerInfo,
    CartList
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~css/base"
  .order-container
    min-height: 100vh
    background-color: $background-color
</style>
