
import { Button } from '@/components/ui/button';

interface StoreButtonProps {
  moveOffset: { x: number; y: number };
  onOpenStore: () => void;
}

const StoreButton: React.FC<StoreButtonProps> = ({ moveOffset, onOpenStore }) => {
  return (
    <div 
      className="mb-10 z-10"
      style={{
        transform: `translate(${moveOffset.x * 0.5}px, ${moveOffset.y * 0.3}px)`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      <Button 
        onClick={onOpenStore}
        variant="outline"
        className="px-6 py-3 bg-transparent border border-white/50 hover:border-white text-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/10 font-bold text-lg transition-all"
      >
        <span className="mr-2">🏪</span> Магазин Бустов
      </Button>
    </div>
  );
};

export default StoreButton;
