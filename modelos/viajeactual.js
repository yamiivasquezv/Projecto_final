const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  viajeactual= new Schema({
    numeroviaje:{type: Number, required:true},
    viaje:{type: Number, required:true},
    bike:{type: String, required:false},
    usuario:{type: String, required:true},
    puntos:[{
        lat: Number,
        lon: Number
    }]
});
module.exports=mongoose.model('viajeactual',viajeactual);