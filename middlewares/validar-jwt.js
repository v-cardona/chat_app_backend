const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // leer el token
    const token = req.header('x-token');

    // comprobar si existe el token en la peticion
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        // comprobar si el token es valido
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        // si es valido se extrae, eoc, dara un error
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }


};

module.exports = {
    validarJWT
}