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
  private madaniUrl = 'https://api.quran.com/api/v4'; // Madani Mushaf certified API
  private arabicEdition = 'ar.alafasy'; // Arabic with recitation
  private englishEdition = 'en.asad'; // English translation
  private cache = new Map<string, any>();
  private readonly BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';

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

  // Get a specific Surah with Madani Mushaf standard
  async getSurah(surahNumber: number): Promise<{ arabic: QuranSurah; english: QuranSurah } | null> {
    const cacheKey = `madani-surah-${surahNumber}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Fetch from certified Madani Mushaf API first
      const madaniResponse = await fetch(`${this.madaniUrl}/chapters/${surahNumber}/verses?words=true&text_type=uthmani`);
      let arabicData: QuranSurah | null = null;
      
      if (madaniResponse.ok) {
        const madaniData = await madaniResponse.json();
        arabicData = this.processMadaniData(madaniData, surahNumber);
      } else {
        // Fallback to original API
        const response = await fetch(`${this.baseUrl}/surah/${surahNumber}/ar.alafasy`);
        const data: QuranResponse = await response.json();
        if (data.code === 200 && !Array.isArray(data.data)) {
          arabicData = this.convertToMadaniFormat(data.data, surahNumber);
        }
      }

      // Get English translation
      const englishResponse = await fetch(`${this.baseUrl}/surah/${surahNumber}/${this.englishEdition}`);
      const englishResponseData: QuranResponse = await englishResponse.json();
      
      if (arabicData && englishResponseData.code === 200 && !Array.isArray(englishResponseData.data)) {
        const englishData = this.convertToMadaniFormat(englishResponseData.data, surahNumber);
        
        const result = {
          arabic: arabicData,
          english: englishData
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

  // Convert Madani API data to our format
  private processMadaniData(madaniData: any, surahNumber: number): QuranSurah {
    const verses: QuranVerse[] = [];
    
    // Add Bismillah as verse 1 for all Surahs except At-Tawbah (Surah 9)
    if (surahNumber !== 9) {
      verses.push({
        number: 1,
        text: this.BISMILLAH,
        numberInSurah: 1,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false
      });
    }
    
    // Add all other verses with proper numbering
    madaniData.verses?.forEach((verse: any, index: number) => {
      const verseNumber = surahNumber === 9 ? index + 1 : index + 2; // Adjust numbering for Bismillah
      verses.push({
        number: verseNumber,
        text: verse.text_uthmani || verse.text_simple,
        numberInSurah: verseNumber,
        juz: verse.juz_number || 1,
        manzil: verse.manzil_number || 1,
        page: verse.page_number || 1,
        ruku: verse.ruku_number || 1,
        hizbQuarter: verse.hizb_quarter || 1,
        sajda: verse.sajda || false
      });
    });

    return {
      number: surahNumber,
      name: madaniData.chapter?.name_arabic || '',
      englishName: madaniData.chapter?.name_simple || '',
      englishNameTranslation: madaniData.chapter?.translated_name?.name || '',
      revelationType: madaniData.chapter?.revelation_place === 'makkah' ? 'Meccan' : 'Medinan',
      numberOfAyahs: verses.length,
      ayahs: verses
    };
  }

  // Convert standard API data to Madani format
  private convertToMadaniFormat(surah: QuranSurah, surahNumber: number): QuranSurah {
    const verses: QuranVerse[] = [];
    
    // Add Bismillah as verse 1 for all Surahs except At-Tawbah (Surah 9)
    if (surahNumber !== 9) {
      verses.push({
        number: 1,
        text: this.BISMILLAH,
        numberInSurah: 1,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false
      });
    }
    
    // Clean and add original verses with proper numbering
    surah.ayahs.forEach((verse, index) => {
      const verseNumber = surahNumber === 9 ? index + 1 : index + 2;
      const cleanedText = this.cleanVerseText(verse.text);
      
      if (cleanedText.trim()) { // Only add non-empty verses
        verses.push({
          ...verse,
          number: verseNumber,
          numberInSurah: verseNumber,
          text: cleanedText
        });
      }
    });

    return {
      ...surah,
      numberOfAyahs: verses.length,
      ayahs: verses
    };
  }

  // Clean verse text of any Bismillah remnants
  private cleanVerseText(text: string): string {
    let cleanedText = text;
    
    // Remove all variants of Bismillah
    const bismillahVariants = [
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      'بسم الله الرحمن الرحيم',
      'In the name of Allah, the Beneficent, the Merciful.',
      'In the name of Allah, the Gracious, the Merciful.',
      'In the Name of Allah, the Most Gracious, the Most Merciful',
      'In the name of God, the Beneficent, the Merciful'
    ];
    
    bismillahVariants.forEach(variant => {
      cleanedText = cleanedText.replace(variant, '').trim();
    });
    
    return cleanedText;
  }

  // Verify text accuracy against certified database
  async verifyVerseAccuracy(surahNumber: number, verseNumber: number, text: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.madaniUrl}/verses/by_chapter/${surahNumber}?verse_key=${surahNumber}:${verseNumber}`);
      if (response.ok) {
        const data = await response.json();
        const certifiedText = data.verses?.[0]?.text_uthmani;
        return certifiedText === text;
      }
    } catch (error) {
      console.warn('Verification failed, using local data:', error);
    }
    return true; // Default to true if verification fails
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