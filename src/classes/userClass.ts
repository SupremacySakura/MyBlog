//用户类
export class userClass {
    uid: string // 用户id
    userName: string //用户名
    accounts:string //账号
    password:string //密码
    userHeadPortrait: string //用户头像
    type:number //用户级别 0为管理员 1为作者 2为访客 -1为最高管理者
    state:number //用户状态 0为被冻结 1为正常
    constructor(uid: string, userName: string,accounts:string,password:string ,userHeadPortrait: string,type:number,state:number) {
        this.uid = uid
        this.userName = userName
        this.accounts=accounts
        this.password=password
        this.userHeadPortrait = userHeadPortrait
        this.type=type
        this.state=state
    }
}
//用户信息类
export class userMessageClass {
    uid: string // 用户id
    userName: string //用户名
    accounts: string //账号
    userHeadPortrait: string //用户头像
    type: number //用户级别 0为管理员 1为作者 2为访客 -1为最高管理者
    state: number //用户状态 0为被冻结 1为正常
    constructor(uid: string, userName: string, accounts: string, userHeadPortrait: string, type: number, state: number) {
        this.uid = uid
        this.userName = userName
        this.accounts = accounts
        this.userHeadPortrait = userHeadPortrait
        this.type = type
        this.state = state
    }
}