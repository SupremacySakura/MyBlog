import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
//导入文章类与用户类
import { userClass } from '@/classes/userClass'
import { articleClass } from '@/classes/articleClass'
//导入头像
import userHeadPortrait from '@/assets/images/userHeadPortrait.jpg'
//导入测试封面图片
import testImage from '@/assets/images/test1.jpg'
export const useArticleStore = defineStore('article', () => {
  //用户
  const user = ref<userClass | null>(null)
  user.value = new userClass('super123123301', '余心知秋', userHeadPortrait)
  //文章列表
  const articleList = ref<articleClass[]>([])
  //鲁迅秋夜
  const paragraph1 = '在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。'
  const paragraph2 = '这上面的夜的天空，奇怪而高，我生平没有见过这样的奇怪而高的天空，他仿佛要离开人间而去，使人们仰面不再看见。然而现在却非常之蓝，闪闪地夹着几十个星星的眼，冷眼。他的口角上现出微笑，似乎自以为大有深意，而将繁霜洒在我的园里的野花草上。'
  const paragraph3 = '我还不知道那些花草真叫什么名字，人们叫他们什么名字。我记得有一种开过极细小的粉红花，现在还在开着，但是更极细小了，她在冷的夜气中，瑟缩地做梦，梦见春的到来，梦见秋的到来，梦见瘦的诗人将眼泪擦在她最末的花瓣上，告诉她秋虽然来，冬虽然来，而此后接着还是春，蝴蝶乱飞，蜜蜂都唱起春词来了。她于是一笑，虽然颜色冻得红惨惨地，仍然瑟缩着。'

  articleList.value = [
    new articleClass('测试文章', ['这是一个很长的文本示例，用于演示多行文本溢出显示省略号的效果。这个文本包含了很多很多内容，但是我们只想显示前两行，剩余的部分将使用省略号来表示。希望这个示例能够清晰地展示如何实现这一效果。'], user.value, '2024/7/12 15:44:35', [], testImage, 0),
    new articleClass('测试文章', ['这是一片测试文章'], user.value, '2024/7/12 15:44:35', [], testImage, 1),
    new articleClass('测试文章', ['这是一片测试文章'], user.value, '2024/7/12 15:44:35', [], testImage, 2),
    new articleClass('秋夜', [paragraph1, paragraph2, paragraph3], user.value, '2024/7/12 15:44:35', [], testImage, 3),
  ]
  const publishArticle = (item: articleClass) => {
    articleList.value.unshift(item)
  }
  const deleteArticle = (id:number)=>{
    articleList.value=articleList.value.filter(item=>item.id!=id)
  }
  return {
    user,
    articleList,
    publishArticle,
    deleteArticle,
  }
}, { persist: true })
