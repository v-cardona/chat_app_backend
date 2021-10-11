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

const login = async(req, res = respons) => {

    const { email, password } = req.body;

    try {
        const usuarioDb = await Usuario.findOne({
            email
        });
        // comprobar si existe el usuario por email
        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // comprobar si la pass es correcta
        const validPassword = bcrypt.compareSync(password, usuarioDb.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // generar el jwt
        const token = await generarJWT(usuarioDb.id);

        res.json({
            ok: true,
            usuario: usuarioDb,
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

const renewToken = async(req, res = respons) => {

    try {

        const uid = req.uid;

        const usuarioDb = await Usuario.findById(uid);
        if (!usuarioDb) {

            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // generar el jwt
        const token = await generarJWT(usuarioDb.id);

        res.json({
            ok: true,
            usuario: usuarioDb,
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
    crearUsuario,
    login,
    renewToken
}