self.addEventListener('install', event => {
    console.log('Service Worker 安裝中...');
    event.waitUntil(
        caches.open('pwa-cache-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/icon.png'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker 已啟用');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
