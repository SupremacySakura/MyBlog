<script setup lang="ts">
// 导入ref
import { ref, computed } from 'vue'
// 导入默认封面
import defaultCover from '@/assets/images/defaultCover.jpg'
//导入文章仓库
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()
//导入导航栏仓库
import { useTabStore } from '@/stores/tab'
const tabStore = useTabStore()
//导入文章
const { user } = storeToRefs(articleStore)
const { publishArticle } = articleStore
//导入文章类
import { articleClass } from '@/classes/articleClass'
const { isActive, tabList, needImage } = storeToRefs(tabStore)
const { setIsActive, setNeedImage } = tabStore
//导入文章网址
//导入dayjs
import dayjs from 'dayjs'
import type { userClass } from '@/classes/userClass'
//导入通知
import { ElNotification } from 'element-plus'
//导入useRouter函数
import { useRouter } from 'vue-router'
const router = useRouter()
//封面
const coverUrl = ref<string>(defaultCover)
//图片
const imageUrl = ref<string[]>([])
//标题
const head = ref<string>('')
//正文
const editor = ref<HTMLDivElement | null>(null)
const article =ref<string>('')
//绑定输入事件
const onInput = () => {
    article.value = editor.value?.innerHTML as string
}
//添加图片函数
const addImage = (event: any, type: string) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target != null) {
                if (type === 'cover') {
                    coverUrl.value = e.target.result as string
                } else if (type === 'image') {
                    imageUrl.value.push(e.target.result as string)
                    //将图片添加进入文章区
                    const imgNode = document.createElement('img')
                    imgNode.src =imageUrl.value[imageUrl.value.length-1]
                    imgNode.style.maxWidth='100%'
                    editor.value?.appendChild(imgNode)
                    article.value = editor.value?.innerHTML as string
                    if(editor.value!=null){
                        const startHeight = editor.value.offsetHeight
                        const addHeight = imgNode.offsetHeight
                        editor.value.style.height = `${startHeight + addHeight+200}px`
                        //插入新的可输入区
                        const textNode = document.createElement('div')
                        textNode.contentEditable ='true'
                        textNode.style.minHeight = '10px'
                        editor.value?.appendChild(textNode)
                    }
                }
            }
        }
        reader.readAsDataURL(file)
    } else {
        alert('Please select an image file.')
    }
}
//摘要
const digest = ref<string>('')
//发布文章函数
const handleArticle = () => {
    if (head.value === '') {
        ElNotification({
            title: 'Warning',
            message: '标题不能为空',
            type: 'warning',
        })
        return
    }
    if (article.value === '') {
        ElNotification({
            title: 'Warning',
            message: '文章不能为空',
            type: 'warning',
        })
        return
    }
    if (digest.value===''){
        ElNotification({
            title: 'Warning',
            message: '摘要不能为空',
            type: 'warning',
        })
        return
    }
    const date = dayjs().format('YYYY/MM/DD HH:mm:ss')
    const articleItem: articleClass = new articleClass(head.value,digest.value, article.value, user.value as userClass, date, imageUrl.value, coverUrl.value, Math.random())
    publishArticle(articleItem)
    //跳转到文章页
    router.replace({ name: 'article' })
    setIsActive(1)
    setNeedImage(true)
}
//头部工具栏
import { ElMessage } from 'element-plus'
import {
    ArrowDown,
    Check,
} from '@element-plus/icons-vue'
//字体大小
const fontSizeList = [12,14,16,18,20,22,24,26,28,30]
const fontSizeNow = 16
const handleCommand = (command: number ) => {
    const textNode = document.createElement('div')
    textNode.contentEditable = 'true'
    textNode.style.minHeight = '10px'
    textNode.style.minWidth = '10px'
    textNode.style.display = 'inline-block'
    textNode.style.fontSize = `${command}px`
    editor.value?.appendChild(textNode)
}
</script>
<template>
    <div class="publishPage">
        <div class="textUtils">
            <!-- 字号 -->
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" :style="{outline:'none'}">
                    字号<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :command="item" divided v-for="item in fontSizeList" :key="item">
                            {{ item }}
                        </el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="board">
            <form action="">
                <!-- 标题 -->
                <input type="text" placeholder="请输入文章标题" class="head" v-model="head">
                <!-- 正文 -->
                <div contenteditable="true" class="article" ref="editor" @input="onInput">
                </div>
            </form>
        </div>
        <!-- 添加其他 -->
        <div class="set">
            <!-- 添加摘要 -->
            <div class="digest">
                <span>添加摘要</span>
                <textarea v-model="digest"></textarea>
            </div>
            <!-- 文章封面 -->
            <div class="cover">
                <label for="chooseCover" class="button">
                    选择封面
                </label>
                <input type="file" accept="image/*" @change="(event) => addImage(event, 'cover')" class="hidden"
                    id="chooseCover">
                <img :src="coverUrl" alt="" class="coverImage">
            </div>
            <!-- 正文图片 -->
            <div class="image">
                <label for="addImage" class="button">
                    添加图片
                </label>
                <input type="file" accept="image/*" @change="(event) => addImage(event, 'image')" class="hidden"
                    id="addImage">
                <div class="articleImageList">
                    <img :src="item" alt="" v-for="(item, index) in imageUrl" class="articleImage">
                </div>
            </div>
        </div>
        <div class="utils">
            <button class="publish" @click="handleArticle()">发布文章</button>
        </div>
    </div>
</template>
<style scoped lang="less">
.publishPage {
    margin-top: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #eceff1;
    display: flex;
    align-items: center;
    flex-direction: column;
    .textUtils {
            background-color: #f5f5f5;
            width: 100%;
            height: 50px;
            position: sticky;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid black;
            top: 50px;
        }
    .board {
        background-color: white;
        width: 60%;
        min-height: 800px;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 10px;

        form {
            width: 90%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .head {
                width: 100%;
                height: 100px;
                border: none;
                border-bottom: 1px solid rgba(0, 0, 0, 0.5);
                outline: none;
                font-size: 30px;
                font-weight: 800;
            }

            .article {
                width: 100%;
                min-height: 700px;
                font-size: 16px;
                border: none;
                outline: none;
            }
        }
    }

    .set {
        width: 60%;
        min-height: 500px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px;
        .digest{
            display: flex;
            align-items: center;
            width: 80%;
            min-height: 250px;
            span{
                margin-right: 10px;
            }
            textarea{
                width: 60%;
                height: 100px;
                resize: none;
            }
            border-bottom: 1px solid black;
        }
        .cover {
            display: flex;
            align-items: center;
            width: 80%;
            min-height: 250px;

            .coverImage {
                width: 160px;
                height: 90px;
                margin-left: 10px;
            }

            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        }

        .image {
            display: flex;
            align-items: center;
            width: 80%;
            min-height: 250px;

            .articleImageList {
                width: 90%;
                display: flex;
                flex-wrap: wrap;
                height: 250px;
                overflow-y: auto;

                .articleImage {
                    width: 160px;
                    height: 90px;
                    padding-left: 10px;
                    margin-top: 10px;
                }
            }
        }

        .button {
            display: block;
            width: 10%;
            height: 50px;
            background-color: #24abf2;
            color: white;
            border-radius: 25px;
            line-height: 50px;
            text-align: center;
        }
    }

    .utils {
        background-color: white;
        width: 100%;
        height: 50px;
        position: sticky;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: end;
        .publish {
            height: 40px;
            width: 100px;
            border-radius: 20px;
            border: 0;
            background-color: #24abf2;
            margin-right: 10px;
        }
    }
}

.hidden {
    display: none;
}
.higher {
    font-size: 30px;
}

</style>