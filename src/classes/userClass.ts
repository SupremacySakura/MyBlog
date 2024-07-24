//用户类
export class userClass {
    uid: string // 用户id
    userName: string //用户名
    accounts:string //账号
    password:string //密码
    userHeadPortrait: string //用户头像
    type:number //用户级别 1为管理员 2为访客
    constructor(uid: string, userName: string,accounts:string,password:string ,userHeadPortrait: string,type:number) {
        this.uid = uid
        this.userName = userName
        this.accounts=accounts
        this.password=password
        this.userHeadPortrait = userHeadPortrait
        this.type=type
    }
}
//用户信息类
export class userMessageClass {
    uid: string // 用户id
    userName: string //用户名
    accounts: string //账号
    userHeadPortrait: string //用户头像
    type: number //用户级别 1为管理员 2为访客
    constructor(uid: string, userName: string, accounts: string, userHeadPortrait: string, type: number) {
        this.uid = uid
        this.userName = userName
        this.accounts = accounts
        this.userHeadPortrait = userHeadPortrait
        this.type = type
    }
}