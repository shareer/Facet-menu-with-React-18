import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { TreeNodeType } from '../../../types/types';
import { arrayToTree } from '../../../utils/arrayToTree';
import { TreeNode } from './Treenode';
import './Facet.css'

interface FacetProps {
  data: TreeNodeType[];
  onSelectedCategoryChange: (selectedLeafNodes: TreeNodeType[]) => void;
}

const Facet = ({ data, onSelectedCategoryChange }: FacetProps) => {
  const [checkedNodes, setCheckedNodes] = useState<{ [key: string]: boolean }>({});
  const treeNodes: TreeNodeType[] = useMemo(() => arrayToTree(data, 0), [data]);
  const checkedNodesRef = useRef(checkedNodes);
  const isAllChecked = Object.values(checkedNodes).length > 0 && Object.values(checkedNodes).every(val => val);

  /**
   * Updates the selection status of a node and its children.
   * This function updates the `checked` status of the specified node and recursively updates the
   * status for all of its child nodes. The function also updates a provided map of checked nodes.
   */
  const updateNodeSelection = (node: TreeNodeType, checked: boolean, updatedCheckedNodes: { [key: string]: boolean }) => {
    updatedCheckedNodes[node.id] = checked;
    node.isChecked = checked;
    if (node.children) {
      node.children.forEach(child => updateNodeSelection(child, checked, updatedCheckedNodes));
    }
  };


  /**
  * Handles the selection or deselection of a node.
  * Updates the checked status of the node and its descendants, then updates the state.
  */
  const handleSelect = useCallback((node: TreeNodeType, checked: boolean) => {
    const updatedCheckedNodes = { ...checkedNodes };
    updateNodeSelection(node, checked, updatedCheckedNodes);
    setCheckedNodes(updatedCheckedNodes);
  }, [checkedNodes]);


  /**
   * Handles the selection or deselection of all nodes.
   * Updates the checked status of all nodes and their descendants, and updates the state and reference.
   */
  const handleSelectAll = useCallback((checked: boolean) => {
    const updatedCheckedNodes: { [key: string]: boolean } = {};
    treeNodes.forEach(node => {
      updateNodeSelection(node, checked, updatedCheckedNodes);
    });
    setCheckedNodes(updatedCheckedNodes);
    checkedNodesRef.current = updatedCheckedNodes;
  }, [treeNodes, updateNodeSelection]);

  useEffect(() => {
    const selectedLeafNodes = Object.keys(checkedNodes)
      .filter(nodeId => checkedNodes[nodeId])
      .map(nodeId => data.find(node => node.id === Number(nodeId)))
      .filter(node => node && (!node.children || node.children.length === 0)) as TreeNodeType[];

    onSelectedCategoryChange(selectedLeafNodes);
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
