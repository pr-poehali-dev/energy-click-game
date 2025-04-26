
import { useState, useCallback } from 'react';
import { BoostType } from '@/types/gameTypes';
import { toast } from 'sonner';

const useGameState = () => {
  const [score, setScore] = useState<number>(0);
  const [clickPower, setClickPower] = useState<number>(1);
  const [autoClickPower, setAutoClickPower] = useState<number>(0);
  const [boosts, setBoosts] = useState<Record<string, BoostType>>({
    boost1: { id: 'boost1', name: 'Двойной клик', description: 'Удваивает силу клика', cost: 100, power: 1, purchased: false, type: 'click' },
    boost2: { id: 'boost2', name: 'Турбо клик', description: 'Утраивает силу клика', cost: 500, power: 2, purchased: false, type: 'click' },
    boost3: { id: 'boost3', name: 'Мега клик', description: '+5 к силе клика', cost: 1000, power: 5, purchased: false, type: 'click' },
    boost4: { id: 'boost4', name: 'Ультра клик', description: '+10 к силе клика', cost: 5000, power: 10, purchased: false, type: 'click' },
    boost5: { id: 'boost5', name: 'Эпический клик', description: '+50 к силе клика', cost: 15000, power: 50, purchased: false, type: 'click' },
    boost6: { id: 'boost6', name: 'Авто-клик: Новичок', description: '1 клик в секунду', cost: 2000, power: 1, purchased: false, type: 'auto' },
    boost7: { id: 'boost7', name: 'Авто-клик: Стандарт', description: '5 кликов в секунду', cost: 10000, power: 5, purchased: false, type: 'auto' },
    boost8: { id: 'boost8', name: 'Авто-клик: Профи', description: '10 кликов в секунду', cost: 50000, power: 10, purchased: false, type: 'auto' },
    boost9: { id: 'boost9', name: 'Авто-клик: Эксперт', description: '25 кликов в секунду', cost: 100000, power: 25, purchased: false, type: 'auto' },
    boost10: { id: 'boost10', name: 'Авто-клик: Легенда', description: '50 кликов в секунду', cost: 500000, power: 50, purchased: false, type: 'auto' },
  });

  // Увеличение счета
  const incrementScore = useCallback((amount: number) => {
    setScore(prev => prev + amount);
  }, []);

  // Покупка буста
  const buyBoost = useCallback((boostId: string) => {
    const boost = boosts[boostId];
    
    if (!boost) {
      toast.error('Буст не найден');
      return false;
    }
    
    if (boost.purchased) {
      toast.error('Буст уже куплен');
      return false;
    }
    
    if (score < boost.cost) {
      toast.error('Недостаточно очков для покупки');
      return false;
    }
    
    // Покупка буста
    setScore(prev => prev - boost.cost);
    
    if (boost.type === 'click') {
      setClickPower(prev => prev + boost.power);
    } else if (boost.type === 'auto') {
      setAutoClickPower(prev => prev + boost.power);
    }
    
    setBoosts(prev => ({
      ...prev,
      [boostId]: {
        ...prev[boostId],
        purchased: true
      }
    }));
    
    toast.success(`Буст "${boost.name}" куплен!`);
    return true;
  }, [boosts, score]);

  // Сброс игры
  const resetGame = useCallback(() => {
    setScore(0);
    setClickPower(1);
    setAutoClickPower(0);
    setBoosts(prev => {
      const resetBoosts: Record<string, BoostType> = {};
      Object.keys(prev).forEach(key => {
        resetBoosts[key] = { ...prev[key], purchased: false };
      });
      return resetBoosts;
    });
    toast.success('Игра сброшена');
  }, []);

  // Сохранение игры
  const saveGame = useCallback(() => {
    const gameState = {
      score,
      clickPower,
      autoClickPower,
      boosts
    };
    localStorage.setItem('clicker-game', JSON.stringify(gameState));
  }, [score, clickPower, autoClickPower, boosts]);

  // Загрузка игры
  const loadGame = useCallback(() => {
    const savedState = localStorage.getItem('clicker-game');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setScore(parsedState.score || 0);
        setClickPower(parsedState.clickPower || 1);
        setAutoClickPower(parsedState.autoClickPower || 0);
        if (parsedState.boosts) {
          setBoosts(prev => {
            const loadedBoosts: Record<string, BoostType> = {};
            Object.keys(prev).forEach(key => {
              if (parsedState.boosts[key]) {
                loadedBoosts[key] = {
                  ...prev[key],
                  purchased: parsedState.boosts[key].purchased || false
                };
              } else {
                loadedBoosts[key] = prev[key];
              }
            });
            return loadedBoosts;
          });
        }
      } catch (e) {
        console.error('Ошибка при загрузке сохраненной игры:', e);
      }
    }
  }, []);

  return {
    score,
    incrementScore,
    clickPower,
    autoClickPower,
    boosts,
    buyBoost,
    resetGame,
    loadGame,
    saveGame
  };
};

// Экспортируем как именованный и дефолтный экспорт
export { useGameState };
export default useGameState;
