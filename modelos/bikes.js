const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las bicicletas
const  bikeSchema= new Schema({
    ident:{type: String, required:false},
    rfid: {type: String, required:false},
    fechadq: {type: Date, required:false},
    estado: {type: String, required:false},
    zona: {type: String, required:false},
    zonaactual: {type: String, required:false},
    zonapasada: {type: String, required:false},
    giro:{type: Number, required:false}
});

module.exports= mongoose.model('bicicleta',bikeSchema);
