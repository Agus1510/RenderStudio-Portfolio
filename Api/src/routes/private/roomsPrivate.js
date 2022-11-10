const { Router } = require("express");
const router = Router();

const { protect } = require("../../middleware/protect.js");
const {
  createRoom,
  getRoomById,
  editRoom,
  deleteRoom,
} = require("../../controllers/controllerRooms");

router.post("/", protect, createRoom);
router.get("/:id", protect, getRoomById);
router.put("/:id/edit", protect, editRoom);
router.delete("/deleteRoom", protect, deleteRoom);

module.exports = router;
