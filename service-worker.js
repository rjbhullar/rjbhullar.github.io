const preCachedAssets = [
    "/",
    '/index.html',
    '/main.css',
    '/images/main.jpg',
    '/icons/favicon-32x32.png'
];


self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(caches.open("myCache").then((cache) => {
        return cache.addAll(preCachedAssets)
    }))
});


self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    //remove old cache
    event.waitUntil(caches.keys().then(function(names) {
        console.log('names: ', names);
        Promise.all(names.filter(name => name !== "myCache").map(name => caches.delete(name)))
    }));
});

//cache with network fallback
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});