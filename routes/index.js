var express = require('express');
var mysql= require ('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Express' });
});

router.get('/home', function(req, res) {
  res.render('home', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('usuarios', { title: 'Express' });
});

router.post('/add', function(req, res) {
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
    console.log(usuario);
    res.send("listo");
  });

});


router.get('/product', function(req, res) {
  res.render('index', { title: 'Express' });
});


//conexion a la base de datos
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

module.exports = router;

