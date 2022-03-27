import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      base: "/",
      includeAssets: [
        'favicon.svg', 
        'favicon.ico', 
        'robots.txt', 
        'apple-touch-icon.png',
      ],
      manifest: {
        "name": "Pokeme",
        "short_name": "Pokeme",
        "icons": [
          {
            "src": "/android-chrome-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
        "start_url": "/",
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone"
      },
      devOptions: {
        enabled: true
      },
    }),
  ]
})
