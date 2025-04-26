import React from 'react';
import { BoostItem, BoostItemWithState } from '@/types/boostTypes';
import BoostCard from './BoostCard';

interface BoostListProps {
  boosts: BoostItem[];
  boostStates: Record<string, { purchased: boolean; cost: number; pointsPerClick: number }>;
  points: number;
  onPurchase: (id: string) => void;
}

const BoostList: React.FC<BoostListProps> = ({ 
  boosts, 
  boostStates, 
  points, 
  onPurchase 
}) => {
  // Преобразуем бусты, добавляя состояние purchased и affordable
  const bootsWithState: BoostItemWithState[] = boosts.map(boost => ({
    ...boost,
    purchased: boostStates[boost.id]?.purchased || false,
    affordable: points >= boost.cost
  }));

  return (
    <div className="space-y-3">
      {bootsWithState.map((boost) => (
        <BoostCard
          key={boost.id}
          boost={boost}
          onPurchase={onPurchase}
        />
      ))}
    </div>
  );
};

export default BoostList;
