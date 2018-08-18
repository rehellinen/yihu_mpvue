/**
 * 工具函数：控制“加载中”页面的显示与否
 */
let imagesCount = {
  index: {
    total: 9,
    loaded: 0
  }
}

export function load (event) {
  let type = event.currentTarget.dataset.type
  imagesCount[type].loaded++
  if (imagesCount[type].total === imagesCount[type].loaded) {
    console.log('all')
  } else {
    console.log('no')
  }
}
