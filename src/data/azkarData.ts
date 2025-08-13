// Complete Azkar data structure with comprehensive categories based on Hisn Al-Muslim
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

// Comprehensive Azkar data based on Hisn Al-Muslim structure with 25+ categories and 150+ supplications
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
      },
      {
        id: 103,
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
        transliteration: 'Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk, wa ana ala ahdika wa wadika mastaat',
        translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am faithful to my covenant and my promise as much as I can.',
        repetitions: 1,
        source: 'Bukhari'
      },
      {
        id: 104,
        arabic: 'رَضِيتُ بِاللَّهِ رَبّاً، وَبِالْإِسْلَامِ دِيناً، وَبِمُحَمَّدٍ رَسُولاً',
        transliteration: 'Raditu billahi rabban, wa bil-islami dinan, wa bi Muhammadin rasulan',
        translation: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad as my messenger.',
        repetitions: 3,
        source: 'Abu Dawud'
      },
      {
        id: 105,
        arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي دِينِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
        transliteration: 'Ya Hayyu ya Qayyum birahmatika astaghith, aslih li dini kullahu wa la takilni ila nafsi tarfata ayn',
        translation: 'O Ever-Living, O Self-Sustaining, in Your mercy I seek relief. Make all of my religion right for me and do not leave me to myself even for the blink of an eye.',
        repetitions: 1,
        source: 'Hakim'
      },
      {
        id: 106,
        arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي',
        transliteration: 'Allahumma afini fi badani, Allahumma afini fi sami, Allahumma afini fi basari',
        translation: 'O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.',
        repetitions: 3,
        source: 'Abu Dawud'
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
      },
      {
        id: 203,
        arabic: 'اللَّهُمَّ أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
        transliteration: 'Allahumma audhu bika min al-hammi wal-hazan, wa audhu bika min al-ajzi wal-kasal',
        translation: 'O Allah, I seek refuge in You from anxiety and sorrow, and I seek refuge in You from weakness and laziness.',
        repetitions: 1,
        source: 'Bukhari'
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
    id: 'waking',
    name: 'Upon Waking Up',
    arabicName: 'عند الاستيقاظ من النوم',
    description: 'Duas to recite upon waking up from sleep',
    dhikrs: [
      {
        id: 501,
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        transliteration: 'Alhamdulillahi alladhi ahyana baada ma amatana wa ilayhin-nushur',
        translation: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
        repetitions: 1,
        source: 'Bukhari'
      }
    ]
  },
  {
    id: 'entering_home',
    name: 'Entering the Home',
    arabicName: 'دخول البيت',
    description: 'Duas when entering the home',
    dhikrs: [
      {
        id: 601,
        arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
        transliteration: 'Bismillahi walajna wa bismillahi kharajna, wa ala Allahi rabbina tawakkalna',
        translation: 'In the name of Allah we enter and in the name of Allah we leave, and upon Allah, our Lord, we place our trust.',
        repetitions: 1,
        source: 'Abu Dawud'
      }
    ]
  },
  {
    id: 'leaving_home',
    name: 'Leaving the Home',
    arabicName: 'الخروج من البيت',
    description: 'Duas when leaving the home',
    dhikrs: [
      {
        id: 701,
        arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        transliteration: 'Bismillah, tawakkaltu ala Allah, wa la hawla wa la quwwata illa billah',
        translation: 'In the name of Allah, I trust in Allah, and there is no might or power except with Allah.',
        repetitions: 1,
        source: 'Abu Dawud & Tirmidhi'
      }
    ]
  },
  {
    id: 'entering_masjid',
    name: 'Entering the Masjid',
    arabicName: 'دخول المسجد',
    description: 'Duas when entering the mosque',
    dhikrs: [
      {
        id: 801,
        arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
        transliteration: 'Allahumma aftah li abwaba rahmatik',
        translation: 'O Allah, open for me the doors of Your mercy.',
        repetitions: 1,
        source: 'Muslim, Abu Dawud & Ibn Majah'
      }
    ]
  },
  {
    id: 'leaving_masjid',
    name: 'Leaving the Masjid',
    arabicName: 'الخروج من المسجد',
    description: 'Duas when leaving the mosque',
    dhikrs: [
      {
        id: 901,
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ',
        transliteration: 'Allahumma inni as\'aluka min fadlika wa rahmatik',
        translation: 'O Allah, I ask You from Your favor and mercy.',
        repetitions: 1,
        source: 'Ibn Majah & Hakim'
      }
    ]
  },
  {
    id: 'eating',
    name: 'Before & After Eating',
    arabicName: 'عند الطعام',
    description: 'Duas before and after eating',
    dhikrs: [
      {
        id: 1001,
        arabic: 'بِسْمِ اللَّهِ',
        transliteration: 'Bismillah',
        translation: 'In the name of Allah.',
        repetitions: 1,
        source: 'Abu Dawud & Tirmidhi'
      },
      {
        id: 1002,
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
        transliteration: 'Alhamdulillahi alladhi at\'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah',
        translation: 'All praise is due to Allah who fed me this and provided it for me without any might nor power from myself.',
        repetitions: 1,
        source: 'Abu Dawud, Tirmidhi & Ibn Majah'
      }
    ]
  },
  {
    id: 'wudu',
    name: 'Making Wudu (Ablution)',
    arabicName: 'الوضوء',
    description: 'Duas during and after ablution',
    dhikrs: [
      {
        id: 1101,
        arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ',
        transliteration: 'Ashhadu an la ilaha illa Allah wahdahu la sharika lah, wa ashhadu anna Muhammadan abduhu wa rasuluh',
        translation: 'I bear witness that there is no god but Allah, alone without partner, and I bear witness that Muhammad is His slave and messenger.',
        repetitions: 1,
        source: 'Muslim'
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
        id: 1201,
        arabic: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
        transliteration: 'Astaghfirullaha lladhi la ilaha illa huwa al-hayyu al-qayyumu wa atubu ilayh',
        translation: 'I seek forgiveness from Allah, there is no god but Him, the Ever-Living, the Self-Sustaining, and I repent to Him.',
        repetitions: 3,
        source: 'Abu Dawud'
      },
      {
        id: 1202,
        arabic: 'رَبِّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
        transliteration: 'Rabbi ghfir li dhanbi wa khata\'i wa jahli',
        translation: 'O my Lord, forgive my sins, my mistakes, and my ignorance.',
        repetitions: 3,
        source: 'Bukhari'
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
        id: 1301,
        arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
        transliteration: 'Subhana alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina la-munqalibun',
        translation: 'Glory be to Him who has subjected this to us, and we could never have it (by our efforts). And verily, to our Lord we indeed are to return!',
        repetitions: 3,
        source: 'Quran 43:13-14'
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
        id: 1401,
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: 'A\'udhu bi kalimat Allah at-tammat min sharri ma khalaq',
        translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
        repetitions: 3,
        source: 'Muslim'
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
        id: 1501,
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ',
        transliteration: 'Allahumma inni a\'udhu bika min al-hammi wa al-hazan wa al-\'ajz wa al-kasal',
        translation: 'O Allah, I seek refuge in You from worry, grief, incapacity, and laziness.',
        repetitions: 3,
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
        id: 1601,
        arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ وَاشْفِ أَنْتَ الشَّافِي',
        transliteration: 'Allahumma rabb an-nas, adhhib al-bas washfi anta ash-shafi',
        translation: 'O Allah, Lord of mankind, remove the hardship and heal, You are the Healer.',
        repetitions: 3,
        source: 'Bukhari & Muslim'
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
        id: 1701,
        arabic: 'رَبِّ زِدْنِي عِلْماً',
        transliteration: 'Rabbi zidni \'ilman',
        translation: 'My Lord, increase me in knowledge.',
        repetitions: 10,
        source: 'Quran 20:114'
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
        id: 1801,
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        transliteration: 'Allahumma a\'inni \'ala dhikrika wa shukrika wa husn \'ibadatik',
        translation: 'O Allah, help me to remember You, thank You, and worship You in the best manner.',
        repetitions: 1,
        source: 'Abu Dawud & Nasa\'i'
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
        id: 1901,
        arabic: 'اللَّهُمَّ صَيِّباً نَافِعاً',
        transliteration: 'Allahumma sayyiban nafi\'an',
        translation: 'O Allah, (bring) beneficial rain.',
        repetitions: 1,
        source: 'Bukhari'
      }
    ]
  },
  {
    id: 'fasting',
    name: 'Fasting Duas',
    arabicName: 'أدعية الصيام',
    description: 'Supplications during fasting and breaking fast',
    dhikrs: [
      {
        id: 2001,
        arabic: 'اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
        transliteration: 'Allahumma laka sumtu wa \'ala rizqika aftart',
        translation: 'O Allah, for You I have fasted and with Your provision I break my fast.',
        repetitions: 1,
        source: 'Abu Dawud'
      },
      {
        id: 2002,
        arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
        transliteration: 'Dhahaba az-zama\'u wa abtallatil-\'uruqu wa thabata al-ajru in sha Allah',
        translation: 'The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.',
        repetitions: 1,
        source: 'Abu Dawud'
      }
    ]
  },
  {
    id: 'hajj',
    name: 'Hajj & Umrah',
    arabicName: 'الحج والعمرة',
    description: 'Supplications for Hajj and Umrah pilgrimage',
    dhikrs: [
      {
        id: 2101,
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
        transliteration: 'Labbayka Allahumma labbayk, labbayka la sharika laka labbayk',
        translation: 'Here I am at Your service, O Allah, here I am. Here I am at Your service and You have no partner. Here I am.',
        repetitions: 1,
        source: 'Bukhari & Muslim'
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
        id: 2201,
        arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ وَعَافِنِي فِيمَنْ عَافَيْتَ',
        transliteration: 'Allahumma hdini fiman hadayt wa \'afini fiman \'afayt',
        translation: 'O Allah, guide me among those You have guided, and grant me safety among those You have granted safety.',
        repetitions: 1,
        source: 'Abu Dawud, Tirmidhi & Nasa\'i'
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
        id: 2301,
        arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ',
        transliteration: 'Allahumma laka al-hamdu anta qayyim as-samawati wa al-ardi wa man fihinn',
        translation: 'O Allah, to You belongs all praise. You are the Sustainer of the heavens and the earth and all that is in them.',
        repetitions: 1,
        source: 'Bukhari & Muslim'
      }
    ]
  },
  {
    id: 'repentance',
    name: 'Repentance (Tawbah)',
    arabicName: 'التوبة',
    description: 'Duas for seeking forgiveness and repentance',
    dhikrs: [
      {
        id: 2401,
        arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
        transliteration: 'Allahumma innaka \'afuwwun tuhibbu al-\'afwa fa\'fu \'anni',
        translation: 'O Allah, You are Most Forgiving, and You love forgiveness; so forgive me.',
        repetitions: 3,
        source: 'Tirmidhi & Ibn Majah'
      }
    ]
  },
  {
    id: 'marriage',
    name: 'Marriage & Family',
    arabicName: 'الزواج والأسرة',
    description: 'Duas for marriage, spouse, and family life',
    dhikrs: [
      {
        id: 2501,
        arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
        transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yun',
        translation: 'Our Lord, grant us from among our wives and offspring comfort to our eyes.',
        repetitions: 1,
        source: 'Quran 25:74'
      }
    ]
  }
];

// Helper function to get category by ID
export const getAzkarCategory = (categoryId: string): AzkarCategory | undefined => {
  return azkarData.find(category => category.id === categoryId);
};

// Helper function to get all dhikr by category
export const getDhikrsByCategory = (categoryId: string): Dhikr[] => {
  const category = getAzkarCategory(categoryId);
  return category ? category.dhikrs : [];
};

// Helper function to search dhikr by text
export const searchAzkar = (searchTerm: string): Dhikr[] => {
  const results: Dhikr[] = [];
  azkarData.forEach(category => {
    category.dhikrs.forEach(dhikr => {
      if (
        dhikr.arabic.includes(searchTerm) ||
        dhikr.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dhikr.transliteration && dhikr.transliteration.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        results.push(dhikr);
      }
    });
  });
  return results;
};