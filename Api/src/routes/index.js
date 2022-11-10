const { Router } = require("express");
const router = Router();
const users = require("./public/user.js");
const auth = require("./public/auth.js");
const usersPrivate = require("./private/userPrivate.js");
const roomsPrivate = require("./private/roomsPrivate");
const rooms = require("./public/rooms");

router.use("/users", users);
router.use("/auth", auth);
router.use("/usersprivate", usersPrivate);
router.use("/roomsprivate", roomsPrivate);
router.use("/rooms", rooms);

module.exports = router;
