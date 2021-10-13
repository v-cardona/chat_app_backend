const { response, query } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async(req, res = response) => {

    //query.desde se obtiene del get (localhost:3000/api/usuarios?desde=2)
    const desde = Number(req.query.desde) || 0;

    // ordenar por online primeros
    // no aparecer yo en el listado, ids que no soy yo
    const usuarios = await Usuario.find({ _id: { $ne: req.uid } })
        .sort('-online') // empezando por los conextados
        .skip(desde) // desde que usuario empezar a obtener los datos
        .limit(20); // limite de usuarios a obtener
    res.json({
        ok: true,
        usuarios
    });
}

module.exports = {
    getUsuarios
}