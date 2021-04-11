import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = ({ toys, addLike, deleteToy }) => {
  return(
    <div id="toy-collection">
      {toys.map(toy => <ToyCard key={toy.id} toy={toy} addLike={addLike} deleteToy={deleteToy} />)}
    </div>
  );
}

export default ToyContainer;