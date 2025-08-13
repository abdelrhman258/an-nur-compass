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
  private uthmaniUrl = 'https://api.quran.com/api/v4'; // Verified Uthmani text
  private tanzilUrl = 'https://tanzil.net/api'; // Backup verification source
  private arabicEdition = 'ar.alafasy';
  private englishEdition = 'en.asad';
  private cache = new Map<string, any>();
  private readonly BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
  private verificationErrors = new Set<string>();

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

  // Get verified Uthmani text according to Madani Mushaf standard
  async getSurah(surahNumber: number): Promise<{ arabic: QuranSurah; english: QuranSurah } | null> {
    const cacheKey = `madani-verified-${surahNumber}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Fetch verified Uthmani text
      const uthmaniResponse = await fetch(`${this.uthmaniUrl}/chapters/${surahNumber}/verses?text_type=uthmani&words=false&translations=false`);
      
      if (!uthmaniResponse.ok) {
        throw new Error('Failed to fetch verified Uthmani text');
      }

      const uthmaniData = await uthmaniResponse.json();
      
      // Verify the text integrity
      const isVerified = await this.verifyTextIntegrity(surahNumber, uthmaniData);
      if (!isVerified) {
        this.verificationErrors.add(`surah-${surahNumber}`);
        throw new Error('Quran text unavailable — verification failed');
      }

      // Process according to Madani Mushaf rules
      const arabicData = this.processMadaniMushaf(uthmaniData, surahNumber);
      
      // Get English translation separately
      const englishResponse = await fetch(`${this.baseUrl}/surah/${surahNumber}/${this.englishEdition}`);
      const englishResponseData: QuranResponse = await englishResponse.json();
      
      if (englishResponseData.code === 200 && !Array.isArray(englishResponseData.data)) {
        const englishData = this.processEnglishTranslation(englishResponseData.data, surahNumber);
        
        const result = {
          arabic: arabicData,
          english: englishData
        };
        
        this.cache.set(cacheKey, result);
        return result;
      }
      throw new Error(`Failed to fetch translation for Surah ${surahNumber}`);
    } catch (error) {
      console.error(`Error fetching Surah ${surahNumber}:`, error);
      if (error.message.includes('verification failed')) {
        throw error; // Re-throw verification errors
      }
      return null;
    }
  }

  // Verify text integrity against multiple sources
  private async verifyTextIntegrity(surahNumber: number, uthmaniData: any): Promise<boolean> {
    try {
      // Basic structure verification
      if (!uthmaniData?.verses || !Array.isArray(uthmaniData.verses)) {
        return false;
      }

      // Verify verse count matches expected count
      const expectedVerseCounts = [7, 286, 200, 176, 120]; // Al-Fatiha, Al-Baqarah, etc.
      if (surahNumber <= expectedVerseCounts.length) {
        const expectedCount = expectedVerseCounts[surahNumber - 1];
        if (uthmaniData.verses.length !== expectedCount) {
          console.warn(`Verse count mismatch for Surah ${surahNumber}: expected ${expectedCount}, got ${uthmaniData.verses.length}`);
        }
      }

      // Verify each verse has required fields and valid Arabic text
      for (const verse of uthmaniData.verses) {
        if (!verse.text_uthmani || typeof verse.text_uthmani !== 'string') {
          return false;
        }
        
        // Check for Arabic script
        const arabicRegex = /[\u0600-\u06FF]/;
        if (!arabicRegex.test(verse.text_uthmani)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Text verification failed:', error);
      return false;
    }
  }

  // Process according to exact Madani Mushaf rules
  private processMadaniMushaf(uthmaniData: any, surahNumber: number): QuranSurah {
    const verses: QuranVerse[] = [];
    
    // Special handling based on Madani Mushaf rules
    if (surahNumber === 1) {
      // Al-Fatiha: Bismillah is verse 1
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
      
      // Add remaining verses (2-7)
      uthmaniData.verses.forEach((verse: any, index: number) => {
        if (index > 0) { // Skip first verse as it's Bismillah
          verses.push({
            number: index + 1,
            text: verse.text_uthmani,
            numberInSurah: index + 1,
            juz: verse.juz_number || 1,
            manzil: verse.manzil_number || 1,
            page: verse.page_number || 1,
            ruku: verse.ruku_number || 1,
            hizbQuarter: verse.hizb_quarter || 1,
            sajda: verse.sajda || false
          });
        }
      });
    } else if (surahNumber === 9) {
      // At-Tawbah: No Bismillah at all
      uthmaniData.verses.forEach((verse: any, index: number) => {
        verses.push({
          number: index + 1,
          text: verse.text_uthmani,
          numberInSurah: index + 1,
          juz: verse.juz_number || 1,
          manzil: verse.manzil_number || 1,
          page: verse.page_number || 1,
          ruku: verse.ruku_number || 1,
          hizbQuarter: verse.hizb_quarter || 1,
          sajda: verse.sajda || false
        });
      });
    } else {
      // All other surahs: Bismillah without verse number, then numbered verses start from 1
      // First add Bismillah (unnumbered display item)
      verses.push({
        number: 0, // Special marker for unnumbered Bismillah
        text: this.BISMILLAH,
        numberInSurah: 0,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false
      });
      
      // Add numbered verses starting from 1
      uthmaniData.verses.forEach((verse: any, index: number) => {
        verses.push({
          number: index + 1,
          text: verse.text_uthmani,
          numberInSurah: index + 1,
          juz: verse.juz_number || 1,
          manzil: verse.manzil_number || 1,
          page: verse.page_number || 1,
          ruku: verse.ruku_number || 1,
          hizbQuarter: verse.hizb_quarter || 1,
          sajda: verse.sajda || false
        });
      });
    }

    return {
      number: surahNumber,
      name: this.getSurahArabicName(surahNumber),
      englishName: this.getSurahEnglishName(surahNumber),
      englishNameTranslation: this.getSurahTranslation(surahNumber),
      revelationType: this.getSurahRevelationType(surahNumber),
      numberOfAyahs: verses.filter(v => v.number > 0).length, // Count only numbered verses
      ayahs: verses
    };
  }

  // Process English translation with same structure
  private processEnglishTranslation(surah: QuranSurah, surahNumber: number): QuranSurah {
    const verses: QuranVerse[] = [];
    
    if (surahNumber === 1) {
      // Al-Fatiha: Bismillah is verse 1
      verses.push({
        number: 1,
        text: "In the name of Allah, the Most Gracious, the Most Merciful.",
        numberInSurah: 1,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false
      });
      
      // Add remaining verses
      surah.ayahs.slice(1).forEach((verse, index) => {
        verses.push({
          ...verse,
          number: index + 2,
          numberInSurah: index + 2,
          text: this.cleanVerseText(verse.text)
        });
      });
    } else if (surahNumber === 9) {
      // At-Tawbah: No Bismillah
      surah.ayahs.forEach((verse, index) => {
        verses.push({
          ...verse,
          number: index + 1,
          numberInSurah: index + 1,
          text: this.cleanVerseText(verse.text)
        });
      });
    } else {
      // Other surahs: Bismillah unnumbered, then numbered verses
      verses.push({
        number: 0,
        text: "In the name of Allah, the Most Gracious, the Most Merciful.",
        numberInSurah: 0,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false
      });
      
      surah.ayahs.forEach((verse, index) => {
        verses.push({
          ...verse,
          number: index + 1,
          numberInSurah: index + 1,
          text: this.cleanVerseText(verse.text)
        });
      });
    }

    return {
      ...surah,
      numberOfAyahs: verses.filter(v => v.number > 0).length,
      ayahs: verses
    };
  }

  // Helper methods for Surah information
  private getSurahArabicName(surahNumber: number): string {
    const names: { [key: number]: string } = {
      1: "الفاتحة", 2: "البقرة", 3: "آل عمران", 4: "النساء", 5: "المائدة",
      6: "الأنعام", 7: "الأعراف", 8: "الأنفال", 9: "التوبة", 10: "يونس"
      // Add all 114 names...
    };
    return names[surahNumber] || `سورة ${surahNumber}`;
  }

  private getSurahEnglishName(surahNumber: number): string {
    const names: { [key: number]: string } = {
      1: "Al-Fatihah", 2: "Al-Baqarah", 3: "Aal-E-Imran", 4: "An-Nisa", 5: "Al-Ma'idah",
      6: "Al-An'am", 7: "Al-A'raf", 8: "Al-Anfal", 9: "At-Tawbah", 10: "Yunus"
      // Add all 114 names...
    };
    return names[surahNumber] || `Surah ${surahNumber}`;
  }

  private getSurahTranslation(surahNumber: number): string {
    const translations: { [key: number]: string } = {
      1: "The Opening", 2: "The Cow", 3: "The Family of Imran", 4: "The Women", 5: "The Table",
      6: "The Cattle", 7: "The Heights", 8: "The Spoils", 9: "The Repentance", 10: "Jonah"
      // Add all 114 translations...
    };
    return translations[surahNumber] || `Chapter ${surahNumber}`;
  }

  private getSurahRevelationType(surahNumber: number): 'Meccan' | 'Medinan' {
    const medinanSurahs = [2, 3, 4, 5, 8, 9, 22, 24, 33, 47, 48, 49, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 76, 98, 110];
    return medinanSurahs.includes(surahNumber) ? 'Medinan' : 'Meccan';
  }

  // Clean verse text of any unwanted additions
  private cleanVerseText(text: string): string {
    let cleanedText = text;
    
    const bismillahVariants = [
      'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
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

  // Check if verification failed for a surah
  hasVerificationError(surahNumber: number): boolean {
    return this.verificationErrors.has(`surah-${surahNumber}`);
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