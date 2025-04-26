import React from 'react';
import { BoostItemWithState } from '@/types/boostTypes';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface BoostCardProps {
  boost: BoostItemWithState;
  onPurchase: (id: string) => void;
}

const BoostCard: React.FC<BoostCardProps> = ({ boost, onPurchase }) => {
  const { id, name, description, cost, pointsPerClick, purchased, affordable, icon } = boost;
  
  return (
    <div className={`p-3 rounded-lg border ${
      purchased 
        ? 'bg-black border-white/30' 
        : affordable 
          ? 'bg-black border-white/50 hover:border-white' 
          : 'bg-black border-white/20'
    } transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className={`${affordable && !purchased ? 'text-white' : 'text-white/50'} opacity-80`}>
            {icon || <Zap size={20} />}
          </div>
          <div>
            <h3 className={`text-lg font-bold ${affordable && !purchased ? 'text-white' : 'text-white/50'}`}>
              {name}
            </h3>
            <p className="text-sm text-white/70">{description}</p>
            <p className="text-xs text-white/80 mt-1">+{pointsPerClick} за клик</p>
          </div>
        </div>
        <Button
          onClick={() => onPurchase(id)}
          disabled={purchased || !affordable}
          variant="outline"
          className={`ml-4 ${
            purchased 
              ? 'border-white/30 text-white/30 cursor-not-allowed' 
              : affordable 
                ? 'border-white text-white hover:bg-white/10' 
                : 'border-white/30 text-white/30 cursor-not-allowed'
          }`}
        >
          {purchased ? 'Куплено' : `${cost} очков`}
        </Button>
      </div>
    </div>
  );
};

export default BoostCard;
