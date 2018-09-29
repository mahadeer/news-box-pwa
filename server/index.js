const express = require("express");
const next = require("next");
const db = require("../db");
const config = require("./config");
const { join } = require("path");
const cache = require('lru-cache');

const port = parseInt(process.env.PORT) || config.PORT;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ssrCache = new cache({
    max: 20, // not more than 20 results will be cached
    maxAge: 1000 * 60 * 5, // 5 mins
});

app.prepare()
    .then(() => {
        const server = express();
        server.get("/", function (req, res) {
            return renderAndCache(req, res, "/");
        });

        server.use("/api", require("./api"));

        server.get("*", (req, res) => {
            if (req.url.includes('/service.worker')) {
                const filePath = join(__dirname, '../static', 'workbox', 'service.worker.js');
                app.serveStatic(req, res, filePath);
            } else if (req.url.startsWith('static/workbox/')) {
                app.serveStatic(req, res, join(__dirname, "../", req.url));
            } else {
                handle(req, res, req.url);
            }
        });

        server.listen(port, (err) => {
            if (err) throw new Error(`Error occured: ${err}`);
            console.log(`News Server is listening at ${port}`);
            db.connect(config.db)
                .then(msg => db.createDatabaseIfNotAvailable())
                .then(console.log)
                .catch(console.error);
        });
    })
    .catch(err => {
        throw new Error(`Error occured: ${err}`);
    })

async function renderAndCache(req, res, pagePath) {
    const key = req.url;

    // if page is in cache, server from cache
    if (ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT');
        res.send(ssrCache.get(key));
        return;
    }

    try {
        // if not in cache, render the page into HTML
        const html = await app.renderToHTML(req, res, pagePath);

        // if something wrong with the request, let's skip the cache
        if (res.statusCode !== 200) {
            res.send(html);
            return;
        }

        ssrCache.set(key, html);

        res.setHeader('x-cache', 'MISS');
        res.send(html);
    } catch (err) {
        app.renderError(err, req, res, pagePath, queryParams);
    }
}