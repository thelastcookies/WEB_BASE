/**
 * 用于树形结构数据(TreeNode[])的实用工具
 */

import type { Key, RecordName } from "@/types";
import type { TreeLikeItem } from "@/utils/tree/types";
import { TreeNode } from "@/utils/tree/tree.ts";
import type {
  ActionRecordDiagram,
  ActionRecordIFrame,
  ActionRecordLink,
  ActionRecordPage,
  ActionRecordPageWithChildren,
  ActionRecordRaw,
} from "@/types/action";
import { findAction } from "@/stores/action";

/**
 * 按 节点唯一标识符 去查找 TreeNode[] 数据中的节点
 * @param tree TreeNode[]
 * @param id 节点唯一标识符
 */
function findTreeNodeById(tree: TreeNode[], id: Key): TreeNode | undefined {
  return find<TreeNode>(tree, function iterator(node: TreeNode) {
    if (node.getId() === id) return node;
    else if (node.getChildren()) {
      return find<TreeNode>(node.getChildren(), iterator);
    }
  });
}

/**
 * 按 父节点唯一标识符 去查找 TreeNode[] 数据中符合特征的所有节点
 * @param tree TreeNode[]
 * @param id 父亲节点唯一标识符
 */
function findTreeNodesByPId(tree: TreeNode[], id: Key) {

}

/**
 * 将 TreeNode 类型的数组转换为树结构
 * 根节点的判断依据为：父亲节点唯一标识符的字段为空或不存在
 * @param list 数组
 */
function listToTree(list: TreeLikeItem[]): TreeNode[] {
  const treeList = createShallowTree(list);

  const roots: TreeNode[] = [];
  const nodeMap: Record<Key, TreeNode> = {};
  treeList.forEach(node => {
    nodeMap[node.getId()!] = node;
  });

  treeList.forEach(node => {
    if (node.getParentId()) {
      findTreeNodeById(treeList, node.getId()!);
      // 否则，将该项添加到父项的 children 数组中
      nodeMap[node.getParentId()!].getChildren()!.push(nodeMap[node.getId()!]);
    } else {
      roots.push(nodeMap[node.getId()!]);
    }
  });
  //
  // roots.forEach(node => {
  //
  // });
  // return nodeList;
  // // return nodeList.sort((a, b) => {
  // //     return a.Order - b.Order
  // // });
  //

  // const rootItems: Item[] = [];
  //
  // // 创建一个字典用于快速查找每个项
  // items.forEach(item => {
  //   lookup[item.id] = { ...item, children: [] };
  // });
  //
  // // 遍历所有项并将其插入到父项的 children 数组中
  // items.forEach(item => {
  //   if (item.pId === null) {
  //     // 如果 pId 为 null，则该项为根节点
  //     rootItems.push(lookup[item.id]);
  //   } else {
  //     // 否则，将该项添加到父项的 children 数组中
  //     lookup[item.pId].children.push(lookup[item.id]);
  //   }
  // });

  return roots;
}

function treeToList(tree: TreeNode[]) {

}

/**
 * 根据查询条件查找父节点直到根节点
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */
const findNodeAncestors = (
  actions: ActionRecordRaw[],
  key: Key | RecordName,
  field: "id" | "actionId" | "title" = "actionId",
): ActionRecordRaw[] | undefined => {
  const action = findAction(actions, key, field)!;
  if (action) {
    if (action.pId) {
      return [action, ...findActionAncestorChain(actions, action.pId, "id")!];
    } else {
      return [action];
    }
  } else {
    return undefined;
  }
};

/**
 * 根据长子节点
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */

const findNodeDescendants = (
  action: ActionRecordRaw,
): ActionRecordPage | ActionRecordPageWithChildren | ActionRecordLink | ActionRecordIFrame | ActionRecordDiagram | undefined => {
  if ("children" in action) {
    if ("url" in action.children[0]) return action.children[0];
    else findDescendantWithUrlDefined(action.children[0]);
  } else return undefined;
};


export { findTreeNodeById, listToTree };
