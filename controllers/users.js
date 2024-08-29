const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0; 

  const [users, total] = await Promise.all([
    User
    .find({}, "name email role google")
    .skip( from )
    .limit( 5 ),

    User.count()
  ]);

  res.json({
    ok: true,
    users,
    //uid
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await user.save();

    // Generar TOKEN - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      msg: "Create user",
      user,
      token
    });

  } catch (error) {
    console.error("Error en createUser:", error); // Agrega esto para más detalles
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};


const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }
    //Actualizaciones
    const { password, google, email, ...fields } = req.body;

    if (userDB.email !== email) {
      const existsEmail = await User.findOne({ email });
      if (existsEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    fields.email = email;

    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};


deleteUser = async (req, res = response ) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if ( !userDB ) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await User.findByIdAndDelete( uid );
    
  }
    catch( error ){
      res.status(500).json({
        ok: false,
        msg: "Error inesperado... revisar logs",
      });
    }

}



module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
