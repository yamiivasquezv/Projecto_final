const passport= require ('passport');
const LocalStrategy= require ('passport-local').Strategy;

const User=require('../modelos/usuario');



//que datos me va a enviar para autenticar
passport.use('pin',new LocalStrategy({
    usernameField: 'matricula',
    passwordField: 'pin'
}, async (matricula, pin, done) => {
    const user = await User.findOne({$or: [{matricula: matricula}, {cedula: matricula}]});
    // console.log(user);
    if (!user) {
        return done(null, false, {message: 'El usuario no fue encontrado'});
    } else {
        const match = await user.matchPin(pin);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Pin incorrecto'});
        }
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});