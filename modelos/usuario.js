const mongoose= require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcryptjs');

//Esquema de los usuarios
const usuarioSchema= new Schema({
    primername: {type: String, required:true},
    segundoname: {type: String, required:false},
    primerapellido: {type: String, required:true},
    segundoapellido: {type: String, required:false},
    tipo:{type: String, required:true},
    usuario: {type: String, required:true,},
    contrasena: {type: String, required: true},
    pin: {type: String,  required:true},
    matricula: {type: String, required:false},
    cedula: {type: String, required: false},
    correo: {type: String, required:false}
});
usuarioSchema.methods.encryptPassword=async (contrasena)=>{
   const salt= await bcrypt.genSalt(10);
   const hash= await bcrypt.hash(contrasena,salt);
   return hash;
};
usuarioSchema.methods.encryptPin=async (pin)=>{
    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(pin,salt);
    return hash;
};

usuarioSchema.methods.matchPassword= async function(contrasena){
  return await bcrypt.compare(contrasena, this.contrasena);
};

usuarioSchema.methods.matchPin= async function(pin){
    return await bcrypt.compare(pin, this.pin);
};
module.exports=mongoose.model('usuarios',usuarioSchema);


