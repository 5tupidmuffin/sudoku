const cacheName = `sudoku`;
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache
        .addAll([
          "/",
          "/index.html",
          "/styles.css",
          "/bundle.js",
          "/assets/icon-min.png",
        ])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
