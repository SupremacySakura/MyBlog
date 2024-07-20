import { ref } from 'vue'
import { defineStore } from 'pinia'
export const usePublishStore = defineStore('publish', () => {
    //当前选中的输入框的设置
    const nowFontSize = ref<string>('16')
    const nowFontColor = ref<string>('#0b0115')
    const nowFontWight = ref<string>('400')
    //获取输入框设置
    const nowText = (e: any) => {
        //字号
        nowFontSize.value =e.target.style.fontSize
        nowFontSize.value = nowFontSize.value.split('px').join('')
        //字体颜色
        const color = getComputedStyle(e.target).color
        switch (color) {
            case 'rgb(11, 1, 21)':
                nowFontColor.value = 'black'
            return
            case 'rgb(232, 70, 50)':
                nowFontColor.value = 'red'
            return
            case 'rgb(239, 158, 54)':
                nowFontColor.value = 'orange'
            return
            case 'rgb(247, 218, 71)':
                nowFontColor.value = 'yellow'
            return
            default: nowFontColor.value = 'yellow'
        }
        //字体粗细
        nowFontWight.value = e.target.style.fontWeight
        
    }
    return {
        nowFontSize,
        nowFontColor,
        nowFontWight,
        nowText
    }
})
