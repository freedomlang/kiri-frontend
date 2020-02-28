/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

importScripts('https://g.alicdn.com/kg/workbox/4.3.1/workbox-sw.js');
workbox.setConfig({
  modulePathPrefix: 'https://g.alicdn.com/kg/workbox/4.3.1/'
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
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
