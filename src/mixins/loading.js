/**
 *  loading.js
 *  Create By rehellinen
 *  Create On 2019/1/18 10:30
 */

export const loading = {
  created () {
    setTimeout(() => this.hideLoading(), 3000)
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
