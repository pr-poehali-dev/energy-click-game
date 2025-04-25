
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap, Star, Rocket, Flame, Diamond } from 'lucide-react';

interface BoostProps {
  id: string;
  name: string;
  description: string;
  cost: number;
  pointsPerClick: number;
  purchased: boolean;
  affordable: boolean;
  onPurchase: (id: string) => void;
  icon?: React.ReactNode;
}

const Boost: React.FC<BoostProps> = ({ 
  id, name, description, cost, pointsPerClick, purchased, affordable, onPurchase, icon
}) => {
  return (
    <div className={`p-3 rounded-lg border ${purchased 
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
            <h3 className={`text-lg font-bold ${affordable && !purchased ? 'text-white' : 'text-white/50'}`}>{name}</h3>
            <p className="text-sm text-white/70">{description}</p>
            <p className="text-xs text-white/80 mt-1">+{pointsPerClick} за клик</p>
          </div>
        </div>
        <Button
          onClick={() => onPurchase(id)}
          disabled={purchased || !affordable}
          variant="outline"
          className={`ml-4 ${purchased 
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

interface BoostStoreProps {
  boosts: {
    [key: string]: {
      purchased: boolean;
      cost: number;
      pointsPerClick: number;
    }
  };
  points: number;
  onPurchase: (id: string) => void;
}

const BoostStore: React.FC<BoostStoreProps> = ({ boosts, points, onPurchase }) => {
  const [page, setPage] = useState(0);
  
  // Страница обычных бустов
  const basicBoostItems = [
    { 
      id: 'boost1', 
      name: 'Злой Смайл', 
      description: 'Двойная энергия', 
      icon: <Zap size={20} />,
      cost: 100,
      pointsPerClick: 5,
      purchased: boosts.boost1?.purchased || false
    },
    { 
      id: 'boost2', 
      name: 'Неоновый Призрак', 
      description: 'Тройная энергия', 
      icon: <Flame size={20} />,
      cost: 500,
      pointsPerClick: 10,
      purchased: boosts.boost2?.purchased || false
    },
    { 
      id: 'boost3', 
      name: 'Тёмный Дух', 
      description: 'Мощь тьмы', 
      icon: <Rocket size={20} />,
      cost: 1500,
      pointsPerClick: 50,
      purchased: boosts.boost3?.purchased || false
    },
  ];
  
  // Страница премиум бустов
  const premiumBoostItems = [
    { 
      id: 'boost4', 
      name: 'Ночной Кошмар', 
      description: 'Страх приносит силу', 
      icon: <Star size={20} />,
      cost: 5000,
      pointsPerClick: 100,
      purchased: boosts.boost4?.purchased || false
    },
    { 
      id: 'boost5', 
      name: 'Эфирный Террор', 
      description: 'Ужас из бездны', 
      icon: <Diamond size={20} />,
      cost: 15000,
      pointsPerClick: 500,
      purchased: boosts.boost5?.purchased || false
    },
    { 
      id: 'boost6', 
      name: 'Кровавая Луна', 
      description: 'Тёмная энергия', 
      icon: <Zap size={20} />,
      cost: 50000,
      pointsPerClick: 2000,
      purchased: boosts.boost6?.purchased || false
    },
    { 
      id: 'boost7', 
      name: 'Бездна Отчаяния', 
      description: 'Пожиратель душ', 
      icon: <Star size={20} />,
      cost: 200000,
      pointsPerClick: 10000,
      purchased: boosts.boost7?.purchased || false
    },
    { 
      id: 'boost8', 
      name: 'Пустота Хаоса', 
      description: 'Разрушение реальности', 
      icon: <Rocket size={20} />,
      cost: 1000000,
      pointsPerClick: 50000,
      purchased: boosts.boost8?.purchased || false
    },
  ];
  
  const currentBoosts = page === 0 ? basicBoostItems : premiumBoostItems;
  
  return (
    <div className="space-y-4 mt-2">
      <div className="space-y-3">
        {currentBoosts.map((boost) => (
          <Boost
            key={boost.id}
            id={boost.id}
            name={boost.name}
            description={boost.description}
            cost={boost.cost}
            pointsPerClick={boost.pointsPerClick}
            purchased={boost.purchased}
            affordable={points >= boost.cost}
            onPurchase={onPurchase}
            icon={boost.icon}
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-white/20">
        <Button 
          onClick={() => setPage(0)}
          disabled={page === 0}
          variant="outline"
          className={`border-white/50 ${page === 0 ? 'bg-white/5 text-white/50' : 'bg-transparent text-white hover:bg-white/10'}`}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Обычные
        </Button>
        
        <div className="text-xs text-white/80">
          {page + 1}/2
        </div>
        
        <Button
          onClick={() => setPage(1)}
          disabled={page === 1}
          variant="outline"
          className={`border-white/50 ${page === 1 ? 'bg-white/5 text-white/50' : 'bg-transparent text-white hover:bg-white/10'}`}
        >
          Премиум
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BoostStore;
