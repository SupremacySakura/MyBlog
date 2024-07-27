import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { tabListClass } from '@/classes/tabClass'
export const useTabStore = defineStore('tab', () => {
    const isActive = ref(0)
    const setIsActive = (id: number) => {
        console.log(id)
        isActive.value = id
        console.log(isActive.value)
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
    //获取地址
    const getSrc = ()=>{
        switch(isActive.value){
            case 0 :
                return 'home'
            case 1 :
                return 'article'
            case 2 :
                return 'share'
            case 3 :
                return 'about'
            case -1 :
                return 'publish'
            case -2 :
                return 'login'
            case -3 :
                return 'user'
            case -4 :
                return 'register'
            case -5:
                return 'management'
            default:
                return 'home'        
        }
    }
    const getId =(src:string)=>{
        switch (src) {
            case 'home':
                return 0
            case 'article':
                return 1
            case 'share':
                return 2
            case 'about':
                return 3
            case 'publish':
                return -1
            case 'login':
                return -2
            case 'user':
                return -3
            case 'register':
                return -4
            case 'management':
                return -5
            default:
                return 0
        }
    }
    return {
        isActive,
        setIsActive,
        needImage,
        setNeedImage,
        tabList,
        getSrc,
        getId,
    }
}, { persist: true })
