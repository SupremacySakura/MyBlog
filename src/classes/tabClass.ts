export class tabListClass {
    id: number //导航ID
    label: string //导航名
    src: string //跳转地址
    isNeedImage: boolean //是否需要图片
    constructor(id: number, label: string, src: string, isNeedImage: boolean) {
        this.id = id
        this.label = label
        this.src = src
        this.isNeedImage = isNeedImage
    }
}