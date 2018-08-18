/**
 * 工具函数：控制“加载中”页面的显示与否
 */
let pageEnum = {
  INDEX: 'index'
}

let images = {
  [pageEnum.INDEX]: {
    total: 9,
    loaded: 0,
    showLoading: true
  }
}

function load (event) {
  let type = event.currentTarget.dataset.type
  images[type].loaded++
  console.log('load')
  if (images[type].total === images[type].loaded) {
    images[type].showLoading = false
    console.log(images[type].showLoading)
  }
}

export {pageEnum, load, images}
