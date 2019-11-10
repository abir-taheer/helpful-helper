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
        "source": "example.com",
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
            },
            "facebook": {
                "text": "Hello, Facebook!"
            },
            "slack": {
                "text": "This is a text response for Slack."
            }
        },
        "outputContexts": [
            {
                "name": "projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}/contexts/context name",
                "lifespanCount": 5,
                "parameters": {
                    "param": "param value"
                }
            }
        ],
        "followupEventInput": {
            "name": "event name",
            "languageCode": "en-US",
            "parameters": {
                "param": "param value"
            }
        }
    };


    res.send(JSON.stringify(response));
});

module.exports =router;