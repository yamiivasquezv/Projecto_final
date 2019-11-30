const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  puntoviaje= new Schema({
    viaje:{type: Number, required:true},
    punto:{type: Number, index: '2dsphere'}
});

module.exports=mongoose.model('puntoviaje',puntoviaje);