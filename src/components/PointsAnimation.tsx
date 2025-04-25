
import { useState, useEffect } from 'react';

interface PointsAnimationProps {
  value: number;
  x: number;
  y: number;
}

const PointsAnimation: React.FC<PointsAnimationProps> = ({ value, x, y }) => {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(0.7);
  const [yOffset, setYOffset] = useState(0);
  
  useEffect(() => {
    const animationDuration = 700; // ms
    const opacityTimer = setTimeout(() => setOpacity(0), animationDuration * 0.5);
    const scaleTimer = setTimeout(() => setScale(1.2), animationDuration * 0.2);
    const moveTimer = setTimeout(() => setYOffset(-30), animationDuration * 0.6);
    
    return () => {
      clearTimeout(opacityTimer);
      clearTimeout(scaleTimer);
      clearTimeout(moveTimer);
    };
  }, []);
  
  return (
    <div
      className="fixed pointer-events-none z-50 font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-500 drop-shadow-[0_2px_3px_rgba(74,222,128,0.4)]"
      style={{
        left: `${x}px`,
        top: `${y + yOffset}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        fontSize: '1.8rem',
        transition: 'opacity 400ms ease, transform 500ms ease, top 500ms ease',
      }}
    >
      +{value}
    </div>
  );
};

export default PointsAnimation;
