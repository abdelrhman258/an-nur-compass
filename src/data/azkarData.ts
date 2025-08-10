// Comprehensive Azkar data with Arabic text, transliteration, and English translation

export interface Dhikr {
  id: number;
  arabic: string;
  transliteration?: string;
  translation: string;
  repetitions: number;
  source?: string;
}

export interface AzkarCategory {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  dhikrs: Dhikr[];
}

export const azkarData: AzkarCategory[] = [
  {
    id: 'morning',
    name: 'Morning Azkar',
    arabicName: 'أذكار الصباح',
    description: 'Remembrance and supplications for the morning',
    dhikrs: [
      {
        id: 1,
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Asbahna wa asbahal-mulku lillahi, walhamdu lillahi, la ilaha illa Allah wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
        translation: 'We have reached the morning and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.',
        repetitions: 1,
        source: 'Muslim'
      },
      {
        id: 2,
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
        transliteration: 'Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur',
        translation: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.',
        repetitions: 1,
        source: 'Tirmidhi'
      },
      {
        id: 3,
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
        transliteration: 'Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana \'abduka, wa ana \'ala \'ahdika wa wa\'dika mastata\'tu',
        translation: 'O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can.',
        repetitions: 1,
        source: 'Bukhari'
      },
      {
        id: 4,
        arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ رَسُولًا',
        transliteration: 'Raditu billahi rabban, wa bil-islami dinan, wa bi Muhammadin salla Allahu \'alayhi wa sallama rasulan',
        translation: 'I am pleased with Allah as a Lord, and Islam as a religion and Muhammad (peace be upon him) as a Messenger.',
        repetitions: 3,
        source: 'Abu Dawud'
      },
      {
        id: 5,
        arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
        transliteration: 'Subhan Allahi wa bihamdihi \'adada khalqihi, wa rida nafsihi, wa zinata \'arshihi, wa midada kalimatihi',
        translation: 'Glorified is Allah and praised is He, to the number of His creation and His pleasure, and to the weight of His throne, and to the ink of His words.',
        repetitions: 3,
        source: 'Muslim'
      }
    ]
  },
  {
    id: 'evening',
    name: 'Evening Azkar',
    arabicName: 'أذكار المساء',
    description: 'Remembrance and supplications for the evening',
    dhikrs: [
      {
        id: 1,
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Amsayna wa amsal-mulku lillahi, walhamdu lillahi, la ilaha illa Allah wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
        translation: 'We have reached the evening and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.',
        repetitions: 1,
        source: 'Muslim'
      },
      {
        id: 2,
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: 'A\'udhu bi kalimatil-lahit-tammati min sharri ma khalaqa',
        translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
        repetitions: 3,
        source: 'Muslim'
      },
      {
        id: 3,
        arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',
        transliteration: 'Allahumma \'afini fi badani, Allahumma \'afini fi sam\'i, Allahumma \'afini fi basari, la ilaha illa anta',
        translation: 'O Allah, grant my body health, O Allah, grant my hearing health, O Allah, grant my sight health. None has the right to be worshipped except You.',
        repetitions: 3,
        source: 'Abu Dawud'
      },
      {
        id: 4,
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        transliteration: 'Hasbiya Allahu la ilaha illa huwa \'alayhi tawakkaltu wa huwa rabbul-\'arshil-\'adheem',
        translation: 'Allah is sufficient for me, none has the right to be worshipped except Him, upon Him I rely and He is Lord of the exalted throne.',
        repetitions: 7,
        source: 'Abu Dawud'
      },
      {
        id: 5,
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
        transliteration: 'Allahumma inni as\'alukal-\'afwa wal-\'afiyata fid-dunya wal-akhirah',
        translation: 'O Allah, I ask You for forgiveness and well-being in this world and the next.',
        repetitions: 1,
        source: 'Tirmidhi'
      }
    ]
  },
  {
    id: 'afterPrayer',
    name: 'After Prayer Azkar',
    arabicName: 'أذكار بعد الصلاة',
    description: 'Supplications to recite after completing prayers',
    dhikrs: [
      {
        id: 1,
        arabic: 'سُبْحَانَ اللَّهِ',
        transliteration: 'Subhan Allah',
        translation: 'Glory is to Allah',
        repetitions: 33,
        source: 'Bukhari & Muslim'
      },
      {
        id: 2,
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Alhamdu lillah',
        translation: 'All praise is due to Allah',
        repetitions: 33,
        source: 'Bukhari & Muslim'
      },
      {
        id: 3,
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah is the Greatest',
        repetitions: 34,
        source: 'Bukhari & Muslim'
      },
      {
        id: 4,
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'La ilaha illa Allah wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
        translation: 'None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.',
        repetitions: 1,
        source: 'Muslim'
      },
      {
        id: 5,
        arabic: 'آيَةُ الْكُرْسِيِّ',
        transliteration: 'Ayat al-Kursi',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...',
        repetitions: 1,
        source: 'Nasai'
      }
    ]
  },
  {
    id: 'beforeSleep',
    name: 'Before Sleep Azkar',
    arabicName: 'أذكار النوم',
    description: 'Supplications to recite before going to sleep',
    dhikrs: [
      {
        id: 1,
        arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
        transliteration: 'Allahumma bismika amutu wa ahya',
        translation: 'O Allah, in Your name I live and die.',
        repetitions: 1,
        source: 'Bukhari'
      },
      {
        id: 2,
        arabic: 'سُبْحَانَ اللَّهِ',
        transliteration: 'Subhan Allah',
        translation: 'Glory is to Allah',
        repetitions: 33,
        source: 'Bukhari & Muslim'
      },
      {
        id: 3,
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Alhamdu lillah',
        translation: 'All praise is due to Allah',
        repetitions: 33,
        source: 'Bukhari & Muslim'
      },
      {
        id: 4,
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah is the Greatest',
        repetitions: 34,
        source: 'Bukhari & Muslim'
      },
      {
        id: 5,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        transliteration: 'Qul huwa Allahu ahad, Allah as-samad, lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad',
        translation: 'Say: He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.',
        repetitions: 3,
        source: 'Bukhari'
      }
    ]
  },
  {
    id: 'sunnah',
    name: 'Duas from Sunnah',
    arabicName: 'أدعية من السنة',
    description: 'Supplications from the teachings of Prophet Muhammad (PBUH)',
    dhikrs: [
      {
        id: 1,
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbana atina fi\'d-dunya hasanatan wa fi\'l-akhirati hasanatan wa qina \'adhab an-nar',
        translation: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
        repetitions: 1,
        source: 'Quran 2:201'
      },
      {
        id: 2,
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        transliteration: 'Allahumma a\'inni \'ala dhikrika wa shukrika wa husni \'ibadatika',
        translation: 'O Allah, help me remember You, to be grateful to You, and to worship You in an excellent manner.',
        repetitions: 1,
        source: 'Abu Dawud'
      },
      {
        id: 3,
        arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
        transliteration: 'Rabbi ishrah li sadri wa yassir li amri',
        translation: 'My Lord, expand for me my breast and ease for me my task.',
        repetitions: 1,
        source: 'Quran 20:25-26'
      },
      {
        id: 4,
        arabic: 'اللَّهُمَّ إِنَّكَ عُفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
        transliteration: 'Allahumma innaka \'afuwwun tuhibbul-\'afwa fa\'fu \'anni',
        translation: 'O Allah, indeed You are Pardoning and you love to pardon, so pardon me.',
        repetitions: 1,
        source: 'Tirmidhi'
      },
      {
        id: 5,
        arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ',
        transliteration: 'Allahumma ihdini fiman hadayta, wa \'afini fiman \'afayta, wa tawallani fiman tawallayta',
        translation: 'O Allah, guide me among those You have guided, grant me security among those You have granted security, and take me into Your care among those You have taken into Your care.',
        repetitions: 1,
        source: 'Abu Dawud'
      }
    ]
  }
];

// Helper function to get a specific category
export const getAzkarCategory = (categoryId: string): AzkarCategory | undefined => {
  return azkarData.find(category => category.id === categoryId);
};

// Helper function to get all category names
export const getAzkarCategories = () => {
  return azkarData.map(category => ({
    id: category.id,
    name: category.name,
    arabicName: category.arabicName,
    description: category.description,
    dhikrCount: category.dhikrs.length
  }));
};