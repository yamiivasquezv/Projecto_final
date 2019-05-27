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

