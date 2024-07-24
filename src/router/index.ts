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
      component: Publish
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/', redirect: '/home'
    }

  ]
})