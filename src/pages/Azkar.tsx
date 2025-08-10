import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Sun, Moon, Home, Car, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Azkar = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "morning",
      name: "Morning Azkar",
      nameArabic: "أذكار الصباح",
      description: "Start your day with remembrance of Allah",
      icon: Sun,
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
      count: 12
    },
    {
      id: "evening", 
      name: "Evening Azkar",
      nameArabic: "أذكار المساء",
      description: "End your day in gratitude and peace",
      icon: Moon,
      gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
      count: 10
    },
    {
      id: "prayer",
      name: "After Prayer",
      nameArabic: "أذكار بعد الصلاة", 
      description: "Supplications after the five daily prayers",
      icon: Heart,
      gradient: "bg-gradient-primary",
      count: 15
    },
    {
      id: "sleep",
      name: "Before Sleep",
      nameArabic: "أذكار النوم",
      description: "Peaceful duas before sleeping",
      icon: Moon,
      gradient: "bg-gradient-to-br from-blue-600 to-purple-600",
      count: 8
    },
    {
      id: "home",
      name: "Entering/Leaving Home",
      nameArabic: "أذكار البيت",
      description: "Duas for entering and leaving home",
      icon: Home,
      gradient: "bg-gradient-secondary",
      count: 6
    },
    {
      id: "travel",
      name: "Travel Duas",
      nameArabic: "أذكار السفر",
      description: "Protection and guidance during travel",
      icon: Car,
      gradient: "bg-gradient-to-br from-green-500 to-teal-600",
      count: 9
    },
    {
      id: "protection",
      name: "Protection from Evil",
      nameArabic: "أذكار الحماية",
      description: "Seek Allah's protection from harm",
      icon: Shield,
      gradient: "bg-gradient-to-br from-red-500 to-pink-600",
      count: 11
    },
    {
      id: "anxiety",
      name: "Relief from Anxiety",
      nameArabic: "أذكار الهم والغم",
      description: "Find peace in times of distress",
      icon: Zap,
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-500",
      count: 7
    }
  ];

  // Sample duas for morning azkar
  const morningAzkar = [
    {
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
      transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah",
      translation: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah.",
      count: 1
    },
    {
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
      transliteration: "Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana abduk",
      translation: "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant.",
      count: 1
    },
    {
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
      transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'",
      translation: "In the Name of Allah, with whose Name nothing on earth or in heaven can cause harm.",
      count: 3
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-islamic text-primary-foreground">
        <div className="px-6 py-4">
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
                {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Azkar & Duas"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {!selectedCategory ? (
          /* Categories List */
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center islamic-heading">
              Choose a Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <Card 
                  key={category.id}
                  className="prayer-card cursor-pointer border border-border/50 bg-card hover:shadow-prayer"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${category.gradient} flex items-center justify-center text-white shadow-lg`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                        <p className="arabic-text text-sm text-primary mb-2">{category.nameArabic}</p>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{category.count} duas</span>
                          <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                            Open →
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Duas List */
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-3 mb-2">
                  {(() => {
                    const category = categories.find(c => c.id === selectedCategory);
                    if (!category) return null;
                    return <category.icon className="w-6 h-6 text-primary" />;
                  })()}
                  <h2 className="text-xl font-semibold islamic-heading">
                    {categories.find(c => c.id === selectedCategory)?.nameArabic}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {categories.find(c => c.id === selectedCategory)?.description}
                </p>
              </div>
            </div>

            {selectedCategory === 'morning' ? (
              <div className="space-y-6">
                {morningAzkar.map((dua, index) => (
                  <Card key={index} className="bg-card border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">
                        Dua {index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Arabic Text */}
                      <div className="text-center p-4 bg-accent/20 rounded-lg">
                        <p className="arabic-text text-xl md:text-2xl text-primary leading-relaxed">
                          {dua.arabic}
                        </p>
                      </div>
                      
                      {/* Transliteration */}
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm italic text-muted-foreground font-medium">
                          {dua.transliteration}
                        </p>
                      </div>
                      
                      {/* Translation */}
                      <div className="text-center p-3">
                        <p className="text-foreground leading-relaxed">
                          {dua.translation}
                        </p>
                      </div>

                      {/* Count & Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="text-sm text-muted-foreground">
                          Recite {dua.count} time{dua.count > 1 ? 's' : ''}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Copy
                          </Button>
                          <Button variant="outline" size="sm">
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-muted/30">
                <p className="text-muted-foreground mb-4">
                  Complete Azkar collection will be available in the full version.
                </p>
                <p className="text-sm text-muted-foreground">
                  This demo shows Morning Azkar as an example.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Azkar;