// Notification service for Adhan alerts
import { audioService } from './audioService';
import { storageService } from './storageService';

export interface NotificationSettings {
  enabled: boolean;
  adhanSound: string;
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

class NotificationService {
  private notificationIntervals: NodeJS.Timeout[] = [];
  private settings: NotificationSettings;

  constructor() {
    this.settings = this.loadSettings();
    this.requestPermission();
    this.scheduleNotifications();
  }

  private loadSettings(): NotificationSettings {
    const appSettings = storageService.getAppSettings();
    return {
      enabled: appSettings.adhanNotificationsEnabled || false,
      adhanSound: appSettings.preferredAdhan || 'makkah',
      prayerTimes: {
        fajr: '05:12',
        dhuhr: '12:34',
        asr: '15:27',
        maghrib: '18:15',
        isha: '19:42'
      }
    };
  }

  private async requestPermission(): Promise<void> {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }

  private scheduleNotifications(): void {
    this.clearScheduledNotifications();
    
    if (!this.settings.enabled) return;

    Object.entries(this.settings.prayerTimes).forEach(([prayer, time]) => {
      this.scheduleForTime(time, prayer);
    });
  }

  private scheduleForTime(timeStr: string, prayerName: string): void {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);

    // If prayer time has passed today, schedule for tomorrow
    if (prayerTime <= now) {
      prayerTime.setDate(prayerTime.getDate() + 1);
    }

    const msUntilPrayer = prayerTime.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      this.triggerAdhan(prayerName);
      // Reschedule for next day
      this.scheduleForTime(timeStr, prayerName);
    }, msUntilPrayer);

    this.notificationIntervals.push(timeout);
  }

  private async triggerAdhan(prayerName: string): Promise<void> {
    if (!this.settings.enabled) return;

    console.log(`🕌 Triggering Adhan for ${prayerName} with sound: ${this.settings.adhanSound}`);

    // Show browser notification first
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`حان وقت صلاة ${this.getPrayerNameArabic(prayerName)}`, {
        body: 'حان الآن وقت الصلاة',
        icon: '/favicon.ico',
        tag: 'adhan-notification',
        requireInteraction: true
      });
    }

    // Play Adhan audio with better error handling
    try {
      console.log(`🔊 Attempting to play Adhan: ${this.settings.adhanSound}`);
      
      // Request audio focus for better playback
      if ('navigator' in window && 'mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: `أذان ${this.getPrayerNameArabic(prayerName)}`,
          artist: audioService.getAdhanOptions().find(a => a.id === this.settings.adhanSound)?.arabicName || '',
          album: 'تطبيق الصلاة'
        });
      }
      
      await audioService.playAdhan(this.settings.adhanSound);
      console.log(`✅ Adhan played successfully for ${prayerName}`);
      
      // Show success notification
      if ('Notification' in window && Notification.permission === 'granted') {
        setTimeout(() => {
          new Notification(`تم تشغيل الأذان بنجاح`, {
            body: `أذان ${this.getPrayerNameArabic(prayerName)}`,
            icon: '/favicon.ico',
            tag: 'adhan-success'
          });
        }, 1000);
      }
      
    } catch (error) {
      console.error(`❌ Failed to play Adhan for ${prayerName}:`, error);
      
      // Show detailed error notification in Arabic
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`تعذر تشغيل الأذان`, {
          body: `فشل في تشغيل أذان ${this.getPrayerNameArabic(prayerName)}. تحقق من اتصال الإنترنت.`,
          icon: '/favicon.ico',
          tag: 'adhan-error',
          requireInteraction: true
        });
      }
    }
  }

  private getPrayerNameArabic(prayerName: string): string {
    const arabicNames: { [key: string]: string } = {
      fajr: 'الفجر',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء'
    };
    return arabicNames[prayerName] || prayerName;
  }

  private clearScheduledNotifications(): void {
    this.notificationIntervals.forEach(timeout => clearTimeout(timeout));
    this.notificationIntervals = [];
  }

  public enableNotifications(): void {
    this.settings.enabled = true;
    storageService.saveAppSettings({ adhanNotificationsEnabled: true });
    this.scheduleNotifications();
  }

  public disableNotifications(): void {
    this.settings.enabled = false;
    storageService.saveAppSettings({ adhanNotificationsEnabled: false });
    this.clearScheduledNotifications();
  }

  public isEnabled(): boolean {
    return this.settings.enabled;
  }

  public updateAdhanSound(adhanId: string): void {
    this.settings.adhanSound = adhanId;
    storageService.saveAppSettings({ preferredAdhan: adhanId });
  }

  public destroy(): void {
    this.clearScheduledNotifications();
  }
}

export const notificationService = new NotificationService();