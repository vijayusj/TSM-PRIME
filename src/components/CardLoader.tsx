import React from 'react';
import Card from './Card';
import '@/styles/cardLoader.scss';
const CardLoader = ({
  wrap,
  backdropCard = false,
}: {
  wrap: boolean;
  backdropCard?: boolean;
}) => {
  return (
    <div className={`scroll ${wrap ? 'wrap' : 'horizontal_scroll'}`}>
      {Array.from({ length: 20 }).map((_, index) => (
        <Card list="loading" key={index} backdropCard={backdropCard} />
      ))}
    </div>
  );
};

export default CardLoader;
