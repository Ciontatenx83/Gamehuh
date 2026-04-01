// GameHub Service Worker for Offline Support and Performance

const CACHE_NAME = 'gamehub-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js',
    'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                self.skipWaiting();
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch requests
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests and external API calls
    if (request.method !== 'GET' || url.origin !== self.location.origin) {
        return fetch(request);
    }
    
    // Check if request is in cache
    event.respondWith(
        caches.match(request)
            .then(response => {
                if (response) {
                    // Return cached version
                    return response;
                }
                
                // Fetch from network
                return fetch(request)
                    .then(response => {
                        // Cache successful responses
                        if (response.ok) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, responseClone);
                                });
                        }
                        return response;
                    })
                    .catch(() => {
                        // Return offline fallback
                        return new Response('Offline - Please check your internet connection', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Handle offline actions when back online
            handleOfflineActions()
        );
    }
});

function handleOfflineActions() {
    // Process any queued offline actions
    return caches.open(CACHE_NAME)
        .then(cache => {
            return cache.keys();
        })
        .then(keys => {
            // Process queued actions
            console.log('Processing offline actions for keys:', keys);
        });
}

// Clean up old caches
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
