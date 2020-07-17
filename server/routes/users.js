const express = require("express");
const router = express.Router();

const User = require("../models/user");
const errorResponse = require("../utils/error");

router.get("/", async (req, res) => {
  try {
    //Get user by id
    const user = await User.findById({ _id: req.userId });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

module.exports = router;
