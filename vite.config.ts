import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,mp3,woff2}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB for audio files
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.alquran\.cloud\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'quran-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.bigdatacloud\.net\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'geocoding-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          },
          {
            urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'nominatim-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'icons/icon-192.png', 'icons/icon-512.png', 'offline.html'],
      manifest: {
        name: 'An-Nur Compass - Islamic Companion',
        short_name: 'An-Nur Compass',
        description: 'Complete Islamic companion app with Qibla compass, prayer times, Quran, and Adhkar',
        theme_color: '#0f766e',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['lifestyle', 'education', 'religion'],
        lang: 'ar',
        dir: 'rtl',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Prayer Times',
            short_name: 'Prayers',
            description: 'View current prayer times',
            url: '/prayer-times',
            icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }]
          },
          {
            name: 'Qibla Compass',
            short_name: 'Qibla',
            description: 'Find direction to Kaaba',
            url: '/qibla',
            icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }]
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
          services: ['./src/services/quranService.ts', './src/services/prayerTimesService.ts']
        }
      }
    }
  }
}));
