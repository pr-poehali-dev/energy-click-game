
import { useState, useEffect } from 'react';
import { MoveOffset } from '@/types/gameTypes';

export function useMouseMove(): MoveOffset {
  const [moveOffset, setMoveOffset] = useState<MoveOffset>({ x: 0, y: 0 });
  
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
  
  return moveOffset;
}
