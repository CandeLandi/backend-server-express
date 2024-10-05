require('dotenv').config();

const express = require('express');

const path = require('path');

const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

//Public file
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json());

// Base de datos
dbConnection();


// Rutas
app.use( '/api/users', require('./routes/users') );
app.use( '/api/hospitals', require('./routes/hospitals') );
app.use( '/api/doctors', require('./routes/doctors') );
app.use( '/api/all', require('./routes/searches') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/uploads', require('./routes/uploads') );

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

