import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
//导入文章类与用户类
import { userClass } from '@/classes/userClass'
import { articleClass } from '@/classes/articleClass'
//导入头像
import userHeadPortrait from '@/assets/images/userHeadPortrait.jpg'
//导入测试封面图片
import testImage from '@/assets/images/test1.jpg'
export const useArticleStore = defineStore('article', () => {
  //用户
  const user = ref<userClass | null>(null)
  user.value = new userClass('super123123301', '余心知秋', userHeadPortrait)
  //文章列表
  const articleList = ref<articleClass[]>([])
  articleList.value = [
    new articleClass('测试文章', '这是一片测试文章','这是一片测试文章', user.value, '2024/7/12 15:44:35', [], testImage, 2),
  ]
  const publishArticle = (item: articleClass) => {
    articleList.value.unshift(item)
  }
  const deleteArticle = (id:number)=>{
    articleList.value=articleList.value.filter(item=>item.id!=id)
  }
  return {
    user,
    articleList,
    publishArticle,
    deleteArticle,
  }
}, { persist: true })
