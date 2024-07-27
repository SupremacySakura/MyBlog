<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
//导入useRouter函数
import { useRouter } from 'vue-router'
const router = useRouter()
//导入仓库
import { storeToRefs } from 'pinia'
//导航栏仓库
import { useTabStore } from '@/stores/tab'
const tabStore = useTabStore()
const { } = storeToRefs(tabStore)
const { setIsActive, setNeedImage } = tabStore
//用户仓库
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()
const { } = storeToRefs(articleStore)
const { register } = articleStore
const userName = ref('')
const accounts = ref('')
const passwordOne = ref('')
const passwordTwo = ref('')
const isShowOne = ref(true)
const isShowTwo = ref(false)
const changeShow = (type:number) => {
    if(type===1){
        isShowOne.value=!isShowOne.value
    }else if(type===2){
        isShowTwo.value=!isShowTwo.value
    }
}
//  注册
const handleRegister = async () => {
    //判断是否为空
    if (userName.value === '') {
        ElNotification({
            title: 'Warning',
            message: '用户名不能为空',
            type: 'warning',
        })
        return
    } else if (accounts.value === '') {
        ElNotification({
            title: 'Warning',
            message: '账户不能为空',
            type: 'warning',
        })
        return
    } else if (passwordOne.value === '') {
        ElNotification({
            title: 'Warning',
            message: '密码不能为空',
            type: 'warning',
        })
        return
    } else if (passwordTwo.value === '') {
        ElNotification({
            title: 'Warning',
            message: '请确认密码',
            type: 'warning',
        })
        return
    }
    //判断密码是否相同
    if (passwordOne.value === passwordTwo.value) {
        //相同
        //发起请求注册
        const res = await register(userName.value, accounts.value, passwordOne.value)
        if (res.code === 400) {
            //注册失败
            ElNotification({
                title: 'Warning',
                message: res.message,
                type: 'warning',
            })
        } else if (res.code === 200) {
            //注册成功
            ElNotification({
                title: 'Success',
                message: res.message,
                type: 'success',
            })
            //跳转到登录页
            router.replace({ name: "login" })
            setIsActive(-2)
            setNeedImage(false)
        }
    } else {
        //不相同
        ElNotification({
            title: 'Warning',
            message: '两次输入密码必须相同',
            type: 'warning',
        })
    }
}
</script>
<template>
    <div class="register">
        <div class="board">
            <div class="head">用户注册</div>
            <form class="newsForm">
                <input type="text" name="" id="" placeholder="请输入用户名" v-model="userName">
                <input type="text" name="" id="" placeholder="请输入账号" v-model="accounts">
                <div class="password">
                    <input :type="isShowOne?'text':'password'" name="" id="" placeholder="请输入密码" v-model="passwordOne">
                    <el-icon class="eyes" @click="changeShow(1)">
                        <Hide v-if="!isShowOne" />
                        <View v-else />
                    </el-icon>
                </div>
                <div class="password">
                    <input :type="isShowTwo?'text':'password'" name="" id="" placeholder="确认密码" v-model="passwordTwo">
                    <el-icon class="eyes" @click="changeShow(2)">
                        <Hide v-if="!isShowTwo" />
                        <View v-else />
                    </el-icon>
                </div>
                <button @click.prevent="handleRegister">注册</button>
            </form>
        </div>
    </div>
</template>
<style scoped lang="less">
.register {
    margin-top: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #a8a8a8;
    display: flex;
    align-items: center;
    justify-content: center;

    .board {
        width: 500px;
        height: 500px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        .head {
            font-size: 24px;
            font-weight: 800;
        }

        .newsForm {
            width: 400px;
            height: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            .password {
                width: 354px;

                .eyes {
                    margin-left: 4px;
                }

                input {
                    width: 330px;
                }
            }

            input {
                width: 350px;
                height: 50px;
                font-size: 20px;
                outline: none;
                border-radius: 10px;
            }

            button {
                width: 100px;
                height: 30px;
            }
        }
    }
}
</style>