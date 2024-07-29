<script setup lang="ts">
import { ref } from 'vue'
import {
    Check,
    Delete,
    Top,
    Bottom
} from '@element-plus/icons-vue'
//导入仓库
import { storeToRefs } from 'pinia'
//用户仓库
import { useArticleStore } from '@/stores/article'
const articleStore = useArticleStore()
const { userList,articleList,userMessage } = storeToRefs(articleStore)
const { deleteUser,userIce,upgrade,downgrade } = articleStore
const getType = (type:number)=>{
    switch(type){
        case -1:
            return '最高管理者'
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
const getIsShow = (userType:number,userItemType:number)=>{
    return userType<userItemType
}
const getState = (state:number)=>{
    switch (state) {
        case 0:
            return '已冻结'
        case 1:
            return '正常'
    }
}
//删除
const type = ref('')
const message = ref('')
const userUid = ref('')
const handleDelete = (uid:string)=>{
    userUid.value=uid
    message.value = '你确定要永久删除该用户吗'
    dialogVisible.value=true
    type.value='delete'
}
//冻结
const handleIce = (uid:string,state:number)=>{
    userUid.value = uid
    if(state===1){
        message.value = '你确定要冻结该用户吗'
        dialogVisible.value = true
        type.value='getIce'
    }else if(state===0){
        message.value = '你确定要解冻该用户吗'
        dialogVisible.value = true
        type.value = 'loseIce'
    }
   
}
//升级
const handleUpgrade = (uid:string)=>{
    userUid.value = uid
    message.value = '你确定要升级该用户吗'
    dialogVisible.value = true
    type.value = 'upgrade'
}
//降级
const handleDowngrade = (uid: string) => {
    userUid.value = uid
    message.value = '你确定要降级该用户吗'
    dialogVisible.value = true
    type.value = 'downgrade'
}
const dialogVisible = ref(false)
const confirm = ()=>{
    dialogVisible.value = false
    if(type.value==='delete'){
        deleteUser(userUid.value)
    }else if(type.value==='getIce'){
        userIce(type.value, userUid.value)
    }else if(type.value==='loseIce'){
        userIce(type.value, userUid.value)
    }else if (type.value==='upgrade'){
        upgrade(userUid.value)
    }else if (type.value==='downgrade'){
        downgrade(userUid.value)
    }
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
                    <th>账号状态</th>
                    <th>删除用户</th>
                    <th>冻结/解冻用户</th>
                    <th>升级</th>
                    <th>降级</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in userList" :key="item.uid">
                    <td><img :src="item.userHeadPortrait" class="userHeadPortrait"></td>
                    <td>{{ item.uid }}</td>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.accounts }}</td>
                    <td>{{ item.type>=userMessage.type?item.password:'' }}</td>
                    <td>{{ getType(item.type) }}</td>
                    <td>{{ getArticleNumber(item.uid) }}</td>
                    <td>{{ getState(item.state) }}</td>
                    <td><el-button type="danger" :icon="Delete" circle v-if="getIsShow(userMessage.type,item.type)"
                            @click="handleDelete(item.uid)" /></td>
                    <td><el-button type="primary" :icon="Check" circle v-if="getIsShow(userMessage.type, item.type)"
                            @click="handleIce(item.uid,item.state)" /></td>
                    <td>
                        <el-button type="success" :icon="Top" circle v-if="getIsShow(userMessage.type, item.type)&&item.type>0" @click="handleUpgrade(item.uid)"/>
                    </td>
                    <td>
                        <el-button type=" danger" :icon="Bottom" circle v-if="getIsShow(userMessage.type, item.type)&&item.type<2"@click="handleDowngrade(item.uid)" />
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 对话弹窗 -->
        <el-dialog v-model=" dialogVisible" title="Tips" width="500">
            <span>{{ message }}</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirm()">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
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

