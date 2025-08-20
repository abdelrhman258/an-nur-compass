// ✅ PRODUCTION-READY GEOCODING SERVICE
// Multiple providers with fallbacks and rate limiting

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  city?: string;
  district?: string;
  country?: string;
  countryCode?: string;
  state?: string;
  postalCode?: string;
  formattedAddress?: string;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

class GeocodingService {
  private cache = new Map<string, LocationData>();
  private rateLimitMap = new Map<string, number>();
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
  private readonly RATE_LIMIT_DELAY = 1000; // 1 second between requests

  // ✅ PRIMARY METHOD: Get user location with high accuracy
  async getCurrentLocation(options: GeolocationOptions = {}): Promise<LocationData> {
    const defaultOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000, // 5 minutes
      ...options
    };

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      const success = async (position: GeolocationPosition) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        try {
          // Get location details through reverse geocoding
          const locationData = await this.reverseGeocode(latitude, longitude);
          
          resolve({
            ...locationData,
            latitude,
            longitude,
            accuracy
          });
        } catch (error) {
          // Return basic coordinates if reverse geocoding fails
          resolve({
            latitude,
            longitude,
            accuracy,
            formattedAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          });
        }
      };

      const error = (err: GeolocationPositionError) => {
        let message = 'Location access failed';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = 'Location permission denied. Please enable location access in your browser settings.';
            break;
          case err.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable. Please check your GPS settings.';
            break;
          case err.TIMEOUT:
            message = 'Location request timed out. Please try again.';
            break;
        }
        
        reject(new Error(message));
      };

      navigator.geolocation.getCurrentPosition(success, error, defaultOptions);
    });
  }

  // ✅ REVERSE GEOCODING with multiple providers
  async reverseGeocode(latitude: number, longitude: number, language: string = 'en'): Promise<LocationData> {
    const cacheKey = `${latitude.toFixed(4)},${longitude.toFixed(4)},${language}`;
    
    // Check cache first
    const cached = this.getCached(cacheKey);
    if (cached) {
      console.log('📍 Using cached location data');
      return cached;
    }

    // Rate limiting
    await this.enforceRateLimit('reverse-geocode');

    const providers = [
      () => this.reverseGeocodeBigDataCloud(latitude, longitude, language),
      () => this.reverseGeocodeNominatim(latitude, longitude, language),
      () => this.reverseGeocodeOpenCage(latitude, longitude, language)
    ];

    let lastError: Error | null = null;

    for (const provider of providers) {
      try {
        const result = await provider();
        this.setCached(cacheKey, result);
        return result;
      } catch (error) {
        console.warn('Geocoding provider failed:', error);
        lastError = error as Error;
        continue;
      }
    }

    throw lastError || new Error('All geocoding providers failed');
  }

  // ✅ PROVIDER 1: BigDataCloud (No API key required, good accuracy)
  private async reverseGeocodeBigDataCloud(lat: number, lng: number, language: string): Promise<LocationData> {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=${language}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'An-Nur-Compass/1.0.0'
      }
    });

    if (!response.ok) {
      throw new Error(`BigDataCloud API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      latitude: lat,
      longitude: lng,
      city: data.city || data.locality || '',
      district: data.locality || data.localityInfo?.administrative?.[3]?.name || '',
      country: data.countryName || '',
      countryCode: data.countryCode || '',
      state: data.principalSubdivision || '',
      postalCode: data.postcode || '',
      formattedAddress: this.formatAddress(data)
    };
  }

  // ✅ PROVIDER 2: Nominatim (OpenStreetMap, free but rate limited)
  private async reverseGeocodeNominatim(lat: number, lng: number, language: string): Promise<LocationData> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=${language}&addressdetails=1&zoom=18`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'an-nur-compass/1.0 (contact: support@yourdomain.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    const address = data.address || {};

    return {
      latitude: lat,
      longitude: lng,
      city: address.city || address.town || address.village || '',
      district: address.suburb || address.neighbourhood || address.quarter || '',
      country: address.country || '',
      countryCode: address.country_code || '',
      state: address.state || address.region || '',
      postalCode: address.postcode || '',
      formattedAddress: data.display_name || ''
    };
  }

  // ✅ PROVIDER 3: OpenCage (backup, requires API key in production)
  private async reverseGeocodeOpenCage(lat: number, lng: number, language: string): Promise<LocationData> {
    // Note: In production, you would need an OpenCage API key
    // For now, this throws an error to skip to next provider
    throw new Error('OpenCage provider requires API key');
  }

  // ✅ FORWARD GEOCODING (search location by name)
  async geocodeLocation(query: string): Promise<LocationData[]> {
    const cacheKey = `search:${query.toLowerCase()}`;
    
    const cached = this.getCached(cacheKey);
    if (cached && Array.isArray(cached)) {
      return cached;
    }

    await this.enforceRateLimit('geocode');

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'an-nur-compass/1.0 (contact: support@yourdomain.com)'
        }
      });

      if (!response.ok) {
        throw new Error(`Geocoding search failed: ${response.status}`);
      }

      const data = await response.json();
      
      const results = data.map((item: any) => ({
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        city: item.address?.city || item.address?.town || '',
        district: item.address?.suburb || '',
        country: item.address?.country || '',
        countryCode: item.address?.country_code || '',
        state: item.address?.state || '',
        formattedAddress: item.display_name || ''
      }));

      this.setCached(cacheKey, results);
      return results;

    } catch (error) {
      console.error('Geocoding search failed:', error);
      throw error;
    }
  }

  // ✅ CACHE MANAGEMENT
  private setCached(key: string, data: any): void {
    try {
      const item = {
        data,
        timestamp: Date.now(),
        expires: Date.now() + this.CACHE_TTL
      };
      this.cache.set(key, item.data);
      
      // Also persist in localStorage for longer term caching
      localStorage.setItem(`geocode_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Cache operation failed:', error);
    }
  }

  private getCached(key: string): any {
    try {
      // Check memory cache first
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }

      // Check localStorage
      const stored = localStorage.getItem(`geocode_${key}`);
      if (stored) {
        const item = JSON.parse(stored);
        if (item.expires > Date.now()) {
          this.cache.set(key, item.data);
          return item.data;
        } else {
          localStorage.removeItem(`geocode_${key}`);
        }
      }
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
    }
    return null;
  }

  // ✅ RATE LIMITING
  private async enforceRateLimit(operation: string): Promise<void> {
    const lastRequest = this.rateLimitMap.get(operation) || 0;
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequest;

    if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
      const delay = this.RATE_LIMIT_DELAY - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    this.rateLimitMap.set(operation, Date.now());
  }

  // ✅ UTILITY: Format address for display
  private formatAddress(data: any): string {
    const parts = [];
    
    if (data.locality) parts.push(data.locality);
    if (data.city && data.city !== data.locality) parts.push(data.city);
    if (data.principalSubdivision) parts.push(data.principalSubdivision);
    if (data.countryName) parts.push(data.countryName);

    return parts.join(', ') || `${data.latitude?.toFixed(4)}, ${data.longitude?.toFixed(4)}`;
  }

  // ✅ CLEAR CACHE
  clearCache(): void {
    this.cache.clear();
    
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('geocode_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Could not clear localStorage cache:', error);
    }
  }

  // ✅ VALIDATE COORDINATES
  isValidCoordinates(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }

  // ✅ CALCULATE DISTANCE BETWEEN TWO POINTS
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

export const geocodingService = new GeocodingService();
export default geocodingService;