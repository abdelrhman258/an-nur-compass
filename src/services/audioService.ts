// Audio service for Quran recitation and Adhan playback
import adhanMakkahImam from '@/assets/audio/adhan-makkah-imam.mp3';
import adhanMadinahImam from '@/assets/audio/adhan-madinah-imam.mp3';
import adhanMohammedRifaat from '@/assets/audio/adhan-mohammed-rifaat.mp3';
import adhanSaadGhamdi from '@/assets/audio/adhan-saad-ghamdi.mp3';
import adhanMisharyAlafasy from '@/assets/audio/adhan-mishary-alafasy.mp3';

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

  // High-quality Adhan audio options with local files
  private adhanOptions: AdhanReciter[] = [
    {
      id: 'makkah',
      name: 'Imam of Makkah Grand Mosque',
      arabicName: 'إمام الحرم المكي',
      audioUrl: adhanMakkahImam
    },
    {
      id: 'madinah',
      name: 'Imam of Madinah Grand Mosque', 
      arabicName: 'إمام الحرم المدني',
      audioUrl: adhanMadinahImam
    },
    {
      id: 'rifaat',
      name: 'Sheikh Mohammed Rifaat',
      arabicName: 'الشيخ محمد رفعت',
      audioUrl: adhanMohammedRifaat
    },
    {
      id: 'ghamdi',
      name: 'Sheikh Saad Al-Ghamdi',
      arabicName: 'الشيخ سعد الغامدي',
      audioUrl: adhanSaadGhamdi
    },
    {
      id: 'alafasy_adhan',
      name: 'Sheikh Mishary Al-Afasy',
      arabicName: 'الشيخ مشاري العفاسي',
      audioUrl: adhanMisharyAlafasy
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

  // Play Adhan with local high-quality audio files
  async playAdhan(adhanId: string = 'makkah'): Promise<void> {
    const adhanOption = this.adhanOptions.find(a => a.id === adhanId) || this.adhanOptions[0];
    
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      console.log(`🔊 Playing Adhan: ${adhanOption.arabicName}`);
      
      this.currentAudio = new Audio();
      this.currentAudio.volume = 0.8;
      this.currentAudio.preload = 'auto';
      
      // Set source to local audio file
      this.currentAudio.src = adhanOption.audioUrl;

      // Wait for audio to load
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Loading timeout'));
        }, 5000);

        const onCanPlay = () => {
          clearTimeout(timeout);
          this.currentAudio!.removeEventListener('canplaythrough', onCanPlay);
          this.currentAudio!.removeEventListener('error', onError);
          resolve(void 0);
        };

        const onError = () => {
          clearTimeout(timeout);
          this.currentAudio!.removeEventListener('canplaythrough', onCanPlay);
          this.currentAudio!.removeEventListener('error', onError);
          reject(new Error('Audio loading failed'));
        };

        this.currentAudio!.addEventListener('canplaythrough', onCanPlay);
        this.currentAudio!.addEventListener('error', onError);
      });

      // Play the audio
      await this.currentAudio.play();
      this.isPlaying = true;
      
      console.log(`✅ Adhan playing successfully: ${adhanOption.arabicName}`);
      
      // Add ended listener
      this.currentAudio.addEventListener('ended', () => {
        this.isPlaying = false;
        console.log('🎵 Adhan finished');
      });
      
    } catch (error) {
      console.error(`❌ Failed to play Adhan for ${adhanOption.name}:`, error);
      
      // Speech synthesis fallback
      try {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(`الله أكبر الله أكبر - حان وقت الصلاة - ${adhanOption.arabicName}`);
          utterance.lang = 'ar-SA';
          utterance.rate = 0.7;
          utterance.pitch = 1.1;
          speechSynthesis.speak(utterance);
          console.log('🔊 Using speech synthesis as Adhan fallback');
        }
      } catch (fallbackError) {
        console.error('❌ Speech fallback also failed:', fallbackError);
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