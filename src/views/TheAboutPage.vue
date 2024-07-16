<script setup lang="ts">
import WeChat from '@/assets/images/WeChat.png'
import QQ from '@/assets/images/QQ.png'
const contactList = [
    {src:WeChat,label:'LXFSIO'},
    { src: QQ, label: '2712794459' },
]
</script>
<template>
    <div class="about">
        <div class="board">
            <div class="content">
                <p>作者很懒,什么也没有留下......</p>
            </div>
        </div>
        <div class="others">
            <span class="contactBloger">联系作者</span>
            <div class="contact" v-for="item in contactList" :key="item.label">
                <img :src="item.src">
                <span>{{ item.label }}</span>
            </div>
        </div>



    </div>
</template>
<style scoped lang="less">
.about{
    background-color: #eceff1;
    min-height: 1000px;
    display: flex;
    align-items: center;
    .board{
        width: 60%;
        min-height: 800px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        margin-left: 10%;
        .content{
            margin-top: 50px;
            width: 80%;
        }
    }
    .others{
        width: 20%;
        min-height: 800px;
        background-color: white;
        border-radius: 10px;
        margin-left: 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .contactBloger{
            margin-top: 10px;
        }
        .contact{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;
            img {
                    margin-top: 30px;
                    width: 80%;
                }
            
                span {
                    display: block;
                }
        }
    }
}
</style>