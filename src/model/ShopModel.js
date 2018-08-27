import {BaseModel} from './BaseModel.js'

export class ShopModel extends BaseModel {
  // 获取自营商家信息
  getShops (page, size = 7) {
    let params = {
      url: 'shop',
      data: {
        page,
        size
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

  getSellerByID (id) {
    let params = {
      url: 'seller/' + id
    }

    return this.request(params)
  }
}
