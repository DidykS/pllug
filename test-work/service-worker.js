const cacheName = 'health_website_v.1';

const chacheFiles = [
  './service-worker.js',
  './app.js',

  './sign-up-page/index.html',
  './sign-up-page/assets/css/style.css',
  './sign-up-page/assets/images/Mask Group 43.png',

  './sign-in-page/index.html',
  './sign-in-page/assets/css/style.css',
  './sign-in-page/assets/images/Mask Group 43.png',

  './reset-password-page/index.html',
  './reset-password-page/assets/css/style.css',
  './reset-password-page/assets/images/Mask Group 43.png',

  './forgot-password-page/index.html',
  './forgot-password-page/assets/css/style.css',
  './forgot-password-page/assets/images/Mask Group 43.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(chacheFiles);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request)).catch(() => caches.match(e.request));
});
