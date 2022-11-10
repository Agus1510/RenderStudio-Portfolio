const { Router } = require("express");
const router = Router();

const {
  getProductById,
  getProducts,
  getProductGender,
  getProductCategory,
  getProductsByName,
} = require("../../controllers/controllerProducts.js");

router.get("/", getProducts);
router.get("/:gender/:age", getProductGender);
router.get("/:gender/:category/:age", getProductCategory);
router.get("/:name", getProductsByName);

module.exports = router;
