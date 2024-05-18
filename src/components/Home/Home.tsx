import { useState, useCallback } from 'react';
import Facet from '../shared/Facet/Facet';
import { data } from '../../mock/data';
import { TreeNodeType } from '../../types/types';
import Header from '../shared/Header/Header';
import './Home.css'

function Home() {
  const [selectedLeafNodes, setSelectedLeafNodes] = useState<TreeNodeType[]>([]);

  const handleSelectedLeafNodesChange = useCallback((newSelectedLeafNodes: TreeNodeType[]) => {
    // Check if the new selected leaf nodes are different from the current state
    const newIds = newSelectedLeafNodes.map(node => node.id).sort().join(',');
    const currentIds = selectedLeafNodes.map(node => node.id).sort().join(',');

    if (newIds !== currentIds) {
      setSelectedLeafNodes(newSelectedLeafNodes);
    }
  }, [selectedLeafNodes]);

  return (
    <>
      <Header />
      <div className="home-container">
        <div>
        <Facet data={data.categories as TreeNodeType[]} onSelectedLeafNodesChange={handleSelectedLeafNodesChange} />
        </div>
        <div className="selected-items-container">
          {selectedLeafNodes.length >0 && <h3>Selected Catgories:</h3>}
          <ul>
            {selectedLeafNodes.map(node => (
              <div className="card" key={node.id}>
              <li>{node.name}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
