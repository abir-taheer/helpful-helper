const router = require("express").Router();
const User = require("./../../models/user");

router.post('/sms', async function(req, res) {
    let from = req.body.From.replace("+1", "");
    let message = req.body.Body;

    let user = await User.getByPhone(from);

    if(user){
        if(message.startsWith("add")){
            let request = message.replace("add").trim();
            res.send(`<Response><Message>${request} has been added to your todo list!</Message></Response>`);
        }

    } else {
        res.send("<Response><Message>Your account could not be located. Please go to https://</Message></Response>");
    }
});
module.exports = router;