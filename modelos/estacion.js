const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  estacion= new Schema({
    nombreestacion: {type: String, required:true},
    cantidadslot: {type: String, required:true},
    ubicacion: {type: Number, index: '2dsphere'}
});

module.exports=mongoose.model('estacion',estacion);

