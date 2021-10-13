const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                // error, no se creo el token
                reject('No se pudo generar el jwt'); //esto dispara el catch
            } else {
                // token generado
                resolve(token);
            }
        });
    });
}

const comprobarJWT = (token = '') => {

    try {
        // comprobar si el token es valido
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}