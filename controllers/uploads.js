const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const path = require("path");
const fs = require("fs");

const fileUpload = (req, res = response) => {
  
  const type = req.params.type;
  const id = req.params.id;
  
  console.log("Tipo recibido:", type);
  //Validar tipo
  const validTypes = ["hospitals", "doctors", "users"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un medico, usuario u hospital",
    });
  }

  //Validar que exista el archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  // Procesar la imagen..
  const file = req.files.image;

  nameCut = file.name.split("."); // wolverine.1.3.jpg
  const fileExtension = nameCut[nameCut.length - 1].toLowerCase();

  //Validar extension
  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extensión permitida",
    });
  }
  //Generar nombre del archivo
  const fileName = `${uuidv4()}.${fileExtension}`;

  //Path para guardar la imagen
  const path = `./uploads/${type}/${fileName}`;

  // Mover la imagen
  file.mv( path , (err) => {
    if (err){
      console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Error al mover la imagen'
        });
    }

    console.log("Actualizando imagen en la base de datos");
    // Actualizar base de datos
    updateImage( type, id, fileName );

    res.json({
        ok: true,
        msg: 'File upload!',
        fileName
    });
});


};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const img = req.params.img;

  const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);

  // imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img/no-img.png`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  returnImage,
};