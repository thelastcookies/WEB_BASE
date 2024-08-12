import type { UserRecord } from "@/api/admin/user/types";
import { getOperatorMenuListByUsername } from "@/api/admin/home/index.ts";

export interface LoginRequestBody {
  userName: string;
  password: string;
  remember: boolean;
}

export interface ChangePwdRequestBody {
  oldPwd: string;
  newPwd: string;
}

export interface UserNameRequestBody {
  userName: string;
}

export interface OperatorInfo {
  UserInfo: UserRecord;
  Permissions: string[];
}
