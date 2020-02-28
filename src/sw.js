/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// cache name
workbox.core.setCacheNameDetails({
  prefix: "My-blog-cache",
  precache: "precache",
  runtime: "run-time"
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { Plugin: CacheableResponsePlugin } = workbox.cacheableResponse;

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })]
  })
);

registerRoute(
  /cdn\.bootcss\.com/,
  new CacheFirst({})
)
