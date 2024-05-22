import { useCallback, useMemo, useState, useEffect } from 'react';
import { CheckedNodeType, FacetProps, TreeNodeType } from '../../../types/types';
import { convertArrayToTree } from '../../../utils/utils';
import { TreeNode } from './TreeNode';
import './Facet.css'

const Facet = ({ data, onSelectedCategoryChange }: FacetProps) => {
  
  const initialNodeStatus: CheckedNodeType = useMemo(() => 
    data.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {} as CheckedNodeType), [data]);

  const [checkedNodes, setCheckedNodes] = useState<{ [key: string]: boolean }>(initialNodeStatus);
  const treeNodes: TreeNodeType[] = useMemo(() => convertArrayToTree(data, 0), [data]);
  const isAllChecked = Object.values(checkedNodes).length > 0 && Object.values(checkedNodes).every(val => val);


  /**
    * Recursively updates the selection status of a node and its children.
   */
  const updateNodeSelection = (node: TreeNodeType, checked: boolean, updatedCheckedNodes: { [key: string]: boolean }) => {
    updatedCheckedNodes[node.id] = checked;
    node.isChecked = checked;
    if (node.children) {
      node.children.forEach(child => updateNodeSelection(child, checked, updatedCheckedNodes));
    }
  };


  const handleSelect = useCallback((node: TreeNodeType, checked: boolean) => {
    setCheckedNodes(prevCheckedNodes => {
      const updatedCheckedNodes = { ...prevCheckedNodes };
      updateNodeSelection(node, checked, updatedCheckedNodes);
      return updatedCheckedNodes;
    });
  }, [updateNodeSelection]);


  const handleSelectAll = useCallback((checked: boolean) => {
    setCheckedNodes(prevCheckedNodes => {
      const updatedCheckedNodes = { ...prevCheckedNodes };
      treeNodes.forEach(node => {
        updateNodeSelection(node, checked, updatedCheckedNodes);
      });
      return updatedCheckedNodes;
    });
  }, [treeNodes, updateNodeSelection]);


  useEffect(() => {
    const selectedNodes = Object.keys(checkedNodes)
      .filter(nodeId => checkedNodes[nodeId])
      .map(nodeId => data.find(node => node.id === Number(nodeId)))
      .filter(node => node && (!node.children || node.children.length === 0)) as TreeNodeType[];

    onSelectedCategoryChange(selectedNodes);
  }, [checkedNodes, data, onSelectedCategoryChange]);

  return (
    <div className='facet-container'>
      <div className="select-all">
        <label>
          <input
            type="checkbox"
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={isAllChecked}
            className="checkbox-custom"
          />
          <span className="select-all-label">{isAllChecked ? 'Unselect All' : 'Select All'}</span>
        </label>
      </div>
      {treeNodes.map(node => (
        <TreeNode key={node.id} node={node} onSelect={handleSelect} checkedNodes={checkedNodes} />
      ))}
    </div>
  );
};

export default Facet;
