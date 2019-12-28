const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  viaje= new Schema({
    viaje:{type: Number, required:true},
    usuario:{type: String, required:true},
    estacionorigen: {type: String, required:true},
    estaciondestino: {type: String, required:false},
    fechainicio:{type: Date, default:Date.now}

});

module.exports=mongoose.model('viaje',viaje);