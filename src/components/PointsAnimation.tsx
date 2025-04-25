
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
    transform: 'translateY(0) scale(1)'
  });
  
  useEffect(() => {
    // Устанавливаем начальную позицию
    setStyle({
      left: `${x}px`,
      top: `${y - 20}px`,
      opacity: 1,
      transform: 'translateY(0) scale(1)'
    });
    
    // Анимация движения вверх, увеличения и исчезновения
    const timer = setTimeout(() => {
      setStyle(prev => ({
        ...prev,
        opacity: 0,
        transform: 'translateY(-70px) scale(1.2)'
      }));
    }, 50);
    
    return () => clearTimeout(timer);
  }, [x, y]);
  
  // Создаем эффект свечения с разными цветами в зависимости от значения
  const getGlowColor = () => {
    if (value >= 100) return 'purple';
    if (value >= 50) return 'green';
    if (value >= 10) return 'yellow';
    return 'blue';
  };
  
  return (
    <div 
      className="fixed z-50 pointer-events-none font-bold text-2xl transition-all duration-700 ease-out" 
      style={style}
    >
      <span 
        className={`bg-black/50 px-2 py-1 rounded-full whitespace-nowrap flex items-center justify-center`}
        style={{
          textShadow: `0 0 10px ${getGlowColor()}, 0 0 15px ${getGlowColor()}`,
          boxShadow: `0 0 10px ${getGlowColor()}80, inset 0 0 5px ${getGlowColor()}40`
        }}
      >
        <span className="text-blue-400 mr-1">+</span>
        <span className="text-white">{value}</span>
      </span>
    </div>
  );
};

export default PointsAnimation;
