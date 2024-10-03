const jwt = require('jsonwebtoken');
const user = require('../models/user');

const validateJWT = ( req, res, next ) => {

    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
 
}

const validateADMIN_ROLE = async( req, res, next ) => {

    try {
        const userDB = await user.findById( req.uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User not exits'
            });
        }

        if ( userDB.role !== 'ADMIN_ROLE' ) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios de administrador'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const validateADMIN_ROLE_or_SameUser = async( req, res, next ) => {

    const uid = req.params.uid;
    const id = req.params.id;

    try {
        const userDB = await user.findById( req.uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User not exits'
            });
        }

        if ( userDB.role === 'ADMIN_ROLE' && uid === id) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios de administrador'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

module.exports = {
    validateJWT,
    validateADMIN_ROLE,
    validateADMIN_ROLE_or_SameUser
}