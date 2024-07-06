export interface LoginParams {
  userName: string;
  password: string;
  remember: boolean;
}

export interface UserInfo {
  id: string;
  userName: string;
  realName?: string;
}
