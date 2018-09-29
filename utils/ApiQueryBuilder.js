const config = require("../server/config");

const ApiQueryBuilder = {
    GetTopNewsBySubCategory: (subCat) => {
        if (subCat == "top-headlines") {
            return ApiQueryBuilder
                .AppendAPIKey(`${config.base}${config.endpoint["top-headlines"]}?country=in`);
        } else {
            return ApiQueryBuilder
                .AppendAPIKey(`${config.base}${config.endpoint["sub-category"].replace("{subCat}", subCat)}`);
        }
    },
    AppendAPIKey: (query) => {
        return `${query}&apiKey=${config.API_KEY}`;
    }
}

module.exports = ApiQueryBuilder;