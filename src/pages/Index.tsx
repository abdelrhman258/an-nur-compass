import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Compass, Scroll, MapPin, Mosque } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/mosque-hero.jpg';
import appIcon from '@/assets/app-icon.png';

const Index = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hijriDate, setHijriDate] = useState("1446/02/05");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Simulate Hijri date calculation
    const hijriMonths = [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية',
      'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];
    const hijriMonth = hijriMonths[Math.floor(Math.random() * 12)];
    setHijriDate(`${Math.floor(Math.random() * 28) + 1} ${hijriMonth} 1446`);

    return () => clearInterval(timer);
  }, []);

  const navigationCards = [
    {
      title: language === 'en' ? 'Holy Quran' : 'القرآن الكريم',
      icon: BookOpen,
      path: '/quran',
      gradient: 'bg-gradient-islamic',
      description: language === 'en' ? 'Read the complete Quran with translation' : 'اقرأ القرآن الكريم كاملاً مع الترجمة'
    },
    {
      title: language === 'en' ? 'Prayer Times' : 'أوقات الصلاة',
      icon: Clock,
      path: '/prayer-times',
      gradient: 'bg-gradient-mosque',
      description: language === 'en' ? 'Daily prayer schedules & notifications' : 'مواقيت الصلاة اليومية والتنبيهات'
    },
    {
      title: language === 'en' ? 'Qibla Direction' : 'اتجاه القبلة',
      icon: Compass,
      path: '/qibla',
      gradient: 'bg-gradient-primary',
      description: language === 'en' ? 'Find the correct direction to Mecca' : 'اعثر على الاتجاه الصحيح إلى مكة'
    },
    {
      title: language === 'en' ? 'Azkar & Duas' : 'الأذكار والأدعية',
      icon: Scroll,
      path: '/azkar',
      gradient: 'bg-gradient-secondary',
      description: language === 'en' ? 'Daily remembrance and supplications' : 'الأذكار والأدعية اليومية'
    },
    {
      title: language === 'en' ? 'Nearby Mosques' : 'المساجد القريبة',
      icon: MapPin,
      path: '/mosques',
      gradient: 'bg-gradient-crescent',
      description: language === 'en' ? 'Find mosques in your area' : 'اعثر على المساجد في منطقتك'
    }
  ];

  const nextPrayerTime = "3:45 PM";
  const nextPrayerName = language === 'en' ? 'Asr' : 'العصر';

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Hero */}
      <div 
        className="relative bg-gradient-islamic text-primary-foreground bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${heroImage})` }}
      >
        <div className="absolute inset-0 pattern-islamic opacity-10"></div>
        <div className="relative px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={appIcon} alt="Al-Mu'min" className="w-12 h-12 rounded-xl" />
              <div>
                <h1 className="text-2xl font-bold">{t('appTitle')}</h1>
                <p className="text-primary-foreground/80 text-sm">{t('appSubtitle')}</p>
              </div>
            </div>
            <LanguageToggle />
          </div>

          {/* Date & Time */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold mb-2">
              {currentDate.toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-SA', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
            <div className="text-primary-foreground/90 text-sm mb-4">
              {currentDate.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary-foreground/70">{t('hijriDate')}:</span>
                <span className="font-medium arabic-text">{hijriDate}</span>
              </div>
            </div>
          </div>

          {/* Next Prayer */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-primary-foreground">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-primary-foreground/80 mb-1">{t('nextPrayer')}</p>
              <div className="flex items-center justify-center gap-3 text-lg font-semibold">
                <Mosque className="w-5 h-5" />
                <span className={language === 'ar' ? 'arabic-text' : ''}>{nextPrayerName}</span>
                <span>{nextPrayerTime}</span>
              </div>
              <p className="text-xs text-primary-foreground/70 mt-1">in 2h 34m</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 islamic-heading">
            {language === 'en' ? 'Islamic Tools & Resources' : 'الأدوات والموارد الإسلامية'}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {navigationCards.map((card, index) => (
              <Card 
                key={index}
                className="prayer-card cursor-pointer group bg-card border border-border/50 hover:shadow-prayer"
                onClick={() => navigate(card.path)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl ${card.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg mb-2 ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                        {card.title}
                      </h3>
                      <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'arabic-text text-right' : ''}`}>
                        {card.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {language === 'en' ? 'Tap to open' : 'اضغط للفتح'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;