import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, MapPin, RotateCcw, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { toast } from 'sonner';

const Qibla = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [direction, setDirection] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [userPosition, setUserPosition] = useState<{lat: number; lng: number} | null>(null);
  const [location, setLocation] = useState(language === 'ar' ? "جارٍ تحديد الموقع..." : "Getting location...");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAligned, setIsAligned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const watchId = useRef<number | null>(null);

  // Calculate Qibla direction from user's position to Kaaba (Mecca)
  const calculateQiblaDirection = (lat: number, lng: number): number => {
    // Kaaba coordinates
    const kaabaLat = 21.4225; // Latitude of the Kaaba
    const kaabaLng = 39.8262; // Longitude of the Kaaba
    
    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const toDegrees = (rad: number) => rad * (180 / Math.PI);
    
    const dLng = toRadians(kaabaLng - lng);
    const lat1 = toRadians(lat);
    const lat2 = toRadians(kaabaLat);
    
    const x = Math.sin(dLng) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = toDegrees(Math.atan2(x, y));
    return (bearing + 360) % 360; // Normalize to 0-360 degrees
  };

  // Calculate distance to Kaaba
  const calculateDistanceToKaaba = (lat: number, lng: number): number => {
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (kaabaLat - lat) * Math.PI / 180;
    const dLng = (kaabaLng - lng) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat * Math.PI / 180) * Math.cos(kaabaLat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  // Get user's accurate GPS location
  const getCurrentLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      toast.error(language === 'ar' ? 'خدمة تحديد الموقع غير متوفرة' : 'Geolocation is not supported');
      setIsLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000 // 5 minutes
    };

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      setUserPosition({ lat: latitude, lng: longitude });
      setGpsAccuracy(accuracy);
      
      const qiblaDir = calculateQiblaDirection(latitude, longitude);
      setQiblaDirection(qiblaDir);
      
      // Reverse geocoding for location name
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${language === 'ar' ? 'ar' : 'en'}`)
        .then(response => response.json())
        .then(data => {
          setDistrict(data.locality || data.city || '');
          setCity(data.city || data.principalSubdivision || '');
          setCountry(data.countryName || '');
          setLocation(`${data.locality || data.city || ''}, ${data.city || data.principalSubdivision || ''}`);
        })
        .catch(() => {
          setLocation(language === 'ar' ? 'موقع محدد بدقة' : 'Location acquired');
        });
      
      setIsLoading(false);
      
      if (accuracy <= 50) {
        toast.success(language === 'ar' ? 'تم تحديد موقعك بدقة عالية' : 'High accuracy location acquired');
      } else {
        toast.info(language === 'ar' ? 'دقة الموقع متوسطة' : 'Location accuracy is moderate');
      }
    };

    const error = (err: GeolocationPositionError) => {
      setIsLoading(false);
      let message = language === 'ar' ? 'خطأ في تحديد الموقع' : 'Location error';
      
      switch(err.code) {
        case err.PERMISSION_DENIED:
          message = language === 'ar' ? 'تم رفض إذن الوصول للموقع' : 'Location permission denied';
          break;
        case err.POSITION_UNAVAILABLE:
          message = language === 'ar' ? 'الموقع غير متاح' : 'Location unavailable';
          break;
        case err.TIMEOUT:
          message = language === 'ar' ? 'انتهت مهلة تحديد الموقع' : 'Location timeout';
          break;
      }
      
      toast.error(message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  // Watch device orientation for compass
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // Convert compass heading to 0-360 degrees
        let heading = 360 - event.alpha;
        heading = (heading + 360) % 360;
        setDirection(heading);
        
        // Check alignment with Qibla (within 5 degrees for higher precision)
        if (qiblaDirection > 0) {
          const diff = Math.abs(heading - qiblaDirection);
          const isAlignedNow = diff < 5 || diff > 355;
          setIsAligned(isAlignedNow);
        }
      }
    };

    // Request device orientation permission on iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          } else {
            toast.error(language === 'ar' ? 'مطلوب إذن البوصلة' : 'Compass permission required');
          }
        } catch (error) {
          toast.error(language === 'ar' ? 'خطأ في الوصول للبوصلة' : 'Compass access error');
        }
      } else {
        // Non-iOS devices
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [qiblaDirection, language]);

  // Initialize location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, [language]);

  const getQiblaArrowRotation = () => {
    return qiblaDirection - direction;
  };

  const getAlignmentMessage = () => {
    const diff = ((qiblaDirection - direction + 360) % 360);
    if (diff > 180) {
      return "Turn right";
    } else if (diff < 180) {
      return "Turn left";
    }
    return "Aligned";
  };

  const refreshLocation = () => {
    getCurrentLocation();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-secondary text-secondary-foreground">
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
                <Target className="w-6 h-6" />
                <h1 className="text-2xl font-bold">{language === 'ar' ? 'بوصلة القبلة' : 'Qibla Compass'}</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={refreshLocation}
                className="text-secondary-foreground hover:bg-secondary-light/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Location Info */}
          <Card className="bg-card border border-border/50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{t('currentLocation')}</span>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-foreground">📍 {district}</p>
                <p className="text-muted-foreground">🏙 {city}</p>
                <p className="text-sm text-muted-foreground">🌍 {country}</p>
                {gpsAccuracy && (
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'دقة GPS:' : 'GPS Accuracy:'} {Math.round(gpsAccuracy)}m
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Compass */}
          <Card className="bg-gradient-to-b from-accent/20 to-accent/5 border-0">
            <CardContent className="p-8">
              <div className="relative w-80 h-80 mx-auto">
                
                {/* Compass Background */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 bg-gradient-to-b from-primary/5 to-primary/10">
                  
                  {/* Cardinal Directions */}
                  <div className="absolute inset-4 rounded-full border border-primary/30">
                    {/* North */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-primary">
                      N
                    </div>
                    {/* East */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                      E
                    </div>
                    {/* South */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-muted-foreground">
                      S
                    </div>
                    {/* West */}
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                      W
                    </div>
                  </div>

                  {/* Degree Markings */}
                  {Array.from({length: 36}, (_, i) => i * 10).map(deg => (
                    <div
                      key={deg}
                      className="absolute w-px bg-primary/40"
                      style={{
                        height: deg % 90 === 0 ? '20px' : deg % 30 === 0 ? '12px' : '8px',
                        top: '10px',
                        left: '50%',
                        transformOrigin: '50% 140px',
                        transform: `translateX(-50%) rotate(${deg}deg)`
                      }}
                    />
                  ))}
                </div>

                {/* Qibla Arrow */}
                <div 
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
                  style={{ transform: `rotate(${getQiblaArrowRotation()}deg)` }}
                >
                  <div className={`w-2 h-32 ${isAligned ? 'bg-gradient-crescent animate-crescent-glow' : 'bg-gradient-secondary'} rounded-full relative`}>
                    {/* Arrow Head */}
                    <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 ${isAligned ? 'bg-secondary' : 'bg-secondary-dark'} rounded-full border-2 border-background`}>
                      <div className="absolute inset-1 bg-background rounded-full">
                        <div className={`absolute inset-0.5 ${isAligned ? 'bg-gradient-crescent' : 'bg-gradient-secondary'} rounded-full`}></div>
                      </div>
                    </div>
                    
                    {/* Kaaba Icon */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs">
                      🕋
                    </div>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                </div>
              </div>

              {/* Alignment Status */}
              <div className="text-center mt-6">
                {isAligned ? (
                  <Badge className="bg-gradient-crescent border-0 text-secondary-foreground px-4 py-2 animate-crescent-glow">
                    {t('perfectlyAligned')}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="px-4 py-2">
                    {language === 'ar' ? 
                      (getAlignmentMessage() === 'Turn right' ? 'اتجه يميناً' : 
                       getAlignmentMessage() === 'Turn left' ? 'اتجه يساراً' : 'محاذٍ') : 
                      getAlignmentMessage()}
                  </Badge>
                )}
                
                <div className="mt-3 text-sm text-muted-foreground">
                  <p>{language === 'ar' ? 'اتجاه القبلة:' : 'Qibla Direction:'} {Math.round(qiblaDirection)}° {language === 'ar' ? 'من الشمال' : 'from North'}</p>
                  <p>{language === 'ar' ? 'الاتجاه الحالي:' : 'Current Bearing:'} {Math.round(direction)}°</p>
                  {userPosition && (
                    <p className="text-xs mt-1">
                      {language === 'ar' ? 'المسافة إلى مكة:' : 'Distance to Mecca:'} {calculateDistanceToKaaba(userPosition.lat, userPosition.lng)} {language === 'ar' ? 'كم' : 'km'}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-muted/30 border border-muted">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-center">{t('howToUse')}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {language === 'ar' ? [
                  '• امسك جهازك بشكل مسطح ومستوٍ',
                  '• اقلب ببطء حتى يشير السهم للأعلى', 
                  '• السهم الذهبي يشير نحو الكعبة في مكة',
                  '• عند المحاذاة، ستظهر رسالة تأكيد'
                ].map((instruction, index) => (
                  <p key={index}>{instruction}</p>
                )) : [
                  '• Hold your device flat and level',
                  '• Slowly rotate until the arrow points upward',
                  '• The golden arrow points toward the Kaaba in Mecca',
                  '• When aligned, you\'ll see a confirmation message'
                ].map((instruction, index) => (
                  <p key={index}>{instruction}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GPS Status & Distance Info */}
          <Card className="bg-accent/20 border border-accent/30">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold mb-2 text-accent-foreground">
                {language === 'ar' ? 'معلومات GPS' : 'GPS Information'}
              </h3>
              {userPosition ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">
                    {calculateDistanceToKaaba(userPosition.lat, userPosition.lng)} {language === 'ar' ? 'كم' : 'km'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'المسافة إلى الكعبة المشرفة' : 'Distance to the Holy Kaaba'}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <div className={`w-2 h-2 rounded-full ${gpsAccuracy && gpsAccuracy <= 50 ? 'bg-green-500' : gpsAccuracy && gpsAccuracy <= 100 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'دقة عالية' : gpsAccuracy && gpsAccuracy <= 50 ? 'High Accuracy' : gpsAccuracy && gpsAccuracy <= 100 ? 'Medium Accuracy' : 'Low Accuracy'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  {isLoading ? (language === 'ar' ? 'جارٍ تحديد الموقع...' : 'Getting location...') : 
                   (language === 'ar' ? 'لم يتم تحديد الموقع' : 'Location not available')}
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Qibla;