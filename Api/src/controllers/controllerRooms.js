const Room = require("../model/modelRooms");
const ErrorResponse = require("../utils/errorResponse.js");

const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.send(room);
    return;
  } catch (err) {
    next(new ErrorResponse("Error al econtrar el producto", 500, false));
    console.error(err);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
    return;
  } catch (err) {
    next(new ErrorResponse("Error al econtrar el producto", 500, false));
    console.error(err);
  }
};

const getRoomGender = async (req, res) => {
  try {
    if (!req.params.gender.length) {
      const room = await Room.find();
      res.send({ info: "Roomo encontrado", room, success: true });
    } else {
      const room = await Room.find({
        genero: { $regex: req.params.gender, $options: "i" },
        edad: { $regex: req.params.age, $options: "i" },
      });
      if (!room.length) {
        res
          .status(404)
          .send({ info: "No existe productos con ese genero", success: false });
      } else {
        res.send({ info: "Roomos encontrados", room, success: true });
      }
    }
  } catch (err) {
    res.send({ info: "Algo salio mal", err, success: false });
    console.error(err);
  }
};

const getRoomsByName = async (req, res) => {
  const $regex = req.params.name;
  try {
    if (!req.params.name.length) {
      const room = await Room.find();
      res.send({ info: "curso encontrado", room, success: true });
    } else {
      const room = await Room.find({ nombre: { $regex, $options: "i" } });
      if (!room.length) {
        res
          .status(404)
          .send({ info: "No existe un curso con ese nombre", success: false });
      } else {
        res.send({ info: "curso encontrado", room, success: true });
      }
    }
  } catch (err) {
    res.send({ info: "Algo salio mal", err, success: false });
    console.error(err);
  }
};

const getRoomCategory = async (req, res) => {
  try {
    if (!req.params.gender.length) {
      const room = await Room.find();
      res.send({ info: "Roomo encontrado", room, success: true });
    } else {
      const room = await Room.find({
        genero: { $regex: req.params.gender, $options: "i" },
        categoria: { $regex: req.params.category, $options: "i" },
        edad: { $regex: req.params.age, $options: "i" },
      });
      if (!room.length) {
        res
          .status(404)
          .send({ info: "No existe productos con ese genero", success: false });
      } else {
        res.send({ info: "Roomos encontrados", room, success: true });
      }
    }
  } catch (err) {
    res.send({ info: "Algo salio mal", err, success: false });
    console.error(err);
  }
};

const createRoom = async (req, res, next) => {
  const { body } = req;
  try {
    const room = await new Room(body);
    await room.save();
    res.send(room);
  } catch (err) {
    next(new ErrorResponse("Error al crear el producto", 500, false));
    console.error(err);
  }
};

const editRoom = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, price } = req.body;
  try {
    const room = await Room.findByIdAndUpdate(
      id,
      { nombre, price },
      { new: true }
    );
    if (!room) {
      return next(
        new ErrorResponse("Error al obtener el producto", 500, false)
      );
    }
    res.send(room);
  } catch (err) {
    next(new ErrorResponse("Error al obtener el usuario", 500, false));
  }
};

const deleteRoom = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(401).send({
      info: "No tienes permisos para acceder a esta ruta",
      success: false,
    });
  }
  try {
    const { id } = req.body;
    const room = await Room.findById(id);
    if (!room) {
      return res
        .status(404)
        .send({ info: "Usuario no encontrado", success: false });
    }
    await Room.findByIdAndDelete(id);
    res.send({ info: "Usuario eliminado", success: true });
  } catch {
    res.status(500).send({ info: "Algo salio mal", success: false });
  }
};

module.exports = {
  createRoom,
  getRoomById,
  getRooms,
  getRoomGender,
  getRoomCategory,
  getRoomsByName,
  editRoom,
  deleteRoom,
};
