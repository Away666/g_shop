import request from './request';
import mockRequest from './mockRequest '

export const reqCategoryList = () => request({
  url: '/product/getBaseCategoryList',
  method: 'get'
})

export const reqBannerList = () => mockRequest.get('/banner')

export const reqFloorList = () => mockRequest.get('/floor')

export const reqSearchInfo = (params) => request({
  url: '/list',
  method: 'post',
  data: params
})

export const reqGoodsInfo = (skuId) => request({
  url: `/item/${skuId}`,
  method: 'get'
})

// 将商品添加到购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post',
  data: {
    skuId,
    skuNum
  }
})

// 获取购物车列表数据
export const reqCartList = () => request({
  url: '/cart/cartList',
  method: 'get'
})

// 删除购物车商品
export const reqDeleteCartById = (skuId) => request({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

// 修改商品选中的状态
export const reqUpdateCheckedById = (skuId, isChecked) => request({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

// 获取验证码
export const reqGetCode = (phone) => request({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

// 注册
export const reqRegister = (data) => request({
  url: "/user/passport/register",
  data,
  method: "post"
})

// 登录
export const reqLogin = (data) => request({
  url: "/user/passport/login",
  data,
  method: "post"
})

// 获取用户信息
export const reqUserInfo = () => request({
  url: "/user/passport/auth/getUserInfo",
  method: "get"
})

// 退出登录
export const logout = () => request({
  url: "/user/passport/logout",
  method: "get"
})

// 获取用户地址信息
export const reqAddressInfo = () => request({
  url: "/user/userAddress/auth/findUserAddressList",
  method: "get"
})

// 获取商品清单
export const reqOrderInfo = () => request({
  url: "/order/auth/trade",
  method: "get"
})

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => request({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: "post"
})

// 获取支付信息
export const reqPayInfo = (orderId) => request({
  url: `/payment/weixin/createNative/${orderId}`,
  method: "get"
})

// 获取支付订单状态
export const reqPayStatus = (orderId) => request({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: "get"
})

// 获取个人中心的数据
export const reqMyOrderList = (page, limit) => request({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})