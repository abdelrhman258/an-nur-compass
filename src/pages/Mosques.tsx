import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Phone, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Mosques = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Getting location...");

  useEffect(() => {
    // Simulate getting location
    setTimeout(() => {
      setLocation("New York, NY");
    }, 2000);
  }, []);

  // Sample nearby mosques data
  const nearbyMosques = [
    {
      name: "Islamic Center of New York",
      address: "1711 3rd Ave, New York, NY 10128",
      distance: "0.8 miles",
      walkTime: "15 mins",
      driveTime: "4 mins",
      rating: 4.5,
      reviews: 127,
      phone: "(212) 722-5234",
      nextPrayer: "Maghrib",
      nextPrayerTime: "6:20 PM",
      facilities: ["Parking", "Wheelchair Access", "Wudu Area"]
    },
    {
      name: "Masjid Al-Noor",
      address: "45 E 85th St, New York, NY 10028", 
      distance: "1.2 miles",
      walkTime: "22 mins",
      driveTime: "7 mins",
      rating: 4.8,
      reviews: 89,
      phone: "(212) 861-7777",
      nextPrayer: "Maghrib",
      nextPrayerTime: "6:20 PM",
      facilities: ["Parking", "Islamic Library", "Community Hall"]
    },
    {
      name: "Manhattan Islamic Center",
      address: "30 E 60th St, New York, NY 10022",
      distance: "2.1 miles", 
      walkTime: "38 mins",
      driveTime: "12 mins",
      rating: 4.3,
      reviews: 201,
      phone: "(212) 758-1085",
      nextPrayer: "Maghrib",
      nextPrayerTime: "6:20 PM",
      facilities: ["Metro Access", "Bookstore", "Cafeteria"]
    },
    {
      name: "Masjid Ar-Rahman",
      address: "415 E 6th St, New York, NY 10009",
      distance: "3.5 miles",
      walkTime: "1h 5m",
      driveTime: "18 mins", 
      rating: 4.6,
      reviews: 156,
      phone: "(212) 254-7850",
      nextPrayer: "Maghrib",
      nextPrayerTime: "6:20 PM",
      facilities: ["Youth Programs", "Friday Khutbah", "Study Circles"]
    }
  ];

  const openInMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  const callMosque = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="px-6 py-4">
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
              <MapPin className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Nearby Mosques</h1>
            </div>
          </div>
          <div className="mt-2 text-primary-foreground/80 text-sm">
            📍 {location}
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Map Placeholder */}
          <Card className="bg-muted/20 border border-muted">
            <CardContent className="p-8 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Interactive map will be available in the full version
              </p>
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </CardContent>
          </Card>

          {/* Mosques List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold islamic-heading">
              Mosques Near You ({nearbyMosques.length} found)
            </h2>
            
            {nearbyMosques.map((mosque, index) => (
              <Card key={index} className="prayer-card bg-card border border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground mb-1">
                        {mosque.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-2">
                        {mosque.address}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{mosque.rating}</span>
                          <span className="text-sm text-muted-foreground">({mosque.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-4">
                      {mosque.distance}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Travel Times */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Navigation className="w-4 h-4" />
                      <span>🚶 {mosque.walkTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Navigation className="w-4 h-4" />
                      <span>🚗 {mosque.driveTime}</span>
                    </div>
                  </div>

                  {/* Next Prayer */}
                  <div className="flex items-center gap-2 p-3 bg-accent/20 rounded-lg">
                    <Clock className="w-4 h-4 text-accent-foreground" />
                    <span className="text-sm text-accent-foreground">
                      Next Prayer: <strong>{mosque.nextPrayer}</strong> at {mosque.nextPrayerTime}
                    </span>
                  </div>

                  {/* Facilities */}
                  <div>
                    <p className="text-sm font-medium mb-2">Facilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {mosque.facilities.map((facility, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      onClick={() => openInMaps(mosque.address)}
                      className="btn-prayer flex-1"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => callMosque(mosque.phone)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Mosque Suggestion */}
          <Card className="bg-accent/20 border border-accent/30">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-accent-foreground mb-3">
                Don't see your mosque listed?
              </p>
              <Button variant="outline" size="sm">
                Suggest a Mosque
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Mosques;