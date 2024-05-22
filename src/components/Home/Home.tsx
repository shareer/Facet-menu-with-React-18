import { useState, useCallback } from 'react';
import { TreeNodeType } from '../../types/types';
import Header from '../shared/Header/Header';
import Facet from '../shared/Facet/Facet';
import { data } from '../../mock/data';
import './Home.css';

function Home() {
  const [selectedNodes, setSelectedNodes] = useState<TreeNodeType[]>([]);

  /**
   * Handles the change in selected categories.
   */
  const handleSelectedCategoryChange = useCallback((newSelectedItem: TreeNodeType[]) => {
    const newIds = newSelectedItem.map(node => node.id).join(',');
    const currentIds = selectedNodes.map(node => node.id).join(',');

    if (newIds !== currentIds) {
      setSelectedNodes(newSelectedItem);
    }
  }, [selectedNodes]);

  return (
    <>
      <Header />
      <div className="home-container">
        <div aria-label="Category Selection" data-testid="facet">
          <Facet
            data={data.categories}
            onSelectedCategoryChange={handleSelectedCategoryChange}
          />
        </div>
        <div className="selected-items-container">
          {selectedNodes.length > 0 && <h3>Categories Selected:</h3>}
          <ul aria-live="polite">
            {selectedNodes.map(node => (
              <li key={node.id}>
                <div className="card">
                  {node.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
