export interface LoginRequest {
  userName: string;
  password: string;
  remember: boolean;
}

export interface ChangePwdRequest {
  oldPwd: string;
  newPwd: string;
}

export interface UserInfo {
  id: string;
  userName: string;
  realName?: string;
}
