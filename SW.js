const CACHE_NAME = 'esfam-attendance-v3'; // Updated version
const ASSETS = [
    '/',
    '/index.html',
    '/admin.html',
    '/styles.css',
    '/app.js',
    '/admin.js',
    '/models/tiny_face_detector-weights.shard',
    '/models/face_landmark_68_model-weights.shard',
    '/models/face_recognition_model-weights.shard',
    '/images/esfam-logo.png'
];

// Install event - Cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching assets...');
                return cache.addAll(ASSETS); // Add all specified assets to the cache
            })
            .then(() => self.skipWaiting()) // Activate the service worker immediately
            .catch(err => console.error('Failed to cache assets during installation', err))
    );
});

// Activate event - Delete old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log(`Deleting old cache: ${key}`);
                        return caches.delete(key); // Delete old caches
                    }
                })
            )
        )
    );
    self.clients.claim(); // Take control immediately after activation
});

// Fetch event - Cache-first with network fallback
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Check if the request is in cache
            if (cachedResponse) {
                console.log(`Serving ${event.request.url} from cache`);
                return cachedResponse; // Return from cache if available
            }
            // If not in cache, fetch from network
            return fetch(event.request)
                .then((networkResponse) => {
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse; // If network response isn't good, just return it
                    }
                    // Update cache with the new network response
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone()); // Cache the network response
                        console.log(`Caching ${event.request.url}`);
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Fallback to cached index.html for navigation requests
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html'); // For offline navigation fallback
                    }
                    // For non-navigation requests, just return undefined
                });
        })
    );
});
