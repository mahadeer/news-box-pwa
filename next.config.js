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
                    name: 'News Box',
                    short_name: 'NBox',
                    description: 'A simple News Box to peek news headlines.',
                    background_color: '#fff',
                    theme_color: '#fff',
                    display: 'standalone',
                    orientation: 'portrait',
                    fingerprints: false,
                    inject: false,
                    start_url: '/',
                    ios: {
                        'apple-mobile-web-app-title': 'News Box',
                        'apple-mobile-web-app-status-bar-style': '#fff',
                    },
                    icons: [
                        {
                            src: path.resolve('static/images/favicon.ico'),
                            sizes: [96, 128, 144, 192, 256, 384, 512],
                            destination: '/static'
                        },
                        {
                            src: path.resolve("static/images/icons/base.png"),
                            sizes: "144x144",
                            type: "image/png",
                            destination: '/static'
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