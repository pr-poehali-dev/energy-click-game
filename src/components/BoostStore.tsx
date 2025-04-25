
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BoostProps {
  id: string;
  name: string;
  description: string;
  cost: number;
  pointsPerClick: number;
  purchased: boolean;
  affordable: boolean;
  onPurchase: (id: string) => void;
}

const Boost: React.FC<BoostProps> = ({ 
  id, name, description, cost, pointsPerClick, purchased, affordable, onPurchase 
}) => {
  return (
    <div className={`p-3 rounded-lg border ${purchased 
      ? 'bg-blue-950/30 border-blue-700' 
      : affordable 
        ? 'bg-zinc-800/80 border-blue-600 hover:bg-zinc-700/80' 
        : 'bg-zinc-800/50 border-zinc-700'
      } transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-blue-400">{name}</h3>
          <p className="text-sm text-gray-300">{description}</p>
          <p className="text-xs text-blue-300 mt-1">+{pointsPerClick} за клик</p>
        </div>
        <Button
          onClick={() => onPurchase(id)}
          disabled={purchased || !affordable}
          className={`ml-4 ${purchased 
            ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed opacity-80' 
            : affordable 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-zinc-700 hover:bg-zinc-700 cursor-not-allowed opacity-50'
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
  
  // Первая страница бустов
  const basicBoostItems = [
    { id: 'boost1', name: 'Буст Алкоголика', description: 'Удвоенная продуктивность!', ...boosts.boost1 },
    { id: 'boost2', name: 'Нью Дринк Pro', description: 'Напиток со стимулятором', ...boosts.boost2 },
    { id: 'boost3', name: 'Ракетное Топливо', description: 'Тройная энергия!', ...boosts.boost3 },
  ];
  
  // Вторая страница бустов (премиум)
  const premiumBoostItems = [
    { id: 'boost4', name: 'Космический Драйв', description: 'Галактическая мощь', ...boosts.boost4 },
    { id: 'boost5', name: 'Ультиматум Дринк', description: 'Выдаёт безумную энергию', ...boosts.boost5 },
    { id: 'boost6', name: 'Нано Форсаж', description: 'Нанотехнологичный ускоритель', cost: 50000, pointsPerClick: 2000, purchased: false },
    { id: 'boost7', name: 'Квантовый Драйв', description: 'Искривляет время и пространство', cost: 200000, pointsPerClick: 10000, purchased: false },
    { id: 'boost8', name: 'Сверхновый Импульс', description: 'Энергия умирающей звезды', cost: 1000000, pointsPerClick: 50000, purchased: false },
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
            purchased={boost.purchased || (boosts[boost.id]?.purchased || false)}
            affordable={points >= boost.cost}
            onPurchase={onPurchase}
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-blue-800/50">
        <Button 
          onClick={() => setPage(0)}
          disabled={page === 0}
          variant="outline"
          className={`border-blue-600 ${page === 0 ? 'bg-blue-900/30 text-blue-300' : 'bg-transparent text-blue-400 hover:bg-blue-900/20'}`}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Стандартные
        </Button>
        
        <div className="text-xs text-blue-400">
          {page + 1}/2
        </div>
        
        <Button
          onClick={() => setPage(1)}
          disabled={page === 1}
          variant="outline"
          className={`border-blue-600 ${page === 1 ? 'bg-blue-900/30 text-blue-300' : 'bg-transparent text-blue-400 hover:bg-blue-900/20'}`}
        >
          Премиум
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BoostStore;
