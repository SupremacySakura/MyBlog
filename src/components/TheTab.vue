<script setup lang="ts">
//导入useRouter函数
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, onMounted } from 'vue'
//导入导航类
import { tabListClass } from '@/classes/tabClass'
//背景图
import backgroundImage2 from '@/assets/images/background2.jpg'
import backgroundImage5 from '@/assets/images/background5.jpg'
import backgroundImage7 from '@/assets/images/background7.jpg'
//导入仓库
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tab'
const tabStore = useTabStore()
//导航高亮显示
const { isActive, tabList, needImage } = storeToRefs(tabStore)
const { setIsActive, setNeedImage } = tabStore
const backgroundImageList: string[] = [
    backgroundImage2,
    backgroundImage5,
    backgroundImage7,
]
//导航栏
//跳转页面函数
const turnToPage = (src: string, id: number, isNeedImage: boolean) => {
    console.log('isNeedImage', isNeedImage)
    console.log('id', id)
    router.replace({ name: src })
    setIsActive(id)
    setNeedImage(isNeedImage)
}
const tab = ref()
//初始化
onMounted(() => {

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
    <div class="tab">
        <span class="name">
            余心知秋的博客
        </span>
        <div v-for="item in tabList" :key="item.id" @click="turnToPage(item.src, item.id, item.isNeedImage)"
            class="tabList" :class="{ active: isActive === item.id }">
            {{ item.label }}
        </div>
        <div class="utils">
            <div class="publish" @click="turnToPage('publish', -1, false)">发布文章</div>
        </div>
    </div>
</template>

<style scoped lang="less">
// 背景图
.tabBackgroundImage {
    width: 100%;
    height: 600px;
    margin-top: 50px;
    img {
        width: 100%;
        height: 100%;
    }
}

//导航栏
.tab {
    display: flex;
    width: 100%;
    height: 50px;
    position:fixed ;
    top: 0;
    color: black;
    background-color: white;
    .name {
        width: 20%;
        height: 50px;
        font-size: 24px;
        font-weight: 600;
        margin-left: 10px;
        position: relative;
        line-height: 50px;
    }

    .tabList {
        width: 5%;
        height: 30px;
        margin-left: 10px;
        cursor: pointer;
        position: relative;
        top: 20px;
        font-size: 16px;
    }
    .tabList:hover{
        color: #439388;
    }

    .utils {
        .publish {
            width: 100px;
            height: 40px;
            line-height: 40px;
            position: absolute;
            border-radius: 25px;
            background-color: #202b2d;
            color: white;
            text-align: center;
            top: 5px;
            right: 10px;
            cursor: pointer;
        }
    }

}


//导航高亮类
.active {
    color: #439388;
}

</style>
