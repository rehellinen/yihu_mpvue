<template lang="pug">
  div
    p 123
</template>

<script>
import {GoodsModel} from 'model/GoodsModel'

let Goods = new GoodsModel()

export default {
  mounted () {
    let {id, type} = this.$root.$mp.query
    Goods.getGoodsDetail(id, type).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
