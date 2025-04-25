
import { useState, useEffect } from 'react';

interface ScoreProps {
  points: number;
}

const Score: React.FC<ScoreProps> = ({ points }) => {
  const [formattedPoints, setFormattedPoints] = useState<string>('000000');
  
  useEffect(() => {
    // Форматируем число с ведущими нулями (из 6 цифр)
    setFormattedPoints(points.toString().padStart(6, '0'));
  }, [points]);
  
  return (
    <div className="fixed top-6 right-6 z-20">
      <div className="bg-zinc-900/80 border-2 border-blue-600 rounded-lg px-4 py-2 backdrop-blur-sm">
        <div className="text-xl font-mono font-bold text-blue-400">
          {formattedPoints}
        </div>
      </div>
    </div>
  );
};

export default Score;
