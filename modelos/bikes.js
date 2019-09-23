const mongoose= require('mongoose');
const {Schema}=mongoose;


//Esquema de las bicicletas
const  bikeSchema= new Schema({
    rfid: {type: String, required:false},
    fechaingreso: {type: Date, default:Date.now},
    estado: {type: Date, default:Date.now},
});

module.exports=mongoose.model('bicicleta',bikeSchema);
