
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface GameHeaderProps {
  points: number;
  moveOffset: { x: number; y: number };
  onSaveGame?: () => void;
  onOpenSettings: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  points,
  moveOffset,
  onOpenSettings
}) => {
  return (
    <div 
      className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-20"
      style={{
        transform: `translate(${moveOffset.x * 0.7}px, ${moveOffset.y * 0.5}px)`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      {/* Счетчик и кнопка настроек */}
      <div className="flex items-center gap-3">
        <Button 
          onClick={onOpenSettings}
          variant="outline"
          className="border-white/50 hover:border-white bg-transparent text-white hover:bg-white/10 p-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <Settings size={18} />
        </Button>
        
        <div className="border border-white/30 rounded-lg px-4 py-2 bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <div className="text-xl font-mono font-bold text-white">
            {points.toString().padStart(6, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
