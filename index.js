const express = require('express');

//Crear el servidor de express
const app = express();

// Rutas 
app.get('/', ( req, res ) => {

    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
} )


app.listen( 3000, () => {
    console.log('Servidor corriendo en puerto' + 3000)
})