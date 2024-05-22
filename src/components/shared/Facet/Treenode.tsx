import React, { useState } from "react";
import { TreeNodeProps, TreeNodeType } from "../../../types/types";

export const TreeNode = React.memo(({ node, onSelect, checkedNodes }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isChecked = checkedNodes[node.id] || false;
  const isLastNode = !node.children || node.children.length === 0;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onSelect(node, checked);

    if (checked) {
      if (!isLastNode) {
        setIsExpanded(true);
      }
    } else {
      collapseAll(node);
    }
  };

  const collapseAll = (node: TreeNodeType) => {
    setIsExpanded(false);
    if (node.children) {
      node.children.forEach(child => collapseAll(child));
    }
  };

  const toggleExpand = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <div className="container">
      <div className={`node ${isLastNode ? 'last-node' : ''}`} aria-checked={isChecked}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="checkbox-custom"
        />
        <span className="node-name" onClick={toggleExpand}>
          {node.name}
        </span>
      </div>
      {isExpanded && node.children && node.children.length > 0 && (
        <div className="child-wrapper">
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} onSelect={onSelect} checkedNodes={checkedNodes} />
          ))}
        </div>
      )}
    </div>
  );
});
