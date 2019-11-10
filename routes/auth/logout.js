const router = require("express").Router();

router.get("/auth/logout", (req, res) => {
  req.session.destroy();
  res.json({signed_out: true});
});

module.exports = router;