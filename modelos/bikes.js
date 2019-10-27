const mongoose= require('mongoose');
const {Schema}=mongoose;



//Esquema de las bicicletas
const  bikeSchema= new Schema({
    ident:{type: String, required:false},
    rfid: {type: String, required:false},
    fechadq: {type: Date, required:false},
    estado: {type: Date, required:false}
});

module.exports= mongoose.model('bicicleta',bikeSchema);
