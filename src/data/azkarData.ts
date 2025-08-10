export interface AzkarItem {
  id: number;
  arabic: string;
  transliteration?: string;
  translation: string;
  count?: number;
  source?: string;
}

export interface AzkarCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  items: AzkarItem[];
}

export const azkarCategories: AzkarCategory[] = [
  {
    id: 'morning',
    nameEn: 'Morning Azkar',
    nameAr: 'أذكار الصباح',
    items: [
      {
        id: 1,
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Asbahnā wa asbaha-l-mulku lillāh, wa-l-hamdu lillāh, lā ilāha illā-llāhu wahdahu lā sharīka lah, lahu-l-mulku wa lahu-l-hamdu wa huwa ʿalā kulli shay'in qadīr",
        translation: "We have reached the morning and with it Allah's sovereignty. All praise is for Allah. There is no god but Allah alone, with no partner. To Him belongs the dominion, to Him belongs all praise, and He has power over everything.",
        count: 1
      },
      {
        id: 2,
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
        transliteration: "Allāhumma bika asbahnā wa bika amsaynā wa bika nahyā wa bika namūtu wa ilayka-n-nushūr",
        translation: "O Allah, by You we have reached the morning, by You we reach the evening, by You we live, by You we die, and to You is the resurrection.",
        count: 1
      },
      {
        id: 3,
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
        transliteration: "Allāhumma anta rabbī lā ilāha illā ant, khalaqtanī wa anā ʿabduk, wa anā ʿalā ʿahdika wa waʿdika mā-staṭaʿt",
        translation: "O Allah, You are my Lord. There is no god but You. You created me and I am Your servant, and I am keeping my covenant and promise to You as much as I can.",
        count: 1
      },
      {
        id: 4,
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ ۝ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
        transliteration: "Aʿūdhu billāhi min ash-shayṭān ar-rajīm. Allāhu lā ilāha illā huwa-l-hayyu-l-qayyūm. Lā ta'khudhuhū sinatun wa lā nawm",
        translation: "I seek refuge with Allah from Satan the accursed. Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
        count: 1
      },
      {
        id: 5,
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Bismillāhi-lladhī lā yaḍurru maʿa-smihi shay'un fī-l-arḍi wa lā fī-s-samā'i wa huwa-s-samīʿu-l-ʿalīm",
        translation: "In the name of Allah with whose name nothing is harmed on earth nor in the heavens, and He is the Hearing, the Knowing.",
        count: 3
      },
      {
        id: 6,
        arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ رَسُولًا",
        transliteration: "Raḍītu billāhi rabban, wa bil-islāmi dīnan, wa bi Muhammadin ṣallā-llāhu ʿalayhi wa sallam rasūlan",
        translation: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Messenger.",
        count: 3
      }
    ]
  },
  {
    id: 'evening',
    nameEn: 'Evening Azkar',
    nameAr: 'أذكار المساء',
    items: [
      {
        id: 1,
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Amsaynā wa amsā-l-mulku lillāh, wa-l-hamdu lillāh, lā ilāha illā-llāhu wahdahu lā sharīka lah, lahu-l-mulku wa lahu-l-hamdu wa huwa ʿalā kulli shay'in qadīr",
        translation: "We have reached the evening and with it Allah's sovereignty. All praise is for Allah. There is no god but Allah alone, with no partner. To Him belongs the dominion, to Him belongs all praise, and He has power over everything.",
        count: 1
      },
      {
        id: 2,
        arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
        transliteration: "Allāhumma bika amsaynā wa bika asbahnā wa bika nahyā wa bika namūtu wa ilayka-l-maṣīr",
        translation: "O Allah, by You we have reached the evening, by You we reach the morning, by You we live, by You we die, and to You is our return.",
        count: 1
      },
      {
        id: 3,
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allāhumma aʿinnī ʿalā dhikrika wa shukrika wa husni ʿibādatik",
        translation: "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
        count: 1
      },
      {
        id: 4,
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration: "Allāhumma ʿāfinī fī badanī, Allāhumma ʿāfinī fī samʿī, Allāhumma ʿāfinī fī baṣarī, lā ilāha illā ant",
        translation: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no god but You.",
        count: 3
      },
      {
        id: 5,
        arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        transliteration: "Subhāna-llāhi wa bihamdih",
        translation: "Glory is to Allah and praise is to Him.",
        count: 100
      }
    ]
  },
  {
    id: 'afterPrayer',
    nameEn: 'After Prayer Azkar',
    nameAr: 'أذكار ما بعد الصلاة',
    items: [
      {
        id: 1,
        arabic: "أَسْتَغْفِرُ اللَّهَ",
        transliteration: "Astaghfiru-llāh",
        translation: "I seek forgiveness from Allah.",
        count: 3
      },
      {
        id: 2,
        arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        transliteration: "Allāhumma anta-s-salāmu wa minka-s-salām, tabārakta yā dhā-l-jalāli wa-l-ikrām",
        translation: "O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honor.",
        count: 1
      },
      {
        id: 3,
        arabic: "سُبْحَانَ اللَّهِ",
        transliteration: "Subhāna-llāh",
        translation: "Glory is to Allah.",
        count: 33
      },
      {
        id: 4,
        arabic: "الْحَمْدُ لِلَّهِ",
        transliteration: "Al-hamdu lillāh",
        translation: "All praise is for Allah.",
        count: 33
      },
      {
        id: 5,
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allāhu akbar",
        translation: "Allah is the Greatest.",
        count: 34
      }
    ]
  },
  {
    id: 'beforeSleep',
    nameEn: 'Before Sleep Azkar',
    nameAr: 'أذكار النوم',
    items: [
      {
        id: 1,
        arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
        transliteration: "Bismika rabbī waḍaʿtu janbī wa bika arfaʿuh, fa-in amsakta nafsī fa-rhamhā, wa in arsaltahā fa-hfaẓhā bimā tahfaẓu bihi ʿibādaka-ṣ-ṣālihīn",
        translation: "In Your name, my Lord, I lie down on my side, and by You I raise it up. If You take my soul, then have mercy on it, and if You send it back, then protect it with that which You protect Your righteous servants.",
        count: 1
      },
      {
        id: 2,
        arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
        transliteration: "Allāhumma qinī ʿadhābaka yawma tabʿathu ʿibādak",
        translation: "O Allah, protect me from Your punishment on the day You resurrect Your servants.",
        count: 3
      },
      {
        id: 3,
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَكَفَانَا وَآوَانَا فَكَمْ مِمَّن لَّا كَافِيَ لَهُ وَلَا مُؤْوِيَ",
        transliteration: "Al-hamdu lillāhi-lladhī aṭʿamanā wa saqānā wa kafānā wa āwānā fa-kam mim-man lā kāfiya lahu wa lā mu'wī",
        translation: "All praise is for Allah, who fed us and gave us drink and satisfied our needs and gave us shelter, for how many have none to satisfy their needs or give them shelter.",
        count: 1
      },
      {
        id: 4,
        arabic: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration: "Allāhumma ʿālima-l-ghaybi wa-sh-shahādati fāṭira-s-samāwāti wa-l-arḍi rabba kulli shay'in wa malīkah, ashhadu an lā ilāha illā ant",
        translation: "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that there is no god but You.",
        count: 1
      },
      {
        id: 5,
        arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        transliteration: "Subhāna-llāhi wa bihamdih",
        translation: "Glory is to Allah and praise is to Him.",
        count: 3
      }
    ]
  },
  {
    id: 'duasFromSunnah',
    nameEn: 'Duas from Sunnah',
    nameAr: 'أدعية من السنة',
    items: [
      {
        id: 1,
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbanā ātinā fī-d-dunyā hasanatan wa fī-l-ākhirati hasanatan wa qinā ʿadhāba-n-nār",
        translation: "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.",
        count: 1
      },
      {
        id: 2,
        arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي",
        transliteration: "Allāhumma aṣlih lī dīnī-lladhī huwa ʿiṣmatu amrī, wa aṣlih lī dunyāya-llatī fīhā maʿāshī",
        translation: "O Allah, set right for me my religion which is the safeguard of my affairs. And set right for me the affairs of this world wherein is my living.",
        count: 1
      },
      {
        id: 3,
        arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ",
        transliteration: "Allāhumma-hdinī fīman hadayt, wa ʿāfinī fīman ʿāfayt, wa tawallanī fīman tawallayt",
        translation: "O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being, and take me into Your care among those You have taken into Your care.",
        count: 1
      },
      {
        id: 4,
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي، وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ",
        transliteration: "Allāhumma-ghfir lī dhanbī wa khaṭa'ī wa jahlī, wa mā asrartu wa mā aʿlant",
        translation: "O Allah, forgive my sin, my ignorance, my mistake, what I have concealed and what I have declared openly.",
        count: 1
      },
      {
        id: 5,
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
        transliteration: "Allāhumma innī as'aluka mina-l-khayri kullihī ʿājilihī wa ājilih, mā ʿalimtu minhu wa mā lam aʿlam",
        translation: "O Allah, I ask You for all that is good, in this world and in the Hereafter, what I know of it and what I do not know.",
        count: 1
      }
    ]
  }
];

export const getAzkarByCategory = (categoryId: string): AzkarCategory | undefined => {
  return azkarCategories.find(category => category.id === categoryId);
};