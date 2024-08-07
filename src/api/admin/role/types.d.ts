export interface GetRoleListRequestBody {
  PageIndex?: number;
  PageRows?: number;
  SortField?: string;
  SortType?: string;
  Search?: {
    roleId?: string;
    roleName?: string;
  }
}

export interface SaveRoleRequestBody {
  Id?: string;
  CreateTime?: string;
  CreatorId?: string;
  Deleted?: boolean;
  RoleName?: string;
  Remark?: string;
  RoleType?: number;
  Actions?: string[];
}
