/**
 *  loading.js
 *  Create By rehellinen
 *  Create On 2019/1/18 10:30
 */

export const loading = {
  created () {
    setTimeout(() => this.hideLoading(), this.$config.LOADING_HIDDEN_TIME)
  },
  data () {
    return {
      showLoading: true
    }
  },
  methods: {
    hideLoading () {
      this.showLoading = false
    },
    showLoading () {
      this.showLoading = true
    }
  }
}
