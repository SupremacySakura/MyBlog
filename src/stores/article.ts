import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
//导入文章类与用户类
import { userClass, userMessageClass } from '@/classes/userClass'
import { articleClass } from '@/classes/articleClass'
//导入头像
import userHeadPortrait from '@/assets/images/userHeadPortrait.jpg'
//导入测试封面图片
export const useArticleStore = defineStore('article', () => {
  //用户
  const user = ref<userClass | null>(null)
  const userList = ref<userClass[]>([])
  userList.value =[
    new userClass('super123123301', '余心知秋','15310836616','20050814' ,userHeadPortrait, 1),
    new userClass('fangke123123', '访客','12345678910','123456' ,userHeadPortrait, 2),
  ]
  //登录
  const login = (accounts:string,password:string)=>{
    const accountsIndex = userList.value.findIndex(item => item.accounts === accounts)
    if (accountsIndex===-1){
      return {
        message:'用户不存在',
        code:400
      }
    }
    const isTure = userList.value[accountsIndex].password===password
   if(isTure===false){
    return {
      message:'密码错误',
      code:400
    }
   }else{
     user.value = userList.value[accountsIndex]
    return {
      message:'登录成功',
      code:200
    }
   }

}
  //注销
  const logout = ()=>{
    user.value=null
  }
  //获取用户信息
  const getUser = () => {
    if (!user.value) {
      const userMessage = {
        uid: '',
        userName: '',
        userHeadPortrait: userHeadPortrait,
        type: -1,
      }
      return userMessage
    }
    const userMessage = {
      uid: user.value?.uid,
      userName: user.value?.userName,
      userHeadPortrait: user.value?.userHeadPortrait,
      type: user.value?.type
    }
    return userMessage

  }
  const userMessage = computed(()=>{
    return getUser()
  })
 
  //文章列表
  const articleList = ref<articleClass[]>([])
  articleList.value = []
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
    login,
    logout,
    getUser,
    userMessage,
  }
}, { persist: true })
