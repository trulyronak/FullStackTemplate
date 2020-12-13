const express = require("express");
const router = express.Router();

/* GET secure route */
router.get("/", (req, res) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

module.exports = router;