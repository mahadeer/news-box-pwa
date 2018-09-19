const express = require("express");
const router = express.Router();
const newsFacede = require("../../news-facede");
const HandleError = require("../../utils/ErrorHandler");

router.get("/news/:section", function (req, res) {
    newsFacede.GetTopNewsBySubScategory(req.params.section)
        .then(result => res.json(result))
        .catch(err => res.send(500, HandleError(err)));
});

module.exports = router;