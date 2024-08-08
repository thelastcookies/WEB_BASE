import type { Key } from "@/types";
import type { TreeLikeItem } from "@/utils/tree/types";
import { TreeNode } from "@/utils/tree/tree.ts";

/**
 * 常用于树形结构数据的实用工具
 */

function findTreeNodeById(tree: TreeLikeItem[], id: Key): TreeNode | undefined {
  const treeList = createTreeShallow(tree);
  return find<TreeNode>(treeList, function iterator(node: TreeNode) {
    if (node.getId() === id) return node;
    else if (node.getChildren()) {
      return find<TreeNode>(node.getChildren(), iterator)
    }
  });
}


export function listToTree(list: TreeLikeItem[], pId: string): TreeNode[] {
  if (list.length === 0) return [];
  let nodeList: TreeNode[];
  list.forEach(item => {
    if (item.pid === pId) {
      let node = Object.assign({}, item) as TreeLikeItem;
      node["children"] = listToTree(list, item.id);
      nodeList.push(node);
    }
  });
  return nodeList;
  // return nodeList.sort((a, b) => {
  //     return a.Order - b.Order
  // });
}


// export function findNodesByPId(tree: Array<TreeNode>, pId: string): Array<TreeNode> {
//     let childrenList = [] as Array<TreeNode>;
//     for (let i = 0, len = tree.length; i < len; i++) {
//         if (tree[i].pid === pId) {
//             if (tree[i].pid === "1" && tree[i]!.children.length === 0) {
//                 childrenList.push(tree[i]);
//             } else if (tree[i]!.children.length) {
//                 childrenList = childrenList.concat(findNodeByPId(tree[i].children, tree[i].id));
//             }
//         } else if (tree[i]!.children.length) {
//             childrenList = childrenList.concat(findNodeByPId(tree[i].children, pId));
//         }
//     }
//     return childrenList;
// }


