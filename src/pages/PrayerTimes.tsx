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


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute for real-time display

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
                <h3 className="text-lg font-semibold mb-2">{t('nextPrayerIn')}</h3>
                <p className="text-2xl font-bold text-secondary">2h 34m</p>
                <p className="text-sm opacity-80 mt-1">{t('maghrib')} - 18:15</p>
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
                {prayerTimes.map((prayer, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
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
                      <Badge variant="outline" className="text-xs">
                        {index === 4 ? (language === 'ar' ? 'القادمة' : 'Next') : (language === 'ar' ? 'انتهت' : 'Done')}
                      </Badge>
                    </div>
                  </div>
                ))}
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
                    تم اختيار: {audioService.getAdhanOptions().find(opt => opt.id === selectedAdhan)?.arabicName}
                  </span>
                  <Button variant="outline" size="sm" onClick={playAdhanPreview}>
                    <Volume2 className="w-4 h-4 mr-2" />
                    {t('previewAdhan')}
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