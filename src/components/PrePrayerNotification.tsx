import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PrePrayerNotificationProps {
  className?: string;
}

const PrePrayerNotification = ({ className = '' }: PrePrayerNotificationProps) => {
  const { language } = useLanguage();
  const [notification, setNotification] = useState<{ prayerName: string; show: boolean }>({
    prayerName: '',
    show: false
  });

  // Prayer times data
  const prayerTimes = [
    { name: 'الفجر', time: '05:12', type: 'fajr' },
    { name: 'الظهر', time: '12:34', type: 'dhuhr' },
    { name: 'العصر', time: '15:27', type: 'asr' },
    { name: 'المغرب', time: '18:15', type: 'maghrib' },
    { name: 'العشاء', time: '19:42', type: 'isha' }
  ];

  const checkForUpcomingPrayer = () => {
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

    for (const prayer of prayerTimes) {
      const [hour, minute] = prayer.time.split(':').map(Number);
      const prayerTimeInMinutes = hour * 60 + minute;
      
      // Check if we're exactly 5 minutes before prayer time
      const timeDifference = prayerTimeInMinutes - currentTimeInMinutes;
      
      if (timeDifference === 5) {
        setNotification({
          prayerName: prayer.name,
          show: true
        });
        
        // Auto-hide notification after 30 seconds
        setTimeout(() => {
          setNotification(prev => ({ ...prev, show: false }));
        }, 30000);
        
        break;
      }
    }
  };

  useEffect(() => {
    // Check immediately
    checkForUpcomingPrayer();
    
    // Check every minute
    const timer = setInterval(checkForUpcomingPrayer, 60000);
    
    return () => clearInterval(timer);
  }, []);

  if (!notification.show) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm ${className}`}>
      <Alert className="bg-gradient-primary text-primary-foreground border-0 shadow-lg">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 animate-pulse" />
          <div>
            <AlertDescription className="text-sm font-medium">
              استعد للصلاة، صلاة {notification.prayerName} ستبدأ بعد ٥ دقائق
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default PrePrayerNotification;