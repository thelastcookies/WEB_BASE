export interface GetUserListRequest {
  PageIndex?: number;
  PageRows?: number;
  SortField?: string;
  SortType?: string;
  Search?: {
    all?: boolean;
    userId?: string;
    keyword?: string;
    userName?: string;
    roleId?: string;
  }
}

export interface SaveUserRequest {
  Id?: string;
  CreateTime?: string;
  CreatorId?: string;
  Deleted?: boolean;
  UserName?: string;
  Password?: string;
  RealName?: string;
  Sex?: number;
  Birthday?: string;
  DepartmentId?: string;
  OrgId?: string;
  State?: string;
  Remark?: string;
  newPwd?: string;
  RoleIdList?: string[];
}
