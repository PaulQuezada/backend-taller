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
    parada: {
        id:{ type: Schema.Types.ObjectId, ref: 'usuario' },
        punto:[]
    },
    fecha:String,
    vistoemisor:Boolean,
    vistoreceptor:Boolean,
    notificacionemisor:Boolean, // Para mostrar los numeros de la noti
    notificacionreceptor:Boolean,
},{ versionKey: false });
const notificacion = mongoose.model('notificacion', notificacionSchema);

export default notificacion;