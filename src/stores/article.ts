import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
//导入文章类与用户类
import { userClass } from '@/classes/userClass'
import { articleClass } from '@/classes/articleClass'
//导入头像
import userHeadPortrait from '@/assets/images/userHeadPortrait.jpg'
export const useArticleStore = defineStore('article', () => {
  //用户
  const user = ref<userClass | null>(null)
  const userList = ref<userClass[]>([])
  userList.value =[
    new userClass('super123123301', '余心知秋','15310836616','2005' ,userHeadPortrait, 1),
    new userClass('super123', '余心知秋2', '153', '2005', userHeadPortrait, 1),
    new userClass('fangke123123', '访客','12345678910','123456' ,userHeadPortrait, 2),
  ]
  //注册用户
  const register = (userName:string,accounts:string,password:string)=>{
    //检查用户账号是否重复
    const accountsTrue =  userList.value.find(item=>item.accounts===accounts)
    if(accountsTrue){
      return {
        message:'账号重复',
        code:400
      }
    }
    //生成一个不重复的uid
    let uid = Math.floor(Math.random()*10000000000+1).toString()
    let uidTrue = userList.value.find(item => item.uid === uid)
    for(let i =0;i<=10;i++){
      if(uidTrue){
        uid = Math.floor(Math.random() * 10000000000 + 1).toString()
      }else{
        break
      }
      if(i===9){
        return {
          message:'注册失败,请联系管理员',
          code:400
        }
      }
    }
    const type = 2
    userList.value.push(new userClass(uid,userName,accounts,password,userHeadPortrait,type))
    return {
      message:'注册成功',
      code:200
    }   
  }
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
        accounts:''
      }
      return userMessage
    }
    const userMessage = {
      uid: user.value?.uid,
      userName: user.value?.userName,
      userHeadPortrait: user.value?.userHeadPortrait,
      type: user.value?.type,
      accounts:user.value?.accounts
    }
    return userMessage

  }
  const userMessage = computed(()=>{
    return getUser()
  })
  const isLoggedIn = computed(()=>{
    return !(userMessage.value.uid===''&&userMessage.value.userName===''&&userMessage.value.userHeadPortrait===userHeadPortrait&&userMessage.value.type===-1)
  })
  const isWriter = computed(()=>{
    return userMessage.value.type===1
  })
  //文章列表
  const articleList = ref<articleClass[]>([])
  articleList.value = []
  const publishArticle = (item: articleClass) => {
    articleList.value.unshift(item)
  }
  //搜索文章列表
  const articleSearchList = ref<articleClass[]>([])
  const getArticleSearchList = (label:string)=>{
    articleSearchList.value = articleList.value.filter((item)=>(item.article.includes(label)||item.head.includes(label)||item.digest.includes(label)))
  }
  //修改头像
  const changeUserHeadPortrait = (uid:string,src:string)=>{
    const index =  userList.value.findIndex(item=>item.uid===uid)
    userList.value[index].userHeadPortrait=src
    if(user.value!=null){
      user.value.userHeadPortrait = src
    }
  }
  //修改名字
  const changeUserName = (uid: string, name: string) => {
    const index = userList.value.findIndex(item => item.uid === uid)
    userList.value[index].userName = name
    if (user.value != null) {
      user.value.userName = name
    }
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
    isLoggedIn,
    isWriter,
    articleSearchList,
    getArticleSearchList,
    changeUserHeadPortrait,
    changeUserName,
    register,
  }
}, { persist: true })
