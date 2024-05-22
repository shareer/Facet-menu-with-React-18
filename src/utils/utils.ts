import { TreeNodeType } from "../types/types";


/**
 * Converts a flat array of nodes into a hierarchical tree structure.
 **/
export const convertArrayToTree = (data: TreeNodeType[], rootId: number): TreeNodeType[] => {
  const tree: TreeNodeType[] = [];
  const children: { [key: number]: TreeNodeType[] } = {};
  data.forEach(item => {
    const { id, parent } = item;
    children[id] = children[id] || [];
    item.children = children[id];

    if (parent === rootId) {
      tree.push(item);
    } else {
      children[parent] = children[parent] || [];
      children[parent].push(item);
    }
  });
  return tree;
};
