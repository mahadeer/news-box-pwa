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
  "/static/workbox/next-precache-manifest-e9a613049e450cef233eea47cc40acd4.js"
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
    "url": "/_next/static/icon_128x128.ico",
    "revision": "06c3a14cf05323dcf4e200de07c4da43"
  },
  {
    "url": "/_next/static/icon_144x144.ico",
    "revision": "06c3a14cf05323dcf4e200de07c4da43"
  },
  {
    "url": "/_next/static/icon_144x144.png",
    "revision": "c064ce01a9d003a4b68667c68a90a992"
  },
  {
    "url": "/_next/static/icon_192x192.ico",
    "revision": "06c3a14cf05323dcf4e200de07c4da43"
  },
  {
    "url": "/_next/static/icon_256x256.ico",
    "revision": "06c3a14cf05323dcf4e200de07c4da43"
  },
  {
    "url": "/_next/static/icon_384x384.ico",
    "revision": "06c3a14cf05323dcf4e200de07c4da43"
  },
  {
    "url": "/_next/static/icon_512x512.ico",
    "revision": "06c3a14cf05323dcf4e200de07c4da43"
  },
  {
    "url": "/_next/static/icon_96x96.ico",
    "revision": "06c3a14cf05323dcf4e200de07c4da43"
  },
  {
    "url": "/_next/static/manifest.json",
    "revision": "d78e6a4d8b5fd0ecca3461d242051b4f"
  },
  {
    "url": "/_next/static/commons/main-5d3b8b7f2bdfbd634c26.js",
    "revision": "46a0360f71cd12e02e1a6a32058adb5e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("/", workbox.strategies.networkFirst({ "cacheName":"html-cache", plugins: [] }), 'GET');
workbox.routing.registerRoute(/[^3]\/api\//, workbox.strategies.staleWhileRevalidate({ "cacheName":"api-cache", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[200]})] }), 'GET');
workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, workbox.strategies.cacheFirst({ "cacheName":"image-cache", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
workbox.routing.registerRoute(/.*\.(?:css|js)/, workbox.strategies.cacheFirst({ "cacheName":"assets-cache", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
