import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const calificacionSchema = new Schema({
    nota:Number,
    calificador:{ type: Schema.Types.ObjectId, ref: 'usuario' },
    calificado:  { type: Schema.Types.ObjectId, ref: 'usuario' },
    comentario :String,
    visto: Boolean
},{ versionKey: false });

const calificacion = mongoose.model('calificacion', calificacionSchema);

export default calificacion;