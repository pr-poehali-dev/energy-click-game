import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoreNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StoreNavigation: React.FC<StoreNavigationProps> = ({ 
  currentPage, 
  totalPages,
  onPageChange
}) => {
  return (
    <div className="flex justify-between items-center pt-2 border-t border-white/20">
      <Button 
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        variant="outline"
        className={`border-white/50 ${
          currentPage === 0 
            ? 'bg-white/5 text-white/50' 
            : 'bg-transparent text-white hover:bg-white/10'
        }`}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Обычные
      </Button>
      
      <div className="text-xs text-white/80">
        {currentPage + 1}/{totalPages}
      </div>
      
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        variant="outline"
        className={`border-white/50 ${
          currentPage === 1 
            ? 'bg-white/5 text-white/50' 
            : 'bg-transparent text-white hover:bg-white/10'
        }`}
      >
        Премиум
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default StoreNavigation;
