import { VNodeChild } from "vue";
import type { ShowInMenuType } from "@/enums";

export type Key = string | number;
export type RecordName = string | symbol;

/**
 * 通用的树节点的类型声明，其中
 * 作为节点唯一标识符的字段，键的可选项有 "id" 与 "Id"，值的类型为 Key；
 * 作为父亲节点唯一标识符的字段，键的可选项有 "pid"、"pId"、"parentId" 与 "ParentId"，值的类型为 Key；
 * 作为子级列表的字段，键的可选项有 "children 与 "Children"，值的类型为 TreeLikeItem
 */
export type TreeNodeIdField = "id" | "Id";
export type TreeNodeParentIdField = "pid" | "pId" | "parentId" | "ParentId";
export type TreeNodeChildrenField = "children" | "Children";

export interface TreeLikeItem extends Partial<Record<TreeNodeIdField, Key>>,
  Partial<Record<TreeNodeParentIdField, Key>>,
  Partial<Record<TreeNodeChildrenField, TreeLikeItem[]>> {
}

export interface RouteToRecord {
  name: RecordName,
  title?: string,
  type?: string,
  params?: Object,
  query?: Object
}

export type RouteToRecordRaw = Key | RecordName | RouteToRecord;

/**
 * 用于 Antdv 菜单
 */
export interface MenuTreeNode {
  key: Key | RecordName;
  label: string;
  title?: string;
  icon?: string | (() => VNodeChild);
  disabled?: boolean;
  showInMenu?: ShowInMenuType;
  children?: MenuTreeNode[];
}
