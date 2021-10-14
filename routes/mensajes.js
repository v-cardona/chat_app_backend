/*
    path: api/mensajes
*/

const { Router, response } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:de', validarJWT, obtenerChat);
// en el get, recibe como parametro 'de' el id del usuario del que es el mensaje

module.exports = router;