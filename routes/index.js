const express = require('express');
const router = express.Router();

const indexcontroller= require('../controllers/indexcontroller');

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

//aqui funciona el boton "registrar" usuarios
router.post('/add', indexcontroller.add );

//Home

//BOTON ALQUILER
router.get('/pin', function (req, res) {
    res.render('pin', { title: 'Express' });
});

//PIN
//Boton Enter
router.post('/verpin', indexcontroller.pin);

//Boton de numero de bicicleta
router.post('/crearalquiler', indexcontroller.alquilar);
//Boton ENTER

/*router.get('/alquiler', function (req, res) {
    res.render('alquiler', { title: 'Express' });
});*/

module.exports = router;

