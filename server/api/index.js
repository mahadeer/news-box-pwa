const express = require("express");
const router = express.Router();
const newsFacede = require("../../news-facede");
const HandleError = require("../../utils/ErrorHandler");

router.get("/top-headlines", function (req, res) {
    newsFacede.GetTopHeadlines()
        .then(result => res.json(result))
        .catch(err => res.send(500, HandleError(err)));
});

module.exports = router;