/**
 *
 *  Create By rehellinen
 *  Create On 2018/5/18 15:45
 */
import { BaseModel } from './BaseModel'

export class BannerModel extends BaseModel {
  // 获取banner
  getBanners () {
    let param = {
      url: 'banner'
    }
    return this.request(param)
  }
}
