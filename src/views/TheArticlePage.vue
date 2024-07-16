<script setup lang="ts">
//导入头像
import userHeadPortrait from '@/assets/images/userHeadPortrait.jpg'
//导入测试封面图片
import testImage from '@/assets/images/test1.jpg'
//导入卡片组件
import Card from '@/components/TheCard.vue'
//导入路由
import { useRouter } from 'vue-router';
//导入仓库
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
//导入文章类与用户类
import { userClass } from '@/classes/userClass'
import { articleClass } from '@/classes/articleClass'
//导入删除弹窗
import { ElMessage, ElMessageBox } from 'element-plus'
const articleStore = useArticleStore()
const { user, articleList } = storeToRefs(articleStore)
const tabStore = useTabStore()
const { isActive } = storeToRefs(tabStore)
const { setIsActive, setNeedImage } = tabStore
import { useTabStore } from '@/stores/tab'
//删除文章
const { deleteArticle } = useArticleStore()
const  handleDelete = (id:number)=>{
     ElMessageBox.confirm(
        '此操作会删除文章,确认继续操作吗?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteArticle(id)
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
            
        })
        .catch(() => {
            console.log(2)
            
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
            
        })
    
        
}
//用户

//文章列表

//跳转具体文章页
const router = useRouter()
const turnToShowPage = (id: number) => {
    router.replace({ name: 'show', params: { id: JSON.stringify(id) } })
    setNeedImage(false)
}
</script>
<template>
    <div class="article" :style="{ height: `${articleList.length * 350}px` }">
        <Card v-for="(item, index) in articleList" :key="item.id">
            <template v-slot:image>
                <img :src="item.cover" alt="" class="cover">
            </template>
            <template v-slot:content>
                <!-- 标题 -->
                <p class="head" @click="turnToShowPage(item.id)">{{ item.head }}</p>
                <p class="body">{{ item.article[0] }}</p>
                <div class="news">
                    <!-- 头像 -->
                    <img :src="item.user.userHeadPortrait" alt="" class="headPortrait">
                    <!-- 日期 -->
                    <span class="date">{{ `${item.user.userName} ${item.date}` }}</span>
                </div>
                <button class="delete" @click="handleDelete(item.id)">x</button>
            </template>
        </Card>

    </div>
</template>
<style scoped lang="less">
.article {
    background-color: #eceff1;
    position: relative;
    display: flex;
    align-items: start;
    flex-direction: column;

    .card {
        position: relative;
        justify-content: start;
        width: 65%;
        margin-top: 20px;
        margin-left: 8%;

        .cover {
            width: 400px;
            height: 270px;
            border-radius: 10px;
            cursor: pointer;
        }

        .head {
            font-size: 30px;
            font-weight: 600;
            margin-left: 20px;
            cursor: pointer;
        }

        .body {
            color: #656565;
            margin-left: 20px;
            margin-right: 20px;
            overflow: hidden;
            /* 隐藏溢出内容 */
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            /* 显示的行数 */
            text-overflow: ellipsis;
        }

        .news {
            width: 350px;
            height: 50px;
            margin-left: 20px;

            .headPortrait {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
            }

            .date {
                display: block;
                width: 300px;
                height: 50px;
                line-height: 50px;
                float: right;
            }
        }
        .delete{
            position: absolute;
            right: 1%;
            top:2%;
            width: 25px;
            height: 20px;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.5);
        }
    }

}
</style>