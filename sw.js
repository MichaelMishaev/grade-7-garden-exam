const OFFLINE_CACHE = 'prepx-offline-v2';
const offlineURL = new URL('offline.html', self.registration.scope).href;
self.addEventListener('install', event => {
  event.waitUntil(caches.open(OFFLINE_CACHE).then(cache => cache.add(offlineURL)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith('prepx-offline-') && key !== OFFLINE_CACHE).map(key => caches.delete(key))
  )));
});
// Never cache exam pages, API responses, student drafts or submissions.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(offlineURL)));
});
