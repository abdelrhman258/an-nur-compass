import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Compass, 
  Heart, 
  MapPin,
  Moon,
  Sun,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import PrayerCountdown from '@/components/PrayerCountdown';
import DynamicBackground from '@/components/DynamicBackground';
import PrePrayerNotification from '@/components/PrePrayerNotification';
import PrayerTrackingDialog from '@/components/PrayerTrackingDialog';
import mosqueHero from '@/assets/mosque-hero.jpg';

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTrackingDialog, setPrayerTrackingDialog] = useState({ 
    isOpen: false, 
    prayerName: '' 
  });

  // Update time every minute for real-time display
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      checkPrayerTime();
    }, 60000); // Update every minute

    // Check immediately on mount
    checkPrayerTime();

    return () => clearInterval(timer);
  }, []);

  // Convert to Arabic numerals if language is Arabic
  const toArabicNumerals = (text: string): string => {
    if (language !== 'ar') return text;
    
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return text.replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
  };

  // Format current date properly
  const gregorianDate = currentTime.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Check for prayer time triggers
  const checkPrayerTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const prayerTimes = [
      { name: 'الفجر', hour: 5, minute: 12 },
      { name: 'الظهر', hour: 12, minute: 34 },
      { name: 'العصر', hour: 15, minute: 27 },
      { name: 'المغرب', hour: 18, minute: 15 },
      { name: 'العشاء', hour: 19, minute: 42 }
    ];

    for (const prayer of prayerTimes) {
      if (currentHour === prayer.hour && currentMinute === prayer.minute) {
        setPrayerTrackingDialog({
          isOpen: true,
          prayerName: prayer.name
        });
        break;
      }
    }
  };

  const handlePrayerCompleted = (completed: boolean) => {
    // Store prayer completion status
    const today = currentTime.toDateString();
    const existing = JSON.parse(localStorage.getItem('prayerStatus') || '{}');
    existing[today] = existing[today] || {};
    existing[today][prayerTrackingDialog.prayerName] = completed;
    localStorage.setItem('prayerStatus', JSON.stringify(existing));
  };

  const navigationCards = [
    {
      icon: BookOpen,
      title: t('quran'),
      description: t('quranDescription'),
      route: "/quran",
      gradient: "bg-gradient-primary",
      iconColor: "text-primary-foreground"
    },
    {
      icon: Clock,
      title: t('prayerTimes'),
      description: t('prayerTimesDescription'),
      route: "/prayer-times",
      gradient: "bg-gradient-mosque",
      iconColor: "text-primary-foreground"
    },
    {
      icon: Compass,
      title: t('qibla'),
      description: t('qiblaDescription'),
      route: "/qibla",
      gradient: "bg-gradient-secondary",
      iconColor: "text-secondary-foreground"
    },
    {
      icon: Heart,
      title: t('azkar'),
      description: t('azkarDescription'),
      route: "/azkar",
      gradient: "bg-gradient-islamic",
      iconColor: "text-primary-foreground"
    },
    {
      icon: MapPin,
      title: t('mosques'),
      description: t('mosquesDescription'),
      route: "/mosques",
      gradient: "bg-gradient-crescent",
      iconColor: "text-secondary-foreground"
    }
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <DynamicBackground>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-80 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${mosqueHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 to-primary/50"></div>
          <div className="absolute top-4 right-4 z-20">
            <LanguageToggle />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <div className="mb-4">
              <Moon className="w-16 h-16 text-secondary crescent-animation mx-auto mb-2" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {t('appName')}
            </h1>
            <p className="text-lg text-white/90 mb-6 max-w-md">
              {t('appSubtitle')}
            </p>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{gregorianDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Section */}
      <div className="px-6 py-4 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {t('today')} • {toArabicNumerals(currentTime.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
              }))}
            </div>
            <PrayerCountdown />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 islamic-heading">
            {t('exploreFeatures')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card, index) => (
              <Card 
                key={index}
                className={`prayer-card cursor-pointer group ${card.gradient} border-0`}
                onClick={() => handleNavigation(card.route)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <card.icon className={`w-12 h-12 mx-auto ${card.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${card.iconColor}`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm opacity-90 ${card.iconColor}`}>
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Section */}
          <div className="mt-12 bg-accent/50 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-accent-foreground">
              {t('quickAccess')}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleNavigation('/quran')}
                className="btn-prayer"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {t('readQuran')}
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleNavigation('/qibla')}
                className="btn-prayer"
              >
                <Compass className="w-4 h-4 mr-2" />
                {t('findQibla')}
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleNavigation('/azkar')}
                className="btn-prayer"
              >
                <Heart className="w-4 h-4 mr-2" />
                {t('morningAzkar')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Islamic Pattern Background */}
      <div className="fixed inset-0 pattern-islamic opacity-5 pointer-events-none"></div>
      
      {/* Notifications */}
      <PrePrayerNotification />
      
      {/* Prayer Tracking Dialog */}
      <PrayerTrackingDialog
        isOpen={prayerTrackingDialog.isOpen}
        onClose={() => setPrayerTrackingDialog({ ...prayerTrackingDialog, isOpen: false })}
        prayerName={prayerTrackingDialog.prayerName}
        onPrayerCompleted={handlePrayerCompleted}
      />
    </DynamicBackground>
  );
};

export default Index;