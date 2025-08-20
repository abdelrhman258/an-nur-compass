import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { useLanguage } from '@/contexts/LanguageContext';

export const InstallPrompt = () => {
  const { isInstallable, installApp } = usePWA();
  const { language } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (!isInstallable || dismissed) return null;

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setDismissed(true);
    }
  };

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-secondary border-0 text-secondary-foreground shadow-lg md:max-w-md md:left-auto">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 bg-secondary-light/20 rounded-full flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm mb-1">
              {language === 'ar' ? 'تثبيت التطبيق' : 'Install App'}
            </h3>
            <p className="text-xs opacity-90 mb-3">
              {language === 'ar' 
                ? 'احصل على تجربة أفضل مع التطبيق المثبت'
                : 'Get a better experience with the installed app'
              }
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-secondary-light text-secondary text-xs h-8 px-3"
              >
                {language === 'ar' ? 'تثبيت' : 'Install'}
              </Button>
              <Button
                onClick={() => setDismissed(true)}
                variant="ghost"
                size="sm"
                className="text-secondary-foreground/70 hover:text-secondary-foreground text-xs h-8 px-2"
              >
                {language === 'ar' ? 'لاحقاً' : 'Later'}
              </Button>
            </div>
          </div>
          
          <Button
            onClick={() => setDismissed(true)}
            variant="ghost"
            size="sm"
            className="text-secondary-foreground/70 hover:text-secondary-foreground p-1 h-auto flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};