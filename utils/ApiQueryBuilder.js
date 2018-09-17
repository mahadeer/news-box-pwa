const config = require("../server/config");

const ApiQueryBuilder = {
    GetTopHeadLines: () => {
        return ApiQueryBuilder
            .AppendAPIKey(`${config.base}${config.endpoint["top-headlines"]}?country=in`);
    },
    AppendAPIKey: (query) => {
        return `${query}&apiKey=${config.API_KEY}`;
    }
}

module.exports = ApiQueryBuilder;