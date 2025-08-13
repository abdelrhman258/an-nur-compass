import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Settings, Volume2, Bell, BellOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { audioService } from '@/services/audioService';
import { storageService } from '@/services/storageService';
import { notificationService } from '@/services/notificationService';
import { toast } from 'sonner';

const PrayerTimes = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("جارٍ تحديد الموقع...");
  const [selectedAdhan, setSelectedAdhan] = useState("makkah");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [nextPrayerInfo, setNextPrayerInfo] = useState({ name: '', time: '', remaining: '' });
  
  useEffect(() => {
    // Load saved settings
    const settings = storageService.getAppSettings();
    setSelectedAdhan(settings.preferredAdhan);
    setNotificationsEnabled(settings.adhanNotificationsEnabled);
  }, []);

  const handleAdhanChange = (value: string) => {
    setSelectedAdhan(value);
    storageService.saveAppSettings({ preferredAdhan: value });
  };

  const playAdhanPreview = async () => {
    try {
      await audioService.playAdhan(selectedAdhan);
      const adhanOptions = audioService.getAdhanOptions();
      const selectedOption = adhanOptions.find(opt => opt.id === selectedAdhan);
      toast.success(`تم تشغيل أذان: ${selectedOption?.arabicName}`);
    } catch (error) {
      console.error('Error playing Adhan preview:', error);
      toast.error('فشل في تشغيل الأذان');
    }
  };

  const toggleNotifications = () => {
    if (notificationsEnabled) {
      notificationService.disableNotifications();
      setNotificationsEnabled(false);
      toast.success(t('notificationsDisabled'));
    } else {
      notificationService.enableNotifications();
      setNotificationsEnabled(true);
      toast.success(t('notificationsEnabled'));
    }
  };

  // Prayer times data with Arabic and English names
  const prayerTimes = [
    { 
      name: language === 'ar' ? 'الفجر' : 'Fajr', 
      time: '05:12', 
      type: 'fajr',
      icon: '🌅'
    },
    { 
      name: language === 'ar' ? 'الشروق' : 'Sunrise', 
      time: '06:45', 
      type: 'sunrise',
      icon: '☀️'
    },
    { 
      name: language === 'ar' ? 'الظهر' : 'Dhuhr', 
      time: '12:34', 
      type: 'dhuhr',
      icon: '🌞'
    },
    { 
      name: language === 'ar' ? 'العصر' : 'Asr', 
      time: '15:27', 
      type: 'asr',
      icon: '🌆'
    },
    { 
      name: language === 'ar' ? 'المغرب' : 'Maghrib', 
      time: '18:15', 
      type: 'maghrib',
      icon: '🌅'
    },
    { 
      name: language === 'ar' ? 'العشاء' : 'Isha', 
      time: '19:42', 
      type: 'isha',
      icon: '🌙'
    }
  ];

  // Calculate next prayer time and remaining time with seconds precision
  const calculateNextPrayer = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    const currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;

    // Convert prayer times to seconds and filter only prayer times (not sunrise)
    const prayerTimesInSeconds = prayerTimes
      .filter(prayer => prayer.type !== 'sunrise')
      .map(prayer => {
        const [hour, minute] = prayer.time.split(':').map(Number);
        return {
          ...prayer,
          timeInSeconds: hour * 3600 + minute * 60
        };
      });

    // Find next prayer
    let nextPrayer = prayerTimesInSeconds.find(prayer => prayer.timeInSeconds > currentTimeInSeconds);
    
    // If no prayer found today, next prayer is Fajr tomorrow
    if (!nextPrayer) {
      nextPrayer = prayerTimesInSeconds[0]; // Fajr
      // Calculate time until Fajr tomorrow
      const secondsUntilMidnight = (24 * 3600) - currentTimeInSeconds;
      const secondsFromMidnightToFajr = nextPrayer.timeInSeconds;
      const totalSecondsRemaining = secondsUntilMidnight + secondsFromMidnightToFajr;
      
      const hoursRemaining = Math.floor(totalSecondsRemaining / 3600);
      const minutesRemaining = Math.floor((totalSecondsRemaining % 3600) / 60);
      const secondsRemainingFinal = totalSecondsRemaining % 60;
      
      return {
        name: nextPrayer.name,
        time: nextPrayer.time,
        remaining: language === 'ar' ? 
          `${hoursRemaining}س ${minutesRemaining}د ${secondsRemainingFinal}ث` :
          `${hoursRemaining}h ${minutesRemaining}m ${secondsRemainingFinal}s`
      };
    }

    // Calculate remaining time for today's prayer
    const secondsRemaining = nextPrayer.timeInSeconds - currentTimeInSeconds;
    const hoursRemaining = Math.floor(secondsRemaining / 3600);
    const minutesRemainingFinal = Math.floor((secondsRemaining % 3600) / 60);
    const secondsRemainingFinal = secondsRemaining % 60;

    return {
      name: nextPrayer.name,
      time: nextPrayer.time,
      remaining: language === 'ar' ? 
        `${hoursRemaining}س ${minutesRemainingFinal}د ${secondsRemainingFinal}ث` :
        `${hoursRemaining}h ${minutesRemainingFinal}m ${secondsRemainingFinal}s`
    };
  };

  // Get current prayer status
  const getCurrentPrayerStatus = (prayerTime: string, prayerType: string) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    const [hour, minute] = prayerTime.split(':').map(Number);
    const prayerTimeInMinutes = hour * 60 + minute;
    
    if (prayerType === 'sunrise') {
      return currentTimeInMinutes > prayerTimeInMinutes ? 'passed' : 'upcoming';
    }
    
    const nextPrayerInfo = calculateNextPrayer();
    return nextPrayerInfo.time === prayerTime ? 'next' : 
           currentTimeInMinutes > prayerTimeInMinutes ? 'passed' : 'upcoming';
  };


  useEffect(() => {
    const updateTimes = () => {
      setCurrentTime(new Date());
      setNextPrayerInfo(calculateNextPrayer());
    };
    
    // Update immediately
    updateTimes();
    
    // Update every 10 seconds for responsive countdown
    const timer = setInterval(updateTimes, 10000);

    // Simulate location detection
    setTimeout(() => {
      setLocation("الرياض, المملكة العربية السعودية");
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-mosque text-primary-foreground">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-primary-foreground hover:bg-primary-light/20"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6" />
                <h1 className="text-2xl font-bold">{t('prayerTimes')}</h1>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Location Info */}
          <Card className="bg-card border border-border/50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{location}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'تم حساب أوقات الصلاة لموقعك' : 'Prayer times calculated for your location'}
              </p>
            </CardContent>
          </Card>

          {/* Current Time and Next Prayer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-primary text-primary-foreground border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">{t('currentTime')}</h3>
                <p className="text-3xl font-bold">
                  {currentTime.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
                <p className="text-sm opacity-80 mt-2">
                  {currentTime.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-secondary text-secondary-foreground border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'ar' ? 'الصلاة القادمة في' : t('nextPrayerIn')}
                </h3>
                <p className="text-2xl font-bold text-foreground">{nextPrayerInfo.remaining}</p>
                <p className="text-sm opacity-90 mt-1 text-foreground/80">{nextPrayerInfo.name} - {nextPrayerInfo.time}</p>
              </CardContent>
            </Card>
          </div>

          {/* Prayer Schedule */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="islamic-heading">{t('prayerSchedule')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prayerTimes.map((prayer, index) => {
                  const status = getCurrentPrayerStatus(prayer.time, prayer.type);
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        status === 'next' ? 'bg-primary/20 border border-primary/30' : 'bg-accent/30 hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{prayer.icon}</span>
                        <div>
                          <h4 className="font-semibold text-foreground">{prayer.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {prayer.type === 'sunrise' ? '' : (language === 'ar' ? 'صلاة' : 'Prayer')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{prayer.time}</p>
                        <Badge 
                          variant={status === 'next' ? 'default' : 'outline'} 
                          className="text-xs"
                        >
                          {status === 'next' ? (language === 'ar' ? 'القادمة' : 'Next') : 
                           status === 'passed' ? (language === 'ar' ? 'انتهت' : 'Done') : 
                           (language === 'ar' ? 'قادمة' : 'Upcoming')}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Adhan Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-primary" />
                {t('adhanSettings')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Notification Toggle */}
                <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    {notificationsEnabled ? (
                      <Bell className="w-5 h-5 text-primary" />
                    ) : (
                      <BellOff className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{t('adhanNotifications')}</p>
                      <p className="text-sm text-muted-foreground">
                        {notificationsEnabled ? t('notificationsEnabled') : t('notificationsDisabled')}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={toggleNotifications}
                  />
                </div>

                {/* Adhan Sound Selection */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('selectAdhan')}
                  </label>
                  <Select value={selectedAdhan} onValueChange={handleAdhanChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('selectAdhan')} />
                    </SelectTrigger>
                    <SelectContent>
                      {audioService.getAdhanOptions().map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.arabicName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'تم اختيار:' : 'Selected:'} {audioService.getAdhanOptions().find(opt => opt.id === selectedAdhan)?.arabicName}
                  </span>
                  <Button variant="outline" size="sm" onClick={playAdhanPreview}>
                    <Volume2 className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'معاينة الأذان' : t('previewAdhan')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;