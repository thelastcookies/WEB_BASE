import type { Key } from "@/types";
import type { TreeLikeItem } from "@/utils/tree/types";

class TreeNode implements TreeLikeItem {
  [key: string]: any;

  constructor(
    data: Partial<TreeLikeItem> = {},
    handler?: <T extends TreeLikeItem>(arg: TreeLikeItem) => T,
  ) {
    if (handler) data = handler(data);
    Object.assign(this, data);
  }

  getId(): Key | undefined {
    return this.id || this.Id || this.key || this.Key;
  }

  setId(v: Key) {
    if ("id" in this) {
      this.id = v;
    } else if ("Id" in this) {
      this.Id = v;
    } else if ("key" in this) {
      this.key = v;
    } else if ("Key" in this) {
      this.Key = v;
    } else {
      this.id = v;
    }
  }

  getParentId(): Key | undefined {
    return this.pid || this.pId || this.parentId || this.ParentId;
  }

  setParentId(v: Key): void {
    if ("pid" in this) {
      this.pid = v;
    } else if ("pId" in this) {
      this.pId = v;
    } else if ("parentId" in this) {
      this.parentId = v;
    } else if ("ParentId" in this) {
      this.ParentId = v;
    } else {
      this.parentId = v;
    }
  }

  getLabel(): string | undefined {
    return this.name || this.label || this.title || this.value;
  }

  setLabel(v: string): void {
    if ("name" in this) {
      this.name = v;
    } else if ("label" in this) {
      this.label = v;
    } else if ("title" in this) {
      this.title = v;
    } else if ("value" in this) {
      this.value = v;
    } else {
      this.name = v;
    }
  }

  getOrder(): Key | undefined {
    return this.sort || this.Sort || this.order || this.Order;
  }

  setOrder(v: Key): void {
    if ("sort" in this) {
      this.sort = v;
    } else if ("Sort" in this) {
      this.Sort = v;
    } else if ("order" in this) {
      this.order = v;
    } else if ("Order" in this) {
      this.Order = v;
    } else {
      this.sort = v;
    }
  }

  getChildren(): TreeNode[] | undefined {
    return this.children || this.Children;
  }

  setChildren(v: TreeNode[]): void {
    if ("children" in this) {
      this.children = v;
    } else if ("Children" in this) {
      this.Children = v;
    } else {
      this.children = v;
    }
  }
}

/**
 * 用于创建树
 * @param tree
 * @param handler
 */
function createTree<P extends TreeNode>(
  tree: Partial<TreeLikeItem>[],
  handler?: <T extends TreeLikeItem>(arg: TreeLikeItem) => T,
): P[] {
  return tree.map(node => {
    const tNode = new TreeNode(node, handler) as P;
    const children = tNode.getChildren();
    if (children && children.length) {
      const cl = createTree(children, handler);
      tNode.setChildren(cl);
    }
    return tNode;
  });
}

/**
 * 用于创建浅层（单层）树，即只有第一层会被转换为 TreeNode
 * 因此也会用来创建无嵌套的 TreeNode 数组
 * @param tree
 * @param handler
 */
function createShallowTree<P extends TreeNode>(
  tree: Partial<TreeLikeItem>[],
  handler?: <T extends TreeLikeItem>(arg: TreeLikeItem) => T,
): P[] {
  return tree.map(node => new TreeNode(node, handler)) as P[];
}

export { TreeNode, createTree, createShallowTree };
