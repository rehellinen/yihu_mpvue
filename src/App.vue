<script>
  import {Token} from './utils/token'

  export default {
    created () {
      let token = new Token()
      token.verify()
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/sass">
</style>
