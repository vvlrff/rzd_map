import React, { useState } from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import RussiaRailwayMap from '../../components/Map/RussiaRailwayMap';
import s from './MapPage.module.scss';


const MapPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleOpenCard = (item: any) => {
    setSelectedItem(item);
  };

  const handleCloseCard = () => {
    setSelectedItem(null);
  };

  return (
    <div className={s.container}>

      <div className={s.sidebar}>
      </div>

      <div className={s.map}>
        <RussiaRailwayMap />
      </div>

      {/* {selectedItem && (
        <div className={s.overlay}>
          <NewsCard item={selectedItem} onClose={handleCloseCard} />
        </div>
      )} */}
    </div>
  );
};

export default MapPage;