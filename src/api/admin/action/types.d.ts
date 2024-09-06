import type { TreeNode } from '@/utils/tree/tree.ts';
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
  permissionList?: PermissionRecord[];
}

export interface MenuResponseRecord extends TreeNode {
  Id?: string;
  MenuId?: string;
  ParentId?: string;
  Level?: number;
  Type?: MenuPageType;
  Url?: string;
  Text?: string;
  Component?: string;
  NeedAction?: boolean;
  ShowInMenu?: boolean;
  selectable?: boolean;
  icon?: string;
  Sort?: number;
  Multi?: boolean;
  PermissionValues?: string[],
  permissionList?: PermissionRecord[],
  Query?: string;
  Children?: MenuResponseRecord[];

  // 与「Id」值相同，便于在组件内使用，下同
  key?: string;
  // 与「Id」值相同
  value?: string;
  // 与「Text」值相同
  title?: string;
  // 与「Children」值相同
  children?: MenuResponseRecord[];
}

export interface PermissionRecord extends TreeNode {
  Id?: string;
  ParentId?: string;
  Name?: string;
  Value?: string;
  NeedAction?: boolean;
  Type?: MenuPageType;
}
