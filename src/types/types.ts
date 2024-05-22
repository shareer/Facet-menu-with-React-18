export interface TreeNodeType {
    id: number;
    name: string;
    parent: number;
    children?: TreeNodeType[];
    isChecked?: boolean;
  }
  export interface TreeNodeProps {
    node: TreeNodeType;
    onSelect: (node: TreeNodeType, checked: boolean) => void;
    checkedNodes: { [key: string]: boolean };
  }
  export interface FacetProps {
    data: TreeNodeType[];
    onSelectedCategoryChange: (selectedNodes: TreeNodeType[]) => void;
  }

  export type CheckedNodeType = Record<number, boolean>;
 