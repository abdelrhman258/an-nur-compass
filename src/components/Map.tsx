import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample mosque data
const mosques = [
  {
    id: 1,
    name: "Masjid Al-Haram",
    arabicName: "المسجد الحرام",
    address: "Mecca, Saudi Arabia",
    coordinates: [39.8264, 21.4225],
    distance: "5,495 km",
    type: "Grand Mosque"
  },
  {
    id: 2,
    name: "Islamic Center of Greater Cincinnati",
    arabicName: "المركز الإسلامي لمنطقة سينسيناتي الكبرى",
    address: "8092 Montgomery Rd, Cincinnati, OH",
    coordinates: [-84.3878, 39.2072],
    distance: "2.3 km",
    type: "Community Mosque"
  },
  {
    id: 3,
    name: "Masjid Omar Ibn Al Khattab",
    arabicName: "مسجد عمر بن الخطاب",
    address: "4900 Walnut St, Cincinnati, OH",
    coordinates: [-84.4127, 39.1455],
    distance: "5.7 km",
    type: "Community Mosque"
  }
];

interface MapProps {
  mapboxToken?: string;
}

const Map: React.FC<MapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userToken, setUserToken] = useState(mapboxToken || '');
  const [tokenError, setTokenError] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (!mapContainer.current || !userToken) return;

    try {
      // Initialize map
      mapboxgl.accessToken = userToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: 12,
        center: [-84.4127, 39.1455], // Cincinnati coordinates
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add mosque markers
      mosques.forEach((mosque) => {
        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'mosque-marker';
        markerElement.innerHTML = '🕌';
        markerElement.style.fontSize = '24px';
        markerElement.style.cursor = 'pointer';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-3">
            <h3 class="font-semibold text-lg mb-2">
              ${language === 'ar' ? mosque.arabicName : mosque.name}
            </h3>
            <p class="text-sm text-gray-600 mb-2">${mosque.address}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">${mosque.distance}</span>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                ${mosque.type}
              </span>
            </div>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(markerElement)
          .setLngLat(mosque.coordinates as [number, number])
          .setPopup(popup)
          .addTo(map.current!);
      });

      setTokenError(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setTokenError(true);
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [userToken, language]);

  if (!userToken) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🗺️ {language === 'ar' ? 'خريطة المساجد' : 'Mosques Map'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? 'أدخل رمز Mapbox العام الخاص بك لعرض الخريطة:'
              : 'Enter your Mapbox public token to display the map:'
            }
          </p>
          <div className="flex gap-2">
            <Input
              placeholder={language === 'ar' ? 'رمز Mapbox العام' : 'Mapbox public token'}
              value={userToken}
              onChange={(e) => setUserToken(e.target.value)}
              type="password"
            />
            <Button onClick={() => setUserToken(userToken)}>
              {language === 'ar' ? 'تحميل' : 'Load'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {language === 'ar' 
              ? 'احصل على رمزك من'
              : 'Get your token from'
            } <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
        </CardContent>
      </Card>
    );
  }

  if (tokenError) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-destructive mb-4">
            {language === 'ar' 
              ? 'خطأ في تحميل الخريطة. تحقق من صحة رمز Mapbox.'
              : 'Error loading map. Please check your Mapbox token.'
            }
          </p>
          <Button variant="outline" onClick={() => setUserToken('')}>
            {language === 'ar' ? 'أدخل رمز جديد' : 'Enter new token'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default Map;