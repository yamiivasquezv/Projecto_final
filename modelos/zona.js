const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de las estaciones
const  zona= new Schema({
    nombre:{type: String, required:false},
    puntos:[{
        lat: Number,
        lon: Number,
        lat1:Number,
        lon1: Number,
        lat2: Number,
        lon2: Number,
        lat3: Number,
        lon3: Number
    }]
});
module.exports=mongoose.model('zona',zona);