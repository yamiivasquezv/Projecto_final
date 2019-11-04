const mongoose= require('mongoose');
const {Schema}=mongoose;


//Esquema de las bicicletas
const  pointSchema= new Schema({
    patron_id:{type: String},
    punto:{type: Number, index: '2dsphere'},
    fecha:{type: Date, default: Date.now()},
    marker:{type: String}
});

module.exports =mongoose.model('point',pointSchema);



