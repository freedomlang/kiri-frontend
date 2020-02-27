self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// cache name
workbox.core.setCacheNameDetails({
  prefix: "My-blog-cache-images",
  precache: "precache",
  runtime: "runtime"
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


const {registerRoute} = workbox.routing;
const {CacheFirst} = workbox.strategies;

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: 'My-blog-cache-images',
    plugins: [
      new workbox.cacheableResponse.Plugin({statuses: [0, 200]})
    ],
  })
);
