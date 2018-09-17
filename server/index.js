const express = require("express");
const next = require("next");
const db = require("../db");
const config = require("./config");

const port = parseInt(process.env.PORT) || config.PORT;
const dev = process.env.NODE_DEV || "development";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare()
    .then(() => {
        const server = express();

        server.use("/api", require("./api"));

        server.get("*", (req, res) => {
            return handle(req, res);
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
