import Vue from "vue";
import Vuex from 'vuex';
import {
  reqCategoryList,
  reqBannerList,
  reqFloorList,
  reqSearchInfo,
  reqGoodsInfo,
  reqAddOrUpdateShopCart,
  reqCartList,
  reqDeleteCartById,
  reqUpdateCheckedById,
  reqGetCode,
  reqRegister,
  reqLogin,
  reqUserInfo,
  logout,
  reqAddressInfo,
  reqOrderInfo,
} from '../api/index'
import {
  getUUID
} from '@/utils/uuid_token'

Vue.use(Vuex);

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
  searchList: {},
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
  cartList: [],
  code: '',
  token: localStorage.getItem("TOKEN"),
  userInfo: {},
  address: [],
  orderInfo: {}
};
const mutations = {
  // 三级分类
  CATEGORYLIST(state, data) {
    state.categoryList = data;
  },
  // 轮播图
  GETBANNERLIST(state, data) {
    state.bannerList = data;
  },
  // 
  GETFLOORLIST(state, data) {
    state.floorList = data;
  },
  // 搜索数据
  GETSEARCHLIST(state, data) {
    state.searchList = data;
  },
  // 获取商品信息
  GETGOODSINFO(state, data) {
    state.goodsInfo = data;
  },
  // 获取购物车列表
  GETCARTLIST(state, data) {
    state.cartList = data;
  },
  GETCODE(state, data) {
    state.code = data;
  },
  LOGIN(state, data) {
    state.token = data;
  },
  GETUSERINFO(state, data) {
    state.userInfo = data
  },
  LOGOUT(state) {
    state.token = ''
    state.userInfo = {}
    localStorage.removeItem("TOKEN")
  },
  GETUSERADDRESSINFO(state, data) {
    state.address = data
  },
  GETORDERINFO(state, data) {
    state.orderInfo = data
  }
};
const actions = {
  async categoryList({
    commit
  }) {
    let result = await reqCategoryList();
    if (result.data.code == 200) {
      commit('CATEGORYLIST', result.data.data);
    }
  },
  async getBannerList({
    commit
  }) {
    let result = await reqBannerList();
    if (result.data.code == 200) {
      commit('GETBANNERLIST', result.data.data);
    }
  },
  async getFloorList({
    commit
  }) {
    let result = await reqFloorList();
    if (result.data.code == 200) {
      commit('GETFLOORLIST', result.data.data);
    }
  },
  async getSearchList({
    commit
  }, params = {}) {
    let result = await reqSearchInfo(params);
    if (result.data.code == 200) {
      commit('GETSEARCHLIST', result.data.data)
    }
  },
  async getGoodsInfo({
    commit
  }, params = {}) {
    let {
      data
    } = await reqGoodsInfo(params);
    if (data.code == 200) {
      commit('GETGOODSINFO', data.data)
    }
  },
  async addOrUpdateShopCart({
    commit
  }, {
    skuId,
    skuNum
  }) {
    let {
      data
    } = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (data.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getShopCart({
    commit
  }) {
    let {
      data
    } = await reqCartList();
    if (data.code == 200) {
      commit('GETCARTLIST', data.data)
    }
  },
  async deleteCartListById({
    commit
  }, skuId) {
    let {
      data
    } = await reqDeleteCartById(skuId);
    if (data.code == 200) {
      return 'ok'
    } else {
      Promise.reject(new Error('faile'))
    }
  },
  async updateChechedById({
    commit
  }, {
    skuId,
    isChecked
  }) {
    let {
      data
    } = await reqUpdateCheckedById(skuId, isChecked);
    if (data.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  deleteAllCheckedCart({
    dispatch,
    getters
  }) {
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListById', item.skuId) : ''
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll);
  },
  updateAllCartChecked({
    dispatch,
    state
  }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateChechedById', {
        skuId: item.skuId,
        isChecked
      });
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll);
  },
  async getCode({
    commit
  }, phone) {
    let {
      data
    } = await reqGetCode(phone)
    if (data.code == 200) {
      commit('GETCODE', data.data)
    }
  },
  async register({
    commit
  }, user) {
    console.log(user);
    let {
      data
    } = await reqRegister(user)
    if (data.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error(data.message))
    }
  },
  async login({
    commit
  }, user) {
    let {
      data
    } = await reqLogin(user)
    if (data.code == 200) {
      commit('LOGIN', data.data.token)
      localStorage.setItem("TOKEN", data.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getUserInfo({
    commit
  }) {
    let {
      data
    } = await reqUserInfo();
    if (data.code == 200) {
      commit('GETUSERINFO', data.data)
    }
  },
  async logout({
    commit
  }) {
    let {
      data
    } = await logout();
    if (data.code == 200) {
      commit("LOGOUT")
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getUserAddressInfo({
    commit
  }) {
    let {
      data
    } = await reqAddressInfo();
    if (data.code == 200) {
      commit('GETUSERADDRESSINFO', data.data)
    }
  },
  async getOrderInfo({
    commit
  }) {
    let {
      data
    } = await reqOrderInfo();
    if (data.code == 200) {
      commit("GETORDERINFO", data.data)
    }
  }
};
// 处理数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  categoryView(state) {
    return state.goodsInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [];
  },
  cartList(state) {
    return state.cartList[0] || {};
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})