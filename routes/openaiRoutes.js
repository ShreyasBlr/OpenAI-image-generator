const express = require("express");
const { generateImg } = require("../controllers/openaiController");
const router = express.Router();

router.post("/generateImg", generateImg);

module.exports = router;
