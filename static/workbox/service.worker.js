/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  "/static/workbox/workbox-v3.6.2/workbox-sw.js",
  "/static/workbox/next-precache-manifest-30b6c647671031a1b493106fc8219564.js"
);

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "/_next/static/manifest.json",
    "revision": "bc8b05319649936ab333e28b57c9748c"
  },
  {
    "url": "/_next/static/commons/main-02533e1965af117b334f.js",
    "revision": "411f9e4122e9192be9abb81999ef04bc"
  },
  {
    "url": "/_next/static/commons/main-389495cf26666582cd38.js",
    "revision": "b2dbe2d81fa030914bc8a99d06dedccc"
  },
  {
    "url": "/_next/static/commons/main.js",
    "revision": "88f4f0c1974a620bad595e5cb97b52f0"
  },
  {
    "url": "/_next/static/commons/main.js.map",
    "revision": "2fc04525061dea3b6264ca20e7f5f734"
  },
  {
    "url": "/_next/static/commons/manifest.js",
    "revision": "93884dc61f2aeb7fe26ef0fe64a3b2a4"
  },
  {
    "url": "/_next/static/commons/manifest.js.map",
    "revision": "93357a1756f3184da1bff34feecaf7ec"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("/", workbox.strategies.networkFirst({ "cacheName":"html-cache", plugins: [] }), 'GET');
workbox.routing.registerRoute(/[^3]\/api\//, workbox.strategies.staleWhileRevalidate({ "cacheName":"api-cache", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[200]})] }), 'GET');
workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, workbox.strategies.cacheFirst({ "cacheName":"image-cache", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
workbox.routing.registerRoute(/.*\.(?:css|js)/, workbox.strategies.cacheFirst({ "cacheName":"assets-cache", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
