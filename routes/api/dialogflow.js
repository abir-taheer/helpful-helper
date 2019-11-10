const router = require("express").Router();

router.post("/api/dialogflow", (req, res) => {
    let response = {
        "fulfillmentText": "Ok buddy"
    };

    res.send(JSON.stringify(response));
});

module.exports =router;