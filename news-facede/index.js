const fetch = require("isomorphic-fetch");
const db = require("../db");
const apiBuilder = require("../utils/ApiQueryBuilder");

module.exports = {
    GetTopHeadlines: () => {
        return new Promise((resolve, reject) => {
            db.GetTopHeadlines()
                .then(result => {
                    if (result.isAvailable) {
                        resolve(result.records);
                    } else {
                        fetch(apiBuilder.GetTopHeadLines())
                            .then(function (response) {
                                if (response.status >= 400) {
                                    reject(new Error("Bad response from server"));
                                }
                                return response.json();
                            })
                            .then(db.SyncNews)
                            .then(resolve)
                            .catch(reject);
                    }
                })
                .catch(reject);
        });
    }
}