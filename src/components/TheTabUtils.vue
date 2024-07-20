<script setup lang="ts">
import { ref } from 'vue'
import {
    ArrowDown,
} from '@element-plus/icons-vue'
import { computed } from 'vue';
//
const emit = defineEmits(['handleChangeText'])
//导入发布文章仓库
import { storeToRefs } from 'pinia'
import { usePublishStore } from '@/stores/publish'
const publishStore = usePublishStore()
const { nowFontSize, nowFontColor, nowFontWight } = storeToRefs(publishStore)
//字体大小
const fontSizeList = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
//颜色
const fontColorList = [
    { name: 'black', color: '#0b0115' },
    { name: 'red', color: '#e84632' },
    { name: 'orange', color: '#ef9e36' },
    { name: 'yellow', color: '#f7da47' }
]
//字体粗细
const fontWightList = [200,400,600,800]
//修改字函数
const changeText = (command: number|string,type:string) => {
    emit('handleChangeText', command,type)
}

</script>
<template>
    <div class="topUtils">
        <div class="textUtils">
            <!-- 字号 -->
            <el-select v-model="nowFontSize" placeholder="字号" size="large" style="width: 120px">
                <el-option v-for="item in fontSizeList" :key="item" :label="item" :value="item"
                    @click="changeText(item,'number')" />
            </el-select>
            <!-- 颜色 -->
            <el-select v-model="nowFontColor" placeholder="颜色" size="large" style="width: 120px">
                <el-option v-for="item in fontColorList" :key="item" :label="item.name" :value="item.color"
                    :style="{ backgroundColor: item.color }" @click="changeText(item.color, 'color')" />
            </el-select>
            <!-- 字体粗细 -->
            <el-select v-model="nowFontWight" placeholder="字体粗细" size="large" style="width: 120px">
                <el-option v-for="item in fontWightList" :key="item" :label="item" :value="item"
                     @click="changeText(item, 'weight')" />
            </el-select>
        </div>
    </div>
</template>
<style scoped lang="less">
.topUtils {
    width: 100%;

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
}
</style>