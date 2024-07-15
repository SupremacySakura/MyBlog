//用户类
export class userClass {
    uid: string // 用户id
    userName: string //用户名
    userHeadPortrait: string //用户头像
    constructor(uid: string, userName: string, userHeadPortrait: string) {
        this.uid = uid
        this.userName = userName
        this.userHeadPortrait = userHeadPortrait
    }
}