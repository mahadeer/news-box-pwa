const fetch = require("isomorphic-fetch");
const db = require("../db");
const apiBuilder = require("../utils/ApiQueryBuilder");

module.exports = {
    GetTopNewsBySubScategory: async (subCat) => {
        return new Promise((resolve, reject) => {
            db.GetTopNewsBySubCategory(subCat)
                .then(result => {
                    if (result.isAvailable) {
                        resolve(result.records);
                    } else {
                        fetch(apiBuilder.GetTopNewsBySubCategory(subCat))
                            .then(function (response) {
                                if (response.status >= 400) {
                                    reject(new Error("Bad response from server"));
                                }
                                return response.json();
                            })
                            .then((stories) => db.SyncNews(stories, subCat))
                            .then(resolve)
                            .catch(reject);
                    }
                })
                .catch(reject);
        });
    }
}