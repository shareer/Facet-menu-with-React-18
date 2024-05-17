import { useCallback, useMemo, useState } from 'react';
import { TreeNodeType } from '../../../types/types';
import { arrayToTree } from '../../../utils/arrayToTree';
import { TreeNode } from './Treenode';


const Facet = ({ data }: { data: TreeNodeType[] }, ) => {
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
    const updatedCheckNodes = { ...checkedNodes };
    updateNodeSelection(node, checked, updatedCheckNodes);
    setCheckedNodes(updatedCheckNodes);
  }, [checkedNodes]);

  const handleSelectAll = (checked: boolean) => {
    const updatedCheckNodes: { [key: string]: boolean } = {};
    treeNodes.forEach(node => {
      updateNodeSelection(node, checked, updatedCheckNodes);
    });
    setCheckedNodes(updatedCheckNodes);
  };

  const areAllChecked = Object.values(checkedNodes).length > 0 && Object.values(checkedNodes).every(val => val);

  return (
    <div className='facet-conatiner'>
      <div className="select-all">
        <input
          type="checkbox"
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={areAllChecked}
        />
        <span className="node-name">{areAllChecked ? 'Unselect All' : 'Select All'}</span>
      </div>
      {treeNodes.map(node => (
        <TreeNode key={node.id} node={node} onSelect={handleSelect} checkedNodes={checkedNodes} />
      ))
      }
    </div>
  );
};

export default Facet;