
import { useState, useEffect } from 'react';
import { ClickState } from '@/types/gameTypes';
import { toast } from '@/components/ui/use-toast';

export function useGameState() {
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
        boost8: { purchased: false, cost: 1000000, pointsPerClick: 50000 },
        boost9: { purchased: false, cost: 5000000, pointsPerClick: 200000 },
        boost10: { purchased: false, cost: 25000000, pointsPerClick: 1000000 }
      }
    };
  });
  
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
  
  const handleSaveGame = () => {
    localStorage.setItem('clickerGameState', JSON.stringify(clickState));
    toast({
      title: "Сохранено",
      description: "Твой прогресс успешно сохранен!",
      duration: 2000,
    });
  };

  const handleClick = () => {
    // Добавляем очки при клике
    setClickState(prev => ({
      ...prev,
      points: prev.points + prev.pointsPerClick
    }));
  };

  const purchaseBoost = (boostId: string) => {
    if (!clickState.boosts[boostId]) {
      console.error(`Буст ${boostId} не найден`);
      return { success: false, error: 'Буст не найден' };
    }
    
    const boost = clickState.boosts[boostId];
    
    if (boost.purchased) {
      console.log(`Буст ${boostId} уже куплен`);
      return { success: false, error: 'Буст уже куплен' };
    }
    
    if (clickState.points < boost.cost) {
      return { success: false, error: 'Не хватает очков для покупки' };
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
    
    return { success: true };
  };
  
  return {
    clickState,
    handleClick,
    purchaseBoost,
    handleSaveGame
  };
}
