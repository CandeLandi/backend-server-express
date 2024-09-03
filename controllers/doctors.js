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

const updateDoctor = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor no encontrado por id",
      });
    }

    //hospital.name = req.body.name;

    const doctorChanges = {
      ...req.body,
      doctor: uid,
    };

    const doctorUpdated = await Doctor.findByIdAndUpdate(
      id,
      doctorChanges,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "actualizar Medico",
      hospital: doctorUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteDoctor = async (req, res = response) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: true,
        msg: "Doctor no encontrado por id",
      });
    }
    await Doctor.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Doctor eliminado",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getDoctors,
  updateDoctor,
  createDoctor,
  deleteDoctor,
};
