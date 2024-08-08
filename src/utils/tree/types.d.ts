import type { Key } from "@/types";

/**
 * 通用的树节点的类型声明，其中
 * 作为节点唯一标识符的字段，键的可选项有 "id" 与 "Id"，值的类型为 Key；
 * 作为父亲节点唯一标识符的字段，键的可选项有 "pid"、"pId"、"parentId" 与 "ParentId"，值的类型为 Key；
 * 作为子级列表的字段，键的可选项有 "children 与 "Children"，值的类型为 TreeLikeItem
 */
export type TreeNodeIdField = "id" | "Id" | "key" | "Key";
export type TreeNodeParentIdField = "pid" | "pId" | "parentId" | "ParentId";
export type TreeNodeSortField = "sort" | "Sort" | "order" | "Order";
export type TreeNodeChildrenField = "children" | "Children";

export interface TreeLikeItem extends Partial<Record<TreeNodeIdField, Key>>,
  Partial<Record<TreeNodeParentIdField, Key>>,
  Partial<Record<TreeNodeSortField, Key>>,
  Partial<Record<TreeNodeChildrenField, TreeLikeItem[]>> {
}
