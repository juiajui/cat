self.addEventListener('install', event => {
    console.log('[Service Worker] 安裝完成');
    event.waitUntil(
        caches.open('pwa-demo-cache').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('[Service Worker] 正在攔截請求: ', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
