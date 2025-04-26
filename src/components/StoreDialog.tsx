import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import BoostStore from './BoostStore';

interface StoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  points: number;
  boosts: Record<string, {
    purchased: boolean;
    cost: number;
    pointsPerClick: number;
  }>;
  errorMessage?: string;
  onPurchase: (boostId: string) => void;
}

const StoreDialog: React.FC<StoreDialogProps> = ({
  open,
  onOpenChange,
  points,
  boosts,
  errorMessage,
  onPurchase
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-white/20 text-white shadow-[0_0_25px_rgba(255,255,255,0.2)]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white">
            Магазин Бустов
          </DialogTitle>
          <DialogDescription className="text-center text-white/70">
            Покупай бусты, чтобы получать больше очков за клик!
          </DialogDescription>
        </DialogHeader>
        
        <BoostStore 
          boosts={boosts} 
          points={points} 
          onPurchase={onPurchase} 
        />
        
        {errorMessage && (
          <div className="mt-4 p-2 border border-white/30 rounded-md text-center text-white/80 animate-pulse">
            {errorMessage}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StoreDialog;
