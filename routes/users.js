/*
Ruta: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    //Middleware
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validateFields,
  ],
  createUser
);

router.put( '/:id',
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("role", "El role es obligatorio").not().isEmpty(),
    ],
    updateUser
);

router.delete( '/:id',
  deleteUser
)

module.exports = router;
