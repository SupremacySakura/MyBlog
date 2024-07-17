<script setup lang="ts">
//导入瀑布流布局组件
import TheWaterFall from '@/components/TheWaterFall.vue'
</script>
<template>
    <div class="share">
        <TheWaterFall></TheWaterFall>
    </div>
</template>
<style scoped lang="less">
.share{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>