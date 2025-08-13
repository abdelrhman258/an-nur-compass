import { useEffect, useState } from 'react';

interface DynamicBackgroundProps {
  children: React.ReactNode;
}

const DynamicBackground = ({ children }: DynamicBackgroundProps) => {
  const [currentPeriod, setCurrentPeriod] = useState<string>('day');

  // Prayer times (should match those in other components)
  const prayerTimes = {
    fajr: '05:12',
    sunrise: '06:45',
    dhuhr: '12:34',
    asr: '15:27',
    maghrib: '18:15',
    isha: '19:42'
  };

  const getCurrentPeriod = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Convert prayer times to minutes
    const fajrMinutes = parseInt(prayerTimes.fajr.split(':')[0]) * 60 + parseInt(prayerTimes.fajr.split(':')[1]);
    const sunriseMinutes = parseInt(prayerTimes.sunrise.split(':')[0]) * 60 + parseInt(prayerTimes.sunrise.split(':')[1]);
    const dhuhrMinutes = parseInt(prayerTimes.dhuhr.split(':')[0]) * 60 + parseInt(prayerTimes.dhuhr.split(':')[1]);
    const asrMinutes = parseInt(prayerTimes.asr.split(':')[0]) * 60 + parseInt(prayerTimes.asr.split(':')[1]);
    const maghribMinutes = parseInt(prayerTimes.maghrib.split(':')[0]) * 60 + parseInt(prayerTimes.maghrib.split(':')[1]);
    const ishaMinutes = parseInt(prayerTimes.isha.split(':')[0]) * 60 + parseInt(prayerTimes.isha.split(':')[1]);

    // Determine current period
    if (currentTimeInMinutes >= 0 && currentTimeInMinutes < fajrMinutes) {
      return 'night';
    } else if (currentTimeInMinutes >= fajrMinutes && currentTimeInMinutes < sunriseMinutes) {
      return 'fajr';
    } else if (currentTimeInMinutes >= sunriseMinutes && currentTimeInMinutes < dhuhrMinutes) {
      return 'morning';
    } else if (currentTimeInMinutes >= dhuhrMinutes && currentTimeInMinutes < asrMinutes) {
      return 'day';
    } else if (currentTimeInMinutes >= asrMinutes && currentTimeInMinutes < maghribMinutes) {
      return 'asr';
    } else if (currentTimeInMinutes >= maghribMinutes && currentTimeInMinutes < ishaMinutes) {
      return 'sunset';
    } else {
      return 'night';
    }
  };

  useEffect(() => {
    const updatePeriod = () => {
      setCurrentPeriod(getCurrentPeriod());
    };

    // Update immediately
    updatePeriod();

    // Update every minute
    const timer = setInterval(updatePeriod, 60000);

    return () => clearInterval(timer);
  }, []);

  // Dynamic background classes based on current period
  const getBackgroundClass = () => {
    switch (currentPeriod) {
      case 'fajr':
        return 'bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700'; // Dawn colors
      case 'morning':
        return 'bg-gradient-to-br from-orange-300 via-yellow-300 to-blue-300'; // Bright morning
      case 'day':
        return 'bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-200'; // Clear day
      case 'asr':
        return 'bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400'; // Late afternoon
      case 'sunset':
        return 'bg-gradient-to-br from-red-500 via-orange-500 to-purple-600'; // Sunset
      case 'night':
        return 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900'; // Night
      default:
        return 'bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-200'; // Default day
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getBackgroundClass()}`}>
      <div className="min-h-screen bg-background/90 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;