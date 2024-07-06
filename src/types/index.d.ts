import { VNodeChild } from "vue";
import type { ShowInMenuType } from "@/enums";

export type Key = string | number;
export type RecordName = string | symbol;

interface CommonItem {
  id: string,
  name: string,
}

interface ListItem extends CommonItem {
  pId: string,
}

interface TreeNode extends ListItem {
  children?: Array<TreeNode>
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
