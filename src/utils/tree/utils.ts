/**
 * 用于树形结构数据(TreeNode[])的实用工具
 */
import type { Key } from "@/types";
import type { TreeLikeItem } from "@/utils/tree/types";
import { TreeNode } from "@/utils/tree/tree.ts";

/**
 * 按 节点唯一标识符 去查找树中的节点
 * @param tree 由 TreeNode 扩展节点组成的树
 * @param id 节点唯一标识符
 */
export function findTreeNodeById<T extends TreeNode>(tree: T[], id: Key): T | undefined {
  for (let i = 0, len = tree.length; i < len; i++) {
    if (tree[i].getId() === id) {
      return tree[i];
    } else if (tree[i].getChildren()) {
      const n = findTreeNodeById<T>(tree[i].getChildren()!, id);
      if (n) return n;
    }
  }
}

/**
 * 按 节点 label 去模糊查找树中的节点
 * @param tree 由 TreeNode 扩展节点组成的树
 * @param label 节点 label
 */
export function findTreeNodesByLabel<T extends TreeNode>(tree: T[], label: string): T[] {
  let nodes: T[] = [];
  for (let i = 0, len = tree.length; i < len; i++) {
    if (tree[i].getLabel()!.indexOf(label) > -1) {
      nodes.push(tree[i]);
    } else if (tree[i].getChildren()) {
      nodes = [...nodes, ...findTreeNodesByLabel<T>(tree[i].getChildren()!, label)];
    }
  }
  return nodes;
}

/**
 * 按 父节点唯一标识符 去查找 TreeNode[] 数据中符合特征的所有节点
 * @param tree TreeNode[]
 * @param id 父亲节点唯一标识符
 */
function findTreeNodesByPId<T extends TreeNode>(tree: T[], id: Key) {

}

/**
 * 将 TreeNode 类型的列表转换为树结构
 * 根节点的判断依据为：父亲节点唯一标识符的字段为空或不存在
 * @param list 数组
 */
export function listToTree<T extends TreeNode>(list: TreeLikeItem[]): T[] {
  const treeList = createShallowTree<T>(list);

  const roots: T[] = [];
  const nodeMap: Record<Key, T> = {};
  treeList.forEach(node => {
    nodeMap[node.getId()!] = node;
  });

  treeList.forEach(node => {
    const pId = node.getParentId();
    if (pId) {
      // 否则，将该项添加到父项的 children 数组中
      nodeMap[pId].getChildren()!.push(nodeMap[node.getId()!]);
    } else {
      roots.push(nodeMap[node.getId()!]);
    }
  });
  return roots;
}

/**
 * 将 TreeNode 类型的树转换为列表
 * 会将各树节点深度克隆，并去除子级
 * @param tree 数组
 */
export function treeToList<T extends TreeNode>(tree: TreeNode[]): T[] {
  const list: T[] = [];

  function recursion(nodes) {
    nodes.forEach(node => {
      const n = cloneDeep(node);
      list.push(n);

      // 如果该节点有子节点，则递归遍历
      if (n.getChildren()?.length > 0) {
        recursion(n.getChildren());
        n.setChildren(undefined);
      }
    });
  }
  recursion(tree);
  return list;
}

/**
 * 根据查询条件查找父节点直到根节点
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */
// const findNodeAncestors = (
//   actions: ActionRecordRaw[],
//   key: Key | RecordName,
//   field: "id" | "actionId" | "title" = "actionId",
// ): ActionRecordRaw[] | undefined => {
//   const action = findAction(actions, key, field)!;
//   if (action) {
//     if (action.pId) {
//       return [action, ...findActionAncestorChain(actions, action.pId, "id")!];
//     } else {
//       return [action];
//     }
//   } else {
//     return undefined;
//   }
// };

/**
 * 根据长子节点
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */

// const findNodeDescendants = (
//   action: ActionRecordRaw,
// ): ActionRecordPage | ActionRecordPageWithChildren | ActionRecordLink | ActionRecordIFrame | ActionRecordDiagram | undefined => {
//   if ("children" in action) {
//     if ("url" in action.children[0]) return action.children[0];
//     else findDescendantWithUrlDefined(action.children[0]);
//   } else return undefined;
// };
