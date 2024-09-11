import type { MenuPageType } from '@/enums';

export interface GetActionsRequestBody {
  ActionIds?: string[];
  parentId?: string;
  types?: number[];
  selectable?: boolean;
  checkEmptyChildren?: boolean;
}

export interface ActionResponseRecord {
  Id?: string;
  Value?: string;
  CreateTime?: string;
  CreatorId?: string;
  Deleted?: boolean;
  MenuId?: string;
  ParentId?: string;
  Level?: number;
  Type?: MenuPageType;
  Url?: string;
  Name?: string;
  Resource?: string;
  NeedAction?: boolean;
  ShowInMenu?: boolean;
  Icon?: string;
  Sort?: number;
  Redirect?: string;
  Affix?: boolean;
  KeepAlive?: boolean;
  Meta?: string;
  Children?: ActionResponseRecord[];
  PermissionValues?: string[],
  PermissionList?: PermissionRecord[];
}

export interface PermissionRecord {
  Id?: string;
  ParentId?: string;
  Name?: string;
  Value?: string;
  NeedAction?: boolean;
  Type?: MenuPageType;
}
