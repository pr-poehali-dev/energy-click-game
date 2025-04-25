
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BoostStore from './BoostStore';
import PointsAnimation from './PointsAnimation';
import Score from './Score';
import { toast } from '@/components/ui/use-toast';

interface ClickState {
  points: number;
  pointsPerClick: number;
  boosts: {
    [key: string]: {
      purchased: boolean;
      cost: number;
      pointsPerClick: number;
    }
  }
}

const Game = () => {
  const [clickState, setClickState] = useState<ClickState>(() => {
    // Загрузка сохраненного состояния из localStorage
    const savedState = localStorage.getItem('clickerGameState');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error('Ошибка при загрузке сохранения:', e);
      }
    }
    
    // Начальное состояние, если нет сохранения
    return {
      points: 0,
      pointsPerClick: 1,
      boosts: {
        boost1: { purchased: false, cost: 100, pointsPerClick: 5 },
        boost2: { purchased: false, cost: 500, pointsPerClick: 10 },
        boost3: { purchased: false, cost: 1500, pointsPerClick: 50 },
        boost4: { purchased: false, cost: 5000, pointsPerClick: 100 },
        boost5: { purchased: false, cost: 15000, pointsPerClick: 500 }
      }
    };
  });
  
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const [storeOpen, setStoreOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Сохранение состояния игры
  useEffect(() => {
    const saveGame = () => {
      localStorage.setItem('clickerGameState', JSON.stringify(clickState));
    };
    
    // Сохраняем при каждом изменении состояния
    saveGame();
    
    // Также сохраняем при закрытии/обновлении страницы
    window.addEventListener('beforeunload', saveGame);
    return () => {
      window.removeEventListener('beforeunload', saveGame);
    };
  }, [clickState]);
  
  const handleClick = (e: React.MouseEvent) => {
    // Обновляем позицию анимации относительно клика
    setAnimationPosition({ x: e.clientX, y: e.clientY });
    
    // Показываем анимацию
    setShowAnimation(true);
    
    // Добавляем очки при клике
    setClickState(prev => ({
      ...prev,
      points: prev.points + prev.pointsPerClick
    }));
    
    // Прячем анимацию после небольшой задержки
    setTimeout(() => {
      setShowAnimation(false);
    }, 700);
  };

  const purchaseBoost = (boostId: string) => {
    const boost = clickState.boosts[boostId];
    
    if (boost.purchased) {
      return;
    }
    
    if (clickState.points < boost.cost) {
      setErrorMessage('Не хватает средств, плохо бухал!');
      
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      
      return;
    }
    
    // Покупка буста
    setClickState(prev => ({
      ...prev,
      points: prev.points - boost.cost,
      pointsPerClick: prev.pointsPerClick + boost.pointsPerClick,
      boosts: {
        ...prev.boosts,
        [boostId]: {
          ...prev.boosts[boostId],
          purchased: true
        }
      }
    }));
    
    toast({
      title: "Буст куплен!",
      description: `Теперь за клик ты получаешь +${clickState.pointsPerClick + boost.pointsPerClick} очков!`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-8 relative overflow-hidden">
      {/* Фоновые декорации */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 opacity-10 animate-pulse">
          <img src="https://images.unsplash.com/photo-1619982570592-125ba7e257a9?w=200&h=200&fit=crop" alt="" className="w-40 h-40" />
        </div>
        <div className="absolute top-2/3 right-10 opacity-10 animate-pulse" style={{animationDelay: '1s'}}>
          <img src="https://images.unsplash.com/photo-1527960392543-80cd0fa46382?w=200&h=200&fit=crop" alt="" className="w-32 h-32" />
        </div>
      </div>

      {/* Счётчик очков */}
      <Score points={clickState.points} />
        
      {/* Анимация очков */}
      {showAnimation && (
        <PointsAnimation 
          value={clickState.pointsPerClick} 
          x={animationPosition.x} 
          y={animationPosition.y}
        />
      )}
        
      {/* Основная кнопка-энергетик */}
      <div className="flex-1 flex items-center justify-center z-10">
        <Button 
          onClick={handleClick}
          className="border-0 bg-transparent hover:bg-transparent p-0 transition transform hover:scale-105 active:scale-95"
        >
          <img 
            src="https://cdn.poehali.dev/files/74ef3f11-c8de-41cf-9881-86c0a5b85eeb.jpg" 
            alt="Red Bull" 
            className="w-48 h-auto rounded-lg" 
          />
        </Button>
      </div>
        
      {/* Кнопка магазина бустов */}
      <div className="mt-8 mb-4 z-10">
        <Button 
          onClick={() => setStoreOpen(true)}
          className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full border-2 border-blue-500 shadow-lg font-bold text-lg"
        >
          Купить Нью дринк 🛒
        </Button>
      </div>
        
      {/* Магазин бустов */}
      <Dialog open={storeOpen} onOpenChange={setStoreOpen}>
        <DialogContent className="bg-zinc-900 border-blue-600 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-blue-400">
              Магазин Бустов
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300">
              Покупай бусты, чтобы получать больше очков за клик!
            </DialogDescription>
          </DialogHeader>
          
          <BoostStore 
            boosts={clickState.boosts} 
            points={clickState.points} 
            onPurchase={purchaseBoost} 
          />
          
          {errorMessage && (
            <div className="mt-4 p-2 bg-red-900/70 border border-red-600 rounded-md text-center text-red-300 animate-pulse">
              {errorMessage}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
