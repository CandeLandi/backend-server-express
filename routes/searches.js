/*
    Route: /api/all/:searches
*/

const { Router } = require("express");
const { validateJWT } = require('../middlewares/validate-jwt')
const { getAll } = require('../controllers/searches')

const router = Router();

router.get('/:busqueda', validateJWT, getAll)

module.exports = router;