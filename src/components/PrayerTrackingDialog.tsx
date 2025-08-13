import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Clock } from 'lucide-react';

interface PrayerTrackingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  prayerName: string;
  onPrayerCompleted: (completed: boolean) => void;
}

const PrayerTrackingDialog = ({ 
  isOpen, 
  onClose, 
  prayerName, 
  onPrayerCompleted 
}: PrayerTrackingDialogProps) => {
  const { language } = useLanguage();
  
  const handleResponse = (completed: boolean) => {
    onPrayerCompleted(completed);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary mb-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="w-8 h-8 text-primary" />
              <span>صلاة {prayerName}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-lg mb-6 text-foreground font-medium">
            هل صليت صلاة {prayerName}؟
          </p>
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => handleResponse(true)}
              className="w-full py-3 text-lg bg-gradient-primary hover:bg-gradient-mosque"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-3" />
              نعم، الحمد لله صليت
            </Button>
            
            <Button
              onClick={() => handleResponse(false)}
              variant="outline"
              className="w-full py-3 text-lg"
              size="lg"
            >
              <Clock className="w-5 h-5 mr-3" />
              لا، سأصلي لاحقًا
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrayerTrackingDialog;