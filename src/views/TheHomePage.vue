<script setup lang="ts">
//导入卡片模块
import TheCard from '@/components/TheCard.vue'
//导入图片
import backgroundImage1 from '@/assets/images/background1.jpg'
import backgroundImage2 from '@/assets/images/background2.jpg'
import backgroundImage3 from '@/assets/images/background3.jpg'
import backgroundImage4 from '@/assets/images/background4.jpg'
import backgroundImage5 from '@/assets/images/background5.jpg'
//图片与文字类
class imageListCLass {
    image: string
    label: string
    constructor(image: string, label: string) {
        this.image = image
        this.label = label
    }
}
//图片文字数组
const imageList: imageListCLass[] = [
    { image: backgroundImage1, label: '答案很长我准备用一生来回答你,准备要听了吗' },
    { image: backgroundImage2, label: '在遇见你之前从未想过结婚,在遇见你之后,我从未想过别人' },
    { image: backgroundImage3, label: '别问我心里有没有你,我余光中都是你' },
    { image: backgroundImage4, label: '在我面前她可以不讲理' },
    { image: backgroundImage5, label: '我一天一天的明白你的平凡,却一天一天愈更爱' },
]
</script>
<template>
    <!-- 卡片 -->
    <div class="homePage" :style="{ height: `${imageList.length * 425}px` }">
        <TheCard v-for="(item, index) in imageList" :key="item.image"
            :class="{ leftCard: index % 2 === 1, rightCard: index % 2 === 0 }" :style="{ top: `${index * 400 + 100}px` }">
            <template v-slot:image>
                <img :src="item.image" alt="">
            </template>
            <template v-slot:content>
                <p :style="{ fontFamily: 'KaiTi' }">{{ item.label }}</p>
            </template>
        </TheCard>
    </div>
</template>
<style scoped lang="less">
.homePage {
    position: relative;
    background-color:#eceff1 ;
    min-width: 1500px;
    img {
        width: 320px;
        height: 180px
    }

    p {
        display: block;
        width: 120px;
        height: 200;
    }
}

//左卡片
.leftCard {
    position: absolute;
    left: 0;
    margin-left: 15%;
}

//右卡片
.rightCard {
    position: absolute;
    right: 0;
    margin-right: 15%;
}
</style>