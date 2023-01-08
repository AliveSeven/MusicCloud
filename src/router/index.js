//导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//use
Vue.use(VueRouter)

// 如果跳转到相同的路由，就报promise uncaught异常
// 重写原型上面的push方法，统一处理错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//创建路由
const router = new VueRouter({
  mode: 'hash',
  routes: [
    // 默认跳转到发现音乐页面
    {
      path: '/',
      redirect: '/discovery',
    },
    //配置地址和组件的对应关系
    {
      //地址
      path:"/discovery",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/Discovery/Discovery.vue'),
    },
    {
      //地址
      path:"/playlists",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/PlayLists/PlayLists.vue'),
    },
    {
      //地址
      path:"/songs",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/Songs/Songs.vue'),
    },
    {
      //地址
      path:"/mvs",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/Mvs/Mvs.vue'),
    },
    {
      //地址
      path:"/result",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/Result/Result.vue'),
    },
    {
      //地址
      path:"/playlist",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/PlayLists/PlayList.vue'),
    },
    {
      //地址
      path:"/mv",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/Mvs/Mv.vue'),
    },
    {
      //地址
      path:"/leaderboard",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/LeaderBoard/LeaderBoard.vue'),
    },
    {
      //地址
      path:"/artists",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/Artists/Artists.vue'),
    },
    {
      //地址
      path:"/artist",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/Artists/Artist.vue'),
    },
    {
      //地址
      path:"/login",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/Login/Login.vue'),
    },
    {
      //地址
      path:"/userInfo",
      //组件,导入需要通过路由管理的组件
      component: () => import('@/components/UserInfo/UserInfo.vue'),
    },
  ],

})

export default router
