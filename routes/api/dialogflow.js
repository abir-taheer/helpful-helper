const router = require("express").Router();

router.get("/api/dialogflow", (req, res) => {
    let response = {
        "fulfillmentText": "displayed&spoken response",
        "fulfillmentMessages": [
            {
                "text": [
                    "text response"
                ],
            }
        ],
        "payload": {
            "google": {
                "expectUserResponse": true,
                "richResponse": {
                    "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": "this is a simple response"
                            }
                        }
                    ]
                }
            }
        }
    };

    res.json(response);

});

module.exports =router;