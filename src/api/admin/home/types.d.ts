export interface LoginRequestBody {
  userName: string;
  password: string;
  remember: boolean;
}

export interface ChangePwdRequestBody {
  oldPwd: string;
  newPwd: string;
}

export interface UserInfo {
  id: string;
  userName: string;
  realName?: string;
}
