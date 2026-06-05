const CACHE_NAME = 'my-plans-v6';

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/my-plans/',
                '/my-plans/index.html'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
