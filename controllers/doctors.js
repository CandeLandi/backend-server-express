const Doctor = require("../models/doctors");

const getDoctors = async (req, res = response) => {

  const doctors = await Doctor.find().populate("user", "name img")
                                      .populate("hospital", "name img");

  res.json({
    ok: true,
    doctors,
  });
};

const createDoctor = async (req, res) => {

  const uid = req.uid;
  const doctor = new Doctor({
    user: uid,
    ...req.body,
  });
  try {

    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      msg: "create médico",
      doctor
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateDoctor = (req, res) => {
  res.json({
    ok: true,
    msg: "update doctor",
  });
};

const deleteDoctor = (req, res) => {
  res.json({
    ok: true,
    msg: "delete doctor",
  });
};

module.exports = {
  getDoctors,
  updateDoctor,
  createDoctor,
  deleteDoctor,
};
