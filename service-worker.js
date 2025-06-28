const CACHE_NAME = 'starlight-dashboard-v2'; // Increment cache version for changes
const urlsToCache = [
  './', // index.html
  'index.html',
  'home.html', // Added home.html
  'rewards.html',
  'game1.html',
  'game2.html',
  'game3.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Poppins:wght@400;500;600;700&display=swap',
  // It's important to cache the actual font files if you want offline access to them.
  // You'd need to inspect network requests to get the exact URLs for these.
  // For example:
  'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8PhgZrHT2FVfLE.woff2', 
  'https://fonts.gstatic.com/s/oswald/v20/DFgBgfIh2FNfW3hHFD_EgfA.woff2', 
  // Add paths to your icons:
  'icons/apple-touch-icon.png',
  'icons/icon-72x72.png',
  'icons/icon-96x96.png',
  'icons/icon-128x128.png',
  'icons/icon-144x144.png',
  'icons/icon-152x152.png',
  'icons/icon-192x192.png',
  'icons/icon-384x384.png',
  'icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
