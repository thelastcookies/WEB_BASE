import type { Key } from "@/types";
import type { TreeLikeItem } from "@/utils/tree/types";

export class TreeNode implements TreeLikeItem {
  [key: string]: any;
  id?: Key;
  Id?: Key;
  key?: Key;
  Key?: Key;
  pid?: Key;
  pId?: Key;
  parentId?: Key;
  ParentId?: Key;
  children?: TreeNode[];
  Children?: TreeNode[];

  constructor(data: Partial<TreeLikeItem> = {}) {
    Object.assign(this, data);
  }

  getId(): Key | undefined {
    return this.id || this.Id || this.key || this.Key;
  }

  setId(id: Key) {
    if ("id" in this) {
      this.id = id;
    } else if ("Id" in this) {
      this.Id = id;
    } else if ("key" in this) {
      this.key = id;
    } else if ("Key" in this) {
      this.Key = id;
    } else {
      this.id = id;
    }
  }

  getParentId(): Key | undefined {
    return this.pid || this.pId || this.parentId || this.ParentId;
  }

  setParentId(parentId: Key): void {
    if ("pid" in this) {
      this.pid = parentId;
    } else if ("pId" in this) {
      this.pId = parentId;
    } else if ("parentId" in this) {
      this.parentId = parentId;
    } else if ("ParentId" in this) {
      this.ParentId = parentId;
    } else {
      this.parentId = parentId;
    }
  }

  getChildren(): TreeNode[] | undefined {
    return this.children || this.Children;
  }

  setChildren(children: TreeNode[]): void {
    if ("children" in this) {
      this.children = children;
    } else if ("Children" in this) {
      this.Children = children;
    } else {
      this.children = children;
    }
  }

  getOrder(): Key | undefined {
    return this.sort || this.Sort || this.order || this.Order;
  }

  setOrder(order: Key): void {
    if ("sort" in this) {
      this.sort = order;
    } else if ("Sort" in this) {
      this.Sort = order;
    } else if ("order" in this) {
      this.order = order;
    } else if ("Order" in this) {
      this.Order = order;
    } else {
      this.sort = order;
    }
  }
}

export function createTree(tree: Partial<TreeLikeItem>[]): TreeNode[] {
  return tree.map(node => {
    const tNode = new TreeNode(node);
    const children = tNode.getChildren();
    if (children && children.length) {
      createTree(children);
    }
    return tNode;
  });
}

export function createTreeShallow(tree: Partial<TreeLikeItem>[]): TreeNode[] {
  return tree.map(node => new TreeNode(node));
}
