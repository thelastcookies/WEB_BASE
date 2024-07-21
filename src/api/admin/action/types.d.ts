export interface GetActionsRequest {
  ActionIds?: string[];
  parentId?: string;
  types?: number[];
  selectable?: boolean;
  checkEmptyChildren?: boolean;
}

export interface SaveActionRequest {
  Id?: string;
  CreateTime?: string;
  CreatorId?: string;
  Deleted?: boolean;
  ParentId?: string;
  Type?: number;
  Name?: string;
  Url?: string;
  Value?: string;
  NeedAction?: boolean;
  Icon?: string;
  Sort?: number;
  MenuId?: string;
  Component?: string;
  ShowInMenu?: string;
  Multi?: boolean;
  Query?: string;
  permissionList?: SaveActionRequest[];
}
