import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Settings, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const PrayerTimes = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(language === 'ar' ? "جارٍ تحديد الموقع..." : "Getting location...");
  const [selectedAdhan, setSelectedAdhan] = useState("makkah");

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

  // Adhan voice options
  const adhanOptions = [
    { value: 'makkah', label: t('makkahImam') },
    { value: 'madinah', label: t('madinahImam') },
    { value: 'naqshbandi', label: t('sheikNaqshbandi') },
    { value: 'rifaat', label: t('sheikRifaat') }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate location detection
    setTimeout(() => {
      setLocation(language === 'ar' ? "الرياض, المملكة العربية السعودية" : "Manhattan, New York, NY");
    }, 2000);

    return () => clearInterval(timer);
  }, [language]);

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
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('selectAdhan')}
                  </label>
                  <Select value={selectedAdhan} onValueChange={setSelectedAdhan}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('selectAdhan')} />
                    </SelectTrigger>
                    <SelectContent>
                      {adhanOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'تم اختيار:' : 'Selected:'} {adhanOptions.find(opt => opt.value === selectedAdhan)?.label}
                  </span>
                  <Button variant="outline" size="sm">
                    <Volume2 className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'استمع' : 'Preview'}
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