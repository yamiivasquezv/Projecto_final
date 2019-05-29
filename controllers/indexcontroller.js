const mysql= require ('mysql');
const controller={};


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

controller.pin=(req,res)=>{
    var cod=req.body.cod;
    var pin= req.body.display;
   connect().query('SELECT cedula FROM usuario WHERE (usuario.matricula= ? OR usuario.cedula= ?) AND usuario.pin= ?', [cod,cod,pin], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.send("aparecio");
        console.log(rows);
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