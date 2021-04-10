const express = require("express");
const { clientRoot } = require("../urlConfig");

const router = express.Router();

router.get("/:token", async (req, res) => {
  try {
    res.redirect(`${clientRoot}/accountRecovery#${req.params.token}`);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
