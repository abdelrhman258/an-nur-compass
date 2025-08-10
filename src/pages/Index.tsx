import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Compass, 
  Heart, 
  MapPin,
  Moon,
  Sun,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import mosqueHero from '@/assets/mosque-hero.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [currentTime] = useState(new Date());

  // Format current date in both Gregorian and Hijri
  const gregorianDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Simplified Hijri date (in a real app, use a proper Hijri calendar library)
  const hijriDate = "15 Jumada al-Thani 1446";

  const navigationCards = [
    {
      icon: BookOpen,
      title: "Holy Quran",
      description: "Read the complete Quran with translation",
      route: "/quran",
      gradient: "bg-gradient-primary",
      iconColor: "text-primary-foreground"
    },
    {
      icon: Clock,
      title: "Prayer Times",
      description: "Accurate prayer timings for your location",
      route: "/prayer-times",
      gradient: "bg-gradient-mosque",
      iconColor: "text-primary-foreground"
    },
    {
      icon: Compass,
      title: "Qibla Direction",
      description: "Find the direction to Mecca",
      route: "/qibla",
      gradient: "bg-gradient-secondary",
      iconColor: "text-secondary-foreground"
    },
    {
      icon: Heart,
      title: "Azkar & Duas",
      description: "Daily supplications and remembrance",
      route: "/azkar",
      gradient: "bg-gradient-islamic",
      iconColor: "text-primary-foreground"
    },
    {
      icon: MapPin,
      title: "Nearby Mosques",
      description: "Find mosques in your area",
      route: "/mosques",
      gradient: "bg-gradient-crescent",
      iconColor: "text-secondary-foreground"
    }
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="h-80 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${mosqueHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 to-primary/50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <div className="mb-4">
              <Moon className="w-16 h-16 text-secondary crescent-animation mx-auto mb-2" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Al-Mu'min
            </h1>
            <p className="text-lg text-white/90 mb-6 max-w-md">
              Your Complete Islamic Companion
            </p>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{gregorianDate}</span>
              </div>
            </div>
            <div className="text-white/80 text-sm mt-1 arabic-text">
              {hijriDate}
            </div>
          </div>
        </div>
      </div>

      {/* Date Section */}
      <div className="px-6 py-4 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Today • {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            <div className="text-sm text-primary font-medium">
              Next Prayer: Maghrib in 2h 34m
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 islamic-heading">
            Explore Islamic Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card, index) => (
              <Card 
                key={index}
                className={`prayer-card cursor-pointer group ${card.gradient} border-0`}
                onClick={() => handleNavigation(card.route)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <card.icon className={`w-12 h-12 mx-auto ${card.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${card.iconColor}`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm opacity-90 ${card.iconColor}`}>
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Section */}
          <div className="mt-12 bg-accent/50 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-accent-foreground">
              Quick Access
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleNavigation('/quran')}
                className="btn-prayer"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Read Quran
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleNavigation('/qibla')}
                className="btn-prayer"
              >
                <Compass className="w-4 h-4 mr-2" />
                Find Qibla
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleNavigation('/azkar')}
                className="btn-prayer"
              >
                <Heart className="w-4 h-4 mr-2" />
                Morning Azkar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Islamic Pattern Background */}
      <div className="fixed inset-0 pattern-islamic opacity-5 pointer-events-none"></div>
    </div>
  );
};

export default Index;