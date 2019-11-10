const router = require("express").Router();
const twilio = require('twilio');

router.post('/sms', function(req, res) {
    const twiml = new twilio.TwimlResponse();

    let message = req.body.Body;
    twiml.message(`${message} has been added to your todos!`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;