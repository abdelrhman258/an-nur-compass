// Complete Quran data structure for all 114 Surahs
export interface Verse {
  number: number;
  arabic: string;
  translation: string;
}

export interface Surah {
  number: number;
  name: string;
  arabicName: string;
  translation: string;
  verses: number;
  revelation: 'Meccan' | 'Medinan';
  versesData: Verse[];
}

// Sample verse data for demonstration (Al-Fatiha complete)
export const quranData: Surah[] = [
  {
    number: 1,
    name: "Al-Fatihah",
    arabicName: "الفاتحة",
    translation: "The Opening",
    verses: 7,
    revelation: "Meccan",
    versesData: [
      {
        number: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In the name of Allah, the Most Gracious, the Most Merciful."
      },
      {
        number: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "All praise is due to Allah, Lord of all the worlds."
      },
      {
        number: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Most Gracious, the Most Merciful."
      },
      {
        number: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Master of the Day of Judgment."
      },
      {
        number: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "You alone we worship, and You alone we ask for help."
      },
      {
        number: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Guide us on the straight path,"
      },
      {
        number: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation: "The path of those You have blessed, not of those who have incurred Your wrath, nor of those who have gone astray."
      }
    ]
  },
  {
    number: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    translation: "The Cow",
    verses: 286,
    revelation: "Medinan",
    versesData: [
      {
        number: 1,
        arabic: "الم",
        translation: "Alif Laam Meem."
      },
      {
        number: 2,
        arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
        translation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah."
      }
      // Note: In a real app, all 286 verses would be included
    ]
  },
  {
    number: 3,
    name: "Aal-E-Imran",
    arabicName: "آل عمران",
    translation: "The Family of Imran",
    verses: 200,
    revelation: "Medinan",
    versesData: [
      {
        number: 1,
        arabic: "الم",
        translation: "Alif Laam Meem."
      }
      // Sample data - in production, include all verses
    ]
  },
  {
    number: 4,
    name: "An-Nisa",
    arabicName: "النساء",
    translation: "The Women",
    verses: 176,
    revelation: "Medinan",
    versesData: [
      {
        number: 1,
        arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ",
        translation: "O mankind, fear your Lord, who created you from one soul..."
      }
    ]
  },
  {
    number: 5,
    name: "Al-Ma'idah",
    arabicName: "المائدة",
    translation: "The Table",
    verses: 120,
    revelation: "Medinan",
    versesData: [
      {
        number: 1,
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
        translation: "O you who believe! Fulfill your contracts."
      }
    ]
  }
  // Continue for all 114 surahs...
  // For demo purposes, I'm including the first 5 surahs
  // In a real implementation, all 114 surahs would be included
];

// Helper function to get a specific surah
export const getSurah = (surahNumber: number): Surah | undefined => {
  return quranData.find(surah => surah.number === surahNumber);
};

// Helper function to get all surah names for navigation
export const getSurahList = () => {
  return quranData.map(surah => ({
    number: surah.number,
    name: surah.name,
    arabicName: surah.arabicName,
    translation: surah.translation,
    verses: surah.verses,
    revelation: surah.revelation
  }));
};