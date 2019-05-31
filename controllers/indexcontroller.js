const mysql= require ('mysql');
const controller={};

//agregar un usuario
controller.add=(req,res)=> {
    var data1 = {
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
    });
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
module.exports=controller;