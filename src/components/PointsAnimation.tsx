
import { useEffect, useState } from 'react';

interface PointsAnimationProps {
  value: number;
  x: number;
  y: number;
}

const PointsAnimation: React.FC<PointsAnimationProps> = ({ value, x, y }) => {
  const [position, setPosition] = useState({ top: y, left: x });
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    // Начальное положение немного выше места клика
    setPosition({ top: y, left: x });
    setOpacity(1);
    setScale(1);
    
    // Анимация движения вверх и затухания
    const timer = setTimeout(() => {
      setPosition(prev => ({ ...prev, top: prev.top - 80 }));
      setOpacity(0);
      setScale(1.5);
    }, 50);
    
    return () => {
      clearTimeout(timer);
    };
  }, [x, y]);
  
  return (
    <div 
      className="fixed pointer-events-none z-50 select-none flex justify-center"
      style={{
        top: position.top,
        left: position.left,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: 'top 0.7s ease-out, opacity 0.7s ease-out, transform 0.7s ease-out'
      }}
    >
      <div className="text-2xl font-bold whitespace-nowrap">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-100 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" style={{ textShadow: '0 0 5px #60a5fa, 0 0 10px #60a5fa' }}>
          +{value}
        </span>
      </div>
    </div>
  );
};

export default PointsAnimation;
