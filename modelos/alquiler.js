const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de los alquileres
const alquilerSchema= new Schema({
    user: {type: String, required:false},
    fechaalquiler: {type: Date, default:Date.now},
    estacion: {type: String, required:false},
    slot: {type: String, required:false},
    bike:{type: String, required:false}
});

module.exports=mongoose.model('alquiler',alquilerSchema);