const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de los alquileres
const slot= new Schema({
    nombre: {type: String, required:false},
    estacion: {type: String, required:false}
});

module.exports=mongoose.model('slot',slot);