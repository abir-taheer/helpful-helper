const router = require("express").Router();
const User = require("./../../models/user");

router.post('/sms', async function(req, res) {
    let from = req.body.From.replace("+1", "");
    let message = req.body.Body;

    let user_id = await User.getByPhone(from);

    if(user_id){
        if(message.toLowerCase().startsWith("add")){
            let request = message.substr(3).trim();
            let date = new Date();
            date.setDate(date.getDate() + 1);
            await User.addTodo(user_id, request, date);
            res.send(`<Response><Message>${request} has been added to your todo list!</Message></Response>`);
        }

    } else {
        res.send("<Response><Message>Your account could not be located. Please go to https://</Message></Response>");
    }
});
module.exports = router;