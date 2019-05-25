var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/product', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/*conexion a la base de datos
function connect(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rl2013',
    database: 'VGgatewayDB',
    port: 3306,
    insecureAuth : true
  });
}*/

