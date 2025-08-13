import { useState, useEffect } from 'react';
import { quranService, QuranSurahData } from '../services/quranService';

interface CompliantSurahDisplayProps {
  surahNumber: number;
}

export function CompliantSurahDisplay({ surahNumber }: CompliantSurahDisplayProps) {
  const [surah, setSurah] = useState<QuranSurahData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [highContrast, setHighContrast] = useState(false);

  // Check if first time user (show disclaimer)
  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('religious-disclaimer-shown');
    if (!hasSeenDisclaimer) {
      setShowDisclaimer(true);
    }
  }, []);

  // Load surah
  useEffect(() => {
    if (!surahNumber) return;
    
    setLoading(true);
    setError(null);
    
    quranService.getSurah(surahNumber)
      .then(data => {
        setSurah(data);
        setError(null);
        
        // Add SEO metadata
        if (data.seo) {
          document.title = data.seo.title;
          
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', data.seo.description);
        }
      })
      .catch(err => {
        console.error('Failed to load surah:', err);
        setError('Failed to load surah. Please check your connection and try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [surahNumber]);

  // Handle disclaimer acceptance
  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
    localStorage.setItem('religious-disclaimer-shown', 'true');
  };

  // Disclaimer Modal (REQUIRED BY APP STORES)
  if (showDisclaimer) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-background p-6 rounded-lg max-w-[90%] max-h-[80%] overflow-auto">
          <h2 className="text-xl font-bold mb-4">📖 Educational Purpose Notice</h2>
          <div className="mb-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Important Disclaimer:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>✅ This app is for <strong>educational purposes only</strong></li>
                <li>✅ Does <strong>NOT claim religious authority</strong></li>
                <li>✅ For religious guidance, consult <strong>qualified Islamic scholars</strong></li>
                <li>✅ Text formatting is for <strong>display purposes only</strong></li>
                <li>✅ Original sacred text is <strong>never altered</strong></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Verified Sources:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>📚 King Fahd Complex for Printing the Holy Quran</li>
                <li>📚 Tanzil Project verified texts</li>
                <li>📚 Al Quran Cloud database</li>
              </ul>
            </div>
            
            <p className="text-sm"><strong>This app is not affiliated with any religious authority.</strong></p>
          </div>
          
          <button 
            onClick={handleDisclaimerAccept}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            I Understand - Continue
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📖</div>
        <p className="text-lg">Loading Surah {surahNumber}...</p>
        <small className="text-muted-foreground">Educational content • Not religious authority</small>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12 bg-destructive/10 border border-destructive rounded-lg mx-4">
        <p className="text-destructive mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-destructive text-destructive-foreground px-4 py-2 rounded hover:bg-destructive/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!surah) {
    return <div className="text-center py-12">No surah data available</div>;
  }

  const arabicSurah = surah.arabic;

  return (
    <main 
      {...(arabicSurah.accessibility || {})}
      className={`max-w-4xl mx-auto p-4 ${highContrast ? 'high-contrast' : ''}`}
    >
      {/* Accessibility Controls */}
      <section className="flex gap-2 mb-4 p-3 bg-muted rounded-lg">
        <button 
          onClick={() => setFontSize(prev => Math.min(prev + 2, 32))}
          className="px-3 py-2 rounded border bg-background hover:bg-accent transition-colors"
          aria-label="Increase font size"
        >
          A+
        </button>
        <button 
          onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
          className="px-3 py-2 rounded border bg-background hover:bg-accent transition-colors"
          aria-label="Decrease font size"
        >
          A-
        </button>
        <button 
          onClick={() => setHighContrast(!highContrast)}
          className="px-3 py-2 rounded border bg-background hover:bg-accent transition-colors"
          aria-label="Toggle high contrast"
        >
          {highContrast ? 'Normal' : 'High Contrast'}
        </button>
      </section>

      {/* Compliance Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm">
        <strong>📖 Educational Purpose Only</strong>
        <br />
        <small className="text-muted-foreground">
          Sources: King Fahd Complex, verified databases • 
          Not religious authority • 
          Consult scholars for guidance
        </small>
      </div>

      {/* Surah Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ fontSize: `${fontSize + 8}px` }}>
          {arabicSurah.name}
        </h1>
        <p className="text-lg text-muted-foreground mb-1" style={{ fontSize: `${fontSize}px` }}>
          {arabicSurah.englishName} - {arabicSurah.englishNameTranslation}
        </p>
        <small className="text-muted-foreground">
          {arabicSurah.numberOfAyahs} verses • {arabicSurah.revelationType} • Chapter {arabicSurah.number}
        </small>
      </header>

      {/* Bismillah (only if NOT At-Tawbah) */}
      {arabicSurah.number !== 9 && (
        <div 
          className="text-center mb-6 p-4 bg-muted rounded-lg border-2"
          style={{ fontSize: `${fontSize + 4}px` }}
          lang="ar" 
          dir="rtl"
          aria-label="Bismillah: In the name of Allah, the Most Gracious, the Most Merciful"
        >
          <div className="font-bold">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
        </div>
      )}

      {/* Verses */}
      <section className="space-y-4">
        {arabicSurah.ayahs && arabicSurah.ayahs.map((ayah) => (
          <article 
            key={ayah.number}
            className="p-4 bg-card border rounded-lg shadow-sm"
            lang="ar" 
            dir="rtl"
            aria-label={`Verse ${ayah.number}`}
          >
            <div className="flex items-start gap-3">
              <span 
                className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0"
                aria-label={`Verse number ${ayah.number}`}
              >
                {ayah.number}
              </span>
              <p 
                className="text-right flex-1"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.8
                }}
              >
                {ayah.text}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* Source Attribution (REQUIRED BY APP STORES) */}
      <footer className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
        <h3 className="text-base font-semibold mb-3 text-foreground">
          Sources & Compliance
        </h3>
        <div className="grid gap-2">
          <div>📚 <strong>Text Source:</strong> King Fahd Complex for Printing the Holy Quran</div>
          <div>🔗 <strong>API Providers:</strong> Al Quran Cloud, Tanzil Project</div>
          <div>📝 <strong>Script:</strong> Uthmani Script (Madani Mushaf)</div>
          <div>✅ <strong>Purpose:</strong> Educational and personal study only</div>
          <div>⚠️ <strong>Disclaimer:</strong> Not religious authority - consult scholars for guidance</div>
        </div>
        
        {arabicSurah.compliance && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="text-green-600 space-y-1">
              <div>✅ Text verified against multiple sources</div>
              <div>✅ Google Play & App Store compliant</div>
              <div>✅ Original unprocessed text processing disclosed</div>
              <div>✅ Accessibility features included</div>
            </div>
          </div>
        )}
      </footer>
    </main>
  );
}