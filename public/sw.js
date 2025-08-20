// ✅ PRODUCTION SERVICE WORKER FOR AN-NUR COMPASS
// Offline caching, update management, and PWA features

const CACHE_NAME = 'an-nur-compass-v1';
const DATA_CACHE_NAME = 'an-nur-data-v1';

// Static assets to cache
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/api\.bigdatacloud\.net\//,
  /^https:\/\/nominatim\.openstreetmap\.org\//,
  /^https:\/\/api\.alquran\.cloud\//
];

// ✅ INSTALL EVENT - Cache static assets
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// ✅ ACTIVATE EVENT - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated');
      return self.clients.claim();
    })
  );
});

// ✅ FETCH EVENT - Handle all network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with cache-first strategy and background cache update
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached response immediately
            fetch(request).then((fetchResponse) => {
              if (fetchResponse.ok) {
                cache.put(request, fetchResponse.clone());
              }
            }).catch(() => {
              // Network failed, cached response is all we have
            });
            return cachedResponse;
          }

          // No cached response, fetch from network
          return fetch(request).then((fetchResponse) => {
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/offline.html');
      })
    );
    return;
  }

  // Handle static assets
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      request.destination === 'font') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then((fetchResponse) => {
          if (fetchResponse.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(request, fetchResponse.clone()));
          }
          return fetchResponse;
        });
      })
    );
    return;
  }
});

// ✅ UPDATE MANAGEMENT
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION',
      version: CACHE_NAME
    });
  }
});

// ✅ BACKGROUND SYNC for Prayer Notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'prayer-notification') {
    event.waitUntil(sendPrayerNotification());
  }
});

// ✅ PUSH NOTIFICATIONS
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Prayer time notification',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'prayer-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View Prayer Times',
        icon: '/icons/icon-192.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('An-Nur Compass', options)
  );
});

// ✅ NOTIFICATION CLICK HANDLING
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/prayer-times')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// ✅ HELPER FUNCTIONS
async function sendPrayerNotification() {
  try {
    // This would integrate with your prayer times service
    const nextPrayer = await getNextPrayer();
    
    if (nextPrayer && nextPrayer.timeRemaining < 5 * 60 * 1000) { // 5 minutes
      await self.registration.showNotification('Prayer Time Approaching', {
        body: `${nextPrayer.name} prayer in ${Math.round(nextPrayer.timeRemaining / 60000)} minutes`,
        icon: '/icons/icon-192.png',
        tag: 'prayer-upcoming'
      });
    }
  } catch (error) {
    console.error('Failed to send prayer notification:', error);
  }
}

async function calculatePrayerTimes() {
  // This would integrate with your actual prayer times calculation
  // For now, return hardcoded values
  return {
    fajr: '05:30',
    sunrise: '06:45',
    dhuhr: '12:30',
    asr: '15:45',
    maghrib: '18:15',
    isha: '19:30'
  };
}

async function getNextPrayer() {
  // Placeholder function to determine next prayer
  // This would integrate with your prayer times service
  return {
    name: 'Maghrib',
    timeRemaining: 10 * 60 * 1000 // 10 minutes in milliseconds
  };
}

console.log('✅ An-Nur Compass Service Worker loaded');