/**
 *  page.js
 *  Create By rehellinen
 *  Create On 2019/1/19 15:39
 */

export const pageMixin = {
  data () {
    return {
      page: 1,
      pageSize: 10,
      hasMore: true,
      pageArray: []
    }
  },
  onReachBottom () {
    this.page++
    if (this.hasMore) {
      this._loadData()
    }
  },
  methods: {
    init () {
      this.page = 1
      this.pageSize = 10
      this.hasMore = true
      this.dataArray = []
    },
    setMoreData (data) {
      if (data.length === 0) this.hasMore = false
      this.pageArray = this.pageArray.concat(data)
    },
    setPageSize (pageSize) {
      this.pageSize = pageSize
    },
    setNoMore () {
      this.hasMore = false
    },
    isEnd () {
      return !this.hasMore
    },
    getCurrentStart () {
      return (this.page - 1) * this.pageSize
    }
  }
}
