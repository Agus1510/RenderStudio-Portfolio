const { Router } = require("express");
const router = Router();

const { protect } = require("../../middleware/protect.js");
const {
  createProduct,
  getProductById,
  editProduct,
  deleteProduct,
} = require("../../controllers/controllerProducts");

router.post("/", protect, createProduct);
router.get("/:id", protect, getProductById);
router.put("/:id/edit", protect, editProduct);
router.delete("/deleteProduct", protect, deleteProduct);

module.exports = router;
