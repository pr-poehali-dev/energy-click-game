
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BoostStore from './BoostStore';
import PointsAnimation from './PointsAnimation';
import Score from './Score';
import { toast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

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

  const handleSaveGame = () => {
    localStorage.setItem('clickerGameState', JSON.stringify(clickState));
    toast({
      title: "Сохранено",
      description: "Твой прогресс успешно сохранен!",
      duration: 2000,
      className: "bg-green-600 text-white border-green-500"
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-8 relative overflow-hidden bg-black">
      {/* Фоновые декорации - новый стиль */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Вращающиеся частицы */}
        <div className="absolute top-1/4 left-20 w-32 h-32 rounded-full bg-blue-600 opacity-5 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-1/3 right-20 w-48 h-48 rounded-full bg-blue-400 opacity-5 animate-pulse blur-3xl" style={{animationDelay: '1.5s'}}></div>
        
        {/* Светящиеся линии */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-10"></div>
        <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-10"></div>
        
        {/* Абстрактные формы */}
        <div className="absolute bottom-20 left-10 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#33C3F0" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute top-20 right-10 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="60" height="60" stroke="#33C3F0" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Кнопка сохранения */}
      <div className="absolute top-4 left-4 z-20">
        <Button 
          onClick={handleSaveGame}
          className="bg-blue-700 hover:bg-blue-800 border-2 border-blue-500 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all"
        >
          <Save size={18} />
          Сохранить
        </Button>
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
        
      {/* Основная кнопка-энергетик с ободком */}
      <div className="flex-1 flex items-center justify-center z-10">
        <Button 
          onClick={handleClick}
          className="border-0 bg-transparent hover:bg-transparent p-0 transition transform hover:scale-105 active:scale-95 relative group"
        >
          {/* Ободок вокруг кнопки */}
          <div className="absolute inset-0 rounded-lg border-2 border-blue-500 opacity-70 group-hover:opacity-100 group-hover:border-blue-400 transition-all group-hover:blur-[1px] shadow-lg shadow-blue-500/30 group-hover:shadow-blue-400/50"></div>
          
          {/* Внутреннее свечение */}
          <div className="absolute inset-2 rounded-lg bg-blue-500/10 opacity-0 group-hover:opacity-30 transition-opacity"></div>
          
          <img 
            src="https://cdn.poehali.dev/files/74ef3f11-c8de-41cf-9881-86c0a5b85eeb.jpg" 
            alt="Red Bull" 
            className="w-48 h-auto rounded-lg relative z-10" 
          />
        </Button>
      </div>
        
      {/* Кнопка магазина бустов - новый стиль */}
      <div className="mt-8 mb-4 z-10">
        <Button 
          onClick={() => setStoreOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full border-2 border-blue-500 shadow-lg shadow-blue-700/20 hover:shadow-blue-700/40 font-bold text-lg transition-all"
        >
          <span className="mr-2">🛒</span> Купить Нью дринк
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
