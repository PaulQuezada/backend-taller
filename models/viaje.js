import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const viajeSchema = new Schema({
    disponibles:Number,
    precio:Number,
    estado:String,
    origen:{
        nombre:String,
        lng: Number,
        lat: Number 
    },
    destino:{
        nombre:String,
        lng: Number,
        lat: Number 
    },
    choferid: mongoose.Types.ObjectId,
    haciautalca:Boolean,
    pasajeros:[{ type: Schema.Types.ObjectId, ref: 'usuario' }],
    parada:[],
    fecha:String,
    horainicio: String,
    horafin:Date,
    esfrecuente:Boolean,
    chat:[{
        nombre:  String,
        idemisor: mongoose.Types.ObjectId,
        texto: String,
        hora: String
    }],
    
},{ versionKey: false });

const viaje = mongoose.model('viaje', viajeSchema);

export default viaje;