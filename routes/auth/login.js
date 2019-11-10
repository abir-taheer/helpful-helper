const db = require("../../config/database");
const User = require("../../models/user");
const router = require("express").Router();


router.post("/auth/login", async (req, res) => {
    let success = {success: true};
    let fail = {success: false, error: "Those credentials are invalid. Please try again."};

    let user_email = req.body.email || "";
    let user_password = req.body.password || "";

    let get_user = await User.getByEmail(user_email);
    if(get_user) {
        let password_valid = await User.testPassword(user_password, get_user.user_password);
        if(password_valid){
            req.session.signed_in = true;
            req.session.user_id = get_user.user_id;
            await res.json(success);
        } else {
            await res.json(fail);
        }
    } else {
        await res.json(fail);
    }
});


module.exports = router;