
import { useEffect, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import GameHeader from './GameHeader';
import ClickButton from './ClickButton';
import StoreButton from './StoreButton';
import StoreDialog from './StoreDialog';
import SettingsDialog from './SettingsDialog';
import GameBackground from './GameBackground';
import PointsAnimation from './PointsAnimation';
import { useMouseMove } from '@/hooks/useMouseMove'; // Используем именованный импорт
import { useGameState } from '@/hooks/useGameState'; // Используем именованный импорт
import { AnimationItem, ClickAnimationType } from '@/types/gameTypes';

const Game = () => {
  const {
    score,
    incrementScore,
    clickPower,
    autoClickPower,
    boosts,
    buyBoost,
    resetGame,
    loadGame,
    saveGame
  } = useGameState();

  const moveOffset = useMouseMove();
  
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [clickAnimations, setClickAnimations] = useState<AnimationItem[]>([]);
  const [redbullImage] = useState("https://cdn.poehali.dev/files/f2f7d2db-2634-42ab-a32d-f897d13ae5ce.jpg");

  // Автоматическое увеличение счёта
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoClickPower > 0) {
        incrementScore(autoClickPower);
        addClickAnimation({
          x: window.innerWidth / 2 + (Math.random() * 100 - 50),
          y: window.innerHeight / 2 - 100 + (Math.random() * 50 - 25),
          value: autoClickPower,
          type: "auto"
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickPower, incrementScore]);

  // Сохранение игры при изменении счёта
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      saveGame();
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [score, boosts, saveGame]);

  // Загрузка игры при старте
  useEffect(() => {
    loadGame();
  }, [loadGame]);

  // Обработка клика
  const handleClick = (e: React.MouseEvent) => {
    incrementScore(clickPower);
    addClickAnimation({
      x: e.clientX,
      y: e.clientY,
      value: clickPower,
      type: "click"
    });
  };

  // Добавление анимации клика
  const addClickAnimation = (animation: ClickAnimationType) => {
    const id = Date.now() + Math.random();
    setClickAnimations(prev => [...prev, { ...animation, id }]);
    setTimeout(() => {
      setClickAnimations(prev => prev.filter(a => a.id !== id));
    }, 1500);
  };

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden bg-black text-white">
      <GameBackground moveOffset={moveOffset} />

      <GameHeader 
        points={score} 
        moveOffset={moveOffset}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 flex flex-col items-center justify-center relative">
        <ClickButton 
          onClick={handleClick} 
          moveOffset={moveOffset}
          imageUrl={redbullImage}
        />

        <StoreButton 
          onClick={() => setIsStoreOpen(true)}
          moveOffset={moveOffset}
        />
      </main>

      {/* Анимации точек */}
      {clickAnimations.map(animation => (
        <PointsAnimation
          key={animation.id}
          x={animation.x}
          y={animation.y}
          value={animation.value}
          type={animation.type}
        />
      ))}

      {/* Диалог магазина */}
      <Dialog open={isStoreOpen} onOpenChange={setIsStoreOpen}>
        <StoreDialog
          score={score}
          boosts={boosts}
          onBoostBuy={buyBoost}
          onClose={() => setIsStoreOpen(false)}
        />
      </Dialog>

      {/* Диалог настроек */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SettingsDialog
          onReset={resetGame}
          onClose={() => setIsSettingsOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default Game;
