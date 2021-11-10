const cacheName = 'game-v.1';
const chacheFiles = [
  '../index.html',
  '../assets/css/style.css',
  './app.js',
  './service-worker.js',

  '../assets/images/clouds.jpg',
  '../assets/images/card-front/circle.png',
  '../assets/images/card-front/square.png',
  '../assets/images/card-front/triangle.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(cacheAssets);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request)).catch(() => caches.match(e.request));
});
