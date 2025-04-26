
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-white/20 text-white shadow-[0_0_25px_rgba(255,255,255,0.2)]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white">
            Настройки
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 text-center">
          <p className="text-white/70 mb-4">
            Здесь будут настройки в будущих обновлениях
          </p>
          <div className="p-3 rounded-lg border border-white/30 bg-black/50">
            <p className="text-white/80 font-medium">
              Разработчик: телеграмм @origcrime
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
