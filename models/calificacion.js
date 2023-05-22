import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const calificacionSchema = new Schema({
    nota:Number,
    calificador: mongoose.Types.ObjectId,
    calificado:  mongoose.Types.ObjectId,
    comentario :String,
    visto: Boolean
},{ versionKey: false });

const calificacion = mongoose.model('calificacion', calificacionSchema);

export default calificacion;