import {BaseModel} from './BaseModel'

export class ElectricityModel extends BaseModel {
  // 获取近三日电费
  getThreeDays () {
    let params = {
      url: 'electricity/three'
    }

    return this.request(params)
  }

  // 获取剩余电费
  getSurplus () {
    let params = {
      url: 'electricity/surplus'
    }

    return this.request(params)
  }
}
