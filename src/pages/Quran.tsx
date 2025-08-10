import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Pause, Volume2, Languages, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { surahs, getVerses } from '@/data/quranData';

const Quran = () => {
  const navigate = useNavigate();
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sample Surahs data (first 10 for demo)
  const surahs = [
    { number: 1, name: "Al-Fatihah", translation: "The Opening", verses: 7, revelation: "Meccan" },
    { number: 2, name: "Al-Baqarah", translation: "The Cow", verses: 286, revelation: "Medinan" },
    { number: 3, name: "Aal-E-Imran", translation: "The Family of Imran", verses: 200, revelation: "Medinan" },
    { number: 4, name: "An-Nisa", translation: "The Women", verses: 176, revelation: "Medinan" },
    { number: 5, name: "Al-Ma'idah", translation: "The Table", verses: 120, revelation: "Medinan" },
    { number: 6, name: "Al-An'am", translation: "The Cattle", verses: 165, revelation: "Meccan" },
    { number: 7, name: "Al-A'raf", translation: "The Heights", verses: 206, revelation: "Meccan" },
    { number: 8, name: "Al-Anfal", translation: "The Spoils of War", verses: 75, revelation: "Medinan" },
    { number: 9, name: "At-Tawbah", translation: "The Repentance", verses: 129, revelation: "Medinan" },
    { number: 10, name: "Yunus", translation: "Jonah", verses: 109, revelation: "Meccan" },
  ];

  // Sample Al-Fatihah text for demo
  const alFatihahText = {
    arabic: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      "الرَّحْمَٰنِ الرَّحِيمِ",
      "مَالِكِ يَوْمِ الدِّينِ",
      "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    ],
    translation: [
      "In the name of Allah, the Most Gracious, the Most Merciful.",
      "All praise is due to Allah, Lord of all the worlds.",
      "The Most Gracious, the Most Merciful.",
      "Master of the Day of Judgment.",
      "You alone we worship, and You alone we ask for help.",
      "Guide us on the straight path,",
      "The path of those You have blessed, not of those who have incurred Your wrath, nor of those who have gone astray."
    ]
  };

  const handleSurahClick = (surahNumber: number) => {
    setSelectedSurah(surahNumber);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio playback
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-primary-light/20"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Holy Quran</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {!selectedSurah ? (
          /* Surah List */
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center islamic-heading">
              Choose a Surah to Read
            </h2>
            
            <div className="space-y-3">
              {surahs.map((surah) => (
                <Card 
                  key={surah.number}
                  className="prayer-card cursor-pointer bg-card hover:bg-accent/20 border border-border/50"
                  onClick={() => handleSurahClick(surah.number)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                          {surah.number}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{surah.name}</h3>
                          <p className="text-sm text-muted-foreground">{surah.translation}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          {surah.verses} verses
                        </Badge>
                        <p className="text-xs text-muted-foreground">{surah.revelation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Surah Reading View */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedSurah(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Surahs
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAudio}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Volume2 className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Surah Header */}
            <Card className="mb-8 bg-gradient-islamic text-primary-foreground border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">
                  {surahs.find(s => s.number === selectedSurah)?.name}
                </CardTitle>
                <p className="text-primary-foreground/80">
                  {surahs.find(s => s.number === selectedSurah)?.translation}
                </p>
                <Badge variant="secondary" className="w-fit mx-auto mt-2">
                  {surahs.find(s => s.number === selectedSurah)?.verses} verses
                </Badge>
              </CardHeader>
            </Card>

            {/* Bismillah */}
            {selectedSurah !== 9 && (
              <div className="text-center mb-8 p-6 bg-accent/30 rounded-xl">
                <p className="arabic-text text-2xl text-primary mb-2">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-sm text-muted-foreground">
                  In the name of Allah, the Most Gracious, the Most Merciful
                </p>
              </div>
            )}

            {/* Verses */}
            {selectedSurah === 1 && (
              <div className="space-y-6">
                {alFatihahText.arabic.map((verse, index) => (
                  <Card key={index} className="p-6 bg-card border border-border/50">
                    <div className="text-center space-y-4">
                      <p className="arabic-text text-xl md:text-2xl text-primary leading-relaxed">
                        {verse}
                      </p>
                      <div className="w-12 h-px bg-gradient-secondary mx-auto"></div>
                      <p className="text-muted-foreground leading-relaxed">
                        {alFatihahText.translation[index]}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Verse {index + 1}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {selectedSurah !== 1 && (
              <Card className="p-8 text-center bg-muted/30">
                <p className="text-muted-foreground mb-4">
                  Complete Quran text will be available in the full version.
                </p>
                <p className="text-sm text-muted-foreground">
                  This demo shows Al-Fatihah as an example.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quran;