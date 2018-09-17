const sqlite3 = require("sqlite3").verbose();
const qBuilder = require("../utils/QueryBuilder");
let db = null;

const DbService = {
    connect: (options) => {
        return new Promise((resolve, reject) => {
            db = new sqlite3.Database(options.fileName, sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Connected to database server...");
                }
            });
        });
    },
    createDatabaseIfNotAvailable: () => {
        return new Promise((resolve, reject) => {
            db.get(qBuilder.GetQuery("isDbAvailable"), [], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row === undefined || row.Count === 0) {
                    resolve(DbService.createDatabase());
                } else {
                    resolve("Connected to the NewsApi Database...");
                }
            });
        });
    },
    createDatabase: () => {
        return new Promise((resolve, reject) => {
            db.run(qBuilder.GetQuery("createTable"), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Created the NewsApi Database...");
                }
            });
        });
    },
    GetTopHeadlines: () => {
        return new Promise((resolve, reject) => {
            db.get(qBuilder.GetTopHeadlinesQuery(), [], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row === undefined) {
                    resolve({ isAvailable: false, records: [] });
                } else {
                    resolve({ isAvailable: true, records: qBuilder.ParseAsJson(row.stories) });
                }
            });
        });
    },
    SyncNews: (stories) => {
        return new Promise((resolve, reject) => {
            db.run(qBuilder.SyncNewsToDb(qBuilder.ConvertToText(stories.articles)), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stories.articles);
                }
            });
        });
    }
}

module.exports = DbService;