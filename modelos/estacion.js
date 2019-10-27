const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  estacionSchema= new Schema({
    numeroestacion: {type: String, required:true},
    cantidadslot: {type: String, required:true},
    ubicacion: {type: Point, required:false}
});

module.exports=mongoose.model('estacion',estacionSchema);

