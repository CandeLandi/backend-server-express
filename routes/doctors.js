/* 
    Doctors
    route: 'api/doctors'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  getDoctors,
  updateDoctor,
  createDoctor,
  deleteDoctor,
  getDoctorById,
} = require("../controllers/doctors");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", getDoctors);

router.get("/:id", validateJWT, getDoctorById);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del médico es necesario").not().isEmpty(),
    check("hospital", "El hospital debe ser válido").isMongoId(),
    validateFields,
  ],
  createDoctor
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre del doctor es necesario").not().isEmpty(),
    validateFields,
  ],
  updateDoctor
);

router.delete("/:id", deleteDoctor);

module.exports = router;
