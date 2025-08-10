import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Bell, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PrayerTimes = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("Getting location...");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate getting location
    setTimeout(() => {
      setLocation("New York, NY");
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Sample prayer times (in a real app, these would be calculated based on location)
  const prayerTimes = [
    {
      name: "Fajr",
      nameArabic: "الفجر",
      time: "5:45 AM",
      icon: Sunrise,
      status: "completed",
      description: "Dawn Prayer"
    },
    {
      name: "Sunrise",
      nameArabic: "الشروق", 
      time: "7:15 AM",
      icon: Sun,
      status: "completed",
      description: "Sunrise"
    },
    {
      name: "Dhuhr",
      nameArabic: "الظهر",
      time: "12:30 PM",
      icon: Sun,
      status: "completed",
      description: "Noon Prayer"
    },
    {
      name: "Asr",
      nameArabic: "العصر",
      time: "3:45 PM",
      icon: Sun,
      status: "current",
      description: "Afternoon Prayer"
    },
    {
      name: "Maghrib",
      nameArabic: "المغرب",
      time: "6:20 PM",
      icon: Sunset,
      status: "upcoming",
      description: "Sunset Prayer"
    },
    {
      name: "Isha",
      nameArabic: "العشاء",
      time: "8:00 PM",
      icon: Moon,
      status: "upcoming",
      description: "Night Prayer"
    }
  ];

  const nextPrayer = prayerTimes.find(prayer => prayer.status === "upcoming");
  const currentPrayer = prayerTimes.find(prayer => prayer.status === "current");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-muted-foreground";
      case "current": return "text-secondary";
      case "upcoming": return "text-primary";
      default: return "text-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge variant="secondary" className="text-xs">Completed</Badge>;
      case "current": return <Badge className="text-xs bg-gradient-secondary border-0">Current</Badge>;
      case "upcoming": return <Badge variant="outline" className="text-xs">Upcoming</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-mosque text-primary-foreground">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-primary-light/20"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Prayer Times</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Current Time & Next Prayer */}
          <Card className="bg-gradient-islamic text-primary-foreground border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-primary-foreground/80 mb-4">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              
              {nextPrayer && (
                <div className="border-t border-primary-foreground/20 pt-4">
                  <p className="text-sm text-primary-foreground/80 mb-1">Next Prayer</p>
                  <div className="flex items-center justify-center gap-3">
                    <nextPrayer.icon className="w-5 h-5" />
                    <span className="text-lg font-semibold">{nextPrayer.name}</span>
                    <span className="text-lg">{nextPrayer.time}</span>
                  </div>
                  <p className="text-xs text-primary-foreground/60 mt-1">in 2h 34m</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Prayer Times List */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-center islamic-heading mb-6">
              Today's Prayer Schedule
            </h2>
            
            {prayerTimes.map((prayer, index) => (
              <Card 
                key={index}
                className={`prayer-card border ${
                  prayer.status === 'current' 
                    ? 'border-secondary bg-secondary/10' 
                    : 'border-border/50 bg-card'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center`}>
                        <prayer.icon className={`w-6 h-6 text-primary-foreground`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className={`font-semibold ${getStatusColor(prayer.status)}`}>
                            {prayer.name}
                          </h3>
                          <span className={`arabic-text text-sm ${getStatusColor(prayer.status)}`}>
                            {prayer.nameArabic}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{prayer.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${getStatusColor(prayer.status)}`}>
                        {prayer.time}
                      </div>
                      {getStatusBadge(prayer.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Notification Settings */}
          <Card className="bg-accent/30 border border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent-foreground">
                <Bell className="w-5 h-5" />
                Prayer Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get notified before each prayer time with the beautiful call to prayer.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Enable Notifications
                </Button>
                <Button variant="ghost" size="sm">
                  Choose Adhan
                </Button>
                <Button variant="ghost" size="sm">
                  Adjust Timing
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;