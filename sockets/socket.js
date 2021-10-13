const { usuarioConectado, usuarioDesonectado } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    // obtener jwt mediante header
    const token = client.handshake.headers['x-token'];
    // comprobar si el token es valido con el uid
    const [isValid, uid] = comprobarJWT(token);
    // si no es valido, desconectar a ese cliente
    if (!isValid) {
        return client.disconnect();
    }

    // cliente autenticado
    usuarioConectado(uid);

    client.on('disconnect', () => {
        usuarioDesonectado(uid);
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });

    });


});