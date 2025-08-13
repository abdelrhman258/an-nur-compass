import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PrayerCountdownProps {
  className?: string;
}

const PrayerCountdown = ({ className = '' }: PrayerCountdownProps) => {
  const { language } = useLanguage();
  const [nextPrayerInfo, setNextPrayerInfo] = useState({ name: '', time: '', remaining: '' });

  // Prayer times data with Arabic and English names
  const prayerTimes = [
    { 
      name: language === 'ar' ? 'الفجر' : 'Fajr', 
      time: '05:12', 
      type: 'fajr'
    },
    { 
      name: language === 'ar' ? 'الظهر' : 'Dhuhr', 
      time: '12:34', 
      type: 'dhuhr'
    },
    { 
      name: language === 'ar' ? 'العصر' : 'Asr', 
      time: '15:27', 
      type: 'asr'
    },
    { 
      name: language === 'ar' ? 'المغرب' : 'Maghrib', 
      time: '18:15', 
      type: 'maghrib'
    },
    { 
      name: language === 'ar' ? 'العشاء' : 'Isha', 
      time: '19:42', 
      type: 'isha'
    }
  ];

  // Convert Arabic numerals to Arabic-Indic numerals
  const toArabicNumerals = (text: string): string => {
    if (language !== 'ar') return text;
    
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return text.replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
  };

  // Calculate next prayer time and remaining time with seconds precision
  const calculateNextPrayer = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    const currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;

    // Convert prayer times to seconds
    const prayerTimesInSeconds = prayerTimes.map(prayer => {
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
      
      const timeText = language === 'ar' ? 
        `${hoursRemaining}س ${minutesRemaining}د` :
        `${hoursRemaining}h ${minutesRemaining}m`;
      
      return {
        name: nextPrayer.name,
        time: nextPrayer.time,
        remaining: toArabicNumerals(timeText)
      };
    }

    // Calculate remaining time for today's prayer
    const secondsRemaining = nextPrayer.timeInSeconds - currentTimeInSeconds;
    const hoursRemaining = Math.floor(secondsRemaining / 3600);
    const minutesRemainingFinal = Math.floor((secondsRemaining % 3600) / 60);

    const timeText = language === 'ar' ? 
      `${hoursRemaining}س ${minutesRemainingFinal}د` :
      `${hoursRemaining}h ${minutesRemainingFinal}m`;

    return {
      name: nextPrayer.name,
      time: nextPrayer.time,
      remaining: toArabicNumerals(timeText)
    };
  };

  useEffect(() => {
    const updateTimes = () => {
      setNextPrayerInfo(calculateNextPrayer());
    };
    
    // Update immediately
    updateTimes();
    
    // Update every minute for responsive countdown
    const timer = setInterval(updateTimes, 60000);

    return () => clearInterval(timer);
  }, [language]);

  return (
    <div className={`text-sm font-medium text-foreground ${className}`}>
      <span className="text-muted-foreground">
        {language === 'ar' ? 'الصلاة التالية' : 'Next Prayer'}:{' '}
      </span>
      <span className="text-primary font-bold">
        {nextPrayerInfo.name}
      </span>
      <span className="text-muted-foreground"> في </span>
      <span className="text-foreground font-bold">
        {nextPrayerInfo.remaining}
      </span>
    </div>
  );
};

export default PrayerCountdown;