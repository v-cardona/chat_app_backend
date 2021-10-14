const Mensaje = require('../models/mensaje');
const obtenerChat = async(req, res = response) => {
    const miId = req.uid;
    const mensajesDe = req.params.de;

    // concatenar los ids del envio hacia mi, o yo hacia el otro
    const last30 = await Mensaje.find({
            $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }]
        })
        .sort({ createdAt: 'desc' }) // ordenado descendentemente
        .limit(30); // ultimos 30 mensajes

    res.json({
        ok: true,
        mensajes: last30
    });
}

module.exports = {
    obtenerChat
}