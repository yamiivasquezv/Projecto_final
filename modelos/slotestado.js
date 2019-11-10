const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de los alquileres
const slotestado= new Schema({
    slot: {type: String, required:false},
    rfid: {type: String, required:false},
    estado:{type: String, required:false}
});

module.exports=mongoose.model('slotestado',slotestado);