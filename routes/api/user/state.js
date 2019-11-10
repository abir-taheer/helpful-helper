const User = require("../../../models/user");
const router = require("express").Router();

router.get("/api/user/state", (req, res) => {
  let info = {
    signed_in: Boolean(req.session.signed_in)
  };

  if(req.session.signed_in){
    User.getById(req.session.user_id)
        .then(user => {
          info.name = user.user_name;
          res.json(info);
        })
        .catch((err) => {
          res.json(info);
        });
  } else {
    res.json(info);
  }
});
// Called when the user first opens the app
// Works -- 2019-08-27 13:23

module.exports = router;