const router = require("express").Router();

router.get("/api/dialogflow", (req, res) => {
    let response = {"fulfillmentText": "hi"};

    res.send(JSON.stringify(response));
});

module.exports =router;