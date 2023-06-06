import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    correo: {type:String,unique:true},
    contrasena:String,
    actividad:String,
    imagenperfil:String,
    eschofer: Boolean,
    contPanico: Number,
    numContacto:String,
    vehiculo:{
        imagen:String,
        patente:String,
        marca:String,
        modelo:String
    },
    viajes: [{ type: Schema.Types.ObjectId, ref: 'viaje' }],
    
},{ versionKey: false }
);

const usuario = mongoose.model('usuario', usuarioSchema);

export default usuario;