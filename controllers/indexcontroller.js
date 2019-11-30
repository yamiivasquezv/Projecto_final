// const mysql= require ('mysql');
const User=require('../modelos/usuario');
const Bici=require('../modelos/bikes');
const Slotestado=require('../modelos/slotestado');
const Alquiler=require('../modelos/alquiler');
const Estacion=require('../modelos/estacion');
const Slot=require('../modelos/slot');
const Viaje=require('../modelos/viaje');
const controller={};

//agregar un usuario
controller.add=async (req,res)=> {
    const {primername, segundoname, primerapellido, segundoapellido, tipo, correo, usuario, contrasena, pin, matricula,cedula}=req.body;
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
            const nusuario=new User({primername, segundoname, primerapellido, segundoapellido, correo, tipo, usuario, contrasena, pin, cedula});
            nusuario.contrasena= await nusuario.encryptPassword(req.body.contrasena);
            nusuario.pin= await nusuario.encryptPin(req.body.pin);
            await nusuario.save();
            req.flash('success_msg','Usuario registrado satisfactoriamente');
            res.redirect('/signin');
        }
    }
};
controller.verubi=async (req,res)=> {
    const bicicleta=req.body.bicicleta;
    const turealbici = await Bici.find({ident:bicicleta}).lean();
    if(turealbici) {
        res.render('btnbici', {turealbici});
        console.log(turealbici);
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
            req.flash('error_msg', 'No se pudo registrar, bicicleta existe');
            res.redirect('/btnbici');
        } else {
            const nbike = new Bici({ident, rfid, fechadq});
            await nbike.save();
            req.flash('success_msg', 'Bicicleta registrada satisfactoriamente');
            res.redirect('/btnbici');
        }
    }
};
controller.addestac=async (req,res)=> {
    const {nombreestacion, cantidadslot,latitud,longitud}=req.body;
    if (cantidadslot==="Elija cantidad") {
        req.flash('error_msg', 'Elija cantidad de slots');
        res.redirect('/btnestac');
    }
    else {
        const estacion= await Estacion.findOne({nombreestacion: req.body.nombreestacion});
        if (estacion) {
            req.flash('error_msg', 'Existe estacion con este mismo nombre, elija otro');
            res.redirect('/btnestac');
        } else {
            const nestacion = new Estacion({nombreestacion, cantidadslot,latitud,longitud});
            await nestacion.save();
            for(var i=0; i<cantidadslot; i++){
                const nslot = new Slot({nombre:'slot'.concat(i+1),estacion:nombreestacion});
                await nslot.save();
            }
            req.flash('success_msg', 'Estacion registrada satisfactoriamente');
            res.redirect('/btnestac');
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
    const slotestado=req.body.slotestado;
    const user=req.body.user;
    const estacion=req.body.estacion;
    const findslot= await Slotestado.find({slot:slotestado});
    const bike= findslot[0].rfid;
    const findbike= await Bici.find({rfid:bike});
    const idbike=findbike[0]._id;
    const idslot=findslot[0]._id;
    //no devuelve nada, chequear eso
    if (findslot){
        const nalquiler=new Alquiler({user:user,estacion:estacion,slot:slotestado,bike:bike});

        await Slotestado.findOneAndUpdate({_id:idslot},{estado: 'disponible'});
        await Bici.findOneAndUpdate({_id:idbike},{estado:'ocupado'});
        await nalquiler.save();

        const idalquiler=nalquiler[0]._id;
        console.log(idalquiler);

        const viajes = await Viaje.find({}).lean();
        var i=0;
        var valor=0;
        if (viajes){
            for (i=0; i<viajes.length; i++){
                if (viajes[i].viaje>valor){
                    valor=viajes[i].viaje;
                }
            }
            const nviaje= new Viaje({viaje:valor,alquiler:idalquiler,estacionorigen:estacion});
            await nviaje.save();
        }
        else {
            const nviaje= new Viaje({viaje:1,alquiler:idalquiler,estacionorigen:estacion});
            await nviaje.save();
        }
        req.flash('success_msg', 'Alquiler realizado satisfactoriamente');
        req.logout();
        res.redirect('/home');
    }
    else {
        req.flash('error_msg', 'Error, no se pudo alquilar bicicleta');
        req.logout();
        res.redirect('/home');
    }
};
controller.verviaje= async (req,res)=>{
 res.render('verviaje');
};
module.exports=controller;