const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

// sobrescribir el metodo toJson, que tiene toda la info del objeto (id y demas)
UsuarioSchema.method('toJSON', function() {
    // extraer version de api, id (para renombrarlo por uid), pass y el resto 
    // el resto en object
    const { __v, _id, password, ...object } = this.toObject();
    // al object añadirle el id pero cambiado de nombre
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);