const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  estacionSchema= new Schema({
    slot: {type: String, required:true},
    ubicacion: {type: String, required:false}
});

module.exports=mongoose.model('estacion',estacionSchema);

