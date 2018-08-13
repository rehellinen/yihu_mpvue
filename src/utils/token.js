import {restUrl} from './config.js'

class Token {
  constructor () {
    this.verifyUrl = restUrl + 'token/verify'
    this.tokenUrl = restUrl + 'token/buyer'
  }

  verify () {
    let token = wx.getStorageSync('token')
    if (!token) {
      this.getTokenFromServer()
    } else {
      this._verifyFromServer(token)
    }
  }

  // 从服务器获取Token
  getTokenFromServer (cb) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          wx.request({
            url: this.tokenUrl,
            method: 'POST',
            data: {
              code: res.code
            },
            success (res) {
              wx.setStorageSync('token', res.data.data.token)
              resolve(res)
            }
          })
        }
      })
    })
  }

  // 验证Token是否有效
  _verifyFromServer (token) {
    wx.request({
      url: this.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: (res) => {
        let valid = res.data.data.isValid
        if (!valid) {
          this.getTokenFromServer()
        }
      }
    })
  }
}

export {Token}
