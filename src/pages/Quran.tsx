import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, Play, Pause } from 'lucide-react';
import { quranService, QuranSurahInfo } from '../services/quranService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const Quran = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [surahs, setSurahs] = useState<QuranSurahInfo[]>([]);
  const [currentSurahData, setCurrentSurahData] = useState<{ arabic: any; english: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [surahLoading, setSurahLoading] = useState(false);

  useEffect(() => {
    const loadSurahs = async () => {
      setLoading(true);
      try {
        const surahsList = await quranService.getAllSurahs();
        setSurahs(surahsList);
      } catch (error) {
        console.error('Error loading Surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurahs();
  }, []);

  const handleSurahClick = async (surahNumber: number) => {
    setSurahLoading(true);
    setSelectedSurah(surahNumber);
    setCurrentVerse(1);
    
    try {
      const surahData = await quranService.getSurah(surahNumber);
      setCurrentSurahData(surahData);
    } catch (error) {
      console.error('Error loading Surah:', error);
    } finally {
      setSurahLoading(false);
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSurahInfo = selectedSurah ? surahs.find(s => s.number === selectedSurah) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-islamic text-primary-foreground">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => selectedSurah ? setSelectedSurah(null) : navigate('/')}
                className="text-primary-foreground hover:bg-primary-light/20"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Book className="w-6 h-6" />
                <h1 className="text-2xl font-bold">{t('quran')}</h1>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          
          {!selectedSurah ? (
            /* Surah List */
            <>
              <h2 className="text-xl font-semibold mb-6 text-center islamic-heading">
                {t('chooseSuprah')}
              </h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t('loading')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {surahs.map((surah) => (
                    <Card 
                      key={surah.number}
                      className="prayer-card cursor-pointer bg-card hover:bg-accent/20 border border-border/50"
                      onClick={() => handleSurahClick(surah.number)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-islamic flex items-center justify-center text-primary-foreground font-bold">
                              {surah.number}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {language === 'ar' ? surah.name : surah.englishName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {language === 'ar' ? surah.englishName : surah.englishNameTranslation}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {surah.numberOfAyahs} {t('verses')}
                            </p>
                            <Badge variant={surah.revelationType === 'Meccan' ? 'default' : 'secondary'}>
                              {t(surah.revelationType.toLowerCase())}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Surah Reading View */
            <>
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedSurah(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('backToSurahs')}
                </Button>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAudio}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? t('pause') : t('play')}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTranslation(!showTranslation)}
                  >
                    {showTranslation ? t('arabic') : t('translation')}
                  </Button>
                </div>
              </div>

              {surahLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t('loading')}</p>
                </div>
              ) : currentSurahInfo && currentSurahData ? (
                <div className="space-y-6">
                  <Card className="bg-gradient-islamic text-primary-foreground border-0">
                    <CardContent className="p-6 text-center">
                      <h1 className="text-3xl font-bold mb-2 arabic-text">
                        {currentSurahInfo.name}
                      </h1>
                      <h2 className="text-xl mb-2">{currentSurahInfo.englishName}</h2>
                      <p className="text-lg opacity-90">{currentSurahInfo.englishNameTranslation}</p>
                      <div className="flex items-center justify-center gap-4 mt-4">
                        <Badge variant="secondary">
                          {currentSurahInfo.numberOfAyahs} {t('verses')}
                        </Badge>
                        <Badge variant="secondary">
                          {t(currentSurahInfo.revelationType.toLowerCase())}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Bismillah - Show for all Surahs except Surah 9 (At-Tawbah) */}
                  {selectedSurah !== 9 && (
                    <Card className="bg-accent/20 border border-accent/30">
                      <CardContent className="p-6 text-center">
                        <p className="arabic-text text-2xl md:text-3xl text-primary leading-relaxed">
                          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </p>
                        <p className="text-muted-foreground mt-2 italic">
                          {t('bismillah')}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Verses */}
                  <div className="space-y-6">
                    {currentSurahData.arabic.ayahs.map((verse: any, index: number) => (
                      <Card key={verse.number} className="bg-card border border-border/50">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                              <Badge variant="outline" className="text-xs">
                                {t('verse')} {verse.numberInSurah}
                              </Badge>
                            </div>
                            
                            <div className="text-center">
                              <p className="arabic-text text-xl md:text-2xl text-primary leading-relaxed mb-4">
                                {verse.text}
                              </p>
                              <div className="w-16 h-px bg-gradient-secondary mx-auto"></div>
                            </div>
                            
                            {showTranslation && currentSurahData.english.ayahs[index] && (
                              <div className="text-center">
                                <p className="text-foreground leading-relaxed">
                                  {currentSurahData.english.ayahs[index].text}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}

        </div>
      </div>

      {/* Islamic Pattern Background */}
      <div className="fixed inset-0 pattern-islamic opacity-5 pointer-events-none"></div>
    </div>
  );
};

export default Quran;