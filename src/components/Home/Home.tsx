import Facet from '../shared/Facet/Facet';
import { data } from '../../mock/data';
import { TreeNodeType } from '../../types/types';

function Home() {
  console.log(data, 'home');
  return (
    <div>
      <Facet data={data.categories as TreeNodeType[]} />
    </div>
  );
}

export default Home;
