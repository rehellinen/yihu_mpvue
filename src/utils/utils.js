import {iconType} from './config'

// 对“对象数组”进行深拷贝
function copyObjArr (arr) {
  return [].concat(JSON.parse(JSON.stringify(arr)))
}

function toast (title, icon = iconType.SUCCESS, isBack = true) {
  wx.showToast({
    title,
    image: icon,
    success: () => {
      if (isBack) {
        wx.navigateBack()
      }
    }
  })
}

function modal (title = '', content = '', cb, showCancel = true) {
  wx.showModal({
    title,
    content,
    showCancel,
    confirmColor: '#a9936e',
    success (res) {
      cb && cb(res)
    }
  })
}

function getSwitchTabHeight (index) {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().select(`.switch-${index}`).boundingClientRect(res => {
      resolve(res.height)
    }).exec()
  })
}

export {copyObjArr, toast, modal, getSwitchTabHeight}
