// Local storage service for reading progress and app settings
export interface ReadingProgress {
  surahNumber: number;
  verseNumber: number;
  surahName: string;
  arabicName: string;
  timestamp: number;
}

export interface AppSettings {
  preferredReciter: string;
  preferredAdhan: string;
  showTranslations: boolean;
  lastReadingProgress?: ReadingProgress;
}

class StorageService {
  private readonly READING_PROGRESS_KEY = 'quran-reading-progress';
  private readonly APP_SETTINGS_KEY = 'app-settings';

  // Save reading progress
  saveReadingProgress(surahNumber: number, verseNumber: number, surahName: string, arabicName: string): void {
    const progress: ReadingProgress = {
      surahNumber,
      verseNumber,
      surahName,
      arabicName,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem(this.READING_PROGRESS_KEY, JSON.stringify(progress));
      console.log('Reading progress saved:', progress);
    } catch (error) {
      console.error('Error saving reading progress:', error);
    }
  }

  // Get reading progress
  getReadingProgress(): ReadingProgress | null {
    try {
      const saved = localStorage.getItem(this.READING_PROGRESS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading reading progress:', error);
    }
    return null;
  }

  // Clear reading progress
  clearReadingProgress(): void {
    try {
      localStorage.removeItem(this.READING_PROGRESS_KEY);
    } catch (error) {
      console.error('Error clearing reading progress:', error);
    }
  }

  // Save app settings
  saveAppSettings(settings: Partial<AppSettings>): void {
    try {
      const currentSettings = this.getAppSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      localStorage.setItem(this.APP_SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Error saving app settings:', error);
    }
  }

  // Get app settings
  getAppSettings(): AppSettings {
    try {
      const saved = localStorage.getItem(this.APP_SETTINGS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading app settings:', error);
    }
    
    // Default settings
    return {
      preferredReciter: 'alafasy',
      preferredAdhan: 'makkah',
      showTranslations: false // Arabic only by default
    };
  }

  // Update reading progress in settings
  updateReadingProgressInSettings(progress: ReadingProgress): void {
    const settings = this.getAppSettings();
    settings.lastReadingProgress = progress;
    this.saveAppSettings(settings);
  }
}

export const storageService = new StorageService();