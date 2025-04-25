
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
        boost5: { purchased: false, cost: 15000, pointsPerClick: 500 },
        boost6: { purchased: false, cost: 50000, pointsPerClick: 2000 },
        boost7: { purchased: false, cost: 200000, pointsPerClick: 10000 },
        boost8: { purchased: false, cost: 1000000, pointsPerClick: 50000 }
      }
    };
  });
  
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const [storeOpen, setStoreOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [moveOffset, setMoveOffset] = useState({ x: 0, y: 0 });
  
  // Эффект для создания плавающего движения интерфейса
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Вычисляем смещение от центра экрана
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Нормализуем смещение для плавного движения
      const moveX = (e.clientX - centerX) / centerX * 10;
      const moveY = (e.clientY - centerY) / centerY * 10;
      
      setMoveOffset({ x: moveX, y: moveY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
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
    
    if (!boost || boost.purchased) {
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

  // Генерация фоновых стикеров энергетика
  const renderBackgroundCans = () => {
    const cans = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 30 + 20;
      const left = Math.random() * 95; 
      const top = Math.random() * 95;
      const rotate = Math.random() * 360;
      const opacity = Math.random() * 0.2 + 0.05;
      
      cans.push(
        <div 
          key={`can-${i}`} 
          className="absolute pointer-events-none"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            transform: `rotate(${rotate}deg)`,
            opacity
          }}
        >
          <img 
            src="https://cdn.poehali.dev/files/74ef3f11-c8de-41cf-9881-86c0a5b85eeb.jpg" 
            alt="Energy Drink"
            style={{
              width: `${size}px`,
              height: 'auto'
            }}
            className="rounded-sm"
          />
        </div>
      );
    }
    return cans;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Фоновые стикеры энергетика */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {renderBackgroundCans()}
      </div>
      
      {/* Фоновые элементы */}
      <div className="absolute inset-0 z-1">
        {/* Градиентная сетка */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.05),transparent_70%)]"></div>
        
        {/* Горизонтальные линии */}
        <div className="absolute inset-0 flex flex-col justify-around opacity-20">
          {[...Array(10)].map((_, i) => (
            <div key={`h-line-${i}`} className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          ))}
        </div>
        
        {/* Вертикальные линии */}
        <div className="absolute inset-0 flex flex-row justify-around opacity-20">
          {[...Array(10)].map((_, i) => (
            <div key={`v-line-${i}`} className="w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
          ))}
        </div>
      </div>

      {/* Верхняя панель с счетчиком и кнопками */}
      <div 
        className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-20"
        style={{
          transform: `translate(${moveOffset.x * 0.7}px, ${moveOffset.y * 0.5}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        {/* Кнопка сохранения */}
        <Button 
          onClick={handleSaveGame}
          className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 border border-purple-500 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
        >
          <Save size={16} />
          Сохранить
        </Button>
        
        {/* Счетчик и кнопка настроек */}
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setSettingsOpen(true)}
            className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 border border-purple-500 p-2 rounded-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
          >
            <Settings size={18} className="text-purple-100" />
          </Button>
          
          <div className="bg-zinc-900/90 border border-blue-600 rounded-lg px-4 py-2 backdrop-blur-md">
            <div className="text-xl font-mono font-bold text-blue-400">
              {clickState.points.toString().padStart(6, '0')}
            </div>
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
      
      {/* Основная кнопка-энергетик (без смещения при движении мыши) */}
      <div className="flex-1 flex items-center justify-center z-10 my-16">
        <Button 
          onClick={handleClick}
          className="border-0 bg-transparent hover:bg-transparent p-0 transition transform hover:scale-105 active:scale-95 relative"
        >
          {/* Неоновый ободок вокруг энергетика */}
          <div className="absolute inset-0 rounded-3xl bg-transparent border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.7)] animate-pulse"></div>
          
          {/* Внутреннее свечение */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/20 to-pink-500/10 opacity-60"></div>
          </div>
          
          <img 
            src="https://cdn.poehali.dev/files/74ef3f11-c8de-41cf-9881-86c0a5b85eeb.jpg" 
            alt="Red Bull" 
            className="w-48 h-auto rounded-3xl relative z-10 shadow-xl" 
          />
        </Button>
      </div>
      
      {/* Кнопка магазина бустов */}
      <div 
        className="mb-10 z-10"
        style={{
          transform: `translate(${moveOffset.x * 0.5}px, ${moveOffset.y * 0.3}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <Button 
          onClick={() => setStoreOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white rounded-full border border-blue-400 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 font-bold text-lg transition-all"
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
