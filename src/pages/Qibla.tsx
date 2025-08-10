import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, MapPin, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Qibla = () => {
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);
  const [qiblaDirection] = useState(45); // Sample qibla direction (45° from North)
  const [location, setLocation] = useState("Getting location...");
  const [city, setCity] = useState("");
  const [isAligned, setIsAligned] = useState(false);

  useEffect(() => {
    // Simulate getting location
    setTimeout(() => {
      setLocation("Manhattan");
      setCity("New York, NY");
    }, 2000);

    // Simulate compass reading
    const interval = setInterval(() => {
      // In a real app, this would use device orientation API
      setDirection(prev => {
        const newDirection = prev + (Math.random() - 0.5) * 10;
        const normalizedDirection = ((newDirection % 360) + 360) % 360;
        
        // Check if aligned with Qibla (within 10 degrees)
        const diff = Math.abs(normalizedDirection - qiblaDirection);
        const isAlignedNow = diff < 10 || diff > 350;
        setIsAligned(isAlignedNow);
        
        return normalizedDirection;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [qiblaDirection]);

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
    setLocation("Getting location...");
    setTimeout(() => {
      setLocation("Manhattan");
      setCity("New York, NY");
    }, 2000);
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
                <Compass className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Qibla Direction</h1>
              </div>
            </div>
            
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

      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Location Info */}
          <Card className="bg-card border border-border/50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{location}</span>
              </div>
              <p className="text-sm text-muted-foreground">{city}</p>
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
                  <Badge className="bg-gradient-crescent border-0 text-secondary-foreground px-4 py-2">
                    ✨ Perfectly Aligned ✨
                  </Badge>
                ) : (
                  <Badge variant="outline" className="px-4 py-2">
                    {getAlignmentMessage()}
                  </Badge>
                )}
                
                <div className="mt-3 text-sm text-muted-foreground">
                  <p>Qibla Direction: {qiblaDirection}° from North</p>
                  <p>Current Bearing: {Math.round(direction)}°</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-muted/30 border border-muted">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-center">How to Use</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Hold your device flat and level</p>
                <p>• Slowly rotate until the arrow points upward</p>
                <p>• The golden arrow points toward the Kaaba in Mecca</p>
                <p>• When aligned, you'll see a confirmation message</p>
              </div>
            </CardContent>
          </Card>

          {/* Distance Info */}
          <Card className="bg-accent/20 border border-accent/30">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold mb-2 text-accent-foreground">Distance to Mecca</h3>
              <p className="text-2xl font-bold text-primary">5,495 km</p>
              <p className="text-sm text-muted-foreground">Great Circle Distance</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Qibla;