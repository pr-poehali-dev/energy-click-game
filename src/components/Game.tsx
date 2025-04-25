
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BoostStore from './BoostStore';
import PointsAnimation from './PointsAnimation';
import Score from './Score';
import { toast } from '@/components/ui/use-toast';
import { Save, Settings } from 'lucide-react';

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
  const [settingsOpen, setSettingsOpen] = useState(false);
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
      {/* Фоновые декорации - кибер/космический стиль */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Мерцающие частицы */}
        <div className="absolute top-1/4 left-20 w-32 h-32 rounded-full bg-blue-500 opacity-5 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-1/3 right-20 w-48 h-48 rounded-full bg-purple-500 opacity-5 animate-pulse blur-3xl" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full bg-cyan-400 opacity-5 animate-pulse blur-2xl" style={{animationDelay: '0.7s'}}></div>
        
        {/* Неоновые сетки и линии */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-15"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-15"></div>
        
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-10"></div>
        <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-10"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-10"></div>
        
        {/* Абстрактные технологические узоры */}
        <div className="absolute bottom-20 left-10 opacity-10">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#33C3F0" strokeWidth="1" />
            <circle cx="50" cy="50" r="35" stroke="#33C3F0" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="25" stroke="#33C3F0" strokeWidth="0.5" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#33C3F0" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="#33C3F0" strokeWidth="0.5" strokeDasharray="2 4" />
          </svg>
        </div>
        <div className="absolute top-20 right-10 opacity-10">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" stroke="#D946EF" strokeWidth="1" />
            <rect x="25" y="25" width="50" height="50" stroke="#D946EF" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#D946EF" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#D946EF" strokeWidth="0.5" strokeDasharray="2 4" />
          </svg>
        </div>
        <div className="absolute bottom-40 right-40 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,10 90,50 50,90 10,50" stroke="#0EA5E9" strokeWidth="1" />
            <polygon points="50,30 70,50 50,70 30,50" stroke="#0EA5E9" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#0EA5E9" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#0EA5E9" strokeWidth="0.5" strokeDasharray="2 4" />
          </svg>
        </div>
      </div>

      {/* Кнопка сохранения */}
      <div className="absolute top-4 left-4 z-20">
        <Button 
          onClick={handleSaveGame}
          className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 border-2 border-purple-500 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
        >
          <Save size={18} />
          Сохранить
        </Button>
      </div>

      {/* Счётчик очков и кнопка настроек */}
      <div className="fixed top-6 right-6 z-20 flex gap-3 items-center">
        <Button 
          onClick={() => setSettingsOpen(true)}
          className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 border-2 border-purple-500 rounded-lg p-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
        >
          <Settings size={20} className="text-purple-100" />
        </Button>

        <div className="bg-zinc-900/80 border-2 border-blue-600 rounded-lg px-4 py-2 backdrop-blur-sm">
          <div className="text-xl font-mono font-bold text-blue-400">
            {clickState.points.toString().padStart(6, '0')}
          </div>
        </div>
      </div>
        
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
        
      {/* Кнопка магазина бустов - стильный дизайн */}
      <div className="mt-8 mb-4 z-10">
        <Button 
          onClick={() => setStoreOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-800 hover:from-cyan-700 hover:to-blue-900 text-white rounded-full border-2 border-cyan-500 shadow-lg shadow-cyan-700/20 hover:shadow-cyan-700/40 font-bold text-lg transition-all"
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

      {/* Диалог настроек */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-zinc-900 border-purple-600 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-purple-400">
              Настройки
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <p className="text-gray-300 mb-4">
              Здесь будут настройки в будущих обновлениях
            </p>
            <div className="p-3 rounded-lg border border-purple-600 bg-zinc-800/50">
              <p className="text-purple-300 font-medium">
                Разработчик: телеграмм @origcrime
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
