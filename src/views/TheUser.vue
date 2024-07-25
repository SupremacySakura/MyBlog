<script setup lang="ts">
//导入仓库
import { storeToRefs } from 'pinia'
//用户仓库
import { useArticleStore } from '@/stores/article'
import { computed } from 'vue';
const articleStore = useArticleStore()
const { userMessage } = storeToRefs(articleStore)
const { changeUserHeadPortrait } = articleStore
//添加图片函数
const handleChangeUserHeadPortrait = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target != null) {
                changeUserHeadPortrait(userMessage.value.uid, e.target.result as string)
                }
            }
        reader.readAsDataURL(file)
        }
    else {
        alert('Please select an image file.')
    }
}
const userType = computed(()=>{
    switch (userMessage.value.type){
        case 1:
            return '管理员'
        case 2:
            return '访客'
        default :
            return '访客'
    }
   
})
</script>
<template>
    <div class="user">
        <div class="board">
            <div class="news">
                <div class="head">个人信息</div>
                <div class="userHeadPortraitNews">
                    <img :src="userMessage.userHeadPortrait" alt="" class="userHeadPortrait">
                    <label for="handleChangeUserHeadPortrait" class="button">修改头像</label>
                    <input type="file" accept="image/*" @change="(event) => handleChangeUserHeadPortrait(event)"
                        class="hidden" id="handleChangeUserHeadPortrait">
                </div>
                <div class="userNews">uid:{{ userMessage.uid }}</div>
                <div class="userNews">用户名:{{ userMessage.userName }}</div>
                <div class="userNews">账号:{{ userMessage.accounts }}</div>
                <div class="userNews">权限:{{ userType }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.user{
    border: 1px solid black;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 800px;
    background-color: #eceff1;
    .board{
        width: 500px;
        height: 500px;
        background-color: #d6e3fb;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        .news{
            width: 400px;
            height: 400px;
            border-radius: 8px;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .head{
                font-size: 24px;
                font-weight: 800;
            }
            .userHeadPortraitNews{
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 400px;
                height: 100px;
                .change{
                    width: 100px;
                    height: 40px;
                }
                .userHeadPortrait {
                        width: 100px;
                        height: 100px;
                        border-radius: 100px;
                    }
            }
                .userNews {
                    margin-left: 20px;
                    width: 400px;
                    height: 50px;
                    font-size: 18px;
                }
        }
    }
}
.hidden{
    display: none;
}
.button{
    width: 100px;
    height: 40px;
    border: 1px solid #000;
    cursor:pointer;
    line-height: 40px;
    text-align: center;
}
.news:hover {
    animation-name: bigger;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}
.news:not(:hover) {
    animation-name: smaller;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}
@keyframes bigger {
    0% {
        scale: 1;
    }

    100% {
        scale: 1.1;
    }
}

@keyframes smaller {
    0% {
        scale: 1.1;
    }

    100% {
        scale: 1;
    }
}
</style>