const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = respons) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({
            email
        });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        // crear el modelo a partir del body
        // el schema parsea unicamente los datos que necesita
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync(); // lo encripta diferente con el mismo texto
        usuario.password = bcrypt.hashSync(password, salt);

        // guardar en bda
        await usuario.save();

        // generar json web token jwt
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


}

module.exports = {
    crearUsuario
}