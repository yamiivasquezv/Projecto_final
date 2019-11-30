const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  rfid= new Schema({
    rfid: {type: String, required:true}
});

module.exports=mongoose.model('rfid',rfid);