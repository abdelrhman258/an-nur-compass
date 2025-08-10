import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    quran: 'Holy Quran',
    prayerTimes: 'Prayer Times',
    qibla: 'Qibla Direction',
    azkar: 'Azkar & Duas',
    mosques: 'Nearby Mosques',
    
    // Home page
    appTitle: 'Al-Mu\'min',
    appSubtitle: 'Your Islamic Companion',
    currentDate: 'Current Date',
    hijriDate: 'Hijri Date',
    nextPrayer: 'Next Prayer',
    
    // Quran
    surahs: 'Surahs',
    verses: 'verses',
    translation: 'Translation',
    arabic: 'Arabic',
    english: 'English',
    play: 'Play',
    pause: 'Pause',
    
    // Prayer Times
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    current: 'Current',
    upcoming: 'Upcoming',
    completed: 'Completed',
    
    // Qibla
    qiblaDirection: 'Qibla Direction',
    perfectAlignment: 'Perfect Alignment!',
    turnLeft: 'Turn Left',
    turnRight: 'Turn Right',
    refreshLocation: 'Refresh Location',
    
    // Azkar
    morningAzkar: 'Morning Azkar',
    eveningAzkar: 'Evening Azkar',
    afterPrayerAzkar: 'After Prayer Azkar',
    beforeSleepAzkar: 'Before Sleep Azkar',
    duasFromSunnah: 'Duas from Sunnah',
    copy: 'Copy',
    share: 'Share',
    
    // General
    back: 'Back',
    location: 'Location',
    loading: 'Loading...',
    error: 'Error'
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    quran: 'القرآن الكريم',
    prayerTimes: 'أوقات الصلاة',
    qibla: 'اتجاه القبلة',
    azkar: 'الأذكار والأدعية',
    mosques: 'المساجد القريبة',
    
    // Home page
    appTitle: 'المؤمن',
    appSubtitle: 'رفيقك الإسلامي',
    currentDate: 'التاريخ الحالي',
    hijriDate: 'التاريخ الهجري',
    nextPrayer: 'الصلاة القادمة',
    
    // Quran
    surahs: 'السور',
    verses: 'آية',
    translation: 'الترجمة',
    arabic: 'العربية',
    english: 'الإنجليزية',
    play: 'تشغيل',
    pause: 'إيقاف',
    
    // Prayer Times
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    current: 'الحالية',
    upcoming: 'القادمة',
    completed: 'انتهت',
    
    // Qibla
    qiblaDirection: 'اتجاه القبلة',
    perfectAlignment: 'محاذاة مثالية!',
    turnLeft: 'انعطف يساراً',
    turnRight: 'انعطف يميناً',
    refreshLocation: 'تحديث الموقع',
    
    // Azkar
    morningAzkar: 'أذكار الصباح',
    eveningAzkar: 'أذكار المساء',
    afterPrayerAzkar: 'أذكار ما بعد الصلاة',
    beforeSleepAzkar: 'أذكار النوم',
    duasFromSunnah: 'أدعية من السنة',
    copy: 'نسخ',
    share: 'مشاركة',
    
    // General
    back: 'رجوع',
    location: 'الموقع',
    loading: 'جاري التحميل...',
    error: 'خطأ'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};