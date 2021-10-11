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

module.exports = {
    generarJWT
}