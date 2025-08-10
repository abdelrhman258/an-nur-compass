import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations for the Islamic app
const translations = {
  en: {
    // App branding
    appName: 'Al-Mu\'min',
    appSubtitle: 'Your Complete Islamic Companion',
    
    // Navigation
    home: 'Home',
    quran: 'Holy Quran',
    prayerTimes: 'Prayer Times',
    qibla: 'Qibla Direction',
    azkar: 'Azkar & Duas',
    mosques: 'Nearby Mosques',
    
    // Home page
    exploreFeatures: 'Explore Islamic Features',
    quickAccess: 'Quick Access',
    nextPrayer: 'Next Prayer',
    today: 'Today',
    readQuran: 'Read Quran',
    findQibla: 'Find Qibla',
    morningAzkar: 'Morning Azkar',
    
    // Prayer times
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    currentTime: 'Current Time',
    prayerSchedule: 'Prayer Schedule',
    nextPrayerIn: 'Next Prayer in',
    adhanSettings: 'Adhan Settings',
    selectAdhan: 'Select Adhan Voice',
    makkahImam: 'Makkah Imam',
    madinahImam: 'Madinah Imam',
    sheikNaqshbandi: 'Sheikh Naqshbandi',
    sheikRifaat: 'Sheikh Mohammed Rifaat',
    
    // Qibla
    qiblaDirection: 'Qibla Direction',
    currentLocation: 'Current Location',
    distanceToMecca: 'Distance to Mecca',
    perfectlyAligned: '✨ Perfectly Aligned ✨',
    turnLeft: 'Turn left',
    turnRight: 'Turn right',
    aligned: 'Aligned',
    refreshLocation: 'Refresh Location',
    howToUse: 'How to Use',
    qiblaInstructions: [
      '• Hold your device flat and level',
      '• Slowly rotate until the arrow points upward',
      '• The golden arrow points toward the Kaaba in Mecca',
      '• When aligned, you\'ll see a confirmation message'
    ],
    
    // Quran
    chooseSuprah: 'Choose a Surah to Read',
    verses: 'verses',
    meccan: 'Meccan',
    medinan: 'Medinan',
    backToSurahs: 'Back to Surahs',
    play: 'Play',
    pause: 'Pause',
    verse: 'Verse',
    bismillah: 'In the name of Allah, the Most Gracious, the Most Merciful',
    translation: 'Translation',
    arabic: 'Arabic',
    
    // Azkar categories
    azkarCategories: 'Azkar Categories',
    morningAzkarTitle: 'Morning Azkar',
    eveningAzkarTitle: 'Evening Azkar',
    afterPrayerAzkarTitle: 'After Prayer Azkar',
    beforeSleepAzkarTitle: 'Before Sleep Azkar',
    duasSunnahTitle: 'Duas from Sunnah',
    backToCategories: 'Back to Categories',
    copyText: 'Copy Text',
    shareText: 'Share Text',
    repeat: 'Repeat',
    times: 'times',
    
    // Mosques
    nearbyMosques: 'Nearby Mosques',
    distance: 'Distance',
    getDirections: 'Get Directions',
    
    // Common
    back: 'Back',
    loading: 'Loading...',
    gettingLocation: 'Getting location...',
    greatCircleDistance: 'Great Circle Distance',
    km: 'km',
    
    // Days of week
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    
    // Months
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December'
  },
  ar: {
    // App branding
    appName: 'المؤمن',
    appSubtitle: 'رفيقك الإسلامي الشامل',
    
    // Navigation
    home: 'الرئيسية',
    quran: 'القرآن الكريم',
    prayerTimes: 'أوقات الصلاة',
    qibla: 'اتجاه القبلة',
    azkar: 'الأذكار والأدعية',
    mosques: 'المساجد القريبة',
    
    // Home page
    exploreFeatures: 'استكشف الميزات الإسلامية',
    quickAccess: 'الوصول السريع',
    nextPrayer: 'الصلاة التالية',
    today: 'اليوم',
    readQuran: 'اقرأ القرآن',
    findQibla: 'اتجاه القبلة',
    morningAzkar: 'أذكار الصباح',
    
    // Prayer times
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    currentTime: 'الوقت الحالي',
    prayerSchedule: 'جدول الصلوات',
    nextPrayerIn: 'الصلاة التالية في',
    adhanSettings: 'إعدادات الأذان',
    selectAdhan: 'اختر صوت الأذان',
    makkahImam: 'إمام مكة',
    madinahImam: 'إمام المدينة',
    sheikNaqshbandi: 'الشيخ النقشبندي',
    sheikRifaat: 'الشيخ محمد رفعت',
    
    // Qibla
    qiblaDirection: 'اتجاه القبلة',
    currentLocation: 'الموقع الحالي',
    distanceToMecca: 'المسافة إلى مكة',
    perfectlyAligned: '✨ محاذٍ تماماً ✨',
    turnLeft: 'اتجه يساراً',
    turnRight: 'اتجه يميناً',
    aligned: 'محاذٍ',
    refreshLocation: 'تحديث الموقع',
    howToUse: 'كيفية الاستخدام',
    qiblaInstructions: [
      '• امسك جهازك بشكل مسطح ومستوٍ',
      '• اقلب ببطء حتى يشير السهم للأعلى',
      '• السهم الذهبي يشير نحو الكعبة في مكة',
      '• عند المحاذاة، ستظهر رسالة تأكيد'
    ],
    
    // Quran
    chooseSuprah: 'اختر سورة للقراءة',
    verses: 'آية',
    meccan: 'مكية',
    medinan: 'مدنية',
    backToSurahs: 'العودة للسور',
    play: 'تشغيل',
    pause: 'إيقاف',
    verse: 'آية',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'الترجمة',
    arabic: 'العربية',
    
    // Azkar categories
    azkarCategories: 'أقسام الأذكار',
    morningAzkarTitle: 'أذكار الصباح',
    eveningAzkarTitle: 'أذكار المساء',
    afterPrayerAzkarTitle: 'أذكار بعد الصلاة',
    beforeSleepAzkarTitle: 'أذكار النوم',
    duasSunnahTitle: 'أدعية من السنة',
    backToCategories: 'العودة للأقسام',
    copyText: 'نسخ النص',
    shareText: 'مشاركة النص',
    repeat: 'تكرار',
    times: 'مرات',
    
    // Mosques
    nearbyMosques: 'المساجد القريبة',
    distance: 'المسافة',
    getDirections: 'الحصول على الاتجاهات',
    
    // Common
    back: 'رجوع',
    loading: 'جارٍ التحميل...',
    gettingLocation: 'جارٍ تحديد الموقع...',
    greatCircleDistance: 'المسافة المباشرة',
    km: 'كم',
    
    // Days of week
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
    
    // Months
    january: 'يناير',
    february: 'فبراير',
    march: 'مارس',
    april: 'أبريل',
    may: 'مايو',
    june: 'يونيو',
    july: 'يوليو',
    august: 'أغسطس',
    september: 'سبتمبر',
    october: 'أكتوبر',
    november: 'نوفمبر',
    december: 'ديسمبر'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations.en];
    return Array.isArray(translation) ? translation.join(' ') : translation || key;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};