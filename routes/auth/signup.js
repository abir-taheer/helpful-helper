const User = require("../../models/user");
const tools = require("../../config/tools");
const router = require("express").Router();

router.post("/auth/signup", (req, res) => {
  let response = {success: false};
  let user_name = req.body.name || "";
  let user_email = req.body.email || "";
  let user_password = req.body.password || "";

  if( ! (user_name && user_email && user_password) ) {
    response.error = "No fields can be left blank";
    return res.json(response);
  }
  if( ! tools.validateEmail(user_email) ){
    response.error = "The email address provided is not valid.";
    return res.json(response);
  }

  if( user_name.length > 64 ){
    response.error = "Name field cannot be longer than 64 characters";
    return res.json(response);
  }

  User.newUser(user_name, user_email, user_password)
      .then((user_id) => {
        req.session.signed_in = true;
        req.session.user_id = user_id;
        res.json({success: true});
      })
      .catch((err) => {
        response.error = err;
        res.json(response);
      });
});

module.exports = router;