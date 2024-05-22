import { render, screen, fireEvent } from '@testing-library/react';
import Facet from './../Facet';
import { TreeNodeType } from '../../../../types/types';

const mockData: TreeNodeType[] = [
  {
    id: 1,
    parent: 0,
    name: 'Category 1',
    children: [
      {
        id: 2,
        parent: 1,
        name: 'Subcategory 1-1',
        children: [],
      },
    ],
  },
  {
    id: 3,
    parent: 0,
    name: 'Category 2',
    children: [],
  },
];

const mockOnSelectedCategoryChange = jest.fn();

describe('Facet component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with tree nodes', () => {
    render(<Facet data={mockData} onSelectedCategoryChange={mockOnSelectedCategoryChange} />);
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  it('selects and unselects all nodes', () => {
    render(<Facet data={mockData} onSelectedCategoryChange={mockOnSelectedCategoryChange} />);
  
    const selectAllCheckbox = screen.getByLabelText(/Select All/);
    fireEvent.click(selectAllCheckbox);
  
    expect(selectAllCheckbox).toBeChecked();  
    fireEvent.click(selectAllCheckbox);
  
    expect(selectAllCheckbox).not.toBeChecked();
    expect(mockOnSelectedCategoryChange).toHaveBeenCalledWith([]);
  });

  it('renders with no data', () => {
    render(<Facet data={[]} onSelectedCategoryChange={mockOnSelectedCategoryChange} />);
    expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Category 2')).not.toBeInTheDocument();
  });
});
