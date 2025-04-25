
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
        transform: 'translateY(-70px) scale(1.5)'
      }));
    }, 50);
    
    return () => clearTimeout(timer);
  }, [x, y]);
  
  // Создаем эффект свечения с разными цветами в зависимости от значения
  const getGlowColor = () => {
    if (value >= 100) return '#8B5CF6'; // фиолетовый
    if (value >= 50) return '#10B981';  // зеленый
    if (value >= 10) return '#F59E0B';  // желтый
    return '#3B82F6';                   // синий
  };
  
  const glowColor = getGlowColor();
  
  return (
    <div 
      className="fixed z-50 pointer-events-none font-bold text-2xl transition-all duration-700 ease-out" 
      style={style}
    >
      <span 
        className="bg-black/60 px-3 py-1.5 rounded-full whitespace-nowrap flex items-center justify-center border border-opacity-50 backdrop-blur-sm"
        style={{
          textShadow: `0 0 10px ${glowColor}, 0 0 15px ${glowColor}`,
          boxShadow: `0 0 10px ${glowColor}80, inset 0 0 5px ${glowColor}40`,
          borderColor: glowColor
        }}
      >
        <span className="text-blue-400 mr-1.5">+</span>
        <span className="bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text">{value}</span>
      </span>
    </div>
  );
};

export default PointsAnimation;
