import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Globe } from 'lucide-react';

// Clean verse interface
interface QuranVerse {
  surahNumber: number;
  verseNumber: number;
  arabic: string;
  translation?: string;
  surahName: string;
  surahNameArabic: string;
}

// Optimized verse component - NO debugging attributes
const VerseComponent = React.memo(({ verse, showTranslation }: { 
  verse: QuranVerse; 
  showTranslation: boolean;
}) => (
  <Card className="verse-card mb-4 transition-all duration-200 hover:shadow-md">
    <CardContent className="p-6">
      {/* Arabic Text - Clean and semantic */}
      <div 
        className="arabic-text leading-relaxed mb-4 text-xl md:text-2xl text-foreground text-right font-arabic"
        lang="ar"
        dir="rtl"
        data-verse={`${verse.surahNumber}:${verse.verseNumber}`}
      >
        {verse.arabic} ﴿{verse.verseNumber}﴾
      </div>
      
      {/* Translation */}
      {showTranslation && verse.translation && (
        <div className="translation text-sm text-muted-foreground mb-3 leading-relaxed border-l-2 border-primary/20 pl-4">
          {verse.translation}
        </div>
      )}
      
      {/* Reference */}
      <div className="verse-reference flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
        <Badge variant="outline" className="text-xs">
          {verse.surahNameArabic} - {verse.surahName}
        </Badge>
        <span className="font-mono">
          {verse.surahNumber}:{verse.verseNumber}
        </span>
      </div>
    </CardContent>
  </Card>
));

// Surah names mapping (first 10 for demo - add all 114)
const SURAH_NAMES = {
  1: { arabic: "الفاتحة", english: "Al-Fatihah" },
  2: { arabic: "البقرة", english: "Al-Baqarah" },
  3: { arabic: "آل عمران", english: "Ali 'Imran" },
  4: { arabic: "النساء", english: "An-Nisa" },
  5: { arabic: "المائدة", english: "Al-Ma'idah" },
  6: { arabic: "الأنعام", english: "Al-An'am" },
  7: { arabic: "الأعراف", english: "Al-A'raf" },
  8: { arabic: "الأنفال", english: "Al-Anfal" },
  9: { arabic: "التوبة", english: "At-Tawbah" },
  10: { arabic: "يونس", english: "Yunus" }
  // Add remaining surah names here
};

// Main Quran component
const QuranPage: React.FC = () => {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTranslation, setShowTranslation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Sample Quran data - REPLACE WITH YOUR COMPLETE DATASET
  const quranData: QuranVerse[] = useMemo(() => [
    {
      surahNumber: 1,
      verseNumber: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      surahName: "Al-Fatihah",
      surahNameArabic: "الفاتحة"
    },
    {
      surahNumber: 1,
      verseNumber: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of the worlds.",
      surahName: "Al-Fatihah",
      surahNameArabic: "الفاتحة"
    },
    {
      surahNumber: 1,
      verseNumber: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Entirely Merciful, the Especially Merciful,",
      surahName: "Al-Fatihah",
      surahNameArabic: "الفاتحة"
    },
    {
      surahNumber: 4,
      verseNumber: 1,
      arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ مِنْ نَفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا",
      translation: "O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear Allah, through whom you ask one another, and the wombs. Indeed Allah is ever, over you, an Observer.",
      surahName: "An-Nisa",
      surahNameArabic: "النساء"
    }
    // TODO: Add your complete Quran dataset here (6,236 verses)
  ], []);

  // Performance optimized filtering
  const filteredVerses = useMemo(() => {
    let verses = quranData;
    
    // Filter by surah if not searching
    if (!searchTerm) {
      verses = verses.filter(v => v.surahNumber === currentSurah);
    } else {
      // Search in Arabic or translation
      verses = verses.filter(verse => 
        verse.arabic.includes(searchTerm) ||
        (verse.translation && verse.translation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        verse.surahName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        verse.surahNameArabic.includes(searchTerm)
      );
    }
    
    return verses;
  }, [quranData, searchTerm, currentSurah]);

  // Auto-clean any existing debugging attributes on mount
  useEffect(() => {
    const cleanAttributes = () => {
      const elementsWithDebugAttrs = document.querySelectorAll('[data-lov-id], [data-component-path]');
      elementsWithDebugAttrs.forEach(element => {
        // Remove all Lovable debugging attributes
        ['data-lov-id', 'data-lov-name', 'data-component-path', 'data-component-line', 
         'data-component-file', 'data-component-name', 'data-component-content', 'data--h-bstatus'].forEach(attr => {
          element.removeAttribute(attr);
        });
      });
    };
    
    // Clean immediately and after any DOM updates
    cleanAttributes();
    const observer = new MutationObserver(cleanAttributes);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  // Navigation handlers
  const handleSurahChange = useCallback((surahNum: number) => {
    if (surahNum >= 1 && surahNum <= 114) {
      setCurrentSurah(surahNum);
      setSearchTerm('');
    }
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setIsLoading(true);
    // Simulate search delay for large dataset
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const currentSurahInfo = SURAH_NAMES[currentSurah] || { arabic: "", english: "Unknown" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            القرآن الكريم
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            The Noble Quran - An-Nur Compass
          </p>
        </header>

        {/* Controls */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Surah selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Surah
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="114"
                    value={currentSurah}
                    onChange={(e) => handleSurahChange(Number(e.target.value))}
                    className="w-20"
                  />
                  <div className="flex-1 text-xs text-muted-foreground self-center">
                    {currentSurahInfo.arabic} - {currentSurahInfo.english}
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </label>
                <Input
                  placeholder="Search Arabic, translation, or surah..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Display
                </label>
                <Button
                  variant={showTranslation ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="w-full"
                >
                  {showTranslation ? "Hide" : "Show"} Translation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="mb-4 text-sm text-muted-foreground">
          {searchTerm ? (
            <p>Found {filteredVerses.length} verse(s) matching "{searchTerm}"</p>
          ) : (
            <p>Showing Surah {currentSurah}: {currentSurahInfo.arabic} ({filteredVerses.length} verses)</p>
          )}
        </div>

        {/* Verses Display */}
        <ScrollArea className="h-[600px] rounded-lg border">
          <div className="p-4 space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-muted-foreground">Loading verses...</p>
              </div>
            ) : filteredVerses.length > 0 ? (
              filteredVerses.map((verse) => (
                <VerseComponent
                  key={`${verse.surahNumber}-${verse.verseNumber}`}
                  verse={verse}
                  showTranslation={showTranslation}
                />
              ))
            ) : (
              <Card className="text-center py-8">
                <CardContent>
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No verses found. Try adjusting your search or surah selection.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">بارك الله فيك - May Allah bless you in your Quran reading journey</p>
          <p className="text-xs">An-Nur Compass - Guiding you towards the light</p>
        </footer>
      </div>
    </div>
  );
};

export default QuranPage;