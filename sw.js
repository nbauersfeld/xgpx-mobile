// Die Seite selbst ohne Netz: Huelle zwischenspeichern, die Strecke haelt
// die Seite im localStorage. Kartenkacheln bleiben beim Browser.
const STAND = "xgpx-mobile-4";
const HUELLE = [
  "./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png",
  "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.css",
  "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.js",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(STAND).then(c => c.addAll(HUELLE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(namen => Promise.all(namen.filter(n => n !== STAND).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Die GitHub-API nie aus dem Speicher - sonst bliebe die alte Strecke stehen
  if (e.request.method !== "GET" || url.hostname === "api.github.com") return;
  const eigen = url.origin === self.location.origin;
  if (!eigen && !HUELLE.includes(e.request.url)) return;
  // Erst das Netz (neue Fassung der Seite), ohne Netz der Speicher
  e.respondWith(fetch(e.request)
    .then(antwort => {
      if (antwort.ok) {
        const kopie = antwort.clone();
        caches.open(STAND).then(c => c.put(e.request, kopie));
      }
      return antwort;
    })
    .catch(() => caches.match(e.request)));
});
