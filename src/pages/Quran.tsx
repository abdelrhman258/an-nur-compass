import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Pause, Volume2, Languages } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { quranData, getSurah } from '@/data/quranData';
import LanguageToggle from '@/components/LanguageToggle';

const Quran = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [currentVerse, setCurrentVerse] = useState(0);

  const handleSurahClick = (surahNumber: number) => {
    setSelectedSurah(surahNumber);
    setCurrentVerse(0);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control Sheikh Al-Minshawi recitation
  };

  const currentSurah = selectedSurah ? getSurah(selectedSurah) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-2xl font-bold">{t('quran')}</h1>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {!selectedSurah ? (
          /* Surah List */
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center islamic-heading">
              {t('chooseSuprah')}
            </h2>
            
            <div className="space-y-3">
              {quranData.map((surah) => (
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
                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            {language === 'ar' ? surah.arabicName : surah.name}
                            {language === 'ar' && (
                              <span className="text-sm font-normal text-muted-foreground">
                                ({surah.name})
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? surah.name : surah.translation}
                          </p>
                        </div>
                      </div>
                      <div className={`text-${language === 'ar' ? 'left' : 'right'}`}>
                        <Badge variant="secondary" className="mb-1">
                          {surah.verses} {t('verses')}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {language === 'ar' ? (surah.revelation === 'Meccan' ? 'مكية' : 'مدنية') : surah.revelation}
                        </p>
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
                {t('backToSurahs')}
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAudio}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? t('pause') : t('play')}
                </Button>
                <Volume2 className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Surah Header */}
            <Card className="mb-8 bg-gradient-islamic text-primary-foreground border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">
                  {language === 'ar' ? currentSurah?.arabicName : currentSurah?.name}
                </CardTitle>
                <p className="text-primary-foreground/80">
                  {currentSurah?.translation}
                </p>
                <Badge variant="secondary" className="w-fit mx-auto mt-2">
                  {currentSurah?.verses} {t('verses')}
                </Badge>
              </CardHeader>
            </Card>

            {/* Translation Toggle */}
            <div className="flex justify-center mb-6">
              <Button
                variant="outline"
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                {showTranslation ? t('arabic') : t('translation')}
              </Button>
            </div>

            {/* Bismillah */}
            {selectedSurah !== 9 && (
              <div className="text-center mb-8 p-6 bg-accent/30 rounded-xl">
                <p className="arabic-text text-2xl text-primary mb-2">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('bismillah')}
                </p>
              </div>
            )}

            {/* Verses */}
            {currentSurah && (
              <div className="space-y-6">
                {currentSurah.versesData.map((verse, index) => (
                  <Card key={index} className="p-6 bg-card border border-border/50">
                    <div className="text-center space-y-4">
                      <p className="arabic-text text-xl md:text-2xl text-primary leading-relaxed">
                        {verse.arabic}
                      </p>
                      <div className="w-12 h-px bg-gradient-secondary mx-auto"></div>
                      {showTranslation && (
                        <p className="text-muted-foreground leading-relaxed">
                          {verse.translation}
                        </p>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {t('verse')} {verse.number}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quran;