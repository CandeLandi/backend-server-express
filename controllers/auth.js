const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google.verify");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña invalida",
      });
    }

    //Generar TOKEN - JWT
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd( userDB.role )
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const userDB = await User.findOne({ email });
    let user;

    if (!userDB) {
      user = new User({
        name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    //Guardar usuario
    await user.save();

    //Generar TOKEN - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      email,
      name,
      img: picture,
      token,
      menu: getMenuFrontEnd( user.role )
    });
  } catch (error) {
    console.log(400).json({
      ok: false,
      msg: "Token de Google incorrecto",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const userDB = await User.findById(uid);

  //Generar TOKEN - JWT
  const token = await generateJWT(uid);

  res.json({
    ok: true,
    token,
    user: userDB,
    menu: getMenuFrontEnd( userDB.role )
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
