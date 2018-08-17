import {iconType} from './config'

// 对“对象数组”进行深拷贝
function copyObjArr (arr) {
  return [].concat(JSON.parse(JSON.stringify(arr)))
}

function toast (title, icon = iconType.SUCCESS) {
  wx.showToast({
    title,
    image: icon,
    success: () => {
      wx.navigateBack()
    }
  })
}

function modal (title = '', content = '', cb, showCancel = true) {
  wx.showModal({
    title,
    content,
    showCancel,
    confirmColor: '#a9936e',
    success () {
      cb && cb()
    }
  })
}

export {copyObjArr, toast, modal}
