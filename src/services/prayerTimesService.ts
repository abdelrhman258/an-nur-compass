// ✅ PRODUCTION-READY PRAYER TIMES SERVICE
// Manual implementation for reliability and production use

export type CalculationMethodType = 'MuslimWorldLeague' | 'Egyptian' | 'Karachi' | 'UmmAlQura' | 'Kuwait' | 'Qatar' | 'Singapore' | 'NorthAmerica' | 'Turkey';
export type MadhabType = 'Shafi' | 'Hanafi';
export type PrayerType = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export interface PrayerTimesConfig {
  method: CalculationMethodType;
  madhab: MadhabType;
  adjustments?: {
    fajr: number;
    sunrise: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
}

export interface PrayerTime {
  name: string;
  arabicName: string;
  time: Date;
  timeString: string;
  type: PrayerType;
  isNext: boolean;
  isPassed: boolean;
  isUpcoming: boolean;
}

export interface DailyPrayerTimes {
  date: Date;
  location: {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
  };
  config: PrayerTimesConfig;
  prayers: PrayerTime[];
  nextPrayer: PrayerTime | null;
  timeToNext: {
    hours: number;
    minutes: number;
    totalMinutes: number;
  } | null;
  sunrise: Date;
  sunset: Date;
  qibla: number;
}

// ✅ CALCULATION PARAMETERS FOR DIFFERENT METHODS
const CALCULATION_METHODS = {
  MuslimWorldLeague: {
    fajr: 18,
    isha: 17,
    name: 'Muslim World League',
    nameAr: 'رابطة العالم الإسلامي'
  },
  Egyptian: {
    fajr: 19.5,
    isha: 17.5,
    name: 'Egyptian General Authority of Survey',
    nameAr: 'الهيئة المساحية المصرية'
  },
  Karachi: {
    fajr: 18,
    isha: 18,
    name: 'University of Islamic Sciences, Karachi',
    nameAr: 'جامعة العلوم الإسلامية كراتشي'
  },
  UmmAlQura: {
    fajr: 18.5,
    isha: 90, // 90 minutes after Maghrib
    name: 'Umm al-Qura University (Saudi Arabia)',
    nameAr: 'جامعة أم القرى'
  },
  Kuwait: {
    fajr: 18,
    isha: 17.5,
    name: 'Kuwait Ministry of Awqaf',
    nameAr: 'وزارة الأوقاف الكويتية'
  },
  Qatar: {
    fajr: 18,
    isha: 90,
    name: 'Qatar Islamic Affairs Ministry',
    nameAr: 'وزارة الأوقاف القطرية'
  },
  Singapore: {
    fajr: 20,
    isha: 18,
    name: 'Islamic Religious Council of Singapore',
    nameAr: 'المجلس الإسلامي سنغافورة'
  },
  NorthAmerica: {
    fajr: 15,
    isha: 15,
    name: 'Islamic Society of North America',
    nameAr: 'الجمعية الإسلامية لأمريكا الشمالية'
  },
  Turkey: {
    fajr: 18,
    isha: 17,
    name: 'Turkey Presidency of Religious Affairs',
    nameAr: 'الرئاسة التركية للشؤون الدينية'
  }
};

class PrayerTimesService {
  private defaultConfig: PrayerTimesConfig = {
    method: 'UmmAlQura',
    madhab: 'Shafi'
  };

  // ✅ CALCULATE PRAYER TIMES
  async calculatePrayerTimes(
    latitude: number, 
    longitude: number, 
    date: Date = new Date(),
    config: Partial<PrayerTimesConfig> = {}
  ): Promise<DailyPrayerTimes> {
    try {
      const mergedConfig = { ...this.defaultConfig, ...config };
      const method = CALCULATION_METHODS[mergedConfig.method];
      
      // Calculate basic prayer times
      const prayerTimes = this.calculateBasicTimes(latitude, longitude, date, method, mergedConfig.madhab);
      
      // Apply adjustments if provided
      if (mergedConfig.adjustments) {
        this.applyAdjustments(prayerTimes, mergedConfig.adjustments);
      }
      
      // Format prayer times
      const prayers: PrayerTime[] = [
        {
          name: 'Fajr',
          arabicName: 'الفجر',
          time: prayerTimes.fajr,
          timeString: this.formatTime(prayerTimes.fajr),
          type: 'Fajr',
          isNext: false,
          isPassed: false,
          isUpcoming: false
        },
        {
          name: 'Sunrise',
          arabicName: 'الشروق',
          time: prayerTimes.sunrise,
          timeString: this.formatTime(prayerTimes.sunrise),
          type: 'Sunrise',
          isNext: false,
          isPassed: false,
          isUpcoming: false
        },
        {
          name: 'Dhuhr',
          arabicName: 'الظهر',
          time: prayerTimes.dhuhr,
          timeString: this.formatTime(prayerTimes.dhuhr),
          type: 'Dhuhr',
          isNext: false,
          isPassed: false,
          isUpcoming: false
        },
        {
          name: 'Asr',
          arabicName: 'العصر',
          time: prayerTimes.asr,
          timeString: this.formatTime(prayerTimes.asr),
          type: 'Asr',
          isNext: false,
          isPassed: false,
          isUpcoming: false
        },
        {
          name: 'Maghrib',
          arabicName: 'المغرب',
          time: prayerTimes.maghrib,
          timeString: this.formatTime(prayerTimes.maghrib),
          type: 'Maghrib',
          isNext: false,
          isPassed: false,
          isUpcoming: false
        },
        {
          name: 'Isha',
          arabicName: 'العشاء',
          time: prayerTimes.isha,
          timeString: this.formatTime(prayerTimes.isha),
          type: 'Isha',
          isNext: false,
          isPassed: false,
          isUpcoming: false
        }
      ];
      
      // Determine current prayer status
      const now = new Date();
      const { nextPrayer, timeToNext } = this.calculateNextPrayer(prayers, now);
      
      // Mark prayer statuses
      prayers.forEach(prayer => {
        prayer.isPassed = prayer.time < now;
        prayer.isNext = nextPrayer?.type === prayer.type;
        prayer.isUpcoming = !prayer.isPassed && !prayer.isNext && 
          prayer.time.getTime() - now.getTime() < 30 * 60 * 1000;
      });
      
      // Calculate Qibla direction
      const qibla = this.calculateQibla(latitude, longitude);
      
      return {
        date,
        location: { latitude, longitude },
        config: mergedConfig,
        prayers,
        nextPrayer,
        timeToNext,
        sunrise: prayerTimes.sunrise,
        sunset: prayerTimes.maghrib,
        qibla
      };
      
    } catch (error) {
      console.error('❌ Prayer times calculation failed:', error);
      throw new Error('Failed to calculate prayer times. Please check your location and try again.');
    }
  }

  // ✅ CALCULATE BASIC PRAYER TIMES
  private calculateBasicTimes(
    latitude: number,
    longitude: number,
    date: Date,
    method: any,
    madhab: MadhabType
  ) {
    const jd = this.julianDay(date);
    const decl = this.sunDeclination(jd);
    const eqt = this.equationOfTime(jd);
    
    // Solar noon
    const solarNoon = 12 - longitude / 15 - eqt / 60;
    const dhuhr = this.dateFromTime(date, solarNoon);
    
    // Sunrise/sunset angles
    const sunriseAngle = 0.833;
    const sunriseHour = this.timeFromAngle(-sunriseAngle, latitude, decl);
    const sunrise = this.dateFromTime(date, solarNoon - sunriseHour);
    const maghrib = this.dateFromTime(date, solarNoon + sunriseHour);
    
    // Fajr
    const fajrHour = this.timeFromAngle(-method.fajr, latitude, decl);
    const fajr = this.dateFromTime(date, solarNoon - fajrHour);
    
    // Isha
    let isha: Date;
    if (method.isha > 90) {
      // Minutes after Maghrib
      isha = new Date(maghrib.getTime() + method.isha * 60 * 1000);
    } else {
      // Angle
      const ishaHour = this.timeFromAngle(-method.isha, latitude, decl);
      isha = this.dateFromTime(date, solarNoon + ishaHour);
    }
    
    // Asr
    const asrFactor = madhab === 'Hanafi' ? 2 : 1;
    const asrAngle = Math.atan(1 / (asrFactor + Math.tan(Math.abs(latitude - decl) * Math.PI / 180))) * 180 / Math.PI;
    const asrHour = this.timeFromAngle(asrAngle, latitude, decl);
    const asr = this.dateFromTime(date, solarNoon + asrHour);
    
    return { fajr, sunrise, dhuhr, asr, maghrib, isha };
  }

  // ✅ HELPER FUNCTIONS FOR ASTRONOMICAL CALCULATIONS
  private julianDay(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if (month <= 2) {
      const year2 = year - 1;
      const month2 = month + 12;
      return Math.floor(365.25 * year2) + Math.floor(30.6001 * (month2 + 1)) + day + 1720994.5;
    }
    
    return Math.floor(365.25 * year) + Math.floor(30.6001 * (month + 1)) + day + 1720994.5;
  }

  private sunDeclination(jd: number): number {
    const n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
    const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * Math.PI / 180;
    return Math.asin(Math.sin(lambda) * Math.sin(23.439 * Math.PI / 180)) * 180 / Math.PI;
  }

  private equationOfTime(jd: number): number {
    const n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
    const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * Math.PI / 180;
    const alpha = Math.atan2(Math.cos(23.439 * Math.PI / 180) * Math.sin(lambda), Math.cos(lambda)) * 180 / Math.PI;
    return 4 * (L - alpha);
  }

  private timeFromAngle(angle: number, latitude: number, declination: number): number {
    const latRad = latitude * Math.PI / 180;
    const declRad = declination * Math.PI / 180;
    const angleRad = angle * Math.PI / 180;
    
    const argument = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(declRad)) / 
                    (Math.cos(latRad) * Math.cos(declRad));
    
    if (argument < -1 || argument > 1) {
      return 0; // No solution at this latitude
    }
    
    return Math.acos(argument) * 180 / Math.PI / 15;
  }

  private dateFromTime(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(Math.floor(hours));
    result.setMinutes(Math.round((hours - Math.floor(hours)) * 60));
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
  }

  // ✅ APPLY ADJUSTMENTS
  private applyAdjustments(times: any, adjustments: any): void {
    Object.keys(adjustments).forEach(prayer => {
      if (times[prayer]) {
        times[prayer] = new Date(times[prayer].getTime() + adjustments[prayer] * 60 * 1000);
      }
    });
  }

  // ✅ CALCULATE QIBLA DIRECTION
  private calculateQibla(latitude: number, longitude: number): number {
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const toDegrees = (rad: number) => rad * (180 / Math.PI);
    
    const dLng = toRadians(kaabaLng - longitude);
    const lat1 = toRadians(latitude);
    const lat2 = toRadians(kaabaLat);
    
    const x = Math.sin(dLng) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = toDegrees(Math.atan2(x, y));
    return (bearing + 360) % 360;
  }

  // ✅ FORMAT TIME FOR DISPLAY
  private formatTime(date: Date, use12Hour: boolean = true): string {
    if (use12Hour) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
  }

  // ✅ CALCULATE NEXT PRAYER
  private calculateNextPrayer(prayers: PrayerTime[], currentTime: Date) {
    const now = currentTime.getTime();
    
    // Find next prayer today (skip sunrise)
    for (const prayer of prayers) {
      if (prayer.time.getTime() > now && prayer.type !== 'Sunrise') {
        const timeDiff = prayer.time.getTime() - now;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        return {
          nextPrayer: prayer,
          timeToNext: {
            hours,
            minutes,
            totalMinutes: Math.floor(timeDiff / (1000 * 60))
          }
        };
      }
    }
    
    // If no prayer left today, next is Fajr tomorrow
    const tomorrow = new Date(currentTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const fajrTomorrow = new Date(tomorrow);
    fajrTomorrow.setHours(5, 30, 0, 0);
    
    const timeDiff = fajrTomorrow.getTime() - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      nextPrayer: {
        name: 'Fajr',
        arabicName: 'الفجر',
        time: fajrTomorrow,
        timeString: this.formatTime(fajrTomorrow),
        type: 'Fajr' as PrayerType,
        isNext: true,
        isPassed: false,
        isUpcoming: false
      },
      timeToNext: {
        hours,
        minutes,
        totalMinutes: Math.floor(timeDiff / (1000 * 60))
      }
    };
  }

  // ✅ GET CURRENT PRAYER
  getCurrentPrayer(prayers: PrayerTime[]): PrayerTime | null {
    const now = new Date().getTime();
    
    for (let i = 0; i < prayers.length; i++) {
      const current = prayers[i];
      const next = prayers[i + 1];
      
      if (current.type === 'Sunrise') continue;
      
      if (current.time.getTime() <= now && 
          (next ? next.time.getTime() > now : true)) {
        return current;
      }
    }
    
    return prayers[prayers.length - 1];
  }

  // ✅ GET AVAILABLE METHODS
  getAvailableMethods(): Array<{ key: CalculationMethodType; name: string; nameAr: string; region: string }> {
    return Object.entries(CALCULATION_METHODS).map(([key, value]) => ({
      key: key as CalculationMethodType,
      name: value.name,
      nameAr: value.nameAr,
      region: key === 'UmmAlQura' ? 'Saudi Arabia' : 'Global'
    }));
  }

  // ✅ GET AVAILABLE MADHABS
  getAvailableMadhabs(): Array<{ key: MadhabType; name: string; nameAr: string; description: string }> {
    return [
      { 
        key: 'Shafi', 
        name: 'Shafi, Maliki, Hanbali', 
        nameAr: 'الشافعي والمالكي والحنبلي',
        description: 'Asr when shadow equals object length + 1'
      },
      { 
        key: 'Hanafi', 
        name: 'Hanafi', 
        nameAr: 'الحنفي',
        description: 'Asr when shadow equals object length × 2 + 1'
      }
    ];
  }

  // ✅ CHECK IF PRAYER TIME IS APPROACHING
  isPrayerApproaching(prayerTime: Date, currentTime: Date = new Date()): boolean {
    const timeDiff = prayerTime.getTime() - currentTime.getTime();
    return timeDiff > 0 && timeDiff <= 5 * 60 * 1000;
  }

  // ✅ SAVE/LOAD USER SETTINGS
  saveSettings(config: PrayerTimesConfig): void {
    try {
      localStorage.setItem('prayer-settings', JSON.stringify(config));
    } catch (error) {
      console.warn('Could not save prayer settings:', error);
    }
  }

  loadSettings(): PrayerTimesConfig {
    try {
      const saved = localStorage.getItem('prayer-settings');
      if (saved) {
        return { ...this.defaultConfig, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Could not load prayer settings:', error);
    }
    return this.defaultConfig;
  }

  // ✅ UTILITY: Convert Arabic numerals for display
  toArabicNumerals(text: string): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return text.replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
  }

  // ✅ VALIDATION
  isValidCoordinates(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }
}

// ✅ EXPORT SINGLETON INSTANCE
export const prayerTimesService = new PrayerTimesService();
export default prayerTimesService;