const queries = require("../db/queries");
const dateTimeHelper = require("./DateTimeHelper");
const dbName = queries.dbName;

module.exports = {
    GetQuery: (queryType) => {
        return queries[queryType].replace("{dbName}", dbName);
    },
    GetTopNewsBySubCategoryQuery: (subCat) => {
        return queries.getNewsSync
            .replace("{dbName}", dbName)
            .replace("{date}", dateTimeHelper.GetTodayDate())
            .replace("{timeSpan}", dateTimeHelper.GetRecentSyncTime())
            .replace("{type}", subCat);
    },
    SyncNewsToDb: (stories_text, subCat) => {
        return queries.insertNewsSync
            .replace(/{dbName}/g, dbName)
            .replace(/{date}/g, dateTimeHelper.GetTodayDate())
            .replace(/{timeSpan}/g, dateTimeHelper.GetRecentSyncTime())
            .replace(/{stories}/g, stories_text)
            .replace(/{type}/g, subCat);
    },
    ConvertToText: (json) => {
        return JSON.stringify(json).replace(/'/g, "''");
    },
    ParseAsJson: (text) => {
        return JSON.parse(text.replace(/''/g, "'"));
    }
}