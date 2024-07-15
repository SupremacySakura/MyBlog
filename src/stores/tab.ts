import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { tabListClass } from '@/classes/tabClass'
export const useTabStore = defineStore('tab', () => {
    const isActive = ref(0)
    const setIsActive = (id: number) => {
        isActive.value = id
    }
    const needImage = ref(true)
    const setNeedImage = (isNeed: boolean) => {
        needImage.value = isNeed
    }

    //导航列表
    const tabList = ref<tabListClass[]>([])
    //导航列表数组
    tabList.value = [
        new tabListClass(0, '主页', 'home', true),
        new tabListClass(1, '文章', 'article', true),
        new tabListClass(2, '分享', 'share', true),
        new tabListClass(3, '关于', 'about', true),
    ]
    return {
        isActive,
        setIsActive,
        needImage,
        setNeedImage,
        tabList,
    }
}, { persist: true })
