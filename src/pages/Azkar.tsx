import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Copy, Share2, RotateCcw, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { azkarData, getAzkarCategory } from '@/data/azkarData';
import LanguageToggle from '@/components/LanguageToggle';
import { useToast } from '@/hooks/use-toast';

const Azkar = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dhikrCounts, setDhikrCounts] = useState<Record<number, number>>({});

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setDhikrCounts({}); // Reset counts when entering new category
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === 'ar' ? 'تم النسخ' : 'Copied',
        description: language === 'ar' ? 'تم نسخ النص إلى الحافظة' : 'Text copied to clipboard',
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShareText = async (text: string, title: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      handleCopyText(text);
    }
  };

  const updateDhikrCount = (dhikrId: number, change: number, maxCount: number) => {
    setDhikrCounts(prev => {
      const currentCount = prev[dhikrId] || 0;
      const newCount = Math.max(0, Math.min(maxCount, currentCount + change));
      return {
        ...prev,
        [dhikrId]: newCount
      };
    });
  };

  const resetDhikrCount = (dhikrId: number) => {
    setDhikrCounts(prev => ({
      ...prev,
      [dhikrId]: 0
    }));
  };

  const currentCategory = selectedCategory ? getAzkarCategory(selectedCategory) : null;

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
                onClick={() => selectedCategory ? setSelectedCategory(null) : navigate('/')}
                className="text-primary-foreground hover:bg-primary-light/20"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6" />
                <h1 className="text-2xl font-bold">
                  {selectedCategory ? 
                    (language === 'ar' ? currentCategory?.arabicName : currentCategory?.name) : 
                    t('azkar')
                  }
                </h1>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          
          {!selectedCategory ? (
            /* Category List */
            <>
              <h2 className="text-xl font-semibold mb-6 text-center islamic-heading">
                {t('azkarCategories')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {azkarData.map((category) => (
                  <Card 
                    key={category.id}
                    className="prayer-card cursor-pointer bg-card hover:bg-accent/20 border border-border/50"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-islamic flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto">
                          {category.id === 'morning' ? '🌅' :
                           category.id === 'evening' ? '🌆' :
                           category.id === 'afterPrayer' ? '🤲' :
                           category.id === 'beforeSleep' ? '🌙' :
                           '📿'}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {language === 'ar' ? category.arabicName : category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {language === 'ar' ? 
                          `${category.dhikrs.length} أذكار وأدعية` : 
                          `${category.dhikrs.length} dhikrs and duas`
                        }
                      </p>
                      <Badge variant="secondary">
                        {language === 'ar' ? 'استكشف' : 'Explore'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            /* Dhikr List */
            <>
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('backToCategories')}
                </Button>
              </div>

              <div className="space-y-6">
                {currentCategory?.dhikrs.map((dhikr, index) => (
                  <Card key={dhikr.id} className="bg-card border border-border/50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Arabic Text */}
                        <div className="text-center">
                          <p className="arabic-text text-xl md:text-2xl text-primary leading-relaxed mb-4">
                            {dhikr.arabic}
                          </p>
                          <div className="w-16 h-px bg-gradient-secondary mx-auto"></div>
                        </div>

                        {/* Transliteration */}
                        {dhikr.transliteration && (
                          <div className="text-center">
                            <p className="text-muted-foreground italic text-sm leading-relaxed">
                              {dhikr.transliteration}
                            </p>
                          </div>
                        )}

                        {/* Translation */}
                        <div className="text-center">
                          <p className="text-foreground leading-relaxed">
                            {dhikr.translation}
                          </p>
                        </div>

                        {/* Repetition Counter */}
                        {dhikr.repetitions > 1 && (
                          <div className="flex items-center justify-center gap-4 p-4 bg-accent/20 rounded-lg">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateDhikrCount(dhikr.id, -1, dhikr.repetitions)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">
                                {dhikrCounts[dhikr.id] || 0} / {dhikr.repetitions}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {t('repeat')} {dhikr.repetitions} {t('times')}
                              </p>
                            </div>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateDhikrCount(dhikr.id, 1, dhikr.repetitions)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resetDhikrCount(dhikr.id)}
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        {/* Source */}
                        {dhikr.source && (
                          <div className="text-center">
                            <Badge variant="outline" className="text-xs">
                              {language === 'ar' ? 'المصدر:' : 'Source:'} {dhikr.source}
                            </Badge>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center gap-3 pt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyText(dhikr.arabic + '\n\n' + dhikr.translation)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            {t('copyText')}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShareText(
                              dhikr.arabic + '\n\n' + dhikr.translation,
                              language === 'ar' ? currentCategory?.arabicName || '' : currentCategory?.name || ''
                            )}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            {t('shareText')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {/* Islamic Pattern Background */}
      <div className="fixed inset-0 pattern-islamic opacity-5 pointer-events-none"></div>
    </div>
  );
};

export default Azkar;