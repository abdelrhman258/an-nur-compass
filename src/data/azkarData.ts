// Complete Azkar data structure with comprehensive categories
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

// Comprehensive Azkar data with 15 categories
export const azkarData: AzkarCategory[] = [
  {
    id: 'morning',
    name: 'Morning Azkar',
    arabicName: 'أذكار الصباح',
    description: 'Remembrances and supplications for the morning',
    dhikrs: [
      {
        id: 101,
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
        transliteration: 'Asbahna wa asbahal-mulku lillahi, walhamdu lillahi, la ilaha illa Allahu wahdahu la sharika lah',
        translation: 'We have reached the morning and with it all dominion belongs to Allah. Praise is to Allah. There is no god but Allah alone, without partner.',
        repetitions: 1,
        source: 'Muslim'
      },
      {
        id: 102,
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
        transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu wa ilaykan-nushur',
        translation: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.',
        repetitions: 1,
        source: 'Tirmidhi'
      }
    ]
  },
  {
    id: 'evening',
    name: 'Evening Azkar',
    arabicName: 'أذكار المساء',
    description: 'Remembrances and supplications for the evening',
    dhikrs: [
      {
        id: 201,
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
        transliteration: 'Amsayna wa amsal-mulku lillahi, walhamdu lillahi, la ilaha illa Allahu wahdahu la sharika lah',
        translation: 'We have reached the evening and with it all dominion belongs to Allah. Praise is to Allah. There is no god but Allah alone, without partner.',
        repetitions: 1,
        source: 'Muslim'
      },
      {
        id: 202,
        arabic: 'اللَّهُمَّ أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ',
        transliteration: 'Allahumma a\'udhu bika min sharri ma khalaqt',
        translation: 'O Allah, I seek refuge in You from the evil of what You have created.',
        repetitions: 3,
        source: 'Muslim'
      }
    ]
  },
  {
    id: 'afterPrayer',
    name: 'After Prayer Azkar',
    arabicName: 'أذكار بعد الصلاة',
    description: 'Remembrances after completing the five daily prayers',
    dhikrs: [
      {
        id: 301,
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah is the Greatest.',
        repetitions: 34,
        source: 'Bukhari & Muslim'
      },
      {
        id: 302,
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Alhamdulillah',
        translation: 'All praise is to Allah.',
        repetitions: 33,
        source: 'Bukhari & Muslim'
      },
      {
        id: 303,
        arabic: 'سُبْحَانَ اللَّهِ',
        transliteration: 'Subhan Allah',
        translation: 'Glory be to Allah.',
        repetitions: 33,
        source: 'Bukhari & Muslim'
      }
    ]
  },
  {
    id: 'beforeSleep',
    name: 'Before Sleep Azkar',
    arabicName: 'أذكار النوم',
    description: 'Supplications before going to sleep',
    dhikrs: [
      {
        id: 401,
        arabic: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ',
        transliteration: 'Allahumma aslamtu nafsi ilayk, wa fawwadtu amri ilayk',
        translation: 'O Allah, I submit my soul unto You, and I entrust my affair unto You.',
        repetitions: 1,
        source: 'Bukhari & Muslim'
      },
      {
        id: 402,
        arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
        transliteration: 'Bismika Allahumma amutu wa ahya',
        translation: 'In Your name, O Allah, I die and I live.',
        repetitions: 1,
        source: 'Bukhari'
      }
    ]
  },
  {
    id: 'duasSunnah',
    name: 'Duas from Sunnah',
    arabicName: 'أدعية من السنة',
    description: 'Authentic supplications from Prophet Muhammad (peace be upon him)',
    dhikrs: [
      {
        id: 501,
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbana atina fi\'d-dunya hasanatan wa fi\'l-akhirati hasanatan wa qina \'adhab an-nar',
        translation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
        repetitions: 1,
        source: 'Quran 2:201'
      }
    ]
  },
  {
    id: 'istighfar',
    name: 'Istighfar (Seeking Forgiveness)',
    arabicName: 'الاستغفار',
    description: 'Duas for seeking Allah\'s forgiveness',
    dhikrs: [
      {
        id: 601,
        arabic: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
        transliteration: 'Astaghfirullaha lladhi la ilaha illa huwa al-hayyu al-qayyumu wa atubu ilayh',
        translation: 'I seek forgiveness from Allah, there is no god but Him, the Ever-Living, the Self-Sustaining, and I repent to Him.',
        repetitions: 3,
        source: 'Abu Dawud'
      },
      {
        id: 602,
        arabic: 'رَبِّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
        transliteration: 'Rabbi ghfir li dhanbi wa khata\'i wa jahli',
        translation: 'O my Lord, forgive my sins, my mistakes, and my ignorance.',
        repetitions: 3,
        source: 'Bukhari'
      }
    ]
  },
  {
    id: 'tahajjud',
    name: 'Tahajjud (Night Prayer)',
    arabicName: 'تهجد',
    description: 'Duas for night prayer and late night worship',
    dhikrs: [
      {
        id: 701,
        arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ',
        transliteration: 'Allahumma laka al-hamdu anta qayyim as-samawati wa al-ardi wa man fihinn',
        translation: 'O Allah, to You belongs all praise. You are the Sustainer of the heavens and the earth and all that is in them.',
        repetitions: 1,
        source: 'Bukhari & Muslim'
      }
    ]
  },
  {
    id: 'travel',
    name: 'Travel Duas',
    arabicName: 'أدعية السفر',
    description: 'Supplications for traveling and journeys',
    dhikrs: [
      {
        id: 801,
        arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
        transliteration: 'Subhana alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina la-munqalibun',
        translation: 'Glory be to Him who has subjected this to us, and we could never have it (by our efforts). And verily, to our Lord we indeed are to return!',
        repetitions: 3,
        source: 'Quran 43:13-14'
      }
    ]
  },
  {
    id: 'rain',
    name: 'Rain & Weather Duas',
    arabicName: 'أدعية المطر والطقس',
    description: 'Supplications during rain and different weather',
    dhikrs: [
      {
        id: 901,
        arabic: 'اللَّهُمَّ صَيِّباً نَافِعاً',
        transliteration: 'Allahumma sayyiban nafi\'an',
        translation: 'O Allah, (bring) beneficial rain.',
        repetitions: 1,
        source: 'Bukhari'
      }
    ]
  },
  {
    id: 'illness',
    name: 'Illness & Healing',
    arabicName: 'أدعية المرض والشفاء',
    description: 'Duas for sickness and seeking healing',
    dhikrs: [
      {
        id: 1001,
        arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ وَاشْفِ أَنْتَ الشَّافِي',
        transliteration: 'Allahumma rabb an-nas, adhhib al-bas washfi anta ash-shafi',
        translation: 'O Allah, Lord of mankind, remove the hardship and heal, You are the Healer.',
        repetitions: 3,
        source: 'Bukhari & Muslim'
      }
    ]
  },
  {
    id: 'anxiety',
    name: 'Anxiety & Stress Relief',
    arabicName: 'أدعية القلق والضيق',
    description: 'Duas for anxiety, stress, and emotional relief',
    dhikrs: [
      {
        id: 1101,
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ',
        transliteration: 'Allahumma inni a\'udhu bika min al-hammi wa al-hazan wa al-\'ajz wa al-kasal',
        translation: 'O Allah, I seek refuge in You from worry, grief, incapacity, and laziness.',
        repetitions: 3,
        source: 'Bukhari'
      }
    ]
  },
  {
    id: 'gratitude',
    name: 'Gratitude & Praise',
    arabicName: 'الشكر والحمد',
    description: 'Expressions of gratitude and praise to Allah',
    dhikrs: [
      {
        id: 1201,
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        transliteration: 'Allahumma a\'inni \'ala dhikrika wa shukrika wa husn \'ibadatik',
        translation: 'O Allah, help me to remember You, thank You, and worship You in the best manner.',
        repetitions: 1,
        source: 'Abu Dawud & Nasa\'i'
      }
    ]
  },
  {
    id: 'protection',
    name: 'Protection & Safety',
    arabicName: 'الحماية والأمان',
    description: 'Duas for protection from evil and harm',
    dhikrs: [
      {
        id: 1301,
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: 'A\'udhu bi kalimat Allah at-tammat min sharri ma khalaq',
        translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
        repetitions: 3,
        source: 'Muslim'
      }
    ]
  },
  {
    id: 'knowledge',
    name: 'Seeking Knowledge',
    arabicName: 'طلب العلم',
    description: 'Duas for seeking beneficial knowledge and wisdom',
    dhikrs: [
      {
        id: 1401,
        arabic: 'رَبِّ زِدْنِي عِلْماً',
        transliteration: 'Rabbi zidni \'ilman',
        translation: 'My Lord, increase me in knowledge.',
        repetitions: 10,
        source: 'Quran 20:114'
      }
    ]
  },
  {
    id: 'witr',
    name: 'Witr Prayer Duas',
    arabicName: 'أدعية صلاة الوتر',
    description: 'Special supplications for Witr prayer',
    dhikrs: [
      {
        id: 1501,
        arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ وَعَافِنِي فِيمَنْ عَافَيْتَ',
        transliteration: 'Allahumma hdini fiman hadayt wa \'afini fiman \'afayt',
        translation: 'O Allah, guide me among those You have guided, and grant me safety among those You have granted safety.',
        repetitions: 1,
        source: 'Abu Dawud, Tirmidhi & Nasa\'i'
      }
    ]
  }
];

// Helper function to get a specific Azkar category
export const getAzkarCategory = (categoryId: string): AzkarCategory | undefined => {
  return azkarData.find(category => category.id === categoryId);
};

// Helper function to get all Azkar categories for navigation
export const getAzkarCategories = () => {
  return azkarData.map(category => ({
    id: category.id,
    name: category.name,
    arabicName: category.arabicName,
    description: category.description,
    dhikrCount: category.dhikrs.length
  }));
};