import { BaseModel } from './BaseModel.js'

class ThemeModel extends BaseModel {
  // 根据主题id获取分类
  getCategory (id, cb) {
    let params = {
      url: 'category/' + id
    }
    return this.request(params)
  }

  // 获取主题信息
  getThemes () {
    let param = {
      url: 'theme'
    }
    this.request(param)
  }
}

export { ThemeModel }
