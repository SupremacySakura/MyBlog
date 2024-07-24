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
//用户仓库
import { useArticleStore } from '@/stores/article'
//导航栏仓库
import { useTabStore } from '@/stores/tab'
router.beforeEach((to, from, next) => {
  const articleStore = useArticleStore()
  const { isWriter, userMessage } = storeToRefs(articleStore)
  const tabStore = useTabStore()
  const { isActive,needImage } = storeToRefs(tabStore)
  const { setIsActive, setNeedImage,getSrc, getId } = tabStore
  //跳转页面函数
  const turnToPage = (src: string, id: number, isNeedImage: boolean) => {
    router.replace({ name: src })
    setIsActive(id)
    setNeedImage(isNeedImage)
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isWriter.value) {
      if(getSrc()==='publish'){
        //防止进入死循环
        setIsActive(0)
        setNeedImage(true)
      }
      turnToPage(getSrc(),isActive.value,needImage.value)
    } else {
      setIsActive(getId(to.name as string))
      setNeedImage(getId(to.name as string) >= 0)
      next()
    }
  } else {
    next()
  }
})