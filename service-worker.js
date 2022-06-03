
self.addEventListener('install', (event) => {
    console.log('install; ', event);
    self.skipWaiting();
});


self.addEventListener('activate', (event) => {
    console.log('activate;: ');
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', () => {
    console.log('fetch; ');
    return;
});