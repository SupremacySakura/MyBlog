import { createRouter, createWebHistory } from 'vue-router'
//导入页面
import Home from '@/views/TheHomePage.vue'
import Article from '@/views/TheArticlePage.vue'
import Share from '@/views/TheSharePage.vue'
import About from '@/views/TheAboutPage.vue'
import Show from '@/views/TheArticleShowPage.vue'
import Publish from '@/views/TheArticlePublish.vue'
import Login from '@/views/TheLogin.vue'

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/', redirect: '/home'
    },
  ]
})
//导入仓库
import { storeToRefs } from 'pinia'
// 创建 Pinia 实例
import { createPinia } from 'pinia'
const pinia = createPinia()
//用户仓库
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore(pinia)
const { isLoggedIn } = storeToRefs(articleStore)
//导航栏仓库
import { useTabStore } from '@/stores/tab'
const tabStore = useTabStore(pinia)
const { } = storeToRefs(tabStore)
const { setIsActive, setNeedImage } = tabStore
//跳转页面函数
const turnToPage = (src: string, id: number, isNeedImage: boolean) => {
  router.replace({ name: src })
  setIsActive(id)
  setNeedImage(isNeedImage)
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn.value) {
      turnToPage('home',0,true)
    } else {
      next()
    }
  } else {
    next()
  }
})