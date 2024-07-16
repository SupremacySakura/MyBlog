<script setup lang="ts">
//导入文章类与用户类
import { userClass } from '@/classes/userClass'
import { articleClass } from '@/classes/articleClass'
//导入测试封面图片
import testImage from '@/assets/images/test1.jpg'
import { ref } from 'vue'
//导入路由
import { useRoute } from 'vue-router';
const route = useRoute()
//导入仓库
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()
//导入文章
const { user, articleList } = storeToRefs(articleStore)
//保存传递过来的id
const id = +route.params.id
//对文章进行匹配
const article = articleList.value.find(item => item.id === id) || new articleClass('加载失败', ['404 NOT FOUND'], user.value as userClass, '1949/10/01 12:00:00', [], testImage, Math.random())
</script>
<template>
    <div class="all">
        <div class="article">
            <div class="articleHead">{{ article.head }}</div>
            <div class="news">
                <img :src="article.user.userHeadPortrait" alt="" class="userHeadPortrait">
                <span class="user">{{ `${article.user.userName} ${article.date}` }}</span>
            </div>
            <div class="board">
                <div class="body">
                    <p v-for="(item, index) in article.article" :key="item">
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        {{ item }}</p>
                    <img :src="item" alt="" v-for="(item, index) in article.image" :key="item">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.all {
    width: 100%;
    margin-top: 50px;
    padding-bottom: 50px;
    background-color: #eceff1;

    .article {
        width: 60%;
        margin-left: 10%;
        padding-top: 40px;

        .articleHead {
            font-size: 40px;
            font-weight: 800;
            margin-bottom: 50px;
        }

        .news {
            width: 350px;
            height: 50px;
            margin-bottom: 20px;

            .userHeadPortrait {
                width: 50px;
                height: 50px;
                border-radius: 50%
            }

            .user {
                display: block;
                width: 250px;
                height: 50px;
                line-height: 50px;
                float: right;
            }
        }

        .board {
            background-color: white;
            min-height: 1000px;
            border-radius: 10px;

            .body {
                padding-top: 40px;
                padding-left: 10%;
                width: 80%;

                p {
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>