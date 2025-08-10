import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Map from '@/components/Map';

const Mosques = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Sample mosques data
  const mosques = [
    {
      id: 1,
      name: "Islamic Center of Greater Cincinnati",
      arabicName: "المركز الإسلامي لمنطقة سينسيناتي الكبرى",
      address: "8092 Montgomery Rd, Cincinnati, OH 45236",
      distance: "2.3 km",
      walkingTime: "28 min",
      drivingTime: "7 min",
      phone: "+1 (513) 554-4444",
      services: ["Friday Prayer", "Daily Prayers", "Islamic School"],
      servicesAr: ["صلاة الجمعة", "الصلوات اليومية", "مدرسة إسلامية"],
      rating: 4.8,
      image: "🕌"
    },
    {
      id: 2,
      name: "Masjid Omar Ibn Al Khattab",
      arabicName: "مسجد عمر بن الخطاب",
      address: "4900 Walnut St, Cincinnati, OH 45227",
      distance: "5.7 km",
      walkingTime: "1h 10min",
      drivingTime: "12 min",
      phone: "+1 (513) 271-9700",
      services: ["Friday Prayer", "Daily Prayers", "Quran Classes"],
      servicesAr: ["صلاة الجمعة", "الصلوات اليومية", "دروس القرآن"],
      rating: 4.6,
      image: "🕌"
    }
  ];

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?daddr=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-crescent text-secondary-foreground">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-secondary-foreground hover:bg-secondary-light/20"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                <h1 className="text-2xl font-bold">{t('nearbyMosques')}</h1>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Map Section */}
          <Card>
            <CardHeader>
              <CardTitle>🗺️ {language === 'ar' ? 'خريطة المساجد' : 'Mosques Map'}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Map />
            </CardContent>
          </Card>

          {/* Mosques List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mosques.map((mosque) => (
              <Card key={mosque.id} className="hover:bg-accent/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{mosque.image}</span>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {language === 'ar' ? mosque.arabicName : mosque.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{mosque.address}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{mosque.distance}</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleGetDirections(mosque.address)}
                      className="flex-1"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      {t('getDirections')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mosques;