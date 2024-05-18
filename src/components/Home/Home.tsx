import { useState, useCallback } from 'react';
import { TreeNodeType } from '../../types/types';
import Header from '../shared/Header/Header';
import Facet from '../shared/Facet/Facet';
import { data } from '../../mock/data';
import './Home.css';

function Home() {
  const [selectedLeafNodes, setSelectedLeafNodes] = useState<TreeNodeType[]>([]);

  /**
   * Handles the change in selected categories.
   */
  const handleSelectedCategoryChange = useCallback((newSelectedItem: TreeNodeType[]) => {
    const newIds = newSelectedItem.map(node => node.id).sort().join(',');
    const currentIds = selectedLeafNodes.map(node => node.id).sort().join(',');

    if (newIds !== currentIds) {
      setSelectedLeafNodes(newSelectedItem);
    }
  }, [selectedLeafNodes]);

  return (
    <>
      <Header />
      <div className="home-container">
        <div>
          <Facet
            data={data.categories as TreeNodeType[]}
            onSelectedCategoryChange={handleSelectedCategoryChange}
            aria-label="Category Selection"
          />
        </div>
        <div className="selected-items-container">
          {selectedLeafNodes.length > 0 && <h3>Categories Selected:</h3>}
          <ul aria-live="polite">
            {selectedLeafNodes.map(node => (
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
