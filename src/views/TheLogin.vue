<script setup lang="ts">
//导入useRouter函数
import { useRouter } from 'vue-router'
const router = useRouter()
//导入仓库
//用户仓库
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()
const { } = storeToRefs(articleStore)
const { login } = articleStore
//导航栏仓库
import { useTabStore } from '@/stores/tab'
const tabStore = useTabStore()
const {  } = storeToRefs(tabStore)
const { setIsActive, setNeedImage } = tabStore
//导入弹窗
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
//账号
const accounts = ref('')
//密码
const password = ref()
//跳转函数
const turnToPage = (src: string, id: number, isNeedImage: boolean) => {
    router.replace({ name: src })
    setIsActive(id)
    setNeedImage(isNeedImage)
}
//登录函数
const handleLogin = ()=>{
    const loginMessage = login(accounts.value,password.value)
   if(loginMessage.code===200){
       ElNotification({
           title: 'Success',
           message: loginMessage.message,
           type: 'success',
       })
       turnToPage('home',0,true)
   }else if(loginMessage.code===400){
       ElNotification({
           title: 'Warning',
           message: loginMessage.message,
           type: 'warning',
       })
   }
}
</script>
<template>
   <div class="login">
    <form class="loginForm">
        <div class="head">登录</div>
        <input type="text" class="name" placeholder="账号" v-model="accounts"></input>
        <input type="password" class="password" placeholder="密码" v-model="password"></input>
        <button @click.prevent="handleLogin">确认登录</button>
    </form>
   </div>
</template>
<style scoped lang="less">
    .login{
        width: 100%;
        min-height: 1000px;
        background-color: #a8a8a8;
        display: flex;
        justify-content: center;
        align-items: center;
        .loginForm{
            width: 600px;
            height: 400px;
            border-radius: 10px;
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .head{
                font-size: 30px;
                font-weight: 800;
            }
            input{
                width: 400px;
                height: 50px;
                display: block;
                border-radius: 10px;
                font-size: 18px;
            }
            button{
                width: 200px;
                height: 40px;
            }
        }
    }
</style>