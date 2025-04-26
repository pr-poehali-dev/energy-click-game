
import { useState, useEffect } from 'react';
import PointsAnimation from './PointsAnimation';
import { toast } from '@/components/ui/use-toast';
import GameHeader from './GameHeader';
import ClickButton from './ClickButton';
import StoreButton from './StoreButton';
import SettingsDialog from './SettingsDialog';
import StoreDialog from './StoreDialog';
import GameBackground from './GameBackground';
import { useMouseMove } from '@/hooks/useMouseMove';
import { useGameState } from '@/hooks/useGameState';

const Game = () => {
  const moveOffset = useMouseMove();
  const { clickState, handleClick, purchaseBoost, handleSaveGame } = useGameState();
  
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const [storeOpen, setStoreOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleClickWithAnimation = (e: React.MouseEvent) => {
    // Обновляем позицию анимации относительно клика
    // Но смещаем немного выше от курсора
    setAnimationPosition({ 
      x: e.clientX, 
      y: e.clientY - 50 // Смещаем анимацию выше места клика
    });
    
    // Показываем анимацию
    setShowAnimation(true);
    
    // Вызываем основной обработчик клика
    handleClick();
    
    // Прячем анимацию после небольшой задержки
    setTimeout(() => {
      setShowAnimation(false);
    }, 700);
  };

  const handlePurchaseBoost = (boostId: string) => {
    const result = purchaseBoost(boostId);
    
    if (!result.success && result.error) {
      setErrorMessage(result.error);
      
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Фоновые элементы */}
      <GameBackground moveOffset={moveOffset} />
      
      {/* Верхняя панель с счетчиком и кнопками */}
      <GameHeader 
        points={clickState.points}
        moveOffset={moveOffset}
        onSaveGame={handleSaveGame}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      
      {/* Анимация очков */}
      {showAnimation && (
        <PointsAnimation 
          value={clickState.pointsPerClick} 
          x={animationPosition.x} 
          y={animationPosition.y}
        />
      )}
      
      {/* Основная кнопка для клика */}
      <ClickButton 
        moveOffset={moveOffset} 
        onClick={handleClickWithAnimation} 
        imageUrl="https://cdn.poehali.dev/files/f2f7d2db-2634-42ab-a32d-f897d13ae5ce.jpg"
      />
      
      {/* Кнопка магазина бустов */}
      <StoreButton 
        moveOffset={moveOffset}
        onOpenStore={() => setStoreOpen(true)}
      />
      
      {/* Магазин бустов */}
      <StoreDialog 
        open={storeOpen} 
        onOpenChange={setStoreOpen}
        clickState={clickState}
        errorMessage={errorMessage}
        onPurchase={handlePurchaseBoost}
      />

      {/* Диалог настроек */}
      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
};

export default Game;
