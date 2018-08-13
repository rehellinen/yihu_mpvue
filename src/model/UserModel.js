import {BaseModel} from './BaseModel.js'

export class UserModel extends BaseModel {
  // 获取当前用户的信息
  getBuyerInfo () {
    let params = {
      url: 'buyer'
    }
    return this.request(params)
  }

  // 更新当前用户的信息
  updateBuyerInfo (data, cb) {
    let params = {
      url: 'buyer',
      type: 'PUT',
      data: data,
      callBack (res) {
        cb && cb(res)
      },
      eCallBack (res) {
        cb && cb(res)
      }
    }
    this.request(params)
  }
}
