const User = require("../../../models/user");
const router = require("express").Router();

router.get("/api/user/state", async (req, res) => {
    let info = {
        user: {

        }
    };
    info.user.signed_in = Boolean(req.session.signed_in);
    if (req.session.signed_in) {
        try {
            let user = await User.getById(req.session.user_id);
            info.user.name = user.user_name;
            info.user.email = user.user_email;
            info.user.phone_numbers = await User.getVerifiedPhoneNumbers(req.session.user_id);
            info.user.schedule = await User.getTodaySchedule(req.session.user_id);
            info.user.todos = await User.getDefaultTodos(req.session.user_id);
            await res.json(info);

        } catch (e) {
            await res.json(info);
        }

    } else {
        await res.json(info);
    }
});
// Called when the user first opens the app
// Works -- 2019-08-27 13:23

module.exports = router;