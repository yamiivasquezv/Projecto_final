const passport= require ('passport');
const LocalStrategy= require ('passport-local').Strategy;

const User=require('../modelos/usuario');


//que datos me va a enviar para autenticar
passport.use(new LocalStrategy({
    usernameField: 'usuario'
},async (usuario,contrasena,done)=>{
    const user=await User.findOne( {usuario: usuario});
    console.log(user);
    if(!user){
        return done(null,false,{message:'El usuario no fue encontrado'});
    }else{
       const match= await user.matchPassword(contrasena);
       if(match){
           return done(null,user);
       }else{
           return done(null,false,{message: 'Contraseña incorrecta'});
       }
    }

}));

passport.serializeUser((user,done)=> {
    done(null, user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});