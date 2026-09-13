/* Service Worker — Korhogo Print (PWA mode hors-ligne) */
const CACHE = "korhogo-print-v1";
const SCOPE = self.registration.scope; // compatible base Vite (/korhogo-print-3d/)
const CORE = [
    SCOPE,
    `${SCOPE}index.html`,
    `${SCOPE}manifest.webmanifest`,
    `${SCOPE}favicon.svg`,
    `${SCOPE}icons/icon-192.png`,
    `${SCOPE}icons/icon-512.png`,
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll(CORE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) return;

    // Stale-while-revalidate : réponse instantanée depuis le cache, mise à jour en arrière-plan
    event.respondWith(
        caches.match(request).then((cached) => {
            const network = fetch(request)
                .then((response) => {
                    if (response && response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(() => cached);
            return cached || network;
        })
    );
});
