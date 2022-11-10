const { Router } = require("express");
const router = Router();

const {
  getCursos,
  getCursoName,
  getCursoById,
} = require("../../controllers/controllerCourses.js");

router.get("/", getCursos);
router.get("/detail/:id", getCursoById);
router.get("/:name", getCursoName);

module.exports = router;
