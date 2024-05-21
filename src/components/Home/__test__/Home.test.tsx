import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { data } from '../../../mock/data';


describe('Home component', () => {
  test('renders Header component', () => {
    render(<Home />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders Facet component with categories', () => {
    render(<Home />);
    const facetContainer = screen.getByTestId('facet');
    expect(facetContainer).toBeInTheDocument();
  });

  test('does not display "Categories Selected" when no categories are selected', () => {
    render(<Home />);
    const selectedItemsContainer = screen.queryByText('Categories Selected:');
    expect(selectedItemsContainer).not.toBeInTheDocument();
  });
});
