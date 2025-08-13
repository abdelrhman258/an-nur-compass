import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, Play, Pause, Volume2, Bookmark, BookmarkCheck } from 'lucide-react';
import { quranService, QuranSurahInfo } from '../services/quranService';
import { audioService } from '../services/audioService';
import { storageService } from '../services/storageService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import LanguageToggle from '@/components/LanguageToggle';

const Quran = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [surahs, setSurahs] = useState<QuranSurahInfo[]>([]);
  const [currentSurahData, setCurrentSurahData] = useState<{ arabic: any; english: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [surahLoading, setSurahLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [readingProgress, setReadingProgress] = useState<any>(null);

  useEffect(() => {
    const loadSurahs = async () => {
      setLoading(true);
      try {
        const surahsList = await quranService.getAllSurahs();
        setSurahs(surahsList);
        
        // Load saved reading progress
        const savedProgress = storageService.getReadingProgress();
        if (savedProgress) {
          setReadingProgress(savedProgress);
        }
      } catch (error) {
        console.error('Error loading Surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurahs();
  }, []);

  // Auto-save reading progress when verse changes
  useEffect(() => {
    if (selectedSurah && currentVerse && currentSurahData) {
      const currentSurahInfo = surahs.find(s => s.number === selectedSurah);
      if (currentSurahInfo) {
        storageService.saveReadingProgress(
          selectedSurah,
          currentVerse,
          currentSurahInfo.englishName,
          currentSurahInfo.name
        );
      }
    }
  }, [selectedSurah, currentVerse, currentSurahData, surahs]);

  const handleSurahClick = async (surahNumber: number) => {
    setSurahLoading(true);
    setSelectedSurah(surahNumber);
    setCurrentVerse(1);
    
    try {
      // Check for verification errors first
      if (quranService.hasVerificationError(surahNumber)) {
        throw new Error('Quran text unavailable — verification failed');
      }
      
      const surahData = await quranService.getSurah(surahNumber);
      if (!surahData) {
        throw new Error('Quran text unavailable — verification failed');
      }
      setCurrentSurahData(surahData);
    } catch (error) {
      console.error('Error loading Surah:', error);
      if (error.message.includes('verification failed')) {
        toast.error('Quran text unavailable — verification failed');
      } else {
        toast.error('فشل في تحميل السورة');
      }
      setSelectedSurah(null); // Reset selection on error
    } finally {
      setSurahLoading(false);
    }
  };

  const toggleAudio = async () => {
    if (!selectedSurah) return;

    setAudioLoading(true);
    try {
      if (isPlaying) {
        audioService.pause();
        setIsPlaying(false);
      } else {
        await audioService.playSurah(selectedSurah);
        setIsPlaying(true);
        
        audioService.addEventListener('ended', () => {
          setIsPlaying(false);
        });
      }
    } catch (error) {
      console.error('Audio error:', error);
      toast.error('فشل في تشغيل الصوت');
    } finally {
      setAudioLoading(false);
    }
  };

  const resumeLastReading = () => {
    if (readingProgress) {
      handleSurahClick(readingProgress.surahNumber);
      setCurrentVerse(readingProgress.verseNumber);
      toast.success(`${t('resumeReading')} ${readingProgress.arabicName}`);
    }
  };

  const bookmarkVerse = (verseNumber: number) => {
    if (selectedSurah && currentSurahData) {
      const currentSurahInfo = surahs.find(s => s.number === selectedSurah);
      if (currentSurahInfo) {
        storageService.saveReadingProgress(
          selectedSurah,
          verseNumber,
          currentSurahInfo.englishName,
          currentSurahInfo.name
        );
        toast.success(t('bookmarkSaved'));
      }
    }
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

              {/* Resume Reading Card */}
              {readingProgress && (
                <Card className="mb-6 bg-gradient-primary text-primary-foreground border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookmarkCheck className="w-6 h-6" />
                        <div>
                          <p className="font-semibold">{t('continueReading')}</p>
                          <p className="text-sm opacity-90">
                            {readingProgress.arabicName} - {t('verse')} {readingProgress.verseNumber}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={resumeLastReading}
                      >
                        {t('continueReading')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
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
                              <h3 className="text-lg font-semibold text-foreground arabic-text">
                                {surah.name}
                              </h3>
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
                    disabled={audioLoading}
                  >
                    {audioLoading ? (
                      <Volume2 className="w-4 h-4 animate-pulse" />
                    ) : isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {audioLoading ? t('loading') : isPlaying ? t('pause') : t('play')}
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

                  {/* Verses displayed according to exact Madani Mushaf standard */}
                  <div className="space-y-6">
                    {currentSurahData.arabic.ayahs.map((verse: any) => (
                      <Card key={`verse-${verse.number}`} className="bg-card border border-border/50">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Only show verse number badge for numbered verses */}
                            {verse.numberInSurah > 0 && (
                              <div className="flex items-center justify-between mb-4">
                                <Badge variant="outline" className="text-xs">
                                  {t('verse')} {verse.numberInSurah}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => bookmarkVerse(verse.numberInSurah)}
                                >
                                  <Bookmark className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            
                            <div className="text-center">
                              <p 
                                className={`arabic-text leading-relaxed mb-4 ${
                                  verse.numberInSurah === 0 || (verse.numberInSurah === 1 && selectedSurah === 1 && verse.text.includes('بِسْمِ اللَّهِ'))
                                    ? 'text-2xl md:text-3xl text-accent font-semibold' 
                                    : 'text-xl md:text-2xl text-primary'
                                }`}
                              >
                                {verse.text}
                                {verse.numberInSurah > 0 && ` ﴿${verse.numberInSurah}﴾`}
                              </p>
                              <div className="w-16 h-px bg-gradient-secondary mx-auto"></div>
                            </div>
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