const Hospital = require("../models/hospital");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "name img");

  res.json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });
  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      msg: "create Hospitals",
      hospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "update Hospitals",
  });
};

const deleteHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "update Hospitals",
  });
};

module.exports = {
  getHospitals,
  updateHospital,
  createHospital,
  deleteHospital,
};
