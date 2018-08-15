// 对“对象数组”进行深拷贝
function copyObjArr (arr) {
  return [].concat(JSON.parse(JSON.stringify(arr)))
}

export {copyObjArr}
