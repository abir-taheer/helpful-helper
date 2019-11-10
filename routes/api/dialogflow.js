const router = require("express").Router();

router.get("/api/dialogflow", (req, res) => {
    let response = {"fulfillmentText": "hi"};

    res.json(response);

});

module.exports =router;