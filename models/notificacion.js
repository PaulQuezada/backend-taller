import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificacionSchema = new Schema({
    emisor:mongoose.Types.ObjectId,
    receptor: mongoose.Types.ObjectId,
    tipo:String,
    estado:Boolean,
    idviaje:mongoose.Types.ObjectId,
    origen: String,
    destino: String,
    nombrepasajero: String,
    parada:[],
    fecha:String,
    vistoemisor:Boolean,
    vistoreceptor:Boolean,
},{ versionKey: false });
const notificacion = mongoose.model('notificacion', notificacionSchema);

export default notificacion;