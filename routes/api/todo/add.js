const db = require("../../../config/database");
const User = require("../../../models/user");
const router = require("express").Router();

router.post("/api/todo/add/", async (req, res) => {
    if( req.session.signed_in ){
        await User.addTodo(req.session.user_id, req.body.content, new Date(req.body.due));
        return res.json({success: true});
    }

    res.json({success: false});
});

module.exports = router;