<script setup lang="ts">
//导入useRouter函数
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, onMounted } from 'vue'
//背景图
import backgroundImage2 from '@/assets/images/background2.jpg'
import backgroundImage5 from '@/assets/images/background5.jpg'
import backgroundImage7 from '@/assets/images/background7.jpg'
//导入仓库
import { storeToRefs } from 'pinia'
//导航栏仓库
import { useTabStore } from '@/stores/tab'
const tabStore = useTabStore()
const { isActive, tabList, needImage } = storeToRefs(tabStore)
const { setIsActive, setNeedImage,getSrc } = tabStore
//用户仓库
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()
const { userMessage,articleSearchList } = storeToRefs(articleStore)
const { logout,getArticleSearchList } = articleStore
//导航高亮显示
const backgroundImageList: string[] = [
    backgroundImage2,
    backgroundImage5,
    backgroundImage7,
]
//导航栏
//跳转页面函数
const turnToPage = (src: string, id: number, isNeedImage: boolean) => {
    //获取文章
    getArticleSearchList(search.value)
    //跳转前清空搜索栏
    search.value = ''
    router.replace({ name: src })
    setIsActive(id)
    setNeedImage(isNeedImage)
}
//退出登录
const handleLogout = () => {
    logout()
    turnToPage('home',0,true)
}
//搜索
const search = ref('')
const handleSearch = ()=>{
    turnToPage('article',1,true)
}
//初始化
onMounted(() => {
    turnToPage(getSrc(),isActive.value,needImage.value)
})

</script>

<template>
    <!-- 背景图 -->
    <div class="block text-center tabBackgroundImage" v-if="needImage">
        <el-carousel height="600px" motion-blur pause-on-hover>
            <el-carousel-item v-for="item in backgroundImageList" :key="item">
                <img :src="item" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
    <!-- 导航栏 -->
    <div class="tab" v-if="isActive !== -2">
        <span class="name">
            余心知秋的博客
        </span>
        <div v-for="item in tabList" :key="item.id" @click="turnToPage(item.src, item.id, item.isNeedImage)"
            class="tabList" :class="{ active: isActive === item.id }">
            {{ item.label }}
        </div>
        <div class="user" v-if="userMessage.uid">
            <img :src="userMessage.userHeadPortrait" class="userHeadPortrait">
            <span>{{ userMessage.userName }}</span>
        </div>
        <div class="search">
            <input type="text" class="searchInput" placeholder="搜索文章" v-model="search">
            <Search class="searchIcon" @click="handleSearch"/>
        </div>
        <div class="utils">
            <div class="login" @click="turnToPage('login', -2, false)" v-if="!userMessage.uid">登录</div>
            <div class="logout" @click="handleLogout" v-else>注销</div>
            <div class="publish" @click="turnToPage('publish', -1, false)" v-if="userMessage.type === 1">发布文章</div>
        </div>
    </div>
</template>

<style scoped lang="less">
.tabBackgroundImage {
    width: 100%;
    height: 600px;
    margin-top: 50px;

    img {
        width: 100%;
        height: 100%;
    }
}

.tab {
    display: flex;
    width: 100%;
    min-width: 900px;
    height: 50px;
    position: fixed;
    top: 0;
    color: black;
    background-color: white;

    .name {
        width: 20%;
        min-width: 200px;
        height: 50px;
        font-size: 24px;
        font-weight: 600;
        margin-left: 10px;
        position: relative;
        line-height: 50px;
    }

    .tabList {
        width: 5%;
        min-width: 50px;
        height: 30px;
        margin-left: 10px;
        cursor: pointer;
        position: relative;
        top: 20px;
        font-size: 16px;
    }

    .tabList:hover {
        color: #439388;
    }

    .user {
        margin-left: 50px;
        width: 200px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .userHeadPortrait {
            width: 50px;
            border-radius: 50px;
        }
    }
    .search{
        width: 200px;
        margin-left: 100px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .searchInput {
            height: 30px;
        }
        .searchIcon {
            cursor: pointer;
            margin-left: 10px;
            width: 40px;
        }
    }
    .utils {
        width: 200px;
        height: 50px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-around;
        right: 0px;

        .logout,
        .login {
            width: 80px;
            height: 40px;
            line-height: 40px;
            border-radius: 25px;
            background-color: #202b2d;
            color: white;
            text-align: center;
            cursor: pointer;
        }

        .publish {
            width: 100px;
            height: 40px;
            line-height: 40px;
            border-radius: 25px;
            background-color: #202b2d;
            color: white;
            text-align: center;
            cursor: pointer;
        }
    }

}


.active {
    color: #439388;
}
</style>
