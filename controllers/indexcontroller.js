// const mysql= require ('mysql');
const User=require('../modelos/usuario');
const Bici=require('../modelos/bikes');
const controller={};

//agregar un usuario
controller.add=async (req,res)=> {
    const {primername, segundoname, primerapellido, segundoapellido, tipo, usuario, contrasena, pin, matricula,cedula}=req.body;
    const usuariouser= await User.findOne({usuario: req.body.usuario});
    if (usuariouser){
        req.flash('error_msg','No se pudo registrar');
        res.redirect('/login');
    }
    else{
        if(req.body.tipo==="estudiante"){
            const nusuario= new User({primername, segundoname, primerapellido, segundoapellido, tipo, usuario, contrasena, pin, matricula});
            nusuario.contrasena= await nusuario.encryptPassword(req.body.contrasena);
            nusuario.pin= await nusuario.encryptPin(req.body.pin);
            await nusuario.save();
            req.flash('success_msg','Usuario registrado satisfactoriamente');
            res.redirect('/signin');
        }
        else if(req.body.tipo==="empleado"){
            const nusuario=new User({primername, segundoname, primerapellido, segundoapellido, tipo, usuario, contrasena, pin, cedula});
            nusuario.contrasena= await nusuario.encryptPassword(req.body.contrasena);
            nusuario.pin= await nusuario.encryptPin(req.body.pin);
            await nusuario.save();
            req.flash('success_msg','Usuario registrado satisfactoriamente');
            res.redirect('/signin');
        }
    }
};

controller.addbici=async (req,res)=> {
    const {rfid, fechadq,ident}=req.body;
    if (rfid==="Elija RFID") {
        req.flash('error_msg', 'Elija un código RFID');
        res.redirect('/btnbici');
    }
    else {
        const bikes = await Bici.findOne({$or: [{$or: [{rfid: req.body.rfid}, {ident: req.body.ident}]}, {$and: [{rfid: req.body.rfid}, {ident: req.body.rfid}]}]});
        if (bikes) {
            req.flash('error_msg', 'No se pudo registrar');
            res.redirect('/btnbici');
        } else {
            const nbike = new Bici({ident, rfid, fechadq});
            await nbike.save();
            req.flash('success_msg', 'Bicicleta registrada satisfactoriamente');
            res.redirect('/btnbici');
        }
    }
};

//revisar si el usuario existe con el pin y matricula o cedula
controller.pin= async (req,res)=>{
    const pin=req.body.display;
    const cod=req.body.cod;

  const pinuser= await User.find(
        {$and:
                [
                    {pin: pin},
                    {$or:
                            [
                                {cedula: cod},
                                {matricula: cod}
                            ]
                    }
                ]
        });
  console.log(pinuser);
  res.render('alquiler',{pinuser});

};
controller.alquilar= async (req,res)=>{
    req.logout();
    req.flash('success_msg', 'Alquiler realizado satisfactoriamente');
    res.redirect('/home');
};

module.exports=controller;