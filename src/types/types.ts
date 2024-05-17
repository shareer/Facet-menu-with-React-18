export interface TreeNodeType {
    id: number;
    name: string;
    parent: number;
    children?: TreeNodeType[];
    isChecked?: boolean;
  }