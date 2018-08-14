import {BaseModel} from './BaseModel.js'

export class ShopModel extends BaseModel {
  // 获取自营商家信息
  getShops (page) {
    let params = {
      url: 'shop',
      data: {
        page: page
      }
    }
    return this.request(params)
  }

  // 根据ID获取自营商家信息
  getShopByID (id) {
    let params = {
      url: 'shop/' + id
    }

    return this.request(params)
  }
}
