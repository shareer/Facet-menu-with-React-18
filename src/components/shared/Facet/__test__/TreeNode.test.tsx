import { render, screen, fireEvent } from '@testing-library/react';
import {TreeNode} from '../TreeNode';
import { TreeNodeType } from '../../../../types/types';

const mockNode: TreeNodeType = {
  id: 1,
  name: 'Category 1',
  parent: 0,
  children: [
    {
      id: 2,
      name: 'Subcategory 1-1',
      parent: 1,
      children: []
    }
  ]
};

const mockOnSelect = jest.fn();
const mockCheckedNodes = { 1: false, 2: false };

describe('TreeNode component', () => {
  it('renders the TreeNode component', () => {
    render(<TreeNode node={mockNode} onSelect={mockOnSelect} checkedNodes={mockCheckedNodes} />);
    
    expect(screen.getByText('Category 1')).toBeInTheDocument();
  });

  it('handles checkbox selection', () => {
    render(<TreeNode node={mockNode} onSelect={mockOnSelect} checkedNodes={mockCheckedNodes} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockNode, true);
  });

  it('handles expansion and collapse of nodes', () => {
    render(<TreeNode node={mockNode} onSelect={mockOnSelect} checkedNodes={mockCheckedNodes} />);
    
    const nodeName = screen.getByText('Category 1');
    fireEvent.click(nodeName);
    
    expect(screen.getByText('Subcategory 1-1')).toBeInTheDocument();
    
    fireEvent.click(nodeName);
    
    expect(screen.queryByText('Subcategory 1-1')).not.toBeInTheDocument();
  });

  it('propagates selection to child nodes', () => {
    const updatedCheckedNodes = { 1: true, 2: false };
    render(<TreeNode node={mockNode} onSelect={mockOnSelect} checkedNodes={updatedCheckedNodes} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockNode, false);
  });
});
