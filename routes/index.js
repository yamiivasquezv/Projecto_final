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
router.post('/verpin', indexcontroller.pin);



router.get('/product', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/alquiler', function (req, res) {
    res.render('alquiler', { title: 'Express' });
});


module.exports = router;

