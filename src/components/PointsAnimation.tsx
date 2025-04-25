
import { useEffect, useState } from 'react';

interface PointsAnimationProps {
  value: number;
  x: number;
  y: number;
}

const PointsAnimation: React.FC<PointsAnimationProps> = ({ value, x, y }) => {
  const [style, setStyle] = useState({
    left: `${x}px`,
    top: `${y - 20}px`,
    opacity: 1,
    transform: 'translateY(0)'
  });
  
  useEffect(() => {
    // Устанавливаем начальную позицию
    setStyle({
      left: `${x}px`,
      top: `${y - 20}px`,
      opacity: 1,
      transform: 'translateY(0)'
    });
    
    // Анимация движения вверх и исчезновения
    const timer = setTimeout(() => {
      setStyle(prev => ({
        ...prev,
        opacity: 0,
        transform: 'translateY(-50px)'
      }));
    }, 50);
    
    return () => clearTimeout(timer);
  }, [x, y]);
  
  return (
    <div 
      className="fixed z-50 pointer-events-none font-bold text-2xl transition-all duration-700 ease-out" 
      style={style}
    >
      <span className="text-blue-400 bg-black/50 px-2 py-1 rounded-full whitespace-nowrap">
        +{value}
      </span>
    </div>
  );
};

export default PointsAnimation;
