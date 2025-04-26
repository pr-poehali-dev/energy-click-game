import React, { useState } from 'react';
import { BASIC_BOOSTS, PREMIUM_BOOSTS } from '@/data/boosts';
import BoostList from './boost/BoostList';
import StoreNavigation from './boost/StoreNavigation';

interface BoostStoreProps {
  boosts: Record<string, {
    purchased: boolean;
    cost: number;
    pointsPerClick: number;
  }>;
  points: number;
  onPurchase: (id: string) => void;
}

const BoostStore: React.FC<BoostStoreProps> = ({ 
  boosts, 
  points, 
  onPurchase 
}) => {
  const [page, setPage] = useState(0);
  
  // Выбор набора бустов в зависимости от текущей страницы
  const currentBoosts = page === 0 ? BASIC_BOOSTS : PREMIUM_BOOSTS;
  
  return (
    <div className="space-y-4 mt-2">
      <BoostList
        boosts={currentBoosts}
        boostStates={boosts}
        points={points}
        onPurchase={onPurchase}
      />
      
      <StoreNavigation
        currentPage={page}
        totalPages={2}
        onPageChange={setPage}
      />
    </div>
  );
};

export default BoostStore;
