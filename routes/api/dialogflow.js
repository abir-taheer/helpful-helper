const router = require("express").Router();

router.post("/api/dialogflow", (req, res) => {
    let response = {
        "fulfillmentText": JSON.stringify(req.body)
    };

    res.send(JSON.stringify(response));
});

module.exports =router;