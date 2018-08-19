module.exports = {
  // 配置1：URL基地址
  // restUrl: 'http://fleamarket.cn/api/v1/',
  restUrl: 'https://20298479.rehellinen.cn/fleamarket/public/api/v1/',

  // 配置2：加载中图标自动隐藏时间
  loadingHiddenTime: 1500,

  // 配置3：关于全局字符串替换
  replace: {
    static: {
      origin: '__STATIC__',
      replacement: '/static'
    },
    image: {
      origin: '__IMAGE__',
      replacement: '/static/images'
    }
  },

  // 配置4：关于支付状态
  payEnum: {
    OUT_OF_STOCK: 0,
    PAY_FAIL: 1,
    PAY_SUCCESS: 2
  },

  // 配置5：关于订单状态
  orderEnum: {
    // 全部
    ALL: 0,
    // 已删除
    DELETE: -1,
    // 未付款
    UNPAID: 1,
    // 已付款，待发货
    PAID: 2,
    // 已发货
    DELIVERED: 3,
    // 买家确认收货
    COMPLETED: 4,
    // 买家已付款但是没有足够的库存
    PAID_BUT_NO_GOODS: 5
  },

  // 配置6：关于商品类型
  GoodsType: {
    NEW_GOODS: 1,
    OLD_GOODS: 2
  },

  // 配置7：关于toast图标
  iconType: {
    SUCCESS: '__IMAGE__/icon/success@white.png',
    FAIL: '__IMAGE__/icon/fail@white.png'
  },

  // 配置7：关于加载中动画
  pageEnum: {
    INDEX: 'index',
    GOODS_MORE: 'goods_more',
    SHOP: 'shop'
  }
}
