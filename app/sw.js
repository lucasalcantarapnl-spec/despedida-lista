/* Service worker: guarda la app para que funcione sin señal. Sube la versión al publicar cambios. */
const VERSION = "dl-v1";
const ARCHIVOS = ["./", "./index.html", "./styles.css", "./data.js", "./app.js", "./manifest.webmanifest",
  "./icons/icon.svg", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const fuentes = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== location.origin && !fuentes) return;
  // Primero la caché; si no está, red y se guarda para la próxima (también las fuentes)
  e.respondWith(
    caches.match(req, { ignoreSearch: url.origin === location.origin }).then(hit => {
      const red = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined));
      return hit || red;
    })
  );
});
