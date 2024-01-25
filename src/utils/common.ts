// import type {TreeNodeCT} from "@/assets/ts/data-structure";
// import type {Portlet} from "@/api/portlet";
//
// interface CommonItem {
//     id: string,
//     name: string,
// }
// interface ListItem extends CommonItem{
//     pid: string,
// }
// interface TreeNode extends ListItem{
//     children?: Array<TreeNode>
// }
// // 组织机构 list to tree
// export function listToTree<T extends ListItem | Portlet>(
//     list: Array<ListItem>,
//     pId: string | null
// ): Array<TreeNode> {
//     if (list.length === 0) return [];
//     let nodeList = [] as Array<TreeNode> ;
//     list.forEach(item => {
//         if (item.pid === pId) {
//             let node = Object.assign({}, item) as TreeNode;
//             let children = listToTree(list, item.id);
//             if (children.length) node['children'] = children;
//             nodeList.push(node);
//         }
//     });
//     return nodeList;
//     // return nodeList.sort((a, b) => {
//     //     return a.Order - b.Order
//     // });
// }
//
// // export function findNodeByPId(tree: Array<TreeNode>, pId: string): Array<TreeNode> {
// //     let childrenList = [] as Array<TreeNode>;
// //     for (let i = 0, len = tree.length; i < len; i++) {
// //         if (tree[i].pid === pId) {
// //             if (tree[i].pid === "1" && tree[i]!.children.length === 0) {
// //                 childrenList.push(tree[i]);
// //             } else if (tree[i]!.children.length) {
// //                 childrenList = childrenList.concat(findNodeByPId(tree[i].children, tree[i].id));
// //             }
// //         } else if (tree[i]!.children.length) {
// //             childrenList = childrenList.concat(findNodeByPId(tree[i].children, pId));
// //         }
// //     }
// //     return childrenList;
// // }
