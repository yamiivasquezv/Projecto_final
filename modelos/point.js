const mongoose= require('mongoose');
const {Schema}=mongoose;


//Esquema de las bicicletas
const  pointSchema= new Schema({
    patron_id:{type: String},
    punto:{type: Number, index: '2dsphere'}
});

module.exports =mongoose.model('point',pointSchema);



