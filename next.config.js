const withCSS = require('@zeit/next-css');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = withCSS({
    webpack(config, { isServer, buildId, dev }) {

        config.node = {
            fs: 'empty'
        };

        if (!isServer) {
            config.module.rules.find(({ test }) => test.test('.css')).use.push({
                loader: 'css-purify-webpack-loader',
                options: {
                    includes: ['./pages/*.js', './components/*.js'],
                }
            });
        }

        const workboxOptions = {
            swDest: "service.worker.js",
            clientsClaim: true,
            skipWaiting: true,
            globPatterns: ['.next/static/*', '.next/static/commons/*'],
            modifyUrlPrefix: {
                '.next': '/_next',
            },
            runtimeCaching: [
                {
                    urlPattern: '/',
                    handler: 'networkFirst',
                    options: {
                        cacheName: 'html-cache',
                    },
                },
                {
                    urlPattern: /[^3]\/api\//,
                    handler: 'staleWhileRevalidate',
                    options: {
                        cacheName: 'api-cache',
                        cacheableResponse: {
                            statuses: [200],
                        },
                    },
                },
                {
                    urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'image-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: /.*\.(?:css|js)/,
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'assets-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                }
            ]
        };

        if (!isServer && !dev) {
            config.plugins.push(
                new NextWorkboxPlugin({
                    buildId,
                    ...workboxOptions
                })
            )
            config.plugins.push(
                new WebpackPwaManifest({
                    filename: 'static/manifest.json',
                    name: 'New Box',
                    short_name: 'NBox',
                    description: 'A simple News Box to peek news headlines.',
                    background_color: '#ffffff',
                    theme_color: '#5755d9',
                    display: 'standalone',
                    orientation: 'portrait',
                    fingerprints: false,
                    inject: false,
                    start_url: '/',
                    ios: {
                        'apple-mobile-web-app-title': 'News Box',
                        'apple-mobile-web-app-status-bar-style': '#5755d9',
                    },
                    icons: [
                        {
                            "src": "static/images/icons/windows10/Square71x71Logo.scale-400.png",
                            "sizes": "284x284"
                        },
                        {
                            "src": "static/images/icons/windows10/Square71x71Logo.scale-200.png",
                            "sizes": "142x142"
                        },
                        {
                            "src": "static/images/icons/windows10/Square71x71Logo.scale-100.png",
                            "sizes": "71x71"
                        },
                        {
                            "src": "static/images/icons/windows10/Square71x71Logo.scale-150.png",
                            "sizes": "107x107"
                        },
                        {
                            "src": "static/images/icons/windows10/Square71x71Logo.scale-125.png",
                            "sizes": "89x89"
                        },
                        {
                            "src": "static/images/icons/windows10/Square150x150Logo.scale-400.png",
                            "sizes": "600x600"
                        },
                        {
                            "src": "static/images/icons/windows10/Square150x150Logo.scale-200.png",
                            "sizes": "300x300"
                        },
                        {
                            "src": "static/images/icons/windows10/Square150x150Logo.scale-100.png",
                            "sizes": "150x150"
                        },
                        {
                            "src": "static/images/icons/windows10/Square150x150Logo.scale-150.png",
                            "sizes": "225x225"
                        },
                        {
                            "src": "static/images/icons/windows10/Square150x150Logo.scale-125.png",
                            "sizes": "188x188"
                        },
                        {
                            "src": "static/images/icons/windows10/Wide310x150Logo.scale-400.png",
                            "sizes": "1240x600"
                        },
                        {
                            "src": "static/images/icons/windows10/Wide310x150Logo.scale-200.png",
                            "sizes": "620x300"
                        },
                        {
                            "src": "static/images/icons/windows10/Wide310x150Logo.scale-100.png",
                            "sizes": "310x150"
                        },
                        {
                            "src": "static/images/icons/windows10/Wide310x150Logo.scale-150.png",
                            "sizes": "465x225"
                        },
                        {
                            "src": "static/images/icons/windows10/Wide310x150Logo.scale-125.png",
                            "sizes": "388x188"
                        },
                        {
                            "src": "static/images/icons/windows10/Square310x310Logo.scale-400.png",
                            "sizes": "1240x1240"
                        },
                        {
                            "src": "static/images/icons/windows10/Square310x310Logo.scale-200.png",
                            "sizes": "620x620"
                        },
                        {
                            "src": "static/images/icons/windows10/Square310x310Logo.scale-100.png",
                            "sizes": "310x310"
                        },
                        {
                            "src": "static/images/icons/windows10/Square310x310Logo.scale-150.png",
                            "sizes": "465x465"
                        },
                        {
                            "src": "static/images/icons/windows10/Square310x310Logo.scale-125.png",
                            "sizes": "388x388"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.scale-400.png",
                            "sizes": "176x176"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.scale-200.png",
                            "sizes": "88x88"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.scale-100.png",
                            "sizes": "44x44"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.scale-150.png",
                            "sizes": "66x66"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.scale-125.png",
                            "sizes": "55x55"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.targetsize-256.png",
                            "sizes": "256x256"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.targetsize-48.png",
                            "sizes": "48x48"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.targetsize-24.png",
                            "sizes": "24x24"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.targetsize-16.png",
                            "sizes": "16x16"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.targetsize-256_altform-unplated.png",
                            "sizes": "256x256"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.targetsize-48_altform-unplated.png",
                            "sizes": "48x48"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.targetsize-24_altform-unplated.png",
                            "sizes": "24x24"
                        },
                        {
                            "src": "static/images/icons/windows10/Square44x44Logo.targetsize-16_altform-unplated.png",
                            "sizes": "16x16"
                        },
                        {
                            "src": "static/images/icons/windows10/StoreLogo.scale-400.png",
                            "sizes": "200x200"
                        },
                        {
                            "src": "static/images/icons/windows10/StoreLogo.scale-200.png",
                            "sizes": "100x100"
                        },
                        {
                            "src": "static/images/icons/windows10/StoreLogo.scale-150.png",
                            "sizes": "75x75"
                        },
                        {
                            "src": "static/images/icons/windows10/StoreLogo.scale-125.png",
                            "sizes": "63x63"
                        },
                        {
                            "src": "static/images/icons/windows10/StoreLogo.scale-100.png",
                            "sizes": "50x50"
                        },
                        {
                            "src": "static/images/icons/windows10/StoreLogo.png",
                            "sizes": "50x50"
                        },
                        {
                            "src": "static/images/icons/windows10/SplashScreen.scale-400.png",
                            "sizes": "2480x1200"
                        },
                        {
                            "src": "static/images/icons/windows10/SplashScreen.scale-200.png",
                            "sizes": "1240x600"
                        },
                        {
                            "src": "static/images/icons/windows10/SplashScreen.scale-150.png",
                            "sizes": "930x450"
                        },
                        {
                            "src": "static/images/icons/windows10/SplashScreen.scale-125.png",
                            "sizes": "775x375"
                        },
                        {
                            "src": "static/images/icons/windows10/SplashScreen.scale-100.png",
                            "sizes": "620x300"
                        },
                        {
                            "src": "static/images/icons/windows/windows-smallsquare-24-24.png",
                            "sizes": "24x24"
                        },
                        {
                            "src": "static/images/icons/windows/windows-smallsquare-30-30.png",
                            "sizes": "30x30"
                        },
                        {
                            "src": "static/images/icons/windows/windows-smallsquare-42-42.png",
                            "sizes": "42x42"
                        },
                        {
                            "src": "static/images/icons/windows/windows-smallsquare-54-54.png",
                            "sizes": "54x54"
                        },
                        {
                            "src": "static/images/icons/windows/windows-splashscreen-1116-540.png",
                            "sizes": "1116x540"
                        },
                        {
                            "src": "static/images/icons/windows/windows-splashscreen-868-420.png",
                            "sizes": "868x420"
                        },
                        {
                            "src": "static/images/icons/windows/windows-splashscreen-620-300.png",
                            "sizes": "620x300"
                        },
                        {
                            "src": "static/images/icons/windows/windows-squarelogo-270-270.png",
                            "sizes": "270x270"
                        },
                        {
                            "src": "static/images/icons/windows/windows-squarelogo-210-210.png",
                            "sizes": "210x210"
                        },
                        {
                            "src": "static/images/icons/windows/windows-squarelogo-150-150.png",
                            "sizes": "150x150"
                        },
                        {
                            "src": "static/images/icons/windows/windows-squarelogo-120-120.png",
                            "sizes": "120x120"
                        },
                        {
                            "src": "static/images/icons/windows/windows-storelogo-90-90.png",
                            "sizes": "90x90"
                        },
                        {
                            "src": "static/images/icons/windows/windows-storelogo-70-70.png",
                            "sizes": "70x70"
                        },
                        {
                            "src": "static/images/icons/windows/windows-storelogo-50-50.png",
                            "sizes": "50x50"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-appicon-106-106.png",
                            "sizes": "106x106"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-appicon-62-62.png",
                            "sizes": "62x62"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-appicon-44-44.png",
                            "sizes": "44x44"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-mediumtile-360-360.png",
                            "sizes": "360x360"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-mediumtile-210-210.png",
                            "sizes": "210x210"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-mediumtile-150-150.png",
                            "sizes": "150x150"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-smalltile-170-170.png",
                            "sizes": "170x170"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-smalltile-99-99.png",
                            "sizes": "99x99"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-smalltile-71-71.png",
                            "sizes": "71x71"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-storelogo-120-120.png",
                            "sizes": "120x120"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-storelogo-70-70.png",
                            "sizes": "70x70"
                        },
                        {
                            "src": "static/images/icons/windows/windowsphone-storelogo-50-50.png",
                            "sizes": "50x50"
                        },
                        {
                            "src": "static/images/icons/android/android-launchericon-512-512.png",
                            "sizes": "512x512"
                        },
                        {
                            "src": "static/images/icons/android/android-launchericon-192-192.png",
                            "sizes": "192x192"
                        },
                        {
                            "src": "static/images/icons/android/android-launchericon-144-144.png",
                            "sizes": "144x144"
                        },
                        {
                            "src": "static/images/icons/android/android-launchericon-96-96.png",
                            "sizes": "96x96"
                        },
                        {
                            "src": "static/images/icons/android/android-launchericon-72-72.png",
                            "sizes": "72x72"
                        },
                        {
                            "src": "static/images/icons/android/android-launchericon-48-48.png",
                            "sizes": "48x48"
                        },
                        {
                            "src": "static/images/icons/ios/ios-appicon-1024-1024.png",
                            "sizes": "1024x1024"
                        },
                        {
                            "src": "static/images/icons/ios/ios-appicon-180-180.png",
                            "sizes": "180x180"
                        },
                        {
                            "src": "static/images/icons/ios/ios-appicon-152-152.png",
                            "sizes": "152x152"
                        },
                        {
                            "src": "static/images/icons/ios/ios-appicon-120-120.png",
                            "sizes": "120x120"
                        },
                        {
                            "src": "static/images/icons/ios/ios-appicon-76-76.png",
                            "sizes": "76x76"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-750-1334.png",
                            "sizes": "750x1334"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-1334-750.png",
                            "sizes": "1334x750"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-1242-2208.png",
                            "sizes": "1242x2208"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-2208-1242.png",
                            "sizes": "2208x1242"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-640-960.png",
                            "sizes": "640x960"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-640-1136.png",
                            "sizes": "640x1136"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-1536-2048.png",
                            "sizes": "1536x2048"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-2048-1536.png",
                            "sizes": "2048x1536"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-768-1024.png",
                            "sizes": "768x1024"
                        },
                        {
                            "src": "static/images/icons/ios/ios-launchimage-1024-768.png",
                            "sizes": "1024x768"
                        },
                        {
                            "src": "static/images/icons/chrome/chrome-extensionmanagementpage-48-48.png",
                            "sizes": "48x48"
                        },
                        {
                            "src": "static/images/icons/chrome/chrome-favicon-16-16.png",
                            "sizes": "16x16"
                        },
                        {
                            "src": "static/images/icons/chrome/chrome-installprocess-128-128.png",
                            "sizes": "128x128"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-marketplace-512-512.png",
                            "sizes": "512x512"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-marketplace-128-128.png",
                            "sizes": "128x128"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-general-256-256.png",
                            "sizes": "256x256"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-general-128-128.png",
                            "sizes": "128x128"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-general-90-90.png",
                            "sizes": "90x90"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-general-64-64.png",
                            "sizes": "64x64"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-general-48-48.png",
                            "sizes": "48x48"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-general-32-32.png",
                            "sizes": "32x32"
                        },
                        {
                            "src": "static/images/icons/firefox/firefox-general-16-16.png",
                            "sizes": "16x16"
                        }
                    ],
                    includeDirectory: true,
                    publicPath: '..'
                })
            );
        }

        return config;
    },
});