
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

interface ClickButtonProps {
  moveOffset: { x: number; y: number };
  onClick: (e: React.MouseEvent) => void;
  imageUrl: string;
}

const ClickButton: React.FC<ClickButtonProps> = ({ moveOffset, onClick, imageUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Воспроизвести звук клика
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Не удалось воспроизвести звук:", err));
    }
    
    // Вызвать обработчик клика
    onClick(e);
  };

  return (
    <div className="flex-1 flex items-center justify-center z-10">
      <audio ref={audioRef} src="/click.mp3" preload="auto" />
      
      <Button 
        onClick={handleClick}
        className="border-0 bg-transparent hover:bg-transparent p-0 transition transform hover:scale-105 active:scale-95 relative group"
      >
        {/* Пульсирующий контур */}
        <div className="absolute inset-0 rounded-full border-2 border-white/70 opacity-60 group-hover:opacity-100 animate-pulse" 
          style={{ 
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
            transform: `translate(${moveOffset.x * 0.05}px, ${moveOffset.y * 0.05}px)`,
          }}
        />
        
        {/* Внутреннее свечение */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-30 transition-opacity">
          <div className="absolute inset-0 bg-white"></div>
        </div>
        
        {/* Изображение энергетика */}
        <div className="w-48 h-64 flex items-center justify-center relative">
          <img 
            src={imageUrl}
            alt="Energy Drink"
            className="w-auto h-full object-contain transition-all opacity-90 group-hover:opacity-100"
            style={{ 
              filter: 'drop-shadow(0 0 5px rgba(0, 150, 255, 0.8))',
              transform: `translate(${moveOffset.x * 0.02}px, ${moveOffset.y * 0.02}px)`,
            }}
          />
        </div>
      </Button>
    </div>
  );
};

export default ClickButton;
