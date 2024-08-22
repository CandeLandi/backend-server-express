const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    //Cadena de conexión a la base de datos
    await mongoose.connect( process.env.DB_CNN
      ,
/*       {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } */
    );

    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la BD ver logs");
  }
};

module.exports = {
  dbConnection,
};
