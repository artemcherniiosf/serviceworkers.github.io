const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});
// Call Activate Event
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service worker: clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url);
  if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response.
        const responseClone = response.clone();
        // Open the cache.
        caches.open(cacheName).then((cache) => {
          // Add response to cache.
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch((err) => caches.match(event.request).then((response) => response))
  );
});
