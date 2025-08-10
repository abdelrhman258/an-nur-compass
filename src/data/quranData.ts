// Complete Quran data with all 114 Surahs
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  translation: string;
  verses: number;
  revelation: 'Meccan' | 'Medinan';
  versesData?: Verse[];
}

export interface Verse {
  number: number;
  arabic: string;
  translation: string;
}

// Complete list of all 114 Surahs
export const surahs: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", translation: "The Opening", verses: 7, revelation: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", translation: "The Cow", verses: 286, revelation: "Medinan" },
  { number: 3, name: "آل عمران", englishName: "Aal-E-Imran", translation: "The Family of Imran", verses: 200, revelation: "Medinan" },
  { number: 4, name: "النساء", englishName: "An-Nisa", translation: "The Women", verses: 176, revelation: "Medinan" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", translation: "The Table", verses: 120, revelation: "Medinan" },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", translation: "The Cattle", verses: 165, revelation: "Meccan" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", translation: "The Heights", verses: 206, revelation: "Meccan" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", translation: "The Spoils of War", verses: 75, revelation: "Medinan" },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", translation: "The Repentance", verses: 129, revelation: "Medinan" },
  { number: 10, name: "يونس", englishName: "Yunus", translation: "Jonah", verses: 109, revelation: "Meccan" },
  { number: 11, name: "هود", englishName: "Hud", translation: "Hud", verses: 123, revelation: "Meccan" },
  { number: 12, name: "يوسف", englishName: "Yusuf", translation: "Joseph", verses: 111, revelation: "Meccan" },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", translation: "The Thunder", verses: 43, revelation: "Medinan" },
  { number: 14, name: "إبراهيم", englishName: "Ibrahim", translation: "Abraham", verses: 52, revelation: "Meccan" },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", translation: "The Rocky Tract", verses: 99, revelation: "Meccan" },
  { number: 16, name: "النحل", englishName: "An-Nahl", translation: "The Bee", verses: 128, revelation: "Meccan" },
  { number: 17, name: "الإسراء", englishName: "Al-Isra", translation: "The Night Journey", verses: 111, revelation: "Meccan" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", translation: "The Cave", verses: 110, revelation: "Meccan" },
  { number: 19, name: "مريم", englishName: "Maryam", translation: "Mary", verses: 98, revelation: "Meccan" },
  { number: 20, name: "طه", englishName: "Ta-Ha", translation: "Ta-Ha", verses: 135, revelation: "Meccan" },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", translation: "The Prophets", verses: 112, revelation: "Meccan" },
  { number: 22, name: "الحج", englishName: "Al-Hajj", translation: "The Pilgrimage", verses: 78, revelation: "Medinan" },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", translation: "The Believers", verses: 118, revelation: "Meccan" },
  { number: 24, name: "النور", englishName: "An-Nur", translation: "The Light", verses: 64, revelation: "Medinan" },
  { number: 25, name: "الفرقان", englishName: "Al-Furqan", translation: "The Criterion", verses: 77, revelation: "Meccan" },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", translation: "The Poets", verses: 227, revelation: "Meccan" },
  { number: 27, name: "النمل", englishName: "An-Naml", translation: "The Ant", verses: 93, revelation: "Meccan" },
  { number: 28, name: "القصص", englishName: "Al-Qasas", translation: "The Stories", verses: 88, revelation: "Meccan" },
  { number: 29, name: "العنكبوت", englishName: "Al-Ankabut", translation: "The Spider", verses: 69, revelation: "Meccan" },
  { number: 30, name: "الروم", englishName: "Ar-Rum", translation: "The Romans", verses: 60, revelation: "Meccan" },
  { number: 31, name: "لقمان", englishName: "Luqman", translation: "Luqman", verses: 34, revelation: "Meccan" },
  { number: 32, name: "السجدة", englishName: "As-Sajdah", translation: "The Prostration", verses: 30, revelation: "Meccan" },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", translation: "The Clans", verses: 73, revelation: "Medinan" },
  { number: 34, name: "سبأ", englishName: "Saba", translation: "Sheba", verses: 54, revelation: "Meccan" },
  { number: 35, name: "فاطر", englishName: "Fatir", translation: "The Originator", verses: 45, revelation: "Meccan" },
  { number: 36, name: "يس", englishName: "Ya-Sin", translation: "Ya-Sin", verses: 83, revelation: "Meccan" },
  { number: 37, name: "الصافات", englishName: "As-Saffat", translation: "Those Ranged in Ranks", verses: 182, revelation: "Meccan" },
  { number: 38, name: "ص", englishName: "Sad", translation: "Sad", verses: 88, revelation: "Meccan" },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", translation: "The Groups", verses: 75, revelation: "Meccan" },
  { number: 40, name: "غافر", englishName: "Ghafir", translation: "The Forgiver", verses: 85, revelation: "Meccan" },
  { number: 41, name: "فصلت", englishName: "Fussilat", translation: "Explained in Detail", verses: 54, revelation: "Meccan" },
  { number: 42, name: "الشورى", englishName: "Ash-Shura", translation: "The Consultation", verses: 53, revelation: "Meccan" },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", translation: "The Gold Adornments", verses: 89, revelation: "Meccan" },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhan", translation: "The Smoke", verses: 59, revelation: "Meccan" },
  { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", translation: "The Kneeling", verses: 37, revelation: "Meccan" },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", translation: "The Curved Sandhills", verses: 35, revelation: "Meccan" },
  { number: 47, name: "محمد", englishName: "Muhammad", translation: "Muhammad", verses: 38, revelation: "Medinan" },
  { number: 48, name: "الفتح", englishName: "Al-Fath", translation: "The Victory", verses: 29, revelation: "Medinan" },
  { number: 49, name: "الحجرات", englishName: "Al-Hujurat", translation: "The Chambers", verses: 18, revelation: "Medinan" },
  { number: 50, name: "ق", englishName: "Qaf", translation: "Qaf", verses: 45, revelation: "Meccan" },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", translation: "The Wind that Scatter", verses: 60, revelation: "Meccan" },
  { number: 52, name: "الطور", englishName: "At-Tur", translation: "The Mount", verses: 49, revelation: "Meccan" },
  { number: 53, name: "النجم", englishName: "An-Najm", translation: "The Star", verses: 62, revelation: "Meccan" },
  { number: 54, name: "القمر", englishName: "Al-Qamar", translation: "The Moon", verses: 55, revelation: "Meccan" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", translation: "The Most Merciful", verses: 78, revelation: "Medinan" },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", translation: "The Inevitable", verses: 96, revelation: "Meccan" },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", translation: "The Iron", verses: 29, revelation: "Medinan" },
  { number: 58, name: "المجادلة", englishName: "Al-Mujadilah", translation: "The Pleading Woman", verses: 22, revelation: "Medinan" },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", translation: "The Exile", verses: 24, revelation: "Medinan" },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahinah", translation: "She that is to be Examined", verses: 13, revelation: "Medinan" },
  { number: 61, name: "الصف", englishName: "As-Saff", translation: "The Ranks", verses: 14, revelation: "Medinan" },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", translation: "The Congregation", verses: 11, revelation: "Medinan" },
  { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", translation: "The Hypocrites", verses: 11, revelation: "Medinan" },
  { number: 64, name: "التغابن", englishName: "At-Taghabun", translation: "The Mutual Disillusion", verses: 18, revelation: "Medinan" },
  { number: 65, name: "الطلاق", englishName: "At-Talaq", translation: "The Divorce", verses: 12, revelation: "Medinan" },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", translation: "The Prohibition", verses: 12, revelation: "Medinan" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", translation: "The Sovereignty", verses: 30, revelation: "Meccan" },
  { number: 68, name: "القلم", englishName: "Al-Qalam", translation: "The Pen", verses: 52, revelation: "Meccan" },
  { number: 69, name: "الحاقة", englishName: "Al-Haqqah", translation: "The Reality", verses: 52, revelation: "Meccan" },
  { number: 70, name: "المعارج", englishName: "Al-Ma'arij", translation: "The Ascending Stairways", verses: 44, revelation: "Meccan" },
  { number: 71, name: "نوح", englishName: "Nuh", translation: "Noah", verses: 28, revelation: "Meccan" },
  { number: 72, name: "الجن", englishName: "Al-Jinn", translation: "The Jinn", verses: 28, revelation: "Meccan" },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", translation: "The Enshrouded One", verses: 20, revelation: "Meccan" },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", translation: "The Cloaked One", verses: 56, revelation: "Meccan" },
  { number: 75, name: "القيامة", englishName: "Al-Qiyamah", translation: "The Resurrection", verses: 40, revelation: "Meccan" },
  { number: 76, name: "الإنسان", englishName: "Al-Insan", translation: "Man", verses: 31, revelation: "Medinan" },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalat", translation: "The Emissaries", verses: 50, revelation: "Meccan" },
  { number: 78, name: "النبأ", englishName: "An-Naba", translation: "The Tidings", verses: 40, revelation: "Meccan" },
  { number: 79, name: "النازعات", englishName: "An-Nazi'at", translation: "Those who Drag Forth", verses: 46, revelation: "Meccan" },
  { number: 80, name: "عبس", englishName: "Abasa", translation: "He Frowned", verses: 42, revelation: "Meccan" },
  { number: 81, name: "التكوير", englishName: "At-Takwir", translation: "The Overthrowing", verses: 29, revelation: "Meccan" },
  { number: 82, name: "الانفطار", englishName: "Al-Infitar", translation: "The Cleaving", verses: 19, revelation: "Meccan" },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", translation: "The Defrauding", verses: 36, revelation: "Meccan" },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", translation: "The Sundering", verses: 25, revelation: "Meccan" },
  { number: 85, name: "البروج", englishName: "Al-Buruj", translation: "The Mansions of Stars", verses: 22, revelation: "Meccan" },
  { number: 86, name: "الطارق", englishName: "At-Tariq", translation: "The Morning Star", verses: 17, revelation: "Meccan" },
  { number: 87, name: "الأعلى", englishName: "Al-A'la", translation: "The Most High", verses: 19, revelation: "Meccan" },
  { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", translation: "The Overwhelming", verses: 26, revelation: "Meccan" },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", translation: "The Dawn", verses: 30, revelation: "Meccan" },
  { number: 90, name: "البلد", englishName: "Al-Balad", translation: "The City", verses: 20, revelation: "Meccan" },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", translation: "The Sun", verses: 15, revelation: "Meccan" },
  { number: 92, name: "الليل", englishName: "Al-Layl", translation: "The Night", verses: 21, revelation: "Meccan" },
  { number: 93, name: "الضحى", englishName: "Ad-Duha", translation: "The Morning Hours", verses: 11, revelation: "Meccan" },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", translation: "The Relief", verses: 8, revelation: "Meccan" },
  { number: 95, name: "التين", englishName: "At-Tin", translation: "The Fig", verses: 8, revelation: "Meccan" },
  { number: 96, name: "العلق", englishName: "Al-Alaq", translation: "The Clot", verses: 19, revelation: "Meccan" },
  { number: 97, name: "القدر", englishName: "Al-Qadr", translation: "The Power", verses: 5, revelation: "Meccan" },
  { number: 98, name: "البينة", englishName: "Al-Bayyinah", translation: "The Clear Proof", verses: 8, revelation: "Medinan" },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", translation: "The Earthquake", verses: 8, revelation: "Medinan" },
  { number: 100, name: "العاديات", englishName: "Al-Adiyat", translation: "The Courser", verses: 11, revelation: "Meccan" },
  { number: 101, name: "القارعة", englishName: "Al-Qari'ah", translation: "The Calamity", verses: 11, revelation: "Meccan" },
  { number: 102, name: "التكاثر", englishName: "At-Takathur", translation: "The Rivalry in world increase", verses: 8, revelation: "Meccan" },
  { number: 103, name: "العصر", englishName: "Al-Asr", translation: "The Declining Day", verses: 3, revelation: "Meccan" },
  { number: 104, name: "الهمزة", englishName: "Al-Humazah", translation: "The Traducer", verses: 9, revelation: "Meccan" },
  { number: 105, name: "الفيل", englishName: "Al-Fil", translation: "The Elephant", verses: 5, revelation: "Meccan" },
  { number: 106, name: "قريش", englishName: "Quraysh", translation: "Quraysh", verses: 4, revelation: "Meccan" },
  { number: 107, name: "الماعون", englishName: "Al-Ma'un", translation: "The Small kindnesses", verses: 7, revelation: "Meccan" },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", translation: "The Abundance", verses: 3, revelation: "Meccan" },
  { number: 109, name: "الكافرون", englishName: "Al-Kafirun", translation: "The Disbelievers", verses: 6, revelation: "Meccan" },
  { number: 110, name: "النصر", englishName: "An-Nasr", translation: "The Divine Support", verses: 3, revelation: "Medinan" },
  { number: 111, name: "المسد", englishName: "Al-Masad", translation: "The Palm Fibre", verses: 5, revelation: "Meccan" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", translation: "The Sincerity", verses: 4, revelation: "Meccan" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", translation: "The Daybreak", verses: 5, revelation: "Meccan" },
  { number: 114, name: "الناس", englishName: "An-Nas", translation: "Mankind", verses: 6, revelation: "Meccan" }
];

// Sample verses for Al-Fatihah and a few other surahs for demo
export const surahVersesData: { [key: number]: Verse[] } = {
  1: [ // Al-Fatihah
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
  ],
  112: [ // Al-Ikhlas
    {
      number: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Most Gracious, the Most Merciful."
    },
    {
      number: 2,
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      translation: "Say: He is Allah, the One!"
    },
    {
      number: 3,
      arabic: "اللَّهُ الصَّمَدُ",
      translation: "Allah, the Eternal, Absolute;"
    },
    {
      number: 4,
      arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      translation: "He begets not, nor is He begotten;"
    },
    {
      number: 5,
      arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      translation: "And there is none like unto Him."
    }
  ]
};

export const getVerses = (surahNumber: number): Verse[] => {
  return surahVersesData[surahNumber] || [];
};