const mongoose= require('mongoose');
const {Schema}=mongoose;


//Esquema de las bicicletas
const  bikeSchema= new Schema({
    rfid: {type: String, required:false},
    fechaadqui: {type: String, required:false}
});

module.exports=mongoose.model('bicicleta',bikeSchema);
