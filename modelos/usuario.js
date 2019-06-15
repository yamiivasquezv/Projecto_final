const mongoose= require('mongoose');
const {Schema}=mongoose;

//Esquema de los usuarios
const usuarioSchema= new Schema({
    primername: {type: String, required:true},
    segundoname: {type: String, required:false},
    primerapellido: {type: String, required:true},
    segundoapellido: {type: String, required:false},
    tipo:{type: String, required:true},
    usuario: {type: String, required:true,},
    contrasena: {type: String, required: true},
    pin: {type: String, required:true},
    matricula: {type: String, required:false},
    cedula: {type: String, required: false},
    alquiler: {type: Schema.ObjectId, ref: "alquiler" }
});
module.exports=mongoose.model('usuarios',usuarioSchema);


