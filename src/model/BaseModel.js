import { restUrl } from '../utils/config'
import { Token } from '../utils/token'

export class BaseModel {
  constructor () {
    this.baseUrl = restUrl
  }

  /**
   * 对微信的 http 请求进行封装
   * @param params 请求参数配置
   *  params参数:
   *  1. url [api地址]
   *  2. type [http请求方式]
   *  3. data [请求时携带的参数]
   * @param noReFetch 是否重新发送请求
   */
  request (params, noReFetch = false) {
    return new Promise((resolve, reject) => {
      let that = this
      let url = this.baseUrl + params.url
      if (!params.type) {
        params.type = 'GET'
      }

      wx.request({
        url: url,
        data: params.data,
        method: params.type,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          let code = res.statusCode.toString()
          let startChar = code.charAt(0)
          if (startChar === '2') {
            // 处理成功时的情况
            resolve(res.data.data)
          } else {
            if (code === '401') {
              // 处理Token无效的情况
              if (!noReFetch) {
                that._reFetch(params)
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
  _reFetch (params) {
    let token = new Token()
    token.getTokenFromServer((token) => {
      this.request(params, true)
    })
  }
}
