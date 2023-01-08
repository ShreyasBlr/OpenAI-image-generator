const imageGenerator = "image-generator-site-v1.2";
const assets = [
  "/",
  "/index.html",
  "/assets/css/style.css",
  "/assets/js/main.js",
  "/assets/img/OpenAI-logo.png",
  "/assets/img/overlay_2.jpg",
  "/assets/img/painting.gif",
  "/assets/img/placeholder-img.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(imageGenerator).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
