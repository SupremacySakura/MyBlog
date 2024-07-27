import { createRouter, createWebHistory } from 'vue-router'
//导入页面
import Home from '@/views/TheHomePage.vue'
import Article from '@/views/TheArticlePage.vue'
import Share from '@/views/TheSharePage.vue'
import About from '@/views/TheAboutPage.vue'
import Show from '@/views/TheArticleShowPage.vue'
import Publish from '@/views/TheArticlePublish.vue'
import Login from '@/views/TheLogin.vue'
import User from '@/views/TheUser.vue'
import Register from '@/views/TheRegister.vue'
import Management from '@/views/TheManagement.vue'
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/share',
      name: 'share',
      component: Share
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/show/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish,
      meta: { requiresAuth: true }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { requiresAuth: true }
    },
    {
      path: '/management',
      name: 'management',
      component: Management,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/', redirect: '/home'
    },
  ]
})
//导入仓库
import { storeToRefs } from 'pinia'
//用户仓库
import { useArticleStore } from '@/stores/article'
//导航栏仓库
import { useTabStore } from '@/stores/tab'
router.beforeEach((to, from, next) => {
  const articleStore = useArticleStore()
  const { isWriter,isLoggedIn,isManager,isMostManager } = storeToRefs(articleStore)
  const tabStore = useTabStore()
  const {  } = storeToRefs(tabStore)
  const { setIsActive, setNeedImage,getSrc } = tabStore
  //跳转页面函数
  const turnToPage = (src: string, id: number, isNeedImage: boolean) => {
    router.replace({ name: src })
    setIsActive(id)
    setNeedImage(isNeedImage)
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //判断是否登录
    if(!isLoggedIn.value){
      //没登录
      //访问不可访问的页面
      if (getSrc() === 'publish' || getSrc() === 'user') {
        //防止进入死循环
        turnToPage('home', 0, true)
      }
    }else{
      //已登录
      //判断是否为最高管理者
      if(isMostManager){
        next()
        return
      }
      //判断是否为需要管理员权限访问的页面
      if(getSrc()==='management'){
        //是
        //判断是否为管理员
        if(isManager){
          next()
        }else{
          //不是
          setIsActive(0)
          setNeedImage(true)
          turnToPage('home', 0, true)
        }
      }else if(getSrc()==='publish'){
        //判断是否为需要作者权限访问的页面
        //是
        //判断是否为作者或管理员
        if(isWriter||isManager){
          //是
          next()
        }else{
          //不是
          setIsActive(0)
          setNeedImage(true)
          turnToPage('home', 0, true)
        }
      }else{
        //不需要权限
        next()
      }
    }
  } else {
    next()
  }
})