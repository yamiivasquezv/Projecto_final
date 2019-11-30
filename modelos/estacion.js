const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  estacion= new Schema({
    nombreestacion: {type: String, required:true},
    cantidadslot: {type: String, required:true},
    latitud: {type: Number, required:true},
    longitud: {type: Number, required:true}
});

module.exports=mongoose.model('estacion',estacion);

