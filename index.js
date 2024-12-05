require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
const allowedOrigins = [
    'http://localhost:4200', 
    'https://adminpro-angular.netlify.app' // URL del frontend en Netlify
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-token'] 
};

app.use(cors(corsOptions));

// Public file
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Conectar a la base de datos
dbConnection();

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

// Catch-all para rutas desconocidas (Angular SPA)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Iniciar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
