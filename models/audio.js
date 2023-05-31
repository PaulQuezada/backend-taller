import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const audioSchema = new Schema({

    emisoraudio: mongoose.Types.ObjectId, 
    enlace:String,
    idviaje: mongoose.Types.ObjectId,
    fecha: String

},{ versionKey: false });

const audio = mongoose.model('audio', audioSchema);

export default audio;