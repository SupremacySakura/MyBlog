<script setup lang="ts">
import { ref, onMounted, nextTick,onUnmounted } from 'vue'
//导入测试图片
import waterFall1 from '@/assets/images/waterFall1.jpg'
import waterFall2 from '@/assets/images/waterFall2.jpg'
import waterFall3 from '@/assets/images/waterFall3.jpg'
import waterFall4 from '@/assets/images/waterFall4.jpg'
import waterFall5 from '@/assets/images/waterFall5.jpg'
import waterFall6 from '@/assets/images/waterFall6.jpg'
import waterFall7 from '@/assets/images/waterFall7.jpg'
//导入节流函数
import { throttle } from 'lodash'
//列数数组类
class columnHeightClass {
    id: number
    height: number
    constructor(id: number, height: number) {
        this.id = id
        this.height = height
    }
}
//图片(需要从服务器获取的数据,格式为[{src:string,height:number,width:number}],且保证width相同)
const photoList = [
    { src: waterFall1, height: 270.5 ,width : 405.75},
    { src: waterFall2, height: 541, width: 405.75 },
    { src: waterFall3, height: 228.17, width: 405.75 },
    { src: waterFall4, height: 608.63, width: 405.75 },
    { src: waterFall5, height: 608.63 ,width: 405.75 },
    { src: waterFall6, height: 608.63, width: 405.75 },
    { src: waterFall7, height: 608.63, width: 405.75 },
]
//可自定义的数据,图片上下间距
let marginTop = 10
//列数数组
const columnHeight = ref<columnHeightClass[]>([])
//容器
const waterFall = ref<HTMLDivElement | null>(null)
//列数
const row=ref(0)
//图片左右间距
const photoMargin =ref(0)
//计算几行几列函数(传入容器和图片宽度,返回列数和间距)
const getRowAndMargin = (item:HTMLElement,photoWidth:number)=>{
    const width = item.offsetWidth
    const row = Math.floor(width/photoWidth)
    const margin = width % photoWidth / ( row + 1 )
    return [row, margin]
}
//设置图片位置(传入dom容器,左间距,图片宽度,上下间距)
const setPosition=(children:HTMLCollection,marginLeft:number,photoWidth:number,marginTop:number)=>{
    for(let i =0;i<photoList.length;i++){
        const child = children[i] as HTMLElement
        //寻找到最小高度的一项,向这一项添加图片
        const minItem= columnHeight.value.reduce((min, current) => current.height < min.height ? current : min, columnHeight.value[0])
        child.style.left = `${marginLeft * (minItem.id) + photoWidth * (minItem.id-1)}px`
        child.style.top = `${minItem.height}px`
        columnHeight.value[columnHeight.value.findIndex(item => item.id === minItem.id)].height+=child.offsetHeight+marginTop
        //寻找到最大高度的一项
        const maxItem = columnHeight.value.reduce((max, current) => current.height > max.height ? current : max, columnHeight.value[0])
        if(waterFall.value!=null){
            waterFall.value.style.height=`${maxItem.height}px`
        }
    }
}
//重新渲染函数
const newWaterFall= ()=>{
    if (waterFall.value != null) {
        const children = waterFall.value.children
        nextTick(() => {
            [row.value, photoMargin.value] = getRowAndMargin(waterFall.value as HTMLElement, 405.75)
            columnHeight.value = []
            //生成列数数组
            for (let i = 1; i <= row.value; i++) {
                columnHeight.value.push({ id: i, height: 0 })
            }
            setPosition(children, photoMargin.value, photoList[0].width, marginTop)
        })
    }
    
}
onMounted(()=>{
    newWaterFall()
    window.addEventListener('resize',throttle(()=>{newWaterFall()},1000))
})
onUnmounted(()=>{
    window.removeEventListener('resize', throttle(() => { newWaterFall() },1000))
})
</script>
<template>
    <div class="waterFall" ref="waterFall" :style="{ minWidth: `${photoList[0].width}px`}">
        <img :src="item.src" alt="" v-for="item in photoList" :key="item.src" :style="{ height: `${item.height}px` ,width:`${item.width}px`}">
    </div>
</template>
<style scoped>
.waterFall{
    width: 80%;
    position: relative;
    min-height: 1000px;
    img{
        display: block;
        position: absolute
    }
}

</style>