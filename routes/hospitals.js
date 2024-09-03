/*
Ruta: /api/hospitals
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { getHospitals, createHospital,updateHospital, deleteHospital } = require('../controllers/hospitals')
const { validateJWT } = require("../middlewares/validate-jwt");


const router = Router();

router.get("/", getHospitals);

router.post(
  "/",
  [
    validateJWT,
    check('name', 'El nombre del hospital es necesario').not().isEmpty(),
    validateFields
  ],
  createHospital
);

router.put( '/:id',
    [

    ],
    updateHospital
);

router.put(':id',
  [
    validateJWT,
    check('name', 'El nombre del hospital es necesario').not().isEmpty(),
    validateFields
  ]
)

router.delete( '/:id',
    deleteHospital
)


module.exports = router;
