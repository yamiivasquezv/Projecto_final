const mysql= require ('mysql');
const User=require('../modelos/mongo');
const controller={};

//agregar un usuario
controller.add=(req,res)=> {
    const {primername, segundoname, primerapellido, segundoapellido, tipo, usuario, contrasena, pin, matricula,cedula}=req.body;
    if(req.body.tipo==="estudiante"){
      const nusuario= new User({primername, segundoname, primerapellido, segundoapellido, tipo, usuario, contrasena, pin});
        //nusuario.matricula=({matricula});
        console.log(nusuario);
        res.send('ok');
    }
    else if(req.body.tipo==="empleado" || req.body.tipo==="administrador"){
       const nusuario=new User({primername, segundoname, primerapellido, segundoapellido, tipo, usuario, contrasena, pin});
      // nusuario.cedula=({cedula});
        console.log(nusuario);
        res.send('ok');
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
controller.pin=(req,res)=>{
    var cod=req.body.cod;
    var pin= req.body.display;
   connect().query('SELECT * FROM usuario WHERE (usuario.matricula= ? OR usuario.cedula= ?) AND usuario.pin= ?', [cod,cod,pin], (err, rows) => {
        if (err) {
            res.json(err);
        }
           //console.log(rows);
       res.render('alquiler', {pinuser: rows});

    });
};
controller.alquilar=(req,res)=>{
    var todo=req.body.numero;
    var num=todo.substring(0,1);
    var id=todo.substring(1,12);

    connect().query('INSERT INTO alquiler(cedula) VALUES (?)', [id], (err, alquiler) => {
        if (err) {
            res.json(err);
        }
        console.log(alquiler);
        res.render('home');
    });

};

controller.auth=(req,res)=>{
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
    }*/
};
//crear conexion a la base de datos

function connect(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bicicletas0931',
        database: 'prueba',
        port: 3306,
        insecureAuth : true
    });
}
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