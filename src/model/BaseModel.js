import config from '../utils/config'
import { Token } from '../utils/token'

export class BaseModel {
  constructor () {
    this.baseUrl = config.REST_URL
  }

  /**
   * 对微信的 http 请求进行封装
   * @param url api地址
   * @param method http请求方式
   * @param data 请求时携带的参数
   * @param reFetch 是否重新发送请求
   */
  request ({ url, method, data, reFetch = true }) {
    return new Promise((resolve, reject) => {
      let that = this
      let url = this.baseUrl + url
      if (!method) {
        method = 'GET'
      }

      wx.request({
        url: url,
        data,
        method,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success: async (res) => {
          let code = res.statusCode.toString()
          let startChar = code.charAt(0)
          if (startChar === '2') {
            // 处理成功时的情况
            let returnData = res.data.data
            if (res.data.data.current_page) {
              returnData = res.data.data.data
            }
            resolve(returnData)
          } else {
            if (code === '401') {
              // 处理Token无效的情况
              if (reFetch) {
                resolve(await that._reFetch({url, method, data}))
              } else {
                reject(res.data)
              }
            } else {
              // 其他错误
              reject(res.data)
            }
          }
        },
        fail: function (err) {
          reject(err)
        }
      })
    }).catch(ex => {
      throw ex
    })
  }

  // 重新发送请求
  async _reFetch (params) {
    let token = new Token()
    await token.getTokenFromServer()
    return this.request(Object.assign({}, params, { reFetch: false }))
  }
}
