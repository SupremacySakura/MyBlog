<script setup lang="ts">
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
//导入仓库
import { storeToRefs } from 'pinia'
//用户仓库
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()
const { userList,articleList } = storeToRefs(articleStore)
const {  } = articleStore
const getType = (type:number)=>{
    switch(type){
        case 0 :
            return '管理员'
        case 1 :
            return '作者'
        case 2 :
            return '访客'
    }
}
const getArticleNumber = (uid:string)=>{
   return articleList.value.filter(item=>item.user.uid===uid).length
}
</script>
<template>
    <div class="management">
        <table>
            <thead>
                <tr>
                    <th>头像</th>
                    <th>用户id</th>
                    <th>用户名</th>
                    <th>账户</th>
                    <th>密码</th>
                    <th>级别</th>
                    <th>文章发布数量</th>
                    <th>删除用户</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in userList" :key="item.uid">
                    <td><img :src="item.userHeadPortrait" class="userHeadPortrait"></td>
                    <td>{{ item.uid }}</td>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.accounts }}</td>
                    <td>{{ item.password }}</td>
                    <td>{{ getType(item.type) }}</td>
                    <td>{{ getArticleNumber(item.uid) }}</td>
                    <td><el-button type="danger" :icon="Delete" circle /></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped lang="less">
.management {
    border-top: 1px solid black;
    width: 100%;
    min-height: 1000px;
    margin-top: 50px;
    background-color: #eceff1;
    table{
        margin-top: 80px;
        margin-left: 100px;
        border: 1px solid black;
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        td{
            min-width: 100px;
            text-align: center;
        }
        .userHeadPortrait {
                width: 50px;
                height: 50px;
                border-radius: 50px;
            }
    }
}


</style>

