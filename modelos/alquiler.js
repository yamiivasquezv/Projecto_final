const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de los alquileres
const alquilerSchema= new Schema({
    fechaalquiler: {type: String, required:false},
    estacion: {type: Schema.ObjectId, ref: "estacion"},
    slot: {type: String, required:false},
    bike:{type: Schema.ObjectId, ref: "bicicleta"}
});

module.exports=mongoose.model('alquiler',alquilerSchema);