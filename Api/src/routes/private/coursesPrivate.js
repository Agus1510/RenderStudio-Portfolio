const { Router } = require("express");
const router = Router();

const { protect } = require("../../middleware/protect.js");
const { createCurso } = require("../../controllers/controllerCourses.js");

router.post("/", protect, createCurso);

module.exports = router;
