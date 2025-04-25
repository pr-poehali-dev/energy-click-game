
import { useState, useEffect } from 'react';
import Game from '@/components/Game';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Маленькая задержка для плавной анимации загрузки
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast({
        title: "Игра загружена!",
        description: "Кликай по энергетику, чтобы заработать очки!",
        duration: 3000,
      });
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-black transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Game />
    </div>
  );
};

export default Index;
