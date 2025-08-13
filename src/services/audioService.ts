// Audio service for Quran recitation and Adhan playback
export interface AudioReciter {
  id: string;
  name: string;
  arabicName: string;
  baseUrl: string;
}

export interface AdhanReciter {
  id: string;
  name: string;
  arabicName: string;
  audioUrl: string;
}

class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying = false;

  // Popular Quran reciters
  private reciters: AudioReciter[] = [
    {
      id: 'alafasy',
      name: 'Mishary Al-Afasy',
      arabicName: 'مشاري العفاسي',
      baseUrl: 'https://server8.mp3quran.net/afs'
    },
    {
      id: 'husary',
      name: 'Mahmoud Khalil Al-Husary',
      arabicName: 'محمود خليل الحصري',
      baseUrl: 'https://server6.mp3quran.net/husary'
    },
    {
      id: 'sudais',
      name: 'Abdul Rahman Al-Sudais',
      arabicName: 'عبد الرحمن السديس',
      baseUrl: 'https://server11.mp3quran.net/sds'
    }
  ];

  // Adhan audio options with working URLs
  private adhanOptions: AdhanReciter[] = [
    {
      id: 'makkah',
      name: 'Makkah Imam',
      arabicName: 'إمام الحرم المكي',
      audioUrl: 'https://archive.org/download/adhan-masjid-al-haram/adhan-masjid-al-haram.mp3'
    },
    {
      id: 'madinah',
      name: 'Madinah Imam', 
      arabicName: 'إمام الحرم المدني',
      audioUrl: 'https://archive.org/download/adhan-masjid-nabawi/adhan-masjid-nabawi.mp3'
    },
    {
      id: 'rifaat',
      name: 'Sheikh Mohammed Rifaat',
      arabicName: 'الشيخ محمد رفعت',
      audioUrl: 'https://server8.mp3quran.net/afs/Adhan/001.mp3'
    },
    {
      id: 'ghamdi',
      name: 'Sheikh Saad Al-Ghamdi',
      arabicName: 'الشيخ سعد الغامدي',
      audioUrl: 'https://server8.mp3quran.net/afs/Adhan/002.mp3'
    },
    {
      id: 'alafasy_adhan',
      name: 'Sheikh Mishary Al-Afasy',
      arabicName: 'الشيخ مشاري العفاسي',
      audioUrl: 'https://server8.mp3quran.net/afs/Adhan/003.mp3'
    }
  ];

  getCurrentReciter(): AudioReciter {
    return this.reciters[0]; // Default to Al-Afasy
  }

  getReciters(): AudioReciter[] {
    return this.reciters;
  }

  getAdhanOptions(): AdhanReciter[] {
    return this.adhanOptions;
  }

  // Format Surah number for audio URL (3 digits with leading zeros)
  private formatSurahNumber(surahNumber: number): string {
    return surahNumber.toString().padStart(3, '0');
  }

  // Get audio URL for a specific Surah
  getSurahAudioUrl(surahNumber: number, reciterId: string = 'alafasy'): string {
    const reciter = this.reciters.find(r => r.id === reciterId) || this.reciters[0];
    const formattedNumber = this.formatSurahNumber(surahNumber);
    return `${reciter.baseUrl}/${formattedNumber}.mp3`;
  }

  // Play Surah audio
  async playSurah(surahNumber: number, reciterId: string = 'alafasy'): Promise<void> {
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      const audioUrl = this.getSurahAudioUrl(surahNumber, reciterId);
      this.currentAudio = new Audio(audioUrl);
      
      this.currentAudio.addEventListener('loadstart', () => {
        console.log('Loading Surah audio...');
      });

      this.currentAudio.addEventListener('canplay', () => {
        console.log('Surah audio ready to play');
      });

      this.currentAudio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        throw new Error('Failed to load audio');
      });

      await this.currentAudio.play();
      this.isPlaying = true;
    } catch (error) {
      console.error('Error playing Surah:', error);
      throw error;
    }
  }

  // Play Adhan with better error handling and fallback
  async playAdhan(adhanId: string = 'makkah'): Promise<void> {
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      const adhanOption = this.adhanOptions.find(a => a.id === adhanId) || this.adhanOptions[0];
      console.log(`🔊 Playing Adhan: ${adhanOption.name} - ${adhanOption.audioUrl}`);
      
      this.currentAudio = new Audio();
      this.currentAudio.crossOrigin = 'anonymous';
      this.currentAudio.preload = 'auto';
      
      // Add event listeners before setting src
      this.currentAudio.addEventListener('loadstart', () => {
        console.log('🔄 Loading Adhan audio...');
      });

      this.currentAudio.addEventListener('canplaythrough', () => {
        console.log('✅ Adhan audio ready to play');
      });

      this.currentAudio.addEventListener('error', (e) => {
        console.error('❌ Adhan audio error:', e);
        console.error('Failed URL:', adhanOption.audioUrl);
      });

      this.currentAudio.addEventListener('ended', () => {
        console.log('🎵 Adhan finished playing');
        this.isPlaying = false;
      });

      // Set source and load
      this.currentAudio.src = adhanOption.audioUrl;
      this.currentAudio.load();

      // Wait for audio to be ready, then play
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Audio loading timeout'));
        }, 10000); // 10 second timeout

        this.currentAudio!.addEventListener('canplaythrough', () => {
          clearTimeout(timeout);
          resolve(void 0);
        }, { once: true });

        this.currentAudio!.addEventListener('error', () => {
          clearTimeout(timeout);
          reject(new Error(`Failed to load Adhan: ${adhanOption.audioUrl}`));
        }, { once: true });
      });

      await this.currentAudio.play();
      this.isPlaying = true;
      console.log('✅ Adhan started playing successfully');
      
    } catch (error) {
      console.error('❌ Error playing Adhan:', error);
      
      // Try fallback with local notification sound if available
      try {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('أذان - حان وقت الصلاة');
          utterance.lang = 'ar-SA';
          utterance.rate = 0.8;
          speechSynthesis.speak(utterance);
          console.log('🔊 Fallback: Using speech synthesis for Adhan notification');
        }
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
      }
      
      throw error;
    }
  }

  // Pause current audio
  pause(): void {
    if (this.currentAudio && this.isPlaying) {
      this.currentAudio.pause();
      this.isPlaying = false;
    }
  }

  // Resume current audio
  resume(): void {
    if (this.currentAudio && !this.isPlaying) {
      this.currentAudio.play();
      this.isPlaying = true;
    }
  }

  // Stop current audio
  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  // Get current playing status
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Set volume (0-1)
  setVolume(volume: number): void {
    if (this.currentAudio) {
      this.currentAudio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  // Add event listeners
  addEventListener(event: string, callback: () => void): void {
    if (this.currentAudio) {
      this.currentAudio.addEventListener(event, callback);
    }
  }

  // Cleanup
  destroy(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.isPlaying = false;
  }
}

export const audioService = new AudioService();