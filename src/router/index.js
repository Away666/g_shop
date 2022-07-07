import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from "@/store";

const routes = [{
    path: '/',
    name: "home",
    component: () => import('@/views/Home'),
    meta: {
      show: true
    }
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/Login'),
    meta: {
      show: false
    }
  },
  {
    path: '/addCartSuccess',
    name: "addCartSuccess",
    component:  () => import('@/views/AddCartSuccess'),
    meta: {
      show: false
    }
  },
  {
    path: '/shopcart',
    name: "shopCart",
    component: () => import('@/views/ShopCart'),
    meta: {
      show: false
    }
  },
  {
    path: '/trade',
    name: "trade",
    component: () => import('@/views/Trade'),
    meta: {
      show: false
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: "pay",
    component: () => import('@/views/Pay'),
    meta: {
      show: false
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    name: "paysuccess",
    component: () => import('@/views/PaySuccess'),
    meta: {
      show: false
    }
  },
  {
    path: '/center',
    name: "center",
    component: () => import('@/views/Center'),
    meta: {
      show: false
    },
    children: [{
        path: "myorder",
        component: () => import('@/views/Center/myOrder')
      },
      {
        path: "grouporder",
        component: () => import('@/views/Center/groupOrder')
      }
    ],
    redirect: "/center/myorder"
  },
  {
    path: '/register',
    name: "register",
    component:  () => import('@/views/Register'),
    meta: {
      show: false
    }
  },
  {
    path: '/detail/:skuid',
    name: "detail",
    component: () => import('@/views/Detail'),
    meta: {
      show: false
    }
  },
  {
    path: '/search/:keyword?',
    name: "search",
    component: () => import('@/views/Search'),
    meta: {
      show: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      y: 0
    }
  }
})

// 重写push、replace方法

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch(err => err)
}

router.beforeEach(async (to, from, next) => {
  //to:获取到要跳转到的路由信息
  //from：获取到从哪个路由跳转过来来的信息
  //next: next() 放行  next(path) 放行  
  //方便测试 统一放行
  //  next();
  //获取仓库中的token-----可以确定用户是登录了
  let token = store.state.token;
  let name = store.state.userInfo.name;
  //用户登录了
  if (token) {
    //已经登录而且还想去登录------不行
    if (to.path == "/login" || to.path == '/register') {
      next('/');
    } else {
      //已经登陆了,访问的是非登录与注册
      //登录了且拥有用户信息放行
      if (name) {
        next();
      } else {
        //登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          //token失效从新登录
          await store.dispatch('logout');
          next('/login')
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      if (toPath.indexOf('/trade') != -1) {
        next('/login?redirect=/shopcart');
      } else {
        next('/login?redirect=' + toPath);
      }
    } else {
      //去的不是上面这些路由（home|search|shopCart）---放行
      next();
    }

  }
});


export default router