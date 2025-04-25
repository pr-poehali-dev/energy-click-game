
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BoostStore from './BoostStore';
import PointsAnimation from './PointsAnimation';
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
    if (!clickState.boosts[boostId]) {
      console.error(`Буст ${boostId} не найден`);
      return;
    }
    
    const boost = clickState.boosts[boostId];
    
    if (boost.purchased) {
      console.log(`Буст ${boostId} уже куплен`);
      return;
    }
    
    if (clickState.points < boost.cost) {
      setErrorMessage('Не хватает очков для покупки');
      
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
    });
  };

  // Создание зловещего неонового лица в стиле с изображения
  const renderEvilFace = () => {
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-96 h-96">
          {/* Глаза */}
          <div 
            className="absolute top-1/4 left-1/4 w-16 h-12 transform -rotate-12"
            style={{
              boxShadow: '0 0 15px 5px rgba(255,255,255,0.3)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
              clipPath: 'polygon(0% 0%, 100% 20%, 80% 100%, 20% 100%)'
            }}
          ></div>
          <div 
            className="absolute top-1/4 right-1/4 w-16 h-12 transform rotate-12"
            style={{
              boxShadow: '0 0 15px 5px rgba(255,255,255,0.3)',
              background: 'linear-gradient(225deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
              clipPath: 'polygon(0% 20%, 100% 0%, 80% 100%, 20% 100%)'
            }}
          ></div>
          
          {/* Улыбка */}
          <div 
            className="absolute bottom-1/4 left-1/2 w-64 h-20 transform -translate-x-1/2"
            style={{
              boxShadow: '0 0 15px 5px rgba(255,255,255,0.3)',
              background: 'linear-gradient(0deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
              clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
              borderRadius: '50%'
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Зловещее лицо на фоне */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://cdn.poehali.dev/files/342457e9-6834-47f5-9e76-be49daccb778.jpg"
          alt="Evil Face"
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Неоновые линии */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 flex flex-col justify-around opacity-10">
          {[...Array(15)].map((_, i) => (
            <div key={`h-line-${i}`} className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
          ))}
        </div>
        
        <div className="absolute inset-0 flex flex-row justify-around opacity-10">
          {[...Array(15)].map((_, i) => (
            <div key={`v-line-${i}`} className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
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
          variant="outline"
          className="border-white/50 hover:border-white bg-transparent text-white hover:bg-white/10 flex items-center gap-2 px-3 py-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <Save size={16} />
          Сохранить
        </Button>
        
        {/* Счетчик и кнопка настроек */}
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setSettingsOpen(true)}
            variant="outline"
            className="border-white/50 hover:border-white bg-transparent text-white hover:bg-white/10 p-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <Settings size={18} />
          </Button>
          
          <div className="border border-white/30 rounded-lg px-4 py-2 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <div className="text-xl font-mono font-bold text-white">
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
      
      {/* Основная кнопка для клика */}
      <div className="flex-1 flex items-center justify-center z-10">
        <Button 
          onClick={handleClick}
          className="border-0 bg-transparent hover:bg-transparent p-0 transition transform hover:scale-105 active:scale-95 relative group"
        >
          {/* Неоновая обводка */}
          <div className="absolute inset-0 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
          
          {/* Внутреннее свечение */}
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-30 transition-opacity">
            <div className="absolute inset-0 bg-white"></div>
          </div>
          
          {/* Изображение с неоновым лицом */}
          <div className="w-64 h-64 flex items-center justify-center relative">
            <img 
              src="https://cdn.poehali.dev/files/342457e9-6834-47f5-9e76-be49daccb778.jpg"
              alt="Evil Face"
              className="w-full h-full object-contain transition-all opacity-70 group-hover:opacity-100"
            />
          </div>
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
          variant="outline"
          className="px-6 py-3 bg-transparent border border-white/50 hover:border-white text-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/10 font-bold text-lg transition-all"
        >
          <span className="mr-2">👻</span> Магазин Бустов
        </Button>
      </div>
      
      {/* Магазин бустов */}
      <Dialog open={storeOpen} onOpenChange={setStoreOpen}>
        <DialogContent className="bg-black border-white/20 text-white shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-white">
              Магазин Бустов
            </DialogTitle>
            <DialogDescription className="text-center text-white/70">
              Покупай бусты, чтобы получать больше очков за клик!
            </DialogDescription>
          </DialogHeader>
          
          <BoostStore 
            boosts={clickState.boosts} 
            points={clickState.points} 
            onPurchase={purchaseBoost} 
          />
          
          {errorMessage && (
            <div className="mt-4 p-2 border border-white/30 rounded-md text-center text-white/80 animate-pulse">
              {errorMessage}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог настроек */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-black border-white/20 text-white shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-white">
              Настройки
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <p className="text-white/70 mb-4">
              Здесь будут настройки в будущих обновлениях
            </p>
            <div className="p-3 rounded-lg border border-white/30 bg-black/50">
              <p className="text-white/80 font-medium">
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
