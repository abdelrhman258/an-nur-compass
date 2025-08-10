export interface QuranVerse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  ayahs: QuranVerse[];
}

export interface QuranSurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface QuranResponse {
  code: number;
  status: string;
  data: QuranSurah | QuranSurahInfo[];
}

class QuranService {
  private baseUrl = 'https://api.alquran.cloud/v1';
  private arabicEdition = 'ar.alafasy'; // Arabic with recitation
  private englishEdition = 'en.asad'; // English translation
  private cache = new Map<string, any>();

  // Get all Surahs list
  async getAllSurahs(): Promise<QuranSurahInfo[]> {
    const cacheKey = 'all-surahs';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/surah`);
      const data: QuranResponse = await response.json();
      
      if (data.code === 200 && Array.isArray(data.data)) {
        this.cache.set(cacheKey, data.data);
        return data.data;
      }
      throw new Error('Failed to fetch Surahs');
    } catch (error) {
      console.error('Error fetching Surahs:', error);
      return [];
    }
  }

  // Get a specific Surah with verses in both Arabic and English
  async getSurah(surahNumber: number): Promise<{ arabic: QuranSurah; english: QuranSurah } | null> {
    const cacheKey = `surah-${surahNumber}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Fetch both Arabic and English versions
      const [arabicResponse, englishResponse] = await Promise.all([
        fetch(`${this.baseUrl}/surah/${surahNumber}/ar.alafasy`),
        fetch(`${this.baseUrl}/surah/${surahNumber}/${this.englishEdition}`)
      ]);

      const arabicData: QuranResponse = await arabicResponse.json();
      const englishData: QuranResponse = await englishResponse.json();

      if (arabicData.code === 200 && englishData.code === 200 && 
          !Array.isArray(arabicData.data) && !Array.isArray(englishData.data)) {
        
        const result = {
          arabic: arabicData.data,
          english: englishData.data
        };
        
        this.cache.set(cacheKey, result);
        return result;
      }
      throw new Error(`Failed to fetch Surah ${surahNumber}`);
    } catch (error) {
      console.error(`Error fetching Surah ${surahNumber}:`, error);
      return null;
    }
  }

  // Get a specific verse
  async getVerse(surahNumber: number, verseNumber: number): Promise<{ arabic: QuranVerse; english: QuranVerse } | null> {
    try {
      const [arabicResponse, englishResponse] = await Promise.all([
        fetch(`${this.baseUrl}/ayah/${surahNumber}:${verseNumber}/ar.alafasy`),
        fetch(`${this.baseUrl}/ayah/${surahNumber}:${verseNumber}/${this.englishEdition}`)
      ]);

      const arabicData = await arabicResponse.json();
      const englishData = await englishResponse.json();

      if (arabicData.code === 200 && englishData.code === 200) {
        return {
          arabic: arabicData.data,
          english: englishData.data
        };
      }
      throw new Error(`Failed to fetch verse ${surahNumber}:${verseNumber}`);
    } catch (error) {
      console.error(`Error fetching verse ${surahNumber}:${verseNumber}:`, error);
      return null;
    }
  }

  // Search verses by text
  async searchVerses(query: string, surahNumber?: number): Promise<QuranVerse[]> {
    try {
      const url = surahNumber 
        ? `${this.baseUrl}/search/${query}/${surahNumber}/${this.englishEdition}`
        : `${this.baseUrl}/search/${query}/all/${this.englishEdition}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.code === 200 && data.data?.matches) {
        return data.data.matches;
      }
      return [];
    } catch (error) {
      console.error('Error searching verses:', error);
      return [];
    }
  }

  // Get audio URL for a Surah
  getAudioUrl(surahNumber: number, reciter: string = 'ar.alafasy'): string {
    return `${this.baseUrl}/surah/${surahNumber}/${reciter}`;
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

export const quranService = new QuranService();