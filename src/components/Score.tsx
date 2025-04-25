
import React from 'react';

interface ScoreProps {
  value: number;
}

const Score: React.FC<ScoreProps> = ({ value }) => {
  return (
    <div className="bg-zinc-900/80 border-2 border-blue-600 rounded-lg px-4 py-2 backdrop-blur-sm">
      <div className="text-xl font-mono font-bold text-blue-400">
        {value.toString().padStart(6, '0')}
      </div>
    </div>
  );
};

export default Score;
