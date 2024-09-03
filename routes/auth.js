const { Router } = require("express");
const { login, googleSignIn } = require('../controllers/auth')
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post( '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ],
    login
)

router.post('/google',
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validateFields
    ],
    googleSignIn
)

module.exports = router;