import { useCallback, useMemo, useState, useEffect } from 'react';
import { TreeNodeType } from '../../../types/types';
import { arrayToTree } from '../../../utils/arrayToTree';
import { TreeNode } from './Treenode';
import './Facet.css'

interface FacetProps {
  data: TreeNodeType[];
  onSelectedLeafNodesChange: (selectedLeafNodes: TreeNodeType[]) => void;
}

const Facet = ({ data, onSelectedLeafNodesChange }: FacetProps) => {
  const [checkedNodes, setCheckedNodes] = useState<{ [key: string]: boolean }>({});
  const treeNodes: TreeNodeType[] = useMemo(() => arrayToTree(data, 0), [data]);

  const updateNodeSelection = (node: TreeNodeType, checked: boolean, updatedCheckedNodes: { [key: string]: boolean }) => {
    updatedCheckedNodes[node.id] = checked;
    node.isChecked = checked;
    if (node.children) {
      node.children.forEach(child => updateNodeSelection(child, checked, updatedCheckedNodes));
    }
  };

  const handleSelect = useCallback((node: TreeNodeType, checked: boolean) => {
    const updatedCheckedNodes = { ...checkedNodes };
    updateNodeSelection(node, checked, updatedCheckedNodes);
    setCheckedNodes(updatedCheckedNodes);
  }, [checkedNodes]);

  const handleSelectAll = (checked: boolean) => {
    const updatedCheckedNodes: { [key: string]: boolean } = {};
    treeNodes.forEach(node => {
      updateNodeSelection(node, checked, updatedCheckedNodes);
    });
    setCheckedNodes(updatedCheckedNodes);
  };

  const areAllChecked = Object.values(checkedNodes).length > 0 && Object.values(checkedNodes).every(val => val);

  useEffect(() => {
    const selectedLeafNodes = Object.keys(checkedNodes)
      .filter(nodeId => checkedNodes[nodeId])
      .map(nodeId => data.find(node => node.id === Number(nodeId)))
      .filter(node => node && (!node.children || node.children.length === 0)) as TreeNodeType[];

    onSelectedLeafNodesChange(selectedLeafNodes);
  }, [checkedNodes, data, onSelectedLeafNodesChange]);

  return (
    <div className='facet-container'>
      <div className="select-all">
        <input
          type="checkbox"
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={areAllChecked}
        />
        <span className="select-all-label">{areAllChecked ? 'Unselect All' : 'Select All'}</span>
      </div>
      {treeNodes.map(node => (
        <TreeNode key={node.id} node={node} onSelect={handleSelect} checkedNodes={checkedNodes} />
      ))}
    </div>
  );
};

export default Facet;
