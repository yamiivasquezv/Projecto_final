// const mysql= require ('mysql');
const User=require('../modelos/usuario');



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

   /* var data1 = {
        cedula: req.body.ced,
        primer_nombre: req.body.nombre1,
        segundo_nombre: req.body.nombre2,
        primer_apellido: req.body.apellido1,
        segundo_apellido: req.body.apellido2,
        tipo: req.body.tipo,
        matricula: req.body.mat,
        user: req.body.user,
        pass: req.body.pass,
        pin: req.body.pin
    };
    connect().query('INSERT INTO usuario set ? ', [data1], (err, usuario) => {
        if (err) {
            res.json(err);
        }
        console.log(usuario);
        res.send("Hola");
    });*/
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

 /*   var cod=req.body.cod;
    var pin= req.body.display;
   connect().query('SELECT * FROM usuario WHERE (usuario.matricula= ? OR usuario.cedula= ?) AND usuario.pin= ?', [cod,cod,pin], (err, rows) => {
        if (err) {
            res.json(err);
        }
           //console.log(rows);
       res.render('alquiler', {pinuser: rows});

    });*/
};
controller.alquilar= async (req,res)=>{
   // slot=req.body.slot;
    const user= await User.findById(req.params.id);
    //user.alquiler={slot};
    res.redirect('/home');
    console.log(user);

   /*

    connect().query('INSERT INTO alquiler(cedula) VALUES (?)', [id], (err, alquiler) => {
        if (err) {
            res.json(err);
        }
        console.log(alquiler);
        res.render('home');
    });*/

};

/*controller.auth=(req,res)=>{
    var username= req.body.usuario;
    var password= req.body.passw;
    const errors=[];
    if(!username){
        errors.push({text: 'Por favor escriba el usuario'});
    }
    if (!password){
        errors.push({text: 'Por favor escriba su contraseña'});
    }
    if(errors.length>0){
        res.render('login',{
            errors,
            username,
            password
        });
    }
    /*
    if (username && password){
        connect().query('SELECT * FROM usuario WHERE user=? AND pass=?',[username,password], function (error,results,fields) {
          if (results.length>0){
              req.session.loggedin=true;
              req.session.username=username;
              res.redirect('/administrador');
          }  else{
              res.send('Usuario o contraseña incorrecta');
          }
          res.end();
        });
    } else{
        res.send('Por favor debe ingresar usuario y contraseña!');
        res.end();
    }
};*/

//crear conexion a la base de datos
 /*

function connect(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bicicletas0931',
        database: 'prueba',
        port: 3306,
        insecureAuth : true
    });
}*/
/*
controller.puestos=(req,res)=>{
    var cod=req.body.cod;
    var pin= req.body.display;
    connect().query('SELECT * FROM usuario WHERE (usuario.matricula= ? OR usuario.cedula= ?) AND usuario.pin= ?', [cod,cod,pin], (err, rows) => {
        if (err) {
            res.json(err);
        }

        //console.log(rows);
        res.render('alquiler', {pinuser: rows});

    });
};*/
module.exports=controller;