import { userClass } from '@/classes/userClass'
//文章类
export class articleClass {
    head: string // 标题
    article: string[] // 正文
    user: userClass // 用户
    date: string // 发布时间
    image: string[] // 图片
    cover: string // 封面图片
    id: number // 文章id
    constructor(head: string, article: string[], user: userClass, date: string, image: string[], cover: string, id: number) {
        this.head = head
        this.article = article
        this.user = user
        this.date = date
        this.image = image
        this.cover = cover
        this.id = id
    }
}