const { Schema, model } = require("mongoose");

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: Array,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("Room", RoomSchema);
